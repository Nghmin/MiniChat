const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// API copy avatar.png sang uploads/ và trả link
app.get("/upload-avatar", (req, res) => {
  const sourceFile = path.join(__dirname, "avatar.png");
  if (!fs.existsSync(sourceFile)) {
    return res.status(404).json({ error: "Không tìm thấy avatar.png trong thư mục" });
  }

  const fileName = Date.now() + "-avatar.png";
  const destFile = path.join(uploadDir, fileName);

  fs.copyFileSync(sourceFile, destFile);

  const fileUrl = `http://localhost:${PORT}/uploads/${fileName}`;
  console.log("✅ Ảnh đã copy:", fileUrl);

  // Trả về JSON
  res.json({ url: fileUrl });
});

// Cho phép truy cập trực tiếp thư mục uploads
app.use("/uploads", express.static(uploadDir));

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
  console.log(`👉 Gọi thử: http://localhost:${PORT}/upload-avatar`);
});


