import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

function tomorrowISO() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toISOString().split("T")[0];
}

export default function SearchBar() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    location: "Agadir",
    pickup: todayISO(),
    dropoff: tomorrowISO(),
    type: "All Types",
  });

  const minDropoff = useMemo(() => {
    return form.pickup || todayISO();
  }, [form.pickup]);

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onSubmit(e) {
    e.preventDefault();

    if (!form.location || !form.pickup || !form.dropoff) {
      alert("Please fill location, pickup date and return date.");
      return;
    }

    if (new Date(form.dropoff) < new Date(form.pickup)) {
      alert("Return date must be after pickup date.");
      return;
    }

    const params = new URLSearchParams({
      location: form.location,
      pickup: form.pickup,
      dropoff: form.dropoff,
      type: form.type,
    });
    nav(`/cars?${params.toString()}`);
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
              min={todayISO()}
            />
          </div>

          <div className="field">
            <label>Return Date</label>
            <input
              type="date"
              value={form.dropoff}
              onChange={(e) => update("dropoff", e.target.value)}
              min={minDropoff}
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
              <option>Hatchback</option>
              <option>Compact</option>
            </select>
          </div>

          <button className="btn btn--primary search__btn" type="submit">
            Check Availability
          </button>
        </form>
      </div>
    </section>
  );
}
