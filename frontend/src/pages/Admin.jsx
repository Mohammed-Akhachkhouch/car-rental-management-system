import { Link, useNavigate } from "react-router-dom";
import { clearAuth } from "../store/authStore";
import { getFleetCars } from "../store/fleetStore";
import { getReservationSummary, getReservations } from "../store/reservationStore";

function formatMoney(value) {
  return `$${Number(value || 0).toLocaleString()}`;
}

export default function Admin() {
  const nav = useNavigate();
  const reservations = getReservations();
  const summary = getReservationSummary();
  const fleetCars = getFleetCars();

  const availableCars = fleetCars.filter((car) => car.available).length;
  const averageDailyPrice =
    fleetCars.reduce((acc, car) => acc + Number(car.pricePerDay), 0) /
    Math.max(fleetCars.length, 1);

  function onLogout() {
    clearAuth();
    nav("/admin/login");
  }

  return (
    <section className="adminPage">
      <div className="adminTop">
        <div>
          <h1>Admin Overview Dashboard</h1>
          <p>Track reservations, revenue, and fleet availability in one place.</p>
        </div>
        <div className="adminTop__actions">
          <Link className="btn btn--ghost" to="/admin/fleet">
            Fleet Management
          </Link>
          <Link className="btn btn--ghost" to="/">
            Public Site
          </Link>
          <button className="btn btn--primary" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="adminStats">
        <article className="adminStatCard">
          <span>Total Bookings</span>
          <strong>{summary.totalBookings}</strong>
        </article>
        <article className="adminStatCard">
          <span>Total Revenue</span>
          <strong>{formatMoney(summary.totalRevenue)}</strong>
        </article>
        <article className="adminStatCard">
          <span>Pending Bookings</span>
          <strong>{summary.pendingBookings}</strong>
        </article>
        <article className="adminStatCard">
          <span>Available Cars</span>
          <strong>
            {availableCars}/{fleetCars.length}
          </strong>
        </article>
        <article className="adminStatCard">
          <span>Average Daily Price</span>
          <strong>{formatMoney(averageDailyPrice.toFixed(0))}</strong>
        </article>
      </div>

      <div className="adminPanel">
        <h2>Recent Reservations</h2>
        {reservations.length ? (
          <div className="tableWrap">
            <table className="adminTable">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Customer</th>
                  <th>Car</th>
                  <th>Dates</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.slice(0, 8).map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.customerName}</td>
                    <td>{reservation.carName}</td>
                    <td>
                      {reservation.pickupDate} → {reservation.returnDate}
                    </td>
                    <td>{formatMoney(reservation.total)}</td>
                    <td>
                      <span className="pill">{reservation.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="emptyState">
            <h3>No reservations yet</h3>
            <p>
              Once customers complete checkout, reservations will appear here
              automatically.
            </p>
            <Link to="/cars" className="btn btn--primary">
              Open Inventory
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
