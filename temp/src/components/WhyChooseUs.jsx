export default function WhyChooseUs() {
  const items = [
    {
      title: "Best Price Guarantee",
      desc: "Transparent pricing with no hidden fees.",
    },
    {
      title: "Verified Fleet",
      desc: "Every car is checked and ready for your trip.",
    },
    {
      title: "24/7 Roadside Assist",
      desc: "Support whenever you need it, anywhere you go.",
    },
  ];

  return (
    <section className="section muted">
      <div className="container">
        <h2 className="section__title center">Why Choose DriveEase?</h2>
        <p className="section__sub center">
          We provide the best rental experience with comfort and safety.
        </p>

        <div className="grid3">
          {items.map((it) => (
            <div key={it.title} className="feature">
              <h3 className="feature__title">{it.title}</h3>
              <p className="feature__desc">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
