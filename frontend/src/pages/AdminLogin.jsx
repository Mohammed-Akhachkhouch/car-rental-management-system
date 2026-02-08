import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAuth, setAuth } from "../store/authStore";

const ADMIN_EMAIL = "admin@chahidcar.com";
const ADMIN_PASSWORD = "Admin@2026";

export default function AdminLogin() {
  const nav = useNavigate();
  const current = getAuth();

  const [form, setForm] = useState({
    email: ADMIN_EMAIL,
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (current.user?.role === "admin") {
      nav("/admin/dashboard");
    }
  }, [current.user?.role, nav]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.email !== ADMIN_EMAIL || form.password !== ADMIN_PASSWORD) {
      setError("Invalid admin credentials.");
      return;
    }

    setAuth({
      user: { email: form.email, role: "admin" },
      token: "admin-demo-token",
    });
    nav("/admin/dashboard");
  }

  return (
    <>
      <Navbar />
      <section className="adminLoginPage section">
        <div className="container">
          <div className="adminLoginCard">
            <h1>Admin Secure Login</h1>
            <p className="section__sub">
              Access dashboard and fleet operations securely.
            </p>
            <p className="adminLoginHint">
              Demo: <strong>{ADMIN_EMAIL}</strong> / <strong>{ADMIN_PASSWORD}</strong>
            </p>

            {error ? <div className="auth__error">{error}</div> : null}

            <form className="auth__form" onSubmit={onSubmit}>
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                placeholder="Enter admin password"
              />

              <button className="btn btn--primary" type="submit">
                Enter Dashboard
              </button>
            </form>

            <p className="auth__foot">
              Need customer access? <Link to="/login">Go to Login</Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
