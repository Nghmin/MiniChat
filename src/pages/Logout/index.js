import React from "react";
import classNames from "classnames/bind";
import styles from "./Logout.module.scss"; 
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

const cx = classNames.bind(styles);

function Logout({ onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <div className={cx("header")}>
          <h2 className={cx("title")}>Xác nhận đăng xuất</h2>
          <button onClick={onClose} className={cx("icon-btn")}>
            <X size={20} />
          </button>
        </div>
        <div className={cx("content")}>
          <p>Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?</p>
        </div>
        <div className={cx("footer")}>
          <button onClick={onClose} className={cx("btn", "btn-secondary")}>Hủy</button>
          <button onClick={handleLogout} className={cx("btn", "btn-primary")}>Đăng xuất</button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
