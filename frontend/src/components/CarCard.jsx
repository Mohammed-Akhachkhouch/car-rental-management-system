import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <article className="card">
      <Link className="card__media" to={`/cars/${car.id}`}>
        <img className="card__img" src={car.image} alt={car.name} />
      </Link>

      <div className="card__body">
        <div className="card__top">
          <h3 className="card__title">
            <Link className="card__link" to={`/cars/${car.id}`}>
              {car.name}
            </Link>
          </h3>
          <span className="pill">{car.type}</span>
        </div>

        <div className="card__meta">
          <span>{car.seats} seats</span>
          <span>•</span>
          <span>{car.transmission}</span>
          <span>•</span>
          <span>{car.fuel}</span>
        </div>

        <div className="card__meta">
          <span>{car.location}</span>
          <span>•</span>
          <span>{car.year}</span>
          <span>•</span>
          <span>★ {car.rating}</span>
        </div>

        <div className="card__bottom">
          <div className="price">
            <span className="price__value">${car.pricePerDay}</span>
            <span className="price__unit">/ day</span>
          </div>

          {car.available ? (
            <Link className="btn btn--primary btn--sm" to={`/booking/${car.id}`}>
              Book Now
            </Link>
          ) : (
            <span className="pill pill--warn">Unavailable</span>
          )}
        </div>
      </div>
    </article>
  );
}
