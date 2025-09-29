import React from "react";
import { X } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./ProFile.module.scss";

const cx = classNames.bind(styles);

const ProFile1 = ({ datax, onClose }) => {

  console.log("datax:", datax.gender);

  const selectedUser = {
    name: datax.name || "",
    avatar: `http://localhost:5000${datax.avatar}`,
    phone: "**********",
    gender: datax.gender || "",
    birthDate: "**/**/****",
  };
  const selectedGender = datax.gender === "female" ? "Nữ" : "Nam";
  const birthDay = "*";
  const birthMonth = "*";
  const birthYear = "*";

  const handleMessage = () => {
    // Tạm thời để trống vì không yêu cầu hành động cụ thể
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <div className={cx("header")}>
          <h2 className={cx("title")}>Thông tin tài khoản</h2>
          <button onClick={onClose} className={cx("icon-btn")}>
            <X size={20} />
          </button>
        </div>

        <div className={cx("cover")}>
          <img
            src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/08/12/lich-nghi-le-quoc-khanh-2-9-nguoi-lao-dong.jpg"
            alt="Cover"
            className={cx("cover-image")}
          />
          <div className={cx("avatar-container")}>
            <div className={cx("avatar-wrapper")}>
              <img
                className={cx("avatar")}
                src={selectedUser.avatar}
                alt="Avatar"
              />
            </div>
          </div>
        </div>

        <div className={cx("name-section")}>
          <div className={cx("name-edit")}>
            <h3 className={cx("display-name")}>{selectedUser.name}</h3>
          </div>
        </div>

        <div className={cx("info-section")}>
          <h4 className={cx("section-title")}>Thông tin cá nhân</h4>
          <div className={cx("info-list")}>
            <div className={cx("info-item")}>
              <span className={cx("info-label")}>Giới tính</span>
              <span className={cx("info-value")}>{selectedGender}</span>
            </div>
            <div className={cx("info-item")}>
              <span className={cx("info-label")}>Ngày sinh</span>
              <span className={cx("info-value")}>{birthDay} tháng {birthMonth}, {birthYear}</span>
            </div>
            <div className={cx("info-item")}>
              <span className={cx("info-label")}>Điện thoại</span>
              <span className={cx("info-value")}>+84 {selectedUser.phone.slice(1)}</span>
            </div>
          </div>
          <p className={cx("privacy-note")}>
            Chỉ bạn bè có lưu số của bạn trong danh bạ máy xem được số này
          </p>
        </div>

        <div className={cx("update-section")}>
          <button
            onClick={onClose}
            className={cx("btn", "btn-message")}
          >
            Nhắn tin
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProFile1;