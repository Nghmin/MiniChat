
import classNames from "classnames/bind";
import styles from "./FriendRequestBar.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function FriendRequestBar({ friend, onSendRequest, isVisible }) {
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    setIsLoading(true);
    try {
      // Giả lập gọi API gửi lời mời kết bạn
      setTimeout(() => {
        onSendRequest(friend.id, friend.name);
        setIsRequestSent(true);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi gửi lời mời:", error);
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={cx("friend-request-bar")}>
      <div className={cx("request-content")}>
        <div className={cx("user-icon")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span className={cx("request-text")}>
          {isRequestSent 
            ? "Bạn đã gửi yêu cầu kết bạn và đang chờ người này đồng ý"
            : `Gửi yêu cầu kết bạn tới ${friend.name || "Người dùng"} `}
        </span>
      </div>
      <div className={cx("request-actions")}>
        {!isRequestSent && (
          <button 
            className={cx("send-request-btn", { loading: isLoading })}
            onClick={handleSendRequest}
            disabled={isLoading}
            aria-label="Gửi yêu cầu kết bạn"
          >
            {isLoading ? "Đang gửi..." : "Gửi kết bạn"}
          </button>
        )}
      </div>
    </div>
  );
}

export default FriendRequestBar;