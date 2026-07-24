// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const PAYPAL_CLIENT_ID = Deno.env.get("PAYPAL_CLIENT_ID")!;
const PAYPAL_SECRET = Deno.env.get("PAYPAL_SECRET")!;

// Sandbox base URL for now — switch to https://api-m.paypal.com when you go live
const PAYPAL_API_BASE = "https://api-m.sandbox.paypal.com";

async function getPayPalAccessToken() {
  const auth = btoa(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`);
  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get PayPal access token: ${text}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

async function capturePayPalOrder(orderId: string, accessToken: string) {
  const res = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return { ok: res.ok, data };
}

// This endpoint uses 'publishable' | 'secret' access, apiKey is required.
// Called directly from the frontend after the buyer approves payment in the
// PayPal Buttons widget, so this runs in 'publishable' auth mode.
export default {
  fetch: withSupabase({ auth: ["publishable", "secret"] }, async (req, ctx) => {
    try {
      const { orderId, donorName, donorMessage } = await req.json();

      if (!orderId) {
        return Response.json({ status: "error", error: "Missing orderId" }, { status: 400 });
      }
      if (!donorName || !donorName.trim()) {
        return Response.json({ status: "error", error: "Missing donorName" }, { status: 400 });
      }

      const accessToken = await getPayPalAccessToken();
      const { ok, data } = await capturePayPalOrder(orderId, accessToken);

      const captureStatus = data?.status; // e.g. "COMPLETED"
      const isCompleted = ok && captureStatus === "COMPLETED";

      const purchaseUnit = data?.purchase_units?.[0];
      const capture = purchaseUnit?.payments?.captures?.[0];
      const amount = capture?.amount?.value ? Number(capture.amount.value) : 0;
      const currency = capture?.amount?.currency_code || "USD";

      // ctx.supabaseAdmin bypasses RLS — safe here since this is a privileged,
      // server-to-server insert after PayPal has already confirmed the capture.
      const { error: insertError } = await ctx.supabaseAdmin.from("donations").insert({
        provider: "paypal",
        status: isCompleted ? "completed" : "failed",
        donor_name: donorName,
        amount: amount,
        currency: currency,
        message: donorMessage || null,
        paypal_order_id: orderId,
        paypal_capture_id: capture?.id || null,
      });

      if (insertError) {
        console.error("Failed to insert donation row:", insertError);
        return Response.json({ status: "error", error: "Failed to record donation" }, { status: 500 });
      }

      if (!isCompleted) {
        console.error("PayPal capture not completed:", data);
        return Response.json({ status: "failed" }, { status: 200 });
      }

      return Response.json({ status: "completed" });
    } catch (err) {
      console.error("paypal-capture error:", err);
      return Response.json({ status: "error", error: (err as Error).message }, { status: 500 });
    }
  }),
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/paypal-capture' \
    --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
    --data '{"orderId":"TEST_ORDER_ID","donorName":"Test Donor","donorMessage":"Great work!"}'

*/
