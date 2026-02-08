const stats = [
  { value: "80+", label: "Vehicles in Fleet" },
  { value: "98%", label: "On-Time Delivery" },
  { value: "4.9/5", label: "Average Review" },
  { value: "24/7", label: "Customer Support" },
];

export default function StatsStrip() {
  return (
    <section className="statsStrip">
      <div className="container statsStrip__grid">
        {stats.map((stat) => (
          <article key={stat.label} className="statsStrip__item">
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
