
import React from "react";
import classNames from "classnames/bind";
import styles from "./EmptyState.module.scss";

const cx = classNames.bind(styles);

function EmptyState() {
  return (
    <div className={cx("chat")}>
      <div className={cx("empty-state")}>
        <div className={cx("empty-content")}>
          <div className={cx("empty-icon")}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
                fill="currentColor"
                opacity="0.3"
              />
              <circle cx="8" cy="12" r="1" fill="currentColor" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="16" cy="12" r="1" fill="currentColor" />
            </svg>
          </div>
          <div className={cx("empty-text")}>
            <h2>Chọn một cuộc trò chuyện</h2>
            <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
