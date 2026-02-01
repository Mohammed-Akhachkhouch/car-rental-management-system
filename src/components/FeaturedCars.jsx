import CarCard from "./CarCard";
import { cars } from "../data/cars";

export default function FeaturedCars() {
  return (
    <section id="cars" className="section">
      <div className="container">
        <div className="section__head">
          <div>
            <h2 className="section__title">Featured Fleet</h2>
            <p className="section__sub">Hand-picked premium vehicles for you</p>
          </div>
          <a className="link" href="#cars">
            View All →
          </a>
        </div>

        <div className="grid3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
