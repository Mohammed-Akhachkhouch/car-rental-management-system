import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getFleetCars, updateFleetCar } from "../store/fleetStore";

export default function FleetManagement() {
  const [cars, setCars] = useState(getFleetCars());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch =
        !search || car.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Available" && car.available) ||
        (statusFilter === "Unavailable" && !car.available);
      return matchesSearch && matchesStatus;
    });
  }, [cars, search, statusFilter]);

  function toggleAvailability(car) {
    updateFleetCar(car.id, { available: !car.available });
    setCars((prev) =>
      prev.map((item) =>
        item.id === car.id ? { ...item, available: !item.available } : item
      )
    );
  }

  function updatePrice(car, value) {
    const numeric = Number(value || 0);
    updateFleetCar(car.id, { pricePerDay: numeric });
    setCars((prev) =>
      prev.map((item) =>
        item.id === car.id ? { ...item, pricePerDay: numeric } : item
      )
    );
  }

  return (
    <section className="adminPage">
      <div className="adminTop">
        <div>
          <h1>Fleet Management</h1>
          <p>Control vehicle status and pricing for live availability.</p>
        </div>
        <div className="adminTop__actions">
          <Link className="btn btn--ghost" to="/admin/dashboard">
            Back to Dashboard
          </Link>
          <Link className="btn btn--primary" to="/cars">
            Open Inventory View
          </Link>
        </div>
      </div>

      <div className="adminFilters">
        <div className="field">
          <label>Search model</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tesla, BMW..."
          />
        </div>
        <div className="field">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Available</option>
            <option>Unavailable</option>
          </select>
        </div>
      </div>

      <div className="tableWrap">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Location</th>
              <th>Price / Day</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCars.map((car) => (
              <tr key={car.id}>
                <td className="adminCarCell">
                  <img src={car.image} alt={car.name} />
                  <div>
                    <strong>{car.name}</strong>
                    <span>
                      {car.seats} seats • {car.transmission}
                    </span>
                  </div>
                </td>
                <td>{car.type}</td>
                <td>{car.location}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    className="priceInput"
                    value={car.pricePerDay}
                    onChange={(e) => updatePrice(car, e.target.value)}
                  />
                </td>
                <td>
                  <span className={car.available ? "pill" : "pill pill--warn"}>
                    {car.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => toggleAvailability(car)}
                  >
                    {car.available ? "Set Unavailable" : "Set Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
