import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="cta">
      <div className="container cta__box">
        <h2 className="cta__title">Ready to Hit the Road?</h2>
        <p className="cta__desc">
          Reserve in less than 3 minutes and get instant booking confirmation.
        </p>

        <div className="cta__actions">
          <Link className="btn btn--light" to="/cars">
            Search Available Cars
          </Link>
          <Link className="btn btn--ghost-light" to="/contact">
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
