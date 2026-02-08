import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getFleetCars } from "../store/fleetStore";
import { addReservation } from "../store/reservationStore";

function getDays(pickupDate, returnDate) {
  if (!pickupDate || !returnDate) return 1;
  const pickup = new Date(pickupDate);
  const dropoff = new Date(returnDate);
  const diff = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
}

export default function Booking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const car = getFleetCars().find((item) => String(item.id) === String(id));

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    pickupLocation: searchParams.get("location") || car?.location || "Agadir",
    dropoffLocation: searchParams.get("location") || car?.location || "Agadir",
    pickupDate: searchParams.get("pickup") || "",
    returnDate: searchParams.get("dropoff") || "",
    pickupTime: "10:00",
    notes: "",
  });

  const [extras, setExtras] = useState({
    fullInsurance: true,
    gps: false,
    childSeat: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const pricing = useMemo(() => {
    const days = getDays(form.pickupDate, form.returnDate);
    const base = days * Number(car?.pricePerDay || 0);
    const extrasCost =
      (extras.fullInsurance ? 18 * days : 0) +
      (extras.gps ? 6 * days : 0) +
      (extras.childSeat ? 5 * days : 0);
    return {
      days,
      base,
      extrasCost,
      total: base + extrasCost,
    };
  }, [car?.pricePerDay, form.pickupDate, form.returnDate, extras]);

  if (!car) {
    return (
      <>
        <Navbar />
        <section className="section">
          <div className="container">
            <h1 className="section__title">Vehicle not found</h1>
            <p className="section__sub">Please choose another car from inventory.</p>
            <Link className="btn btn--primary" to="/cars">
              Back to Cars
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateExtra(key) {
    setExtras((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function onSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.fullName || !form.email || !form.phone) {
      setError("Please complete contact details before confirming reservation.");
      return;
    }
    if (!form.pickupDate || !form.returnDate) {
      setError("Please select pickup and return dates.");
      return;
    }
    if (new Date(form.returnDate) < new Date(form.pickupDate)) {
      setError("Return date must be after pickup date.");
      return;
    }

    const reservationId = `RES-${Date.now().toString().slice(-6)}`;
    const payload = {
      id: reservationId,
      carId: car.id,
      carName: car.name,
      customerName: form.fullName,
      email: form.email,
      phone: form.phone,
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      pickupLocation: form.pickupLocation,
      dropoffLocation: form.dropoffLocation,
      days: pricing.days,
      total: pricing.total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    addReservation(payload);
    setSuccess(payload);
  }

  return (
    <>
      <Navbar />

      <section className="section bookingPage">
        <div className="container">
          <div className="section__head">
            <div>
              <h1 className="section__title">Reservation Checkout</h1>
              <p className="section__sub">
                Complete your booking securely with instant reservation summary.
              </p>
            </div>
          </div>

          {success ? (
            <div className="bookingSuccess">
              <h2>Reservation confirmed</h2>
              <p>Your booking reference is:</p>
              <strong>{success.id}</strong>
              <p>
                {success.carName} • {success.pickupDate} to {success.returnDate}
              </p>
              <div className="bookingSuccess__actions">
                <Link className="btn btn--primary" to="/cars">
                  Reserve Another Car
                </Link>
                <Link className="btn btn--ghost" to="/admin/dashboard">
                  View in Admin Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="bookingLayout">
              <form className="bookingForm" onSubmit={onSubmit}>
                <div className="bookingForm__section">
                  <h3>Customer Details</h3>
                  <div className="field">
                    <label>Full Name</label>
                    <input
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="field">
                    <label>Phone Number</label>
                    <input
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+212 ..."
                    />
                  </div>
                </div>

                <div className="bookingForm__section">
                  <h3>Trip Details</h3>
                  <div className="bookingForm__grid">
                    <div className="field">
                      <label>Pickup Location</label>
                      <input
                        value={form.pickupLocation}
                        onChange={(e) =>
                          updateField("pickupLocation", e.target.value)
                        }
                      />
                    </div>
                    <div className="field">
                      <label>Return Location</label>
                      <input
                        value={form.dropoffLocation}
                        onChange={(e) =>
                          updateField("dropoffLocation", e.target.value)
                        }
                      />
                    </div>
                    <div className="field">
                      <label>Pickup Date</label>
                      <input
                        type="date"
                        value={form.pickupDate}
                        onChange={(e) => updateField("pickupDate", e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Return Date</label>
                      <input
                        type="date"
                        value={form.returnDate}
                        onChange={(e) => updateField("returnDate", e.target.value)}
                      />
                    </div>
                    <div className="field">
                      <label>Pickup Time</label>
                      <input
                        type="time"
                        value={form.pickupTime}
                        onChange={(e) => updateField("pickupTime", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="bookingForm__section">
                  <h3>Add-Ons</h3>
                  <label className="checkRow">
                    <input
                      type="checkbox"
                      checked={extras.fullInsurance}
                      onChange={() => updateExtra("fullInsurance")}
                    />
                    Full Insurance (+$18/day)
                  </label>
                  <label className="checkRow">
                    <input
                      type="checkbox"
                      checked={extras.gps}
                      onChange={() => updateExtra("gps")}
                    />
                    GPS Navigation (+$6/day)
                  </label>
                  <label className="checkRow">
                    <input
                      type="checkbox"
                      checked={extras.childSeat}
                      onChange={() => updateExtra("childSeat")}
                    />
                    Child Seat (+$5/day)
                  </label>
                </div>

                <div className="bookingForm__section">
                  <h3>Additional Notes</h3>
                  <div className="field">
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      placeholder="Flight details, special requests..."
                    />
                  </div>
                </div>

                {error ? <div className="auth__error">{error}</div> : null}

                <button className="btn btn--primary" type="submit">
                  Confirm Reservation
                </button>
              </form>

              <aside className="bookingSummary">
                <h3>Reservation Summary</h3>
                <img src={car.image} alt={car.name} className="bookingSummary__img" />
                <h4>{car.name}</h4>
                <p>
                  {car.type} • {car.transmission} • {car.seats} seats
                </p>
                <ul>
                  <li>
                    <span>Duration</span>
                    <strong>{pricing.days} day(s)</strong>
                  </li>
                  <li>
                    <span>Base Price</span>
                    <strong>${pricing.base}</strong>
                  </li>
                  <li>
                    <span>Add-Ons</span>
                    <strong>${pricing.extrasCost}</strong>
                  </li>
                  <li className="bookingSummary__total">
                    <span>Total</span>
                    <strong>${pricing.total}</strong>
                  </li>
                </ul>
                <Link className="btn btn--ghost" to={`/cars/${car.id}`}>
                  Review Car Specs
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
