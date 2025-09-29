import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useMessagesHandler(friend) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async (before = null) => {
    if (!friend || !friend.id || !friend.sender) {
      setMessages([]);
      setLoading(false);
      setHasMore(false);
      return;
    }

    try {
      const payload = {
        friendId: friend.id,
        limit: 50,
      };
      if (before) {
        payload.before = before;
      }

      const response = await axios.post("http://localhost:5000/api/chat/messages/", payload);

      if (response.status === 200 && Array.isArray(response.data)) {
        const transformedMessages = response.data
          .map((msg) => ({
            id: msg.id,
            text: msg.message_type === "text" && typeof msg.content === "string" ? msg.content : "",
            type: msg.sender === friend.sender ? "sent" : "received",
            timestamp: new Date(msg.timestamp),
            image: msg.message_type === "image" ? `http://localhost:5000${msg.url}` : null,
            video: msg.message_type === "video" ? `http://localhost:5000${msg.url}` : null,
            file: msg.message_type === "file" ? { name: msg.content, url: `http://localhost:5000${msg.url}` } : null,
            isTemporary: false,
          }))
          .filter((msg) => msg.text || msg.image || msg.video || msg.file);

        setMessages((prev) => {
          if (before) {
            return [...transformedMessages, ...prev].filter((msg, index, self) =>
              index === self.findIndex((m) => m.id === msg.id)
            );
          } else {
            localStorage.removeItem('lastMessageId');
            return transformedMessages;
          }
        });

        setHasMore(transformedMessages.length === 50);
      } else {
        setError("Dữ liệu tin nhắn không hợp lệ.");
        setHasMore(false);
      }
    } catch (err) {
      setError("Lỗi khi tải tin nhắn: " + err.message);
      console.error("Lỗi khi lấy tin nhắn:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  }, [friend]);

  const loadMoreMessages = useCallback(() => {
    if (messages.length === 0) return;
    setIsLoadingMore(true);
    const firstMessage = messages[0];
    const before = firstMessage.timestamp.toISOString();
    fetchMessages(before);
  }, [messages, fetchMessages]);

  useEffect(() => {
    setLoading(true);
    setIsLoadingMore(false);
    setHasMore(true);
    setError(null);
    setMessages([]);
    fetchMessages(null);
  }, [friend, fetchMessages]);

  return {
    messages,
    setMessages,
    loading,
    isLoadingMore,
    hasMore,
    error,
    loadMoreMessages,
    fetchMessages
  };
}

export default useMessagesHandler;