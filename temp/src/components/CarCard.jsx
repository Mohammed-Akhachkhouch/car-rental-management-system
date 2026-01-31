export default function CarCard({ car }) {
  return (
    <article className="card">
      <img className="card__img" src={car.image} alt={car.name} />
      <div className="card__body">
        <div className="card__top">
          <h3 className="card__title">{car.name}</h3>
          <span className="pill">{car.type}</span>
        </div>

        <div className="card__meta">
          <span>{car.seats} seats</span>
          <span>•</span>
          <span>{car.transmission}</span>
        </div>

        <div className="card__bottom">
          <div className="price">
            <span className="price__value">${car.pricePerDay}</span>
            <span className="price__unit">/ day</span>
          </div>

          <button className="btn btn--primary btn--sm">Rent Now</button>
        </div>
      </div>
    </article>
  );
}
