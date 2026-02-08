const RESERVATIONS_KEY = "reservations";

export function getReservations() {
  try {
    const parsed = JSON.parse(localStorage.getItem(RESERVATIONS_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addReservation(reservation) {
  const current = getReservations();
  const next = [reservation, ...current];
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(next));
  return reservation;
}

export function getReservationSummary() {
  const reservations = getReservations();

  return reservations.reduce(
    (acc, reservation) => {
      acc.totalBookings += 1;
      acc.totalRevenue += Number(reservation.total || 0);
      if (reservation.status === "pending") {
        acc.pendingBookings += 1;
      }
      return acc;
    },
    { totalBookings: 0, totalRevenue: 0, pendingBookings: 0 }
  );
}
