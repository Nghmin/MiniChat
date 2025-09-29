
const express = require("express");
const router = express.Router();
const { chatList, message, messages } = require("../controllers/chatController");

router.post("/chat-list", chatList);
router.post("/messages", message); 
router.post("/send-message", messages);

module.exports = router;