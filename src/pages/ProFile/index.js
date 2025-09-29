// Profile.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ProFile.module.scss";
import { Pencil, X, Camera, ChevronDown, ArrowLeft, Upload } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import { avatarIcon } from "~/components/List/image";

const cx = classNames.bind(styles);

function ProFile({ onClose, datax }) {
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  
  const [userInfo, setUserInfo] = useState({ avatar: "" });

  useEffect(() => {
    if (!datax) return;

    const fetchUserInfo = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/leak-info", {
          datax
        });
        if (res.status === 200) {
          setUserInfo(res.data.userInfo);
          console.log('User info:', res.data.userInfo);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [datax]);

  const [selectedGender, setSelectedGender] = useState(null);
  const [birthDay, setBirthDay] = useState(null);
  const [birthMonth, setBirthMonth] = useState(null);
  const [birthYear, setBirthYear] = useState(null);
  const [displayName, setDisplayName] = useState(null);

  console.log("ProFile :", datax)
  console.log("ProFile :", userInfo.avatar)
  console.log("ProFile :", userInfo.fullname)
  console.log("ProFile :", userInfo.gender)
  console.log("ProFile :", userInfo.birthday)
  console.log("ProFile :", typeof userInfo.username)

  //setDisplayName(userInfo.fullname);

  useEffect(() => {
  if (userInfo) {
    setDisplayName(userInfo.fullname); // đúng tên thuộc tính

    if (userInfo.gender === "male") {
      setSelectedGender("Nam");
    }
    else {
      setSelectedGender("Nữ");
    }

    if (userInfo.birthday) {
      const [year, month, day] = userInfo.birthday.split("-");
      setBirthDay(day);
      setBirthMonth(month);
      setBirthYear(year);
    }


  }
}, [userInfo]);

  const days = Array.from({length: 31}, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = Array.from({length: 12}, (_, i) => (i + 1).toString().padStart(2, '0'));
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 100}, (_, i) => (currentYear - i).toString());

  const handleEditInfoClick = () => {
    setShowEditInfo(true);
  };

  const handleEditAvatarClick = () => {
    setShowEditAvatar(true);
  };

  const handleSaveInfo = () => {
    setShowEditInfo(false);
  };

  const handleCancelInfo = () => {
    setShowEditInfo(false);
  };

  const handleCloseAvatar = () => {
    setShowEditAvatar(false);
  };

  // Edit Info Modal
  if (showEditInfo) {
    return (
      <div className={cx("overlay")}>
        <div className={cx("modal")}>
          {/* Header */}
          <div className={cx("header")}>
            <div className={cx("header-left")}>
              <button onClick={handleCancelInfo} className={cx("icon-btn")}>
                <ArrowLeft size={20} />
              </button>
              <h2 className={cx("title")}>Cập nhật thông tin cá nhân</h2>
            </div>
            <button onClick={handleCancelInfo} className={cx("icon-btn")}>
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className={cx("content")}>
            {/* Display Name */}
            <div className={cx("form-group")}>
              <label className={cx("label")}>Tên hiển thị</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={cx("input")}
              />
            </div>

            {/* Personal Info */}
            <div className={cx("personal-info")}>
              <h3 className={cx("section-title")}>Thông tin cá nhân</h3>
              
              {/* Gender */}
              <div className={cx("gender-group")}>
                <label className={cx("radio-label")}>
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={selectedGender === "Nam"}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className={cx("radio")}
                  />
                  <span>Nam</span>
                </label>
                <label className={cx("radio-label")}>
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={selectedGender === "Nữ"}
                    onChange={(e) => setSelectedGender(e.target.value)}
                    className={cx("radio")}
                  />
                  <span>Nữ</span>
                </label>
              </div>

              {/* Birth Date */}
              <div className={cx("form-group")}>
                <label className={cx("label")}>Ngày sinh</label>
                <div className={cx("date-selects")}>
                  <div className={cx("select-wrapper")}>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className={cx("select")}
                    >
                      {days.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className={cx("select-icon")} />
                  </div>
                  <div className={cx("select-wrapper")}>
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className={cx("select")}
                    >
                      {months.map(month => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className={cx("select-icon")} />
                  </div>
                  <div className={cx("select-wrapper")}>
                    <select
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className={cx("select")}
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className={cx("select-icon")} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className={cx("footer")}>
            <button onClick={handleCancelInfo} className={cx("btn", "btn-secondary")}>
              Hủy
            </button>
            <button onClick={handleSaveInfo} className={cx("btn", "btn-primary")}>
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Edit Avatar Modal
  if (showEditAvatar) {
    return (
      <div className={cx("overlay")}>
        <div className={cx("modal")}>
          {/* Header */}
          <div className={cx("header")}>
            <div className={cx("header-left")}>
              <button onClick={handleCloseAvatar} className={cx("icon-btn")}>
                <ArrowLeft size={20} />
              </button>
              <h2 className={cx("title")}>Cập nhật ảnh đại diện</h2>
            </div>
            <button onClick={handleCloseAvatar} className={cx("icon-btn")}>
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className={cx("content")}>
            {/* Upload Button */}
            <button className={cx("upload-btn")}>
              <Upload size={20} />
              <span>Tải lên từ máy tính</span>
            </button>

            {/* Current Avatar */}
            <div className={cx("avatar-section")}>
              <h3 className={cx("section-title")}>Ảnh đại diện của tôi</h3>
              <div className={cx("avatar-display")}>
                <img
                  className={cx("current-avatar")}
                  src={userInfo.avatar ? `http://localhost:5000${userInfo.avatar}` : avatarIcon}
                  alt="avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Profile View
  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        {/* Header */}
        <div className={cx("header")}>
          <h2 className={cx("title")}>Thông tin tài khoản</h2>
          <button onClick={ onClose } className={cx("icon-btn")}>
            <X size={20} />
          </button>
        </div>

        {/* Cover Image */}
        <div className={cx("cover")}>
          <img
            src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/08/12/lich-nghi-le-quoc-khanh-2-9-nguoi-lao-dong.jpg"
            alt="Cover"
            className={cx("cover-image")}
          />
          
          {/* Avatar */}
          <div className={cx("avatar-container")}>
            <div className={cx("avatar-wrapper")}>
              <img
                className={cx("avatar")}
                src={userInfo.avatar ? `http://localhost:5000${userInfo.avatar}` : avatarIcon} 
                alt="avatar"
              />
              <button 
                onClick={handleEditAvatarClick}
                className={cx("camera-btn")}
              >
                <Camera size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Name Section */}
        <div className={cx("name-section")}>
          <div className={cx("name-edit")}>
            <h3 className={cx("display-name")}>{displayName}</h3>
            <button 
              onClick={handleEditInfoClick}
              className={cx("icon-btn")}
            >
              <Pencil size={16} />
            </button>
          </div>
        </div>

        {/* Personal Info Section */}
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
              <span className={cx("info-value")}>
                {userInfo.username ? userInfo.username.replace(/^0/, "+84") : ""}
              </span>
            </div>
          </div>

          <p className={cx("privacy-note")}>
            Chỉ bạn bè có lưu số của bạn trong danh bạ máy xem được số này
          </p>
        </div>

        {/* Update Button */}
        <div className={cx("update-section")}>
          <button 
            onClick={handleEditInfoClick}
            className={cx("btn", "btn-update")}
          >
            <Pencil size={16} />
            <span>Cập nhật</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProFile;