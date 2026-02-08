import { Link } from "react-router-dom";
import CarCard from "./CarCard";
import { cars } from "../data/cars";

export default function FeaturedCars() {
  const featured = cars.slice(0, 6);

  return (
    <section id="cars" className="section">
      <div className="container">
        <div className="section__head">
          <div>
            <h2 className="section__title">Featured Fleet</h2>
            <p className="section__sub">
              Carefully selected vehicles with high availability and top
              customer ratings.
            </p>
          </div>
          <Link className="link" to="/cars">
            View Full Inventory
          </Link>
        </div>

        <div className="grid3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
