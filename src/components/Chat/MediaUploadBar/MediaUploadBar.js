
import React from "react";
import classNames from "classnames/bind";
import styles from "./MediaUploadBar.module.scss";

const cx = classNames.bind(styles);

function MediaUploadBar({ onMediaSelect }) {
  return (
    <div className={cx("cr")}>
      <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => onMediaSelect(e, "image")}
        />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      </label>
      
      <label className={cx("cr-button")} title="Chọn tệp" aria-label="Chọn tệp để gửi">
        <input
          type="file"
          accept=".pdf,.doc,.docx,.txt,.zip,.rar,.xlsx,.xls,.ppt,.pptx"
          style={{ display: "none" }}
          onChange={(e) => onMediaSelect(e, "file")}
        />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
        </svg>
      </label>
      
      <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
        <input
          type="file"
          accept="video/*"
          style={{ display: "none" }}
          onChange={(e) => onMediaSelect(e, "video")}
        />
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
        </svg>
      </label>
    </div>
  );
}

export default MediaUploadBar;