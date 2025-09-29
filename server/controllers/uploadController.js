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
        
        // Mở rộng để hỗ trợ video và file
        const imageTypes = /jpeg|jpg|png|gif|webp/;
        const videoTypes = /mp4|avi|mov|wmv|flv|webm/;
        const fileTypes = /pdf|doc|docx|txt|xlsx|zip/;
        
        const extname = path.extname(file.originalname).toLowerCase();
        const isImage = imageTypes.test(extname);
        const isVideo = videoTypes.test(extname);
        const isFile = fileTypes.test(extname);
        
        if (isImage || isVideo || isFile) {
            return cb(null, true);
        }
        
        cb(new Error("File type not supported!"));
    },
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB cho video
});

module.exports = upload;