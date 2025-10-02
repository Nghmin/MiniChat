const rawUser = localStorage.getItem("user");
const user = rawUser ? JSON.parse(rawUser) : null;

export const socket = io("http://localhost:3000", {
  query: { userId: user?.id || "unknown" }
});