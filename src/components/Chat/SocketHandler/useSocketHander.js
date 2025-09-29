// hooks/useSocketHandler.js
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function useSocketHandler(friend, onUpdateChat, setMessages) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!friend?.sender) return;

    socketRef.current = io("http://localhost:5000", {
      query: { userId: friend.sender },
    });

    socketRef.current.on("receiveMessage", (data) => {
      console.log("Nhận tin nhắn qua Socket.IO:", data);
      
      const receivedMessage = {
        id: data.message.id || Date.now() + Math.random(),
        text: data.message.message_type === "text" && typeof data.message.content === "string" ? data.message.content : "",
        type: data.message.sender === friend.sender ? "sent" : "received",
        timestamp: new Date(data.message.timestamp),
        temporaryImage: data.message.message_type === "image" && data.message.base64Data ? data.message.base64Data : null,
        image: data.message.message_type === "image" && data.message.url ? `http://localhost:5000${data.message.url}` : null,
        temporaryVideo: data.message.message_type === "video" && data.message.base64Data ? data.message.base64Data : null,
        video: data.message.message_type === "video" && data.message.url ? `http://localhost:5000${data.message.url}` : null,
        file: data.message.message_type === "file" ? {
          name: data.message.content,
          url: data.message.url ? `http://localhost:5000${data.message.url}` : null,
        } : null,
        isTemporary: data.message.message_type === "file" ? false : !!data.message.base64Data,
      };

      if (data.message.conversation_id === friend.id) {
        setMessages((prev) => {
          const existingMessageIndex = prev.findIndex((msg) => msg.id === receivedMessage.id);
          if (existingMessageIndex !== -1) {
            const updatedMessages = [...prev];
            updatedMessages[existingMessageIndex] = {
              ...updatedMessages[existingMessageIndex],
              temporaryImage: receivedMessage.temporaryImage || updatedMessages[existingMessageIndex].temporaryImage,
              image: receivedMessage.image || updatedMessages[existingMessageIndex].image,
              temporaryVideo: receivedMessage.temporaryVideo || updatedMessages[existingMessageIndex].temporaryVideo,
              video: receivedMessage.video || updatedMessages[existingMessageIndex].video,
              file: receivedMessage.file || updatedMessages[existingMessageIndex].file,
              isTemporary: data.message.message_type === "file" ? false : false,
            };
            return updatedMessages;
          }
          if (!prev.length || receivedMessage.timestamp > prev[prev.length - 1].timestamp) {
            return [...prev, receivedMessage];
          }
          return prev;
        });
      }

      if (onUpdateChat) {
        console.log("Gọi onUpdateChat từ receiveMessage (global):", data.message.conversation_id, {
          content: receivedMessage.text || receivedMessage.file?.name || "Media",
          sender: data.message.sender,
          timestamp: data.message.timestamp,
          message_type: data.message.message_type,
        });
        onUpdateChat(data.message.conversation_id, {
          content: receivedMessage.text || receivedMessage.file?.name || "Media",
          sender: data.message.sender,
          timestamp: data.message.timestamp,
          message_type: data.message.message_type,
        });
      }
    });

    socketRef.current.on("updateMessage", (data) => {
      console.log("Cập nhật tin nhắn qua Socket.IO:", data);
      
      if (data.message.conversation_id === friend.id) {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === data.message.id) {
              return {
                ...msg,
                image: data.message.url && data.message.message_type === "image" ? `http://localhost:5000${data.message.url}` : msg.image,
                video: data.message.url && data.message.message_type === "video" ? `http://localhost:5000${data.message.url}` : msg.video,
                file: data.message.url && data.message.message_type === "file" ? {
                  name: msg.file?.name || data.message.content,
                  url: `http://localhost:5000${data.message.url}`,
                } : msg.file,
                isTemporary: false,
                uploading: false,
              };
            }
            return msg;
          })
        );
        
        if (onUpdateChat) {
          console.log("Gọi onUpdateChat từ updateMessage:", friend.id, {
            content: data.message.content || "Media",
            sender: friend.sender,
            timestamp: new Date().toISOString(),
            message_type: data.message.message_type,
          });
          onUpdateChat(friend.id, {
            content: data.message.content || "Media",
            sender: friend.sender,
            timestamp: new Date().toISOString(),
            message_type: data.message.message_type,
          });
        }
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("Ngắt kết nối Socket.IO trong Chat");
      }
    };
  }, [friend, onUpdateChat, setMessages]);

  useEffect(() => {
    if (socketRef.current && friend?.id) {
      socketRef.current.emit("joinChat", friend.id);
      console.log("Join chat room:", friend.id);
      
      return () => {
        if (socketRef.current && friend?.id) {
          socketRef.current.emit("leaveChat", friend.id);
          console.log("Leave chat room:", friend.id);
        }
      };
    }
  }, [friend?.id]);

  return { socketRef };
}

export default useSocketHandler;

