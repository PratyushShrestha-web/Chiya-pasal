"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Incorrect email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.heading}>Chiya Pasal Admin</h1>
        <p style={styles.sub}>Sign in to manage the songs playing in the shop.</p>

        <label style={styles.label}>
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            autoComplete="username"
          />
        </label>

        <label style={styles.label}>
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            autoComplete="current-password"
          />
        </label>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#241209",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    background: "#3d2418",
    border: "1px solid rgba(243,230,210,.12)",
    borderRadius: 16,
    padding: 28,
    color: "#f3e6d2",
  },
  heading: { fontFamily: "'Fraunces', Georgia, serif", fontWeight: 500, fontSize: 22, margin: "0 0 6px" },
  sub: { fontSize: 13, opacity: 0.65, margin: "0 0 20px" },
  label: { display: "block", fontSize: 12.5, marginBottom: 14, opacity: 0.85 },
  input: {
    display: "block",
    width: "100%",
    marginTop: 6,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(243,230,210,.2)",
    background: "#241209",
    color: "#f3e6d2",
    fontSize: 14,
  },
  error: { color: "#e2703a", fontSize: 13, margin: "0 0 14px" },
  button: {
    width: "100%",
    padding: "11px 0",
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(180deg,#e8c168,#caa24a)",
    color: "#241209",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  },
};
