import { useState } from "react";

export default function SearchBar() {
  const [form, setForm] = useState({
    location: "",
    pickup: "",
    dropoff: "",
    type: "All Types",
  });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("Search:", form);
    alert("Search submitted! Check console.");
  }

  return (
    <section className="search">
      <div className="container">
        <form className="search__box" onSubmit={onSubmit}>
          <div className="field">
            <label>Pickup Location</label>
            <input
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="e.g. Agadir, Taghazout..."
            />
          </div>

          <div className="field">
            <label>Pickup Date</label>
            <input
              type="date"
              value={form.pickup}
              onChange={(e) => update("pickup", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Return Date</label>
            <input
              type="date"
              value={form.dropoff}
              onChange={(e) => update("dropoff", e.target.value)}
            />
          </div>

          <div className="field">
            <label>Car Type</label>
            <select
              value={form.type}
              onChange={(e) => update("type", e.target.value)}
            >
              <option>All Types</option>
              <option>SUV</option>
              <option>Sedan</option>
              <option>Electric</option>
            </select>
          </div>

          <button className="btn btn--primary search__btn" type="submit">
            Search Cars
          </button>
        </form>
      </div>
    </section>
  );
}
