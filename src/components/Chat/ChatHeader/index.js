
import classNames from "classnames/bind";
import styles from "./ChatHeader.module.scss";

const cx = classNames.bind(styles);

function ChatHeader({ friend, onAvatarClick, onToggleDetail, onStartCall }) {
  return (
    <div className={cx("top")}>
      <div className={cx("user-info")}>
        <button 
          className={cx("avatar-button")} 
          onClick={onAvatarClick} 
          title="Xem thông tin người dùng" 
          aria-label="Xem thông tin người dùng"
        >
          <div className={cx("avatar-container")}>
            <img 
              src={friend.avatar
                ? `${process.env.REACT_APP_API_URL || "http://localhost:5000"}${friend.avatar}`
                : `${process.env.REACT_APP_API_URL || "http://localhost:5000"}/Uploads/default-avatar.png`}
            />
            <div className={cx("online-status")}></div>
          </div>
        </button>
        <div className={cx("user-details")}>
          <h2>{friend.name || "Người dùng"}</h2>
          <span className={cx("status")}>Đang hoạt động</span>
        </div>
      </div>
      <div className={cx("actions")}>
        <button className={cx("action-btn")} title="Cuộc gọi thoại" aria-label="Cuộc gọi thoại">📞</button>
        <button className={cx("action-btn")} title="Video call" aria-label="Video call"onClick={() => {
  if (!friend || !friend.id) {
    alert("Vui lòng chọn người để gọi.");
    return;
  }
  onStartCall(friend);
}}
>🎥</button>
        <button className={cx("action-btn")} title="Thông tin cuộc trò chuyện" aria-label="Thông tin cuộc trò chuyện">ℹ️</button>
        <button className={cx("action-btn")} title="Tùy chọn khác" onClick={onToggleDetail} aria-label="Tùy chọn khác">⋮</button>
      </div>
    </div>
  );
}

export default ChatHeader;