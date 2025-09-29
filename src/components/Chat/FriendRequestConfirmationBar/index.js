
import classNames from "classnames/bind";
import styles from "./FriendRequestConfirmationBar.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);

function FriendRequestConfirmationBar({ friend, onConfirmRequest, onRejectRequest, isVisible }) {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: "success" | "reject", message: string }
  const [show, setShow] = useState(isVisible); // kiểm soát hiển thị thanh

  const handleConfirmRequest = () => {
    setIsLoading(true);
    setTimeout(() => {
      onConfirmRequest(friend.id, friend.name);
      setIsLoading(false);
      setFeedback({ type: "success", message: `Kết bạn thành công với ${friend.name || "Người dùng"}!` });

      // Ẩn toàn bộ thanh sau 3 giây
      setTimeout(() => setShow(false), 3000);
    }, 1000);
  };

  const handleRejectRequest = () => {
    setTimeout(() => {
      onRejectRequest(friend.id, friend.name);
      setFeedback({ type: "reject", message: `Đã từ chối lời mời kết bạn của ${friend.name || "Người dùng"}!` });

      // Ẩn toàn bộ thanh sau 3 giây
      setTimeout(() => setShow(false), 3000);
    }, 500);
  };

  if (!show) return null;

  // Nếu đang hiển thị feedback
  if (feedback) {
    const isReject = feedback.type === "reject";
    return (
      <div className={cx("friend-request-bar", isReject ? "reject" : "success")}>
        <div className={cx("request-content")}>
          <div className={cx("user-icon", isReject ? "reject-icon" : "success-icon")}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              {isReject ? (
                <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L12 14.83l-6.29 6.3-1.42-1.41L10.59 12 4.29 5.71 5.71 4.3 12 10.59l6.29-6.3z"/>
              ) : (
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              )}
            </svg>
          </div>
          <span className={cx("request-text", isReject ? "reject-text" : "success-text")}>
            {feedback.message}
          </span>
        </div>
      </div>
    );
  }

  // Thanh mặc định trước khi xác nhận/từ chối
  return (
    <div className={cx("friend-request-bar")}>
      <div className={cx("request-content")}>
        <div className={cx("user-icon")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <span className={cx("request-text")}>
          {friend.name || "Người dùng"} đã gửi lời mời kết bạn tới bạn
        </span>
      </div>
      <div className={cx("request-actions")}>
        <button 
          className={cx("reject-request-btn")}
          onClick={handleRejectRequest}
          aria-label="Từ chối yêu cầu kết bạn"
        >
          Từ chối
        </button>
        <button 
          className={cx("confirm-request-btn", { loading: isLoading })}
          onClick={handleConfirmRequest}
          disabled={isLoading}
          aria-label="Xác nhận yêu cầu kết bạn"
        >
          {isLoading ? "Đang xác nhận..." : "Xác nhận"}
        </button>
      </div>
    </div>
  );
}

export default FriendRequestConfirmationBar;