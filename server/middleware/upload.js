const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Tạo thư mục uploads nếu chưa tồn tại
const dir = "./uploads";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Cấu hình multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Nếu file là default-avatar thì không cần lưu
    if (file.originalname === "default-avatar.png") {
      return cb(null, false); // skip lưu
    }
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    if (file.originalname === "default-avatar.png") {
      return cb(null, file.originalname); // vẫn giữ tên
    }
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.originalname === "default-avatar.png") {
      // Cho phép file default-avatar đi qua, nhưng không lưu
      return cb(null, true);
    }

    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpg, png, gif, webp) are allowed!"));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Giới hạn 5MB
});

module.exports = upload;
