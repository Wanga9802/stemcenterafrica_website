import { useState, useEffect, useRef } from "react";
import { supabase } from "../../../lib/supabaseClient";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [user, setUser] = useState(null);

  // --- Toast state ---
  const [toast, setToast] = useState(null);

  // --- Profile state ---
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const fileInputRef = useRef(null);

  // --- Password state ---
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // ─── Toast helper ──────────────────────────────────────────────────────────
  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  // ─── Get current user then fetch profile ──────────────────────────────────
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setUser(data.user);
    });
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchProfile();
  }, [user]);

  async function fetchProfile() {
    const { data, error } = await supabase
      .from("admin_profiles")
      .select("full_name, job_title, avatar_url")
      .eq("id", user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error loading profile:", error);
      return;
    }

    if (data) {
      setFullName(data.full_name || "");
      setJobTitle(data.job_title || "");
      setAvatarUrl(data.avatar_url || null);
    }
  }

  // ─── Avatar file selection ─────────────────────────────────────────────────
  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      showToast("Only JPG, PNG, or WEBP images are allowed.", "error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast("Image must be under 2MB.", "error");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  // ─── Save profile ──────────────────────────────────────────────────────────
  async function handleSaveProfile(e) {
    e.preventDefault();
    if (!fullName.trim()) {
      showToast("Full name is required.", "error");
      return;
    }

    setProfileLoading(true);
    let uploadedAvatarUrl = avatarUrl;

    try {
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const filePath = `${user.id}/avatar.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        uploadedAvatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;
      }

      const { error: upsertError } = await supabase
        .from("admin_profiles")
        .upsert(
          {
            id: user.id,
            full_name: fullName.trim(),
            job_title: jobTitle.trim(),
            avatar_url: uploadedAvatarUrl,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" }
        );

      if (upsertError) throw upsertError;

      setAvatarUrl(uploadedAvatarUrl);
      setAvatarFile(null);
      showToast("Profile saved successfully!");

      // Tell the Topbar to re-fetch the latest profile
      window.dispatchEvent(new Event("profile-updated"));

    } catch (err) {
      console.error(err);
      showToast("Failed to save profile. Please try again.", "error");
    } finally {
      setProfileLoading(false);
    }
  }

  // ─── Change password ───────────────────────────────────────────────────────
  async function handleChangePassword(e) {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      showToast("Please fill in all password fields.", "error");
      return;
    }

    if (newPassword.length < 8) {
      showToast("New password must be at least 8 characters.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    setPasswordLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      showToast("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to update password.", "error");
    } finally {
      setPasswordLoading(false);
    }
  }

  // ─── Derived values ────────────────────────────────────────────────────────
  const displayAvatar = avatarPreview || avatarUrl;
  const initials = fullName
    ? fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "A";

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="asp-page container-fluid">

      {/* Toast notification */}
      {toast && (
        <div className={`asp-toast asp-toast--${toast.type}`}>
          {toast.type === "success" ? "✓" : "✕"} {toast.message}
        </div>
      )}

      {/* ── Row 1: Header (full width) ─────────────────────────────────── */}
      <div className="row">
        <div className="col-12">
          <div className="asp-header">
            <h1 className="asp-title">Settings</h1>
            <p className="asp-subtitle">
              Manage your profile and account preferences
            </p>
          </div>
        </div>
      </div>

      {/* ── Row 2: Profile (6) / Account Security (6) ──────────────────── */}
      <div className="row asp-body-row">

        {/* Left column: Profile */}
        <div className="col-md-6">
          <section className="asp-card shadow-lg">
            <div className="asp-card-header">
              <h2 className="asp-card-title">Profile</h2>
              <p className="asp-card-desc">
                Your name and avatar appear in the admin header
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="asp-form">
              {/* Avatar upload */}
              <div className="asp-avatar-group">
                <div className="asp-avatar-preview">
                  {displayAvatar ? (
                    <img src={displayAvatar} alt="Profile avatar" className="asp-avatar-img" />
                  ) : (
                    <div className="asp-avatar-initials">{initials}</div>
                  )}
                </div>

                <div className="asp-avatar-actions">
                  <button
                    type="button"
                    className="asp-btn asp-btn-outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Photo
                  </button>
                  {displayAvatar && (
                    <button
                      type="button"
                      className="asp-btn asp-btn-ghost asp-btn-danger"
                      onClick={() => {
                        setAvatarFile(null);
                        setAvatarPreview(null);
                        setAvatarUrl(null);
                      }}
                    >
                      Remove
                    </button>
                  )}
                  <p className="asp-avatar-hint">JPG, PNG or WEBP · Max 2MB</p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="asp-sr-only"
                  onChange={handleAvatarChange}
                />
              </div>

              {/* Full Name */}
              <div className="asp-field">
                <label className="asp-label" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  className="asp-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jane Mwangi"
                />
              </div>

              {/* Job Title */}
              <div className="asp-field">
                <label className="asp-label" htmlFor="jobTitle">Job Title</label>
                <input
                  id="jobTitle"
                  type="text"
                  className="asp-input"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Super Admin"
                />
              </div>

              {/* Email (read-only) */}
              <div className="asp-field">
                <label className="asp-label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  className="asp-input asp-input--readonly"
                  value={user?.email || ""}
                  readOnly
                />
                <p className="asp-help-text">Email cannot be changed from this panel</p>
              </div>

              <div className="asp-form-actions">
                <button type="submit" className="asp-btn asp-btn-primary" disabled={profileLoading}>
                  {profileLoading ? "Saving…" : "Save Profile"}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Right column: Account Security */}
        <div className="col-md-6">
          <section className="asp-card shadow-lg">
            <div className="asp-card-header">
              <h2 className="asp-card-title">Account Security</h2>
              <p className="asp-card-desc">
                Update your password to keep your account secure
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="asp-form">
              <div className="asp-field">
                <label className="asp-label" htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  className="asp-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                />
              </div>

              <div className="asp-field">
                <label className="asp-label" htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="asp-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  autoComplete="new-password"
                />
              </div>

              {newPassword && <PasswordStrength password={newPassword} />}

              <div className="asp-form-actions">
                <button type="submit" className="asp-btn asp-btn-primary" disabled={passwordLoading}>
                  {passwordLoading ? "Updating…" : "Update Password"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

// ─── Password strength indicator ──────────────────────────────────────────────
function PasswordStrength({ password }) {
  const checks = [
    { label: "8+ characters", pass: password.length >= 8 },
    { label: "Uppercase letter", pass: /[A-Z]/.test(password) },
    { label: "Number", pass: /\d/.test(password) },
    { label: "Special character", pass: /[^A-Za-z0-9]/.test(password) },
  ];

  const score = checks.filter((c) => c.pass).length;
  const label = ["", "Weak", "Fair", "Good", "Strong"][score];
  const colorClass = ["", "asp-strength--weak", "asp-strength--fair", "asp-strength--good", "asp-strength--strong"][score];

  return (
    <div className="asp-password-strength">
      <div className={`asp-strength-bar ${colorClass}`}>
        <div className="asp-strength-fill" style={{ width: `${(score / 4) * 100}%` }} />
      </div>
      <div className="asp-strength-meta">
        <span className={`asp-strength-label ${colorClass}`}>{label}</span>
        <ul className="asp-strength-checks">
          {checks.map((c) => (
            <li key={c.label} className={c.pass ? "asp-check--pass" : "asp-check--fail"}>
              <span className="asp-check-icon">{c.pass ? "✓" : "·"}</span>
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
