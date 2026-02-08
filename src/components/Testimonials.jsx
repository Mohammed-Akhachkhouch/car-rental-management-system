const testimonials = [
  {
    name: "Yassine B.",
    role: "Business Traveler",
    text: "Clean car, fast handover, and very clear pricing. The booking steps were easy and professional.",
  },
  {
    name: "Sara M.",
    role: "Family Trip",
    text: "We booked an SUV in less than five minutes. Support answered quickly when we requested a date change.",
  },
  {
    name: "Karim A.",
    role: "Tourist",
    text: "Great service from airport pickup until return. I appreciated how smooth the reservation flow was.",
  },
];

export default function Testimonials() {
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="section__head section__head--center">
          <div>
            <h2 className="section__title">What Clients Say</h2>
            <p className="section__sub">
              Trusted by local and international customers.
            </p>
          </div>
        </div>

        <div className="grid3">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonialCard">
              <p className="testimonialCard__text">"{item.text}"</p>
              <p className="testimonialCard__name">{item.name}</p>
              <p className="testimonialCard__role">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
