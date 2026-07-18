

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle the browser's CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { subject, body, recipientIds } = await req.json();

    if (!subject || !body || !Array.isArray(recipientIds) || recipientIds.length === 0) {
      return new Response(
        JSON.stringify({ error: "subject, body, and recipientIds[] are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create a client scoped to the caller's own JWT so RLS applies
    // (this is how we know WHICH admin is sending, and that they're authenticated at all)
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch the selected recipients (RLS ensures only authenticated users can read this)
    const { data: recipients, error: fetchError } = await supabase
      .from("community_signups")
      .select("id, first_name, email")
      .in("id", recipientIds)
      .eq("subscribed", true);

    if (fetchError || !recipients || recipients.length === 0) {
      return new Response(JSON.stringify({ error: "No valid recipients found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const brevoApiKey = Deno.env.get("BREVO_API_KEY")!;
    const senderEmail = Deno.env.get("BREVO_SENDER_EMAIL")!;
    const senderName = Deno.env.get("BREVO_SENDER_NAME") ?? "STEM Center Africa";

    // Brevo's messageVersions lets you send personalized copies in ONE api call,
    // each recipient only sees their own address (no exposed "to" list).
    const messageVersions = recipients.map((r) => ({
      to: [{ email: r.email, name: r.first_name }],
      params: { FIRSTNAME: r.first_name },
    }));

    const brevoResponse = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "api-key": brevoApiKey,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        subject,
        htmlContent: `<html><body>${body.replace(/\n/g, "<br>")}</body></html>`,
        messageVersions,
      }),
    });

    const brevoResult = await brevoResponse.json();
    const success = brevoResponse.ok;

    // Log the send regardless of outcome — this is the audit trail
    await supabase.from("campaign_sends").insert({
      sent_by: user.id,
      sent_by_email: user.email,
      subject,
      body,
      recipient_ids: recipients.map((r) => r.id),
      recipient_count: recipients.length,
      status: success ? "sent" : "failed",
      error_message: success ? null : JSON.stringify(brevoResult),
    });

    if (!success) {
      return new Response(JSON.stringify({ error: "Brevo send failed", details: brevoResult }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: true, recipientCount: recipients.length }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
