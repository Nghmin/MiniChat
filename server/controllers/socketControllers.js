const fs = require("fs").promises;
const path = require("path");

const messageFilePath = path.join(__dirname, "../models/message.json");
const chatListFilePath = path.join(__dirname, "../models/chatList.json");

const readMessages = async () => {
  try {
    const data = await fs.readFile(messageFilePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.warn("message.json chưa tồn tại, sẽ tạo mới.");
    await fs.writeFile(messageFilePath, JSON.stringify([], null, 2), "utf-8");
    return [];
  }
};

const writeMessages = async (messages) => {
  await fs.writeFile(messageFilePath, JSON.stringify(messages, null, 2), "utf-8");
};

const readChatList = async () => {
  try {
    const data = await fs.readFile(chatListFilePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.warn("chatList.json chưa tồn tại, sẽ tạo mới.");
    await fs.writeFile(chatListFilePath, JSON.stringify([], null, 2), "utf-8");
    return [];
  }
};

const writeChatList = async (chatList) => {
  await fs.writeFile(chatListFilePath, JSON.stringify(chatList, null, 2), "utf-8");
};

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("joinConversation", async (conversationId) => {
      try {
        socket.join(conversationId);
        const messages = await readMessages();
        const conversationMessages = messages.filter((msg) => msg.conversationId === conversationId);
        socket.emit("initialMessages", conversationMessages);
      } catch (err) {
        console.error("Error joining conversation:", err);
        socket.emit("error", "Lỗi khi tham gia cuộc trò chuyện");
      }
    });

    socket.on("sendMessage", async (messageData) => {
      try {
        const messages = await readMessages();
        const newMessage = {
          id: Date.now().toString(),
          ...messageData,
        };
        messages.push(newMessage);
        await writeMessages(messages);

        // Cập nhật chatList.json
        const chatList = await readChatList();
        const conversation = chatList.find((conv) => conv.id === messageData.conversationId);
        if (conversation) {
          conversation.last_message = {
            content: messageData.content,
            sender: messageData.sender,
            timestamp: messageData.timestamp,
            message_type: messageData.message_type,
          };
          conversation.updated_at = new Date().toISOString();
          await writeChatList(chatList);
        }

        io.to(messageData.conversationId).emit("newMessage", newMessage);
      } catch (err) {
        console.error("Error sending message:", err);
        socket.emit("error", "Lỗi khi gửi tin nhắn");
      }
    });

    socket.on("leaveConversation", (conversationId) => {
      socket.leave(conversationId);
      console.log(`Client ${socket.id} left conversation ${conversationId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
};

module.exports = initializeSocket;