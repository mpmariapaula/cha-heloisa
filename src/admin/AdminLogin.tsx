import { useState } from "react";
import { A } from "./shared";
import { supabase } from "../lib/supabase";

export function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    onLogin();
  } catch {
    setError("Não foi possível entrar. Verifique sua conexão.");
  }
};

  return (
    <div style={{ minHeight: "100svh", background: "linear-gradient(160deg, #f7ded5 0%, #f2c3ce 55%, #e6d8e8 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
      <div style={{ ...A.card, maxWidth: 380, width: "100%", overflow: "hidden" }}>
        <div style={{ background: "linear-gradient(135deg, #f7ded5, #f2e8f0)", padding: "28px 28px 20px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Parisienne', cursive", fontSize: "2.4rem", color: "#a85f78" }}>Heloisa</p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#7d6873", marginTop: 2 }}>Área Administrativa</p>
        </div>
        <form onSubmit={submit} style={{ padding: "1.75rem" }}>
          <div style={{ marginBottom: "1rem" }}>
            <label style={A.label}>E-mail</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@heloisa.com" style={A.inputStyle} />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={A.label}>Senha</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={A.inputStyle} />
          </div>
          {error && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#c0404a", marginBottom: "1rem", textAlign: "center" }}>{error}</p>}
          <button type="submit" style={{ ...A.primaryBtn, width: "100%", padding: "13px", fontSize: "1rem" }} className="hover:opacity-90 active:scale-95 transition-all">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
