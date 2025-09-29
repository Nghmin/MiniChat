// // const express = require("express");
// // const cors = require("cors");
// // const { Server } = require("socket.io");
// // const http = require("http");
// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // app.use("/uploads", express.static("uploads"));
// // app.use("/", require("./routes/uploadRoutes")); // Thêm dòng này
// // app.use("/api/auth", require("./routes/authRoutes"));
// // app.use("/api/chat", require("./routes/chatRoutes"));

// // app.get("/", (req, res) => {
// //   res.send("Server is running");
// // });

// // const server = http.createServer(app);

// // const io = new Server(server, {
// //   cors: {
// //     origin: "*", // Thay đổi nếu cần
// //   },
// // });

// // const userSockets = new Map();

// // io.on("connection", (socket) => {
// //   const userId = socket.handshake.query.userId;

// //   console.log("✅ Client kết nối:");
// //   console.log("🔑 userId (từ client):", userId);
// //   console.log("🆔 socket.id (mặc định):", socket.id);

// //   // lưu map userId -> socket
// //   if (userId) {
// //     userSockets.set(userId, socket);
// //   }

// //   // thử gửi chào mừng lại client
// //   socket.emit("welcome", { msg: `Xin chào user ${userId}` });

// //   // xử lý disconnect
// //   socket.on("disconnect", () => {
// //     userSockets.delete(userId);
// //     console.log("❌ Client ngắt:", userId);
// //   });
// // });


// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });


const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
app.use("/", require("./routes/uploadRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

// tạo http server
const server = http.createServer(app);

// gắn socket.io vào http server
const io = new Server(server, {
  cors: {
    origin: "*", // thay đổi nếu cần
  },
});

// map userId -> socket
const userSockets = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSockets.set(userId, socket);
    console.log(`🔗 ${userId} <-> ${socket.id}`);
  }

  socket.on("video-offer", ({ toUserId, offer }) => {
  const targetSocket = userSockets.get(toUserId);
  if (targetSocket) {
    targetSocket.emit("video-offer", { from: userId, offer });
  }
});
  // Nhận tin nhắn từ client A và gửi cho client B
  socket.on("sendMessage", ({ toUserId, message }) => {
    console.log(`📨 ${userId} -> ${toUserId}: ${message}`);

    const targetSocket = userSockets.get(toUserId);
    if (targetSocket) {
      targetSocket.emit("receiveMessage", {
        from: userId,
        message,
      });
    } else {
      console.log(`⚠️ User ${toUserId} không online`);
    }
  });

  socket.on("disconnect", () => {
    userSockets.delete(userId);
    console.log("❌ Client ngắt:", userId);
  });
  // Nhận phản hồi từ người nhận cuộc gọi
socket.on("video-answer", ({ toUserId, answer }) => {
  const targetSocket = userSockets.get(toUserId);
  if (targetSocket) {
    targetSocket.emit("video-answer", { from: userId, answer });
  }
});

// Nhận ICE candidate để thiết lập kết nối P2P
socket.on("ice-candidate", ({ toUserId, candidate }) => {
  const targetSocket = userSockets.get(toUserId);
  if (targetSocket) {
    targetSocket.emit("ice-candidate", { from: userId, candidate });
  }
});

// (Tuỳ chọn) Kết thúc cuộc gọi
socket.on("end-call", ({ toUserId }) => {
  const targetSocket = userSockets.get(toUserId);
  if (targetSocket) {
    targetSocket.emit("end-call", { from: userId });
  }
});

});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
