// supabase/functions/mpesa-callback/index.ts
//
// This is the public URL you register as MPESA_CALLBACK_URL / on the Daraja portal.
// Safaricom calls this automatically after the user enters their PIN (or cancels/times out).
// It does NOT require the caller to be logged in — Safaricom's servers hit it directly —
// so this function uses the service role key and is the only place that trusts the payload.

import { createClient } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    const body = await req.json();
    const callback = body?.Body?.stkCallback;

    if (!callback) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const checkoutRequestId = callback.CheckoutRequestID;
    const resultCode = callback.ResultCode; // 0 = success
    const resultDesc = callback.ResultDesc;

    if (resultCode === 0) {
      // Successful payment — the metadata array holds Amount, MpesaReceiptNumber, PhoneNumber, etc.
      const items = callback.CallbackMetadata?.Item ?? [];
      const get = (name: string) => items.find((i: any) => i.Name === name)?.Value;

      await supabase
        .from("donations")
        .update({
          status: "completed",
          mpesa_result_code: resultCode,
          mpesa_result_desc: resultDesc,
          mpesa_receipt_number: get("MpesaReceiptNumber"),
        })
        .eq("mpesa_checkout_request_id", checkoutRequestId);
    } else {
      // User cancelled, entered wrong PIN, timed out, insufficient funds, etc.
      await supabase
        .from("donations")
        .update({
          status: resultCode === 1032 ? "cancelled" : "failed",
          mpesa_result_code: resultCode,
          mpesa_result_desc: resultDesc,
        })
        .eq("mpesa_checkout_request_id", checkoutRequestId);
    }

    // Always acknowledge with 200 so Safaricom doesn't retry indefinitely
    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    // Still return 200 — Daraja will just keep retrying otherwise, and the
    // donor's row will simply stay "pending" for you to check manually.
    return new Response(JSON.stringify({ ResultCode: 0, ResultDesc: "Accepted" }), { status: 200 });
  }
});