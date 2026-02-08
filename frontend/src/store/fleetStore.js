import { cars } from "../data/cars";

const FLEET_KEY = "fleet_state";

function getDefaultFleetState() {
  return cars.reduce((acc, car) => {
    acc[car.id] = {
      available: car.available !== false,
      pricePerDay: car.pricePerDay,
    };
    return acc;
  }, {});
}

export function getFleetState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(FLEET_KEY));
    if (parsed && typeof parsed === "object") {
      return { ...getDefaultFleetState(), ...parsed };
    }
  } catch {
    return getDefaultFleetState();
  }

  return getDefaultFleetState();
}

export function getFleetCars() {
  const state = getFleetState();

  return cars.map((car) => ({
    ...car,
    available: state[car.id]?.available ?? car.available !== false,
    pricePerDay: state[car.id]?.pricePerDay ?? car.pricePerDay,
  }));
}

export function updateFleetCar(carId, patch) {
  const state = getFleetState();
  state[carId] = {
    ...state[carId],
    ...patch,
  };
  localStorage.setItem(FLEET_KEY, JSON.stringify(state));
  return state[carId];
}
