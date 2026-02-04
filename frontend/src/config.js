export const API_BASE_URL =
  typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? "https://uk-living-app.onrender.com"
    : "http://localhost:5000";
