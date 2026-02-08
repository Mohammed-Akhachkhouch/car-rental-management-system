import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";
import { getFleetCars } from "../store/fleetStore";

const defaultFilters = {
  query: "",
  location: "",
  type: "All Types",
  transmission: "All",
  availability: "All",
  maxPrice: 200,
  sortBy: "recommended",
};

export default function Cars() {
  const [searchParams] = useSearchParams();
  const fleetCars = getFleetCars();

  const [filters, setFilters] = useState({
    ...defaultFilters,
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "All Types",
  });

  const types = useMemo(() => {
    return ["All Types", ...new Set(fleetCars.map((car) => car.type))];
  }, [fleetCars]);

  const filteredCars = useMemo(() => {
    let items = [...fleetCars];

    if (filters.query) {
      const normalized = filters.query.toLowerCase();
      items = items.filter((car) => car.name.toLowerCase().includes(normalized));
    }

    if (filters.location) {
      const normalized = filters.location.toLowerCase();
      items = items.filter((car) =>
        car.location.toLowerCase().includes(normalized)
      );
    }

    if (filters.type !== "All Types") {
      items = items.filter((car) => car.type === filters.type);
    }

    if (filters.transmission !== "All") {
      items = items.filter((car) => car.transmission === filters.transmission);
    }

    if (filters.availability !== "All") {
      const needed = filters.availability === "Available";
      items = items.filter((car) => car.available === needed);
    }

    items = items.filter((car) => Number(car.pricePerDay) <= Number(filters.maxPrice));

    if (filters.sortBy === "price-asc") {
      items.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (filters.sortBy === "price-desc") {
      items.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (filters.sortBy === "rating-desc") {
      items.sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [fleetCars, filters]);

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(defaultFilters);
  }

  return (
    <>
      <Navbar />

      <section className="section carsPage">
        <div className="container">
          <div className="section__head">
            <div>
              <h1 className="section__title">Car Inventory Listing</h1>
              <p className="section__sub">
                Explore and filter available vehicles to match your exact trip.
              </p>
            </div>
          </div>

          <div className="carsLayout">
            <aside className="filtersPanel">
              <h3>Filter Fleet</h3>
              <div className="field">
                <label>Search by Model</label>
                <input
                  value={filters.query}
                  onChange={(e) => updateFilter("query", e.target.value)}
                  placeholder="BMW, Tesla..."
                />
              </div>

              <div className="field">
                <label>Location</label>
                <input
                  value={filters.location}
                  onChange={(e) => updateFilter("location", e.target.value)}
                  placeholder="Agadir"
                />
              </div>

              <div className="field">
                <label>Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => updateFilter("type", e.target.value)}
                >
                  {types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Transmission</label>
                <select
                  value={filters.transmission}
                  onChange={(e) => updateFilter("transmission", e.target.value)}
                >
                  <option>All</option>
                  <option>Auto</option>
                  <option>Manual</option>
                </select>
              </div>

              <div className="field">
                <label>Availability</label>
                <select
                  value={filters.availability}
                  onChange={(e) => updateFilter("availability", e.target.value)}
                >
                  <option>All</option>
                  <option>Available</option>
                  <option>Unavailable</option>
                </select>
              </div>

              <div className="field">
                <label>Max Price / Day (${filters.maxPrice})</label>
                <input
                  type="range"
                  min={40}
                  max={220}
                  value={filters.maxPrice}
                  onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
                />
              </div>

              <div className="field">
                <label>Sort by</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter("sortBy", e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Rating: High to Low</option>
                </select>
              </div>

              <button type="button" className="btn btn--ghost" onClick={resetFilters}>
                Reset Filters
              </button>
            </aside>

            <div className="carsResults">
              <p className="carsResults__count">
                {filteredCars.length} car{filteredCars.length !== 1 ? "s" : ""} found
              </p>

              {filteredCars.length ? (
                <div className="grid3">
                  {filteredCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="emptyState">
                  <h3>No cars match these filters</h3>
                  <p>Try resetting the filter panel or increasing the max price.</p>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={resetFilters}
                  >
                    Reset and Show All
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
