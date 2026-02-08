import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import { getFleetCars } from "../store/fleetStore";

export default function CarDetails() {
  const nav = useNavigate();
  const { id } = useParams();
  const cars = getFleetCars();
  const car = cars.find((item) => String(item.id) === String(id));

  if (!car) {
    return (
      <>
        <Navbar />
        <section className="section">
          <div className="container">
            <h1 className="section__title">Car not found</h1>
            <p className="section__sub">Please go back to the cars list.</p>
            <Link className="btn btn--primary" to="/cars">
              Back to Cars
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const similarCars = cars.filter((item) => item.id !== car.id).slice(0, 3);

  return (
    <>
      <Navbar />

      <section className="section">
        <div className="container details">
          <div className="details__media">
            <img className="details__img" src={car.image} alt={car.name} />
          </div>

          <div className="details__info">
            <Link className="link" to="/cars">
              Back to cars
            </Link>
            <h1 className="details__title">{car.name}</h1>
            <p className="details__meta">
              {car.type} • {car.year} • {car.seats} seats • {car.transmission}
            </p>

            <div className="details__price">
              <span className="price__value">${car.pricePerDay}</span>
              <span className="price__unit">/ day</span>
              <span className={car.available ? "pill" : "pill pill--warn"}>
                {car.available ? "Available" : "Unavailable"}
              </span>
            </div>

            <p className="details__desc">{car.description}</p>

            <ul className="specList">
              <li>Fuel: {car.fuel}</li>
              <li>Luggage: {car.luggage} bags</li>
              <li>Doors: {car.doors}</li>
              <li>Location: {car.location}</li>
              <li>Rating: {car.rating} / 5</li>
            </ul>

            <div className="chipList">
              {car.features.map((feature) => (
                <span key={feature} className="chip">
                  {feature}
                </span>
              ))}
            </div>

            <div className="details__actions">
              <button
                className="btn btn--primary"
                disabled={!car.available}
                onClick={() => nav(`/booking/${car.id}`)}
              >
                Reserve This Car
              </button>
              <Link className="btn btn--ghost" to="/contact">
                Ask About Availability
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section muted">
        <div className="container">
          <div className="section__head">
            <div>
              <h2 className="section__title">Similar Cars</h2>
              <p className="section__sub">You may also like these options.</p>
            </div>
            <Link to="/cars" className="link">
              View All Cars
            </Link>
          </div>
          <div className="grid3">
            {similarCars.map((item) => (
              <CarCard key={item.id} car={item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
