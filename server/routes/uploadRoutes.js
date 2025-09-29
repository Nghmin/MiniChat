// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const router = express.Router();

// // Tạo thư mục uploads nếu chưa tồn tại
// const dir = "./uploads";
// if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
// }

// // Cấu hình multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // Nếu file là default-avatar thì không cần lưu
//         if (file.originalname === "default-avatar.png") {
//             return cb(null, false); // skip lưu
//         }
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         if (file.originalname === "default-avatar.png") {
//             return cb(null, file.originalname); // vẫn giữ tên
//         }
//         const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//         cb(null, uniqueSuffix + path.extname(file.originalname));
//     },
// });

// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.originalname === "default-avatar.png") {
//             return cb(null, true);
//         }
        
//         // Cho phép cả ảnh, video và file
//         const imageTypes = /jpeg|jpg|png|gif|webp/;
//         const videoTypes = /mp4|avi|mov|wmv|flv|webm/;
//         const fileTypes = /pdf|doc|docx|txt|xlsx|zip|rar/;
        
//         const extname = path.extname(file.originalname).toLowerCase();
//         const isImage = imageTypes.test(extname) && imageTypes.test(file.mimetype);
//         const isVideo = videoTypes.test(extname) && file.mimetype.startsWith('video/');
//         const isFile = fileTypes.test(extname);
        
//         if (isImage || isVideo || isFile) {
//             return cb(null, true);
//         }
        
//         cb(new Error("File type not allowed!"));
//     },
//     limits: { fileSize: 50 * 1024 * 1024 }, // Tăng lên 50MB cho video
// });

// // API upload file
// router.post("/upload-file", upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "Không có file" });
//     }
//     const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
//     console.log("✅ File đã upload:", fileUrl);
//     res.json({ url: fileUrl });
// });

// // API upload video
// router.post("/upload-video", upload.single('video'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "Không có video" });
//     }
//     const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
//     console.log("✅ Video đã upload:", fileUrl);
//     res.json({ url: fileUrl });
// });

// // API copy avatar
// router.get("/upload-avatar", (req, res) => {
//     const sourceFile = path.join(__dirname, "../avatar.png");
//     if (!fs.existsSync(sourceFile)) {
//         return res.status(404).json({ error: "Không tìm thấy avatar.png" });
//     }
    
//     const fileName = Date.now() + "-avatar.png";
//     const destFile = path.join("uploads", fileName);
//     fs.copyFileSync(sourceFile, destFile);
    
//     const fileUrl = `http://localhost:5000/uploads/${fileName}`;
//     console.log("✅ Avatar đã copy:", fileUrl);
//     res.json({ url: fileUrl });
// });

// // Error handler cho multer
// router.use((error, req, res, next) => {
//     if (error instanceof multer.MulterError) {
//         if (error.code === 'LIMIT_FILE_SIZE') {
//             return res.status(400).json({ error: 'File quá lớn (max 50MB)' });
//         }
//     }
//     if (error.message) {
//         return res.status(400).json({ error: error.message });
//     }
//     next(error);
// });

// module.exports = router;










const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();

// Tạo thư mục uploads nếu chưa tồn tại
const dir = "./uploads";
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// Cấu hình multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const imageTypes = /jpeg|jpg|png|gif|webp/;
        const videoTypes = /mp4|avi|mov|wmv|flv|webm/;
        const fileTypes = /pdf|doc|docx|txt|xlsx|zip|rar/;
        const extname = path.extname(file.originalname).toLowerCase();
        const isImage = imageTypes.test(extname) && imageTypes.test(file.mimetype);
        const isVideo = videoTypes.test(extname) && file.mimetype.startsWith('video/');
        const isFile = fileTypes.test(extname);

        if (isImage || isVideo || isFile) {
            return cb(null, true);
        }
        
        cb(new Error("File type not allowed!"));
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn 10MB cho ảnh/video
});

// API upload file (ảnh hoặc file khác)
router.post("/upload-file", upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Không có file" });
    }
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    console.log("✅ File đã upload:", fileUrl);
    res.json({ url: fileUrl });
});

// API upload video
router.post("/upload-video", upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Không có video" });
    }
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    console.log("✅ Video đã upload:", fileUrl);
    res.json({ url: fileUrl });
});

// Error handler cho multer
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File quá lớn (max 10MB)' });
        }
    }
    if (error.message) {
        return res.status(400).json({ error: error.message });
    }
    next(error);
});

module.exports = router;