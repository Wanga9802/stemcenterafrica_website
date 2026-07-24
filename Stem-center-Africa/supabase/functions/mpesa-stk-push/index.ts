// supabase/functions/mpesa-stk-push/index.ts
//
// Called from the Donate page when a user chooses M-Pesa and submits phone + amount.
// 1. Creates a "pending" row in donations
// 2. Gets a Daraja OAuth token
// 3. Sends the STK Push request (this is what triggers the phone prompt)
// 4. Saves the CheckoutRequestID so the callback function can match it later
//
// Env vars required (set via `supabase secrets set`):
//   MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET, MPESA_SHORTCODE,
//   MPESA_PASSKEY, MPESA_CALLBACK_URL, MPESA_ENV ("sandbox" | "production")

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function baseUrl() {
  return Deno.env.get("MPESA_ENV") === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";
}

function timestamp() {
  const d = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

async function getAccessToken(): Promise<string> {
  const key = Deno.env.get("MPESA_CONSUMER_KEY")!;
  const secret = Deno.env.get("MPESA_CONSUMER_SECRET")!;
  const auth = btoa(`${key}:${secret}`);

  const res = await fetch(`${baseUrl()}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` },
  });
  if (!res.ok) throw new Error(`Failed to get Daraja token: ${res.status}`);
  const data = await res.json();
  return data.access_token;
}

// Daraja requires the phone in 2547XXXXXXXX format
function normalizePhone(phone: string): string {
  let p = phone.replace(/\s+/g, "").replace(/^\+/, "");
  if (p.startsWith("0")) p = "254" + p.slice(1);
  if (p.startsWith("7") || p.startsWith("1")) p = "254" + p;
  return p;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { phone, amount, donorName, message } = await req.json();

    if (!phone || !amount || Number(amount) <= 0) {
      return new Response(JSON.stringify({ error: "phone and a positive amount are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const normalizedPhone = normalizePhone(phone);

    // 1. Create the pending donation row first
    const { data: donation, error: insertError } = await supabase
      .from("donations")
      .insert({
        provider: "mpesa",
        status: "pending",
        amount: Number(amount),
        currency: "KES",
        donor_name: donorName ?? null,
        message: message ?? null,
        mpesa_phone: normalizedPhone,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // 2. Get access token + build STK push payload
    const accessToken = await getAccessToken();
    const shortcode = Deno.env.get("MPESA_SHORTCODE")!;
    const passkey = Deno.env.get("MPESA_PASSKEY")!;
    const ts = timestamp();
    const password = btoa(`${shortcode}${passkey}${ts}`);

    const stkRes = await fetch(`${baseUrl()}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: ts,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.round(Number(amount)), // Daraja wants whole numbers
        PartyA: normalizedPhone,
        PartyB: shortcode,
        PhoneNumber: normalizedPhone,
        CallBackURL: Deno.env.get("MPESA_CALLBACK_URL"),
        AccountReference: `Donation-${donation.id.slice(0, 8)}`,
        TransactionDesc: "STEM Center Africa Donation",
      }),
    });

    const stkData = await stkRes.json();

    if (stkData.ResponseCode !== "0") {
      // STK push itself failed to even send (bad shortcode, wrong passkey, etc.)
      await supabase
        .from("donations")
        .update({ status: "failed", mpesa_result_desc: stkData.errorMessage ?? "STK push failed" })
        .eq("id", donation.id);

      return new Response(JSON.stringify({ error: stkData.errorMessage ?? "STK push failed" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Save the CheckoutRequestID so the callback can find this row
    await supabase
      .from("donations")
      .update({
        mpesa_checkout_request_id: stkData.CheckoutRequestID,
        mpesa_merchant_request_id: stkData.MerchantRequestID,
      })
      .eq("id", donation.id);

    return new Response(
      JSON.stringify({
        donationId: donation.id,
        checkoutRequestId: stkData.CheckoutRequestID,
        message: "Check your phone to complete the payment.",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});