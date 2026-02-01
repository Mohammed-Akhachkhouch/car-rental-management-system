import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../store/authStore";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  function update(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!form.email || !form.password) {
      setErr("Please fill in all fields.");
      return;
    }

    // ✅ مؤقتاً: تسجيل دخول وهمي
    setAuth({
      user: { email: form.email, role: "customer" },
      token: "demo-token",
    });

    nav("/"); // رجّع للهوم
  }

  return (
    <div className="auth">
      <div className="auth__box">
        <h1>Login</h1>
        <p className="muted">Welcome back. Please sign in.</p>

        {err ? <div className="auth__error">{err}</div> : null}

        <form onSubmit={onSubmit} className="auth__form">
          <label>Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />

          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder="••••••••"
          />

          <button className="btn btn--primary" type="submit">
            Login
          </button>
        </form>

        <p className="auth__foot">
          Don’t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}
