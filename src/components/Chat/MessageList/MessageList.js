// MessagesList/MessagesList.js
import React, { useRef, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./MessageList.module.scss";
import MessageContent from "../MessageContent/MessageContent";

const cx = classNames.bind(styles);

function MessagesList({ 
  messages, 
  loading, 
  error, 
  isLoadingMore, 
  hasMore, 
  onLoadMore, 
  onImagePreview 
}) {
  const messagesContainerRef = useRef(null);

  const formatTime = (dateObj) => {
    return dateObj.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatSeparator = (dateObj) => {
    return (
      dateObj.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
      " " +
      formatTime(dateObj)
    );
  };

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    
    if (container.scrollTop <= 100 && hasMore && !isLoadingMore && !loading) {
      onLoadMore();
    }
  }, [hasMore, isLoadingMore, loading, onLoadMore]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const previousLastMessageId = localStorage.getItem('lastMessageId');
      if (!previousLastMessageId || previousLastMessageId !== lastMessage.id.toString()) {
        scrollToBottom();
        localStorage.setItem('lastMessageId', lastMessage.id.toString());
      }
    }
  }, [messages.length, scrollToBottom]);

  if (loading) {
    return (
      <div className={cx("center")} ref={messagesContainerRef}>
        <div>Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cx("center")} ref={messagesContainerRef}>
        <div className={cx("error")}>{error}</div>
      </div>
    );
  }

  return (
    <div className={cx("center")} ref={messagesContainerRef}>
      {isLoadingMore && (
        <div className={cx("loading-more")}>Đang tải thêm tin nhắn...</div>
      )}
      
      {messages.map((message, index) => {
        const prevMsg = messages[index - 1];
        const nextMsg = messages[index + 1];
        const currentTime = message.timestamp;

        let showSeparator = false;
        let showTime = false;

        if (!prevMsg) {
          showSeparator = true;
        } else {
          const diffMinutes = (currentTime - prevMsg.timestamp) / 1000 / 60;
          if (diffMinutes >= 10) {
            showSeparator = true;
          }
        }

        if (!nextMsg) {
          showTime = true;
        } else {
          const sameMinute =
            currentTime.getHours() === nextMsg.timestamp.getHours() &&
            currentTime.getMinutes() === nextMsg.timestamp.getMinutes();
          if (!sameMinute) {
            showTime = true;
          }
        }

        return (
          <div key={message.id} className={cx("message-wrapper", message.type)}>
            {showSeparator && (
              <div className={cx("time-separator")}>
                <div className={cx("time-separator-content")}>
                  {formatSeparator(message.timestamp)}
                </div>
              </div>
            )}
            <div className={cx("message", message.type)}>
              <div
                className={cx("message-bubble", {
                  "has-media": message.temporaryImage || message.image || 
                              message.temporaryVideo || message.video || message.file,
                  temporary: message.isTemporary,
                  uploading: message.uploading,
                })}
              >
                <MessageContent message={message} onImagePreview={onImagePreview} />
              </div>
              {showTime && (
                <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessagesList;