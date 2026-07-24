import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import "../Styles/Donate.css";
import mpesaImg from "../assets/mpesa.jpg";

// If you add a local paypal.jpg in src/assets, replace the fallback below with an import
const paypalFallback = "https://www.paypalobjects.com/webstatic/icon/pp258.png";

const FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const IMPACT_TIERS = [
  { amount: 1000, label: "1 week of internet access", detail: "for a student in our coding club" },
  { amount: 2500, label: "A month of robotics materials", detail: "for one student's project kit" },
  { amount: 7000, label: "A full STEM starter kit", detail: "for one girl through WoSTEM" },
  { amount: 15000, label: "A term of Innovation Hub mentorship", detail: "for one student-led project" },
];
const USD_TIERS = [8, 20, 55, 116];

export default function Donate() {
  const [provider, setProvider] = useState("mpesa");
  const [selectedTier, setSelectedTier] = useState(1); // index into IMPACT_TIERS
  const [customAmount, setCustomAmount] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [phone, setPhone] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | awaiting_pin | polling | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const paypalRef = useRef(null);
  // Tracks whether the last createOrder rejection was our own validation guard
  // (missing name) rather than a real PayPal SDK error, so onError doesn't
  // overwrite the validation message with a generic one.
  const validationRejectRef = useRef(false);

  const amount = useCustom
    ? Number(customAmount) || 0
    : provider === "paypal"
    ? USD_TIERS[selectedTier]
    : IMPACT_TIERS[selectedTier].amount;

  async function handleMpesaSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!donorName.trim()) {
      setStatus("error");
      setErrorMsg("Please enter your name before donating.");
      return;
    }

    if (!phone.trim()) {
      setStatus("error");
      setErrorMsg("Please enter your M-Pesa phone number.");
      return;
    }

    setStatus("awaiting_pin");

    try {
      const res = await fetch(`${FUNCTIONS_URL}/mpesa-stk-push`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ phone, amount, donorName, donorMessage }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      pollDonationStatus(data.donationId);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  function pollDonationStatus(donationId) {
    setStatus("polling");
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      const { data } = await supabase.from("donations").select("status").eq("id", donationId).single();

      if (data?.status === "completed") {
        clearInterval(interval);
        setStatus("success");
      } else if (data?.status === "failed" || data?.status === "cancelled") {
        clearInterval(interval);
        setStatus("error");
        setErrorMsg(data.status === "cancelled" ? "Payment was cancelled." : "Payment didn't go through — no charge was made.");
      } else if (attempts >= 20) {
        clearInterval(interval);
        setStatus("error");
        setErrorMsg("We didn't get a confirmation in time. Check your M-Pesa messages before trying again.");
      }
    }, 3000);
  }

  useEffect(() => {
    if (provider !== "paypal" || amount <= 0) return;

    const scriptId = "paypal-sdk";
    function renderButtons() {
      if (!window.paypal || !paypalRef.current) return;
      paypalRef.current.innerHTML = "";
      window.paypal
        .Buttons({
          style: { color: "blue", shape: "pill", label: "pay", height: 48 },
          createOrder: (_, actions) => {
            if (!donorName.trim()) {
              validationRejectRef.current = true;
              setStatus("error");
              setErrorMsg("Please enter your name before donating.");
              return Promise.reject(new Error("Missing donor name"));
            }
            validationRejectRef.current = false;
            return actions.order.create({ purchase_units: [{ amount: { value: amount.toFixed(2) } }] });
          },
          onApprove: async (data) => {
            setStatus("polling");
            const res = await fetch(`${FUNCTIONS_URL}/paypal-capture`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                apiKey: SUPABASE_PUBLISHABLE_KEY,
              },
              body: JSON.stringify({ orderId: data.orderID, donorName, donorMessage }),
            });
            const result = await res.json();
            setStatus(result.status === "completed" ? "success" : "error");
            if (result.status !== "completed") setErrorMsg("PayPal payment could not be confirmed.");
          },
          onError: (err) => {
            // If this error immediately follows our own validation rejection
            // (missing name), the specific message is already set — don't
            // clobber it with the generic SDK error message.
            if (validationRejectRef.current) {
              validationRejectRef.current = false;
              return;
            }
            console.error("PayPal SDK error:", err);
            setStatus("error");
            setErrorMsg("PayPal encountered an error.");
          },
        })
        .render(paypalRef.current);
    }

    if (document.getElementById(scriptId)) {
      renderButtons();
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.onload = renderButtons;
    document.body.appendChild(script);
  }, [provider, amount, donorName, donorMessage]);

  if (status === "success") {
    return (
      <div className="donate-page">
        <div className="donate-success">
          <div className="donate-success__mark">✓</div>
          <h1>Thank you.</h1>
          <p>
            Your donation of {provider === "mpesa" ? "KES" : "USD"} {amount.toLocaleString()} is on its way to
            students across our programs. You'll receive a confirmation shortly.
          </p>
          <a href="/" className="donate-success__link">Back to the homepage</a>
        </div>
      </div>
    );
  }

  return (
    <div className="donate-page">
      <div className="donate-hero">
        <div className="donate-hero__constellation" aria-hidden="true">
          <svg viewBox="0 0 400 500" className="constellation-svg">
            <g className="constellation-lines">
              <line x1="80" y1="90" x2="180" y2="150" />
              <line x1="180" y1="150" x2="140" y2="260" />
              <line x1="140" y1="260" x2="240" y2="310" />
              <line x1="240" y1="310" x2="200" y2="420" />
              <line x1="180" y1="150" x2="290" y2="180" />
              <line x1="290" y1="180" x2="240" y2="310" />
              <line x1="80" y1="90" x2="140" y2="260" />
            </g>
            <g className="constellation-nodes">
              <circle cx="80" cy="90" r="5" />
              <circle cx="180" cy="150" r="7" className="node-major" />
              <circle cx="140" cy="260" r="5" />
              <circle cx="290" cy="180" r="4" />
              <circle cx="240" cy="310" r="7" className="node-major" />
              <circle cx="200" cy="420" r="5" />
            </g>
          </svg>
        </div>
        <div className="donate-hero__content">
          <span className="donate-hero__eyebrow">STEM Center Africa</span>
          <h1>Every donation plugs a student into their next opportunity.</h1>
          <p>
            From coding clubs to the Innovation Hub, your support goes directly into materials,
            mentorship, and access — for students who are ready to build.
          </p>
        </div>
      </div>

      <div className="donate-card">
        <div className="donate-card__provider">
          <span className="donate-card__section-label">Choose how to give</span>
          <div className="provider-toggle">
            <button
              type="button"
              className={provider === "mpesa" ? "active" : "image-btn"}
              onClick={() => setProvider("mpesa")}
              aria-label="Give with M-Pesa"
            >
              <img src={mpesaImg} alt="M-Pesa" />
            </button>
            <button
              type="button"
              className={provider === "paypal" ? "active" : "image-btn"}
              onClick={() => setProvider("paypal")}
              aria-label="Give with PayPal"
            >
              <img src={paypalFallback} alt="PayPal" />
            </button>
          </div>
        </div>

        <div className="donate-card__tiers">
          <span className="donate-card__section-label">Choose your impact</span>
          <div className="tier-grid">
            {IMPACT_TIERS.map((tier, i) => (
              <button
                key={tier.amount}
                type="button"
                className={`tier-option ${!useCustom && selectedTier === i ? "tier-option--active" : ""}`}
                onClick={() => {
                  setUseCustom(false);
                  setSelectedTier(i);
                }}
              >
                <span className="tier-option__amount">
                  {provider === "paypal" ? `USD ${USD_TIERS[i].toLocaleString()}` : `KES ${tier.amount.toLocaleString()}`}
                </span>
                <span className="tier-option__label">{tier.label}</span>
                <span className="tier-option__detail">{tier.detail}</span>
              </button>
            ))}
            <button
              type="button"
              className={`tier-option tier-option--custom ${useCustom ? "tier-option--active" : ""}`}
              onClick={() => setUseCustom(true)}
            >
              <span className="tier-option__amount">Custom amount</span>
              {useCustom && (
                <input
                  type="number"
                  min="1"
                  placeholder={provider === "paypal" ? "Enter amount (USD)" : "Enter amount (KES)"}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
              )}
            </button>
          </div>
        </div>

        <div className="donate-card__details">
          <span className="donate-card__section-label">Your details</span>
          <div className="detail-fields">
            <input
              placeholder="Name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              required
            />
            {provider === "mpesa" && (
              <input
                placeholder="M-Pesa phone e.g. 0712345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            )}
            <input
              type="text"
              className="detail-message"
              placeholder="Message (optional)"
              value={donorMessage}
              onChange={(e) => setDonorMessage(e.target.value)}
            />
          </div>
        </div>

        {provider === "mpesa" ? (
          <form onSubmit={handleMpesaSubmit} className="donate-card__action">
            <button
              type="submit"
              className="donate-submit"
              disabled={amount <= 0 || status === "awaiting_pin" || status === "polling"}
            >
              {status === "polling" ? "Waiting for confirmation…" : `Give KES ${amount.toLocaleString() || "0"}`}
            </button>
            {status === "awaiting_pin" && (
              <p className="donate-hint">Check your phone and enter your M-Pesa PIN.</p>
            )}
          </form>
        ) : (
          <div className="donate-card__action">
            <div ref={paypalRef} className="paypal-buttons" />
          </div>
        )}

        {status === "error" && <p className="donate-error">{errorMsg}</p>}
      </div>
    </div>
  );
}
