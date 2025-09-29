const fsx = require("fs").promises;
const fs = require("fs");
const path = require("path");

// Lấy danh sách chat theo userId
const chatList = (req, res) => {
  const { userId } = req.body; // nhận từ client

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const filePath = path.join(__dirname, "../models/chatList.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const chats = JSON.parse(rawData);

    // Lọc các chat mà user tham gia
    const userChats = chats.filter(chat => chat.members.includes(userId));

    return res.status(200).json(userChats);
  } catch (error) {
    console.error("Error reading chatList.json:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const message = async (req, res) => {
  const { friendId } = req.body; // Lấy friendId từ req.body

  // Kiểm tra nếu friendId không tồn tại
  if (!friendId) {
    return res.status(400).json({ error: "friendId is required" });
  }

  try {
    // Đường dẫn tới file message.json
    const filePath = path.join(__dirname, "../models/message.json");

    // Đọc file JSON
    const data = await fsx.readFile(filePath, "utf8");
    const messages = JSON.parse(data); // Parse dữ liệu JSON

    // Kiểm tra xem messages có phải là mảng không
    if (!Array.isArray(messages)) {
      return res.status(500).json({ error: "Invalid message data format" });
    }

    // Lọc các tin nhắn có sender hoặc recipient khớp với friendId
    let filteredMessages = messages.filter(
      (msg) => msg.conversation_id === friendId);

    // Nếu không tìm thấy tin nhắn nào
    if (filteredMessages.length === 0) {
      return res.status(404).json({ message: `No messages found for friendId: ${friendId}` });
    }

    // Sắp xếp tin nhắn theo timestamp (tăng dần)
    filteredMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Ánh xạ dữ liệu sang định dạng phù hợp với frontend
    
    // Trả về danh sách tin nhắn khớp
    return res.status(200).json(filteredMessages);
  } catch (error) {
    // Xử lý lỗi khi đọc file hoặc parse JSON
    console.error("Error reading messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const messages = async (req, res) => {
  const { conversationId, sender, recipient, content, message_type, url } = req.body;

  if (!conversationId) {
    return res.status(400).json({ error: "conversationId is required" });
  }

  try {
    const filePath = path.join(__dirname, "../models/message.json");

    // Đọc dữ liệu cũ
    let messages = [];
    try {
      const data = await fsx.readFile(filePath, "utf8");
      messages = JSON.parse(data || "[]");
    } catch (err) {
      console.warn("⚠️ message.json chưa tồn tại hoặc rỗng, sẽ tạo mới.");
    }

    // Nếu có content (nghĩa là client gửi tin nhắn mới) thì thêm vào file
    if (content) {
      const newMessage = {
        id: Date.now().toString(), // id tạm
        conversation_id: conversationId,
        sender,
        recipient,
        content,
        message_type: message_type || "text",
        timestamp: new Date().toISOString(),
        url: url || null, // Lưu url nếu có, nếu không thì để null
      };

      messages.push(newMessage);

      // Lưu lại vào file JSON
      await fsx.writeFile(filePath, JSON.stringify(messages, null, 2), "utf8");
      console.log("✅ Tin nhắn mới đã được lưu:", newMessage);
    }

    // Lọc tin nhắn theo conversationId
    const filteredMessages = messages.filter(
      (msg) => msg.conversation_id === conversationId
    );

    // Trả về danh sách tin nhắn
    return res.status(200).json(filteredMessages);
  } catch (error) {
    console.error("Error handling messages:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { chatList, message, messages };
