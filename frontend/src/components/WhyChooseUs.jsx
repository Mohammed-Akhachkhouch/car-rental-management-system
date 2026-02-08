const items = [
  {
    title: "Best Price Guarantee",
    desc: "Transparent daily rates with no hidden fees or surprise checkout costs.",
  },
  {
    title: "Verified Fleet",
    desc: "Every vehicle is inspected before handover and maintained on schedule.",
  },
  {
    title: "Flexible Pickup & Return",
    desc: "Multiple locations in Agadir region with quick handover procedures.",
  },
  {
    title: "24/7 Assistance",
    desc: "Fast support for booking changes, roadside help, and trip updates.",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="offers" className="section muted">
      <div className="container">
        <h2 className="section__title center">Why Choose CHAHID CAR?</h2>
        <p className="section__sub center">
          Reliable booking flow, clean vehicles, and support that stays with
          you from reservation to return.
        </p>

        <div className="grid4">
          {items.map((item) => (
            <article key={item.title} className="feature">
              <h3 className="feature__title">{item.title}</h3>
              <p className="feature__desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
