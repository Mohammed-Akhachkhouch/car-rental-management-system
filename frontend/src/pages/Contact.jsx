import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Booking inquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please complete all required fields.");
      return;
    }
    setSent(true);
  }

  return (
    <>
      <Navbar />

      <section className="section contactPage">
        <div className="container">
          <div className="section__head">
            <div>
              <h1 className="section__title">Contact & Support</h1>
              <p className="section__sub">
                Need help with booking, extension, or fleet recommendations?
                Send us a message.
              </p>
            </div>
          </div>

          <div className="contactLayout">
            <aside className="contactInfo">
              <h3>Get in Touch</h3>
              <p>Our team is available every day to assist with reservations.</p>
              <ul>
                <li>
                  <strong>Phone:</strong> +212 6 00 00 00 00
                </li>
                <li>
                  <strong>Email:</strong> contact@chahidcar.ma
                </li>
                <li>
                  <strong>Office:</strong> Avenue Mohammed V, Agadir
                </li>
                <li>
                  <strong>Working Hours:</strong> 08:00 - 22:00
                </li>
              </ul>
              <div className="contactInfo__card">
                <h4>Emergency Roadside Help</h4>
                <p>Priority hotline available 24/7 for active reservations.</p>
              </div>
            </aside>

            <div className="contactFormWrap">
              {sent ? (
                <div className="bookingSuccess">
                  <h2>Message sent successfully</h2>
                  <p>
                    Our support team will contact you shortly on {form.email}.
                  </p>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => setSent(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contactForm" onSubmit={onSubmit}>
                  <div className="field">
                    <label>Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="field">
                    <label>Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => updateField("subject", e.target.value)}
                    >
                      <option>Booking inquiry</option>
                      <option>Change reservation</option>
                      <option>Fleet availability</option>
                      <option>Payment question</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Message</label>
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Describe your request..."
                    />
                  </div>
                  <button className="btn btn--primary" type="submit">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
