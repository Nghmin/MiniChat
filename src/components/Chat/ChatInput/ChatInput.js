
import React, { useState, useCallback } from "react";
import classNames from "classnames/bind";
import styles from "./ChatInput.module.scss";
import EmojiPicker from "emoji-picker-react";

const cx = classNames.bind(styles);

function ChatInput({ onSend }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  // Hàm xử lý khi chọn emoji từ EmojiPicker
  const handleEmoji = useCallback((emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
    setOpen(false);
  }, []);

  const handleSend = useCallback(() => {
    if (text.trim()) {
      onSend(text.trim());
      setText("");
    } else {
      // Gửi like nếu không có text
      onSend("👍");
    }
  }, [text, onSend]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  }, [handleSend]);

  return (
    <>
      <div className={cx("input-area")}>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={cx("message-input")}
          aria-label="Nhập tin nhắn"
        />
        
        <div className={cx("emoji-container")}>
          <button
            className={cx("emoji-button")}
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Mở bảng chọn biểu tượng cảm xúc"
          >
            😊
          </button>
          <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
            <EmojiPicker
              onEmojiClick={handleEmoji}
              width={300}
              height={400}
              theme="auto"
              emojiStyle="native"
              previewConfig={{ showPreview: false }}
            />
          </div>
        </div>
        
        <button
          onClick={handleSend}
          className={cx("send-button", { active: text.trim() })}
          aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
        >
          {text.trim() ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
            </svg>
          )}
        </button>
      </div>

      {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
    </>
  );
}

export default ChatInput;