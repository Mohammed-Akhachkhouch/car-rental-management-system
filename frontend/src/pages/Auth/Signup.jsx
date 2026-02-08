import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setAuth } from "../../store/authStore";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [err, setErr] = useState("");

  function update(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!form.email || !form.password || !form.confirm) {
      setErr("Please fill in all fields.");
      return;
    }
    if (form.password.length < 6) {
      setErr("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setErr("Passwords do not match.");
      return;
    }

    // ✅ مؤقتاً: تسجيل حساب وهمي + تسجيل دخول مباشرة
    setAuth({
      user: { email: form.email, role: "customer" },
      token: "demo-token",
    });

    nav("/");
  }

  return (
    <div className="auth">
      <div className="auth__box">
        <h1>Create account</h1>
        <p className="muted">Start renting cars in minutes.</p>

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

          <label>Confirm password</label>
          <input
            type="password"
            value={form.confirm}
            onChange={(e) => update("confirm", e.target.value)}
            placeholder="••••••••"
          />

          <button className="btn btn--primary" type="submit">
            Sign up
          </button>
        </form>

        <p className="auth__foot">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
