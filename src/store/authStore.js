const KEY = "auth";

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
}

export function setAuth({ user, token }) {
  localStorage.setItem(KEY, JSON.stringify({ user, token }));
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}

export function isLoggedIn() {
  const { token } = getAuth();
  return Boolean(token);
}
