import { Link } from "react-router-dom";

const quickStats = [
  { label: "Cars Available", value: "80+" },
  { label: "Happy Clients", value: "12k+" },
  { label: "Agency Rating", value: "4.9/5" },
];

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="badge">Premium Car Rental in Agadir Region</p>
          <h1 className="hero__title">
            Rent your perfect car with a faster and smoother booking flow
          </h1>
          <p className="hero__desc">
            CHAHID CAR helps you compare vehicles, confirm availability,
            finalize reservation details, and drive away in minutes.
          </p>

          <div className="hero__cta">
            <Link className="btn btn--primary" to="/cars">
              Browse Fleet
            </Link>
            <Link className="btn btn--ghost" to="/contact">
              Talk to Support
            </Link>
          </div>

          <div className="hero__stats">
            {quickStats.map((item) => (
              <div key={item.label} className="hero__statCard">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero__imageWrap">
          <img
            className="hero__image"
            alt="CHAHID CAR premium vehicle"
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=60"
          />
        </div>
      </div>
    </section>
  );
}
