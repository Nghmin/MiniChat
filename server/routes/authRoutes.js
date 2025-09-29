
const express = require("express");
const router = express.Router();
const { login, forgotPassword, resetPassword, register, logout, updateProFile } = require("../controllers/authController");
const { loginInput, forgotPasswordInput, resetPasswordInput, registerInput, verifyToken } = require("../middleware/authMiddleware");
const { uuidFunction, uuidFunction1, uuidFunction2 } = require("../controllers/userController");
const upload = require("../middleware/upload");

router.post("/login", loginInput, login);
router.post("/forgot-password", forgotPasswordInput, forgotPassword);
router.post("/reset-password", resetPasswordInput, resetPassword);
router.post("/register", registerInput, register);
router.post("/logout", logout);

router.get("/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Dashboard tạm thời",
    user: req.user
  });
});

router.post(
  "/update-profile",
  upload.single("avatar"),
  updateProFile
);

router.post("/leak-id", uuidFunction);
router.post("/leak-info", uuidFunction1);
router.post("/leak-info1", uuidFunction2);

module.exports = router;


