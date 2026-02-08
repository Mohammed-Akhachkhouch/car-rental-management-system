const steps = [
  {
    title: "Search & Compare",
    desc: "Choose location, dates, and vehicle type to see available options.",
  },
  {
    title: "Reserve in Minutes",
    desc: "Confirm your car details and complete reservation in a guided checkout.",
  },
  {
    title: "Pick Up & Drive",
    desc: "Collect your car with verified condition report and enjoy your trip.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <div className="container">
        <div className="section__head section__head--center">
          <div>
            <h2 className="section__title">Simple 3-Step Reservation</h2>
            <p className="section__sub">
              The same system, now smoother from search to final pickup.
            </p>
          </div>
        </div>

        <div className="steps">
          {steps.map((step, index) => (
            <article key={step.title} className="stepCard">
              <span className="stepCard__index">0{index + 1}</span>
              <h3 className="stepCard__title">{step.title}</h3>
              <p className="stepCard__desc">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
