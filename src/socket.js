import { io } from "socket.io-client";


const rawUser = localStorage.getItem("user");
const user = rawUser ? JSON.parse(rawUser) : null;

export const socket = user
  ? io("http://localhost:5000", {
      query: { userId: user.id }
    })
  : null;