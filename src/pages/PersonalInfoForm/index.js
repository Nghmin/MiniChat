
import React, { useState } from "react";
import classNames from "classnames/bind";
import { User, Upload, Calendar, Check } from "lucide-react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./PersonalInfoForm.module.scss";

const cx = classNames.bind(styles);

function PersonalInfoForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username;

  // State declarations - tách riêng từng field
  const [fullname, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [avatar, setAvatar] = useState(null); // File object, not string
  const [imagePreview, setImagePreview] = useState(null);
  const [serverImage, setServerImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Form validation
  const isFormValid = fullname && gender && birthday;

  const handleSubmit = async (e) => {
    if (!isFormValid) return;

    setIsLoading(true);
    try {
      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('fullname', fullname);
      submitData.append('gender', gender);
      submitData.append('birthday', birthday);
      submitData.append('username', username);
      
      if (avatar) {
        submitData.append('avatar', avatar);
      }

      const response = await axios.post(
        "http://localhost:5000/api/auth/update-profile",
        submitData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.status === 200) {
        console.log("Cập nhật thông tin thành công:", response.data);
        
        // Lưu user và token vào localStorage
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        
        // Xử lý đường dẫn ảnh từ server
        console.log("Profile image from server:", response.data.user?.profileImage || "None");
        if (response.data.user?.profileImage) {
          const imageUrl = `http://localhost:5000${response.data.user.profileImage}`;
          setServerImage(imageUrl);
          console.log("URL ảnh từ server:", imageUrl);
        } else {
          console.log("Không nhận được đường dẫn ảnh từ server");
        }

        // Debug thông tin form
        console.log("Họ tên:", fullname);
        console.log("Giới tính:", gender);
        console.log("Ngày sinh:", birthday);
        console.log("Username:", username); // Sửa lại cho đúng


        setIsSubmitted(true);
        setErrorMessage("");
        setImagePreview(null);
        
        setTimeout(() => {
          setIsSubmitted(false);
          navigate("/dashboard", {
            state : { username: username }
          });
        }, 2000);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin:", error);
      setErrorMessage(
        error.response?.data?.message || "Lỗi kết nối server! Vui lòng thử lại."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("box")}>
          <div className={cx("header")}>
            <h2 className={cx("title")}>Thông Tin Cá Nhân</h2>
            <p className={cx("subtitle")}>Vui lòng điền đầy đủ thông tin của bạn</p>
          </div>
          
          <form className={cx("form")} onSubmit={(e) => e.preventDefault()}>
            {/* Upload Avatar */}
            <div className={cx("avatarSection")}>
              <div className={cx("avatarWrapper")}>
                <div className={cx("avatarContainer")}>
                  {serverImage ? (
                    <img src={serverImage} alt="Profile" className={cx("avatarImage")} />
                  ) : imagePreview ? (
                    <img src={imagePreview} alt="Preview" className={cx("avatarImage")} />
                  ) : (
                    <img
                      src={"http://localhost:5000/uploads/default-avatar.png"}
                      alt="Default Avatar"
                      className={cx("avatarImage")}
                    />
                  )}
                </div>
                <label className={cx("uploadButton")}>
                  <Upload />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={cx("hiddenInput")}
                    disabled={isLoading}
                  />
                </label>
              </div>
              <p className={cx("avatarLabel")}>Chọn ảnh đại diện</p>
            </div>

            <div className={cx("formGrid")}>
              {/* Full Name */}
              <div className={cx("form-group", "fullWidth")}>
                <label className={cx("label")}>Họ và tên *</label>
                <div className={cx("input-wrapper")}>
                  <User className={cx("input-icon")} />
                  <input
                    type="text"
                    name="fullName"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nhập họ và tên của bạn..."
                    className={cx("input")}
                    autoComplete="off"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Gender */}
              <div className={cx("form-group")}>
                <label className={cx("label")}>Giới tính *</label>
                <div className={cx("genderOptions")}>
                  <label className={cx("genderOption")}>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className={cx("hiddenInput")}
                      disabled={isLoading}
                    />
                    <div className={cx("genderButton", { selected: gender === "male" })}>
                      Nam
                    </div>
                  </label>
                  <label className={cx("genderOption")}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                      className={cx("hiddenInput")}
                      disabled={isLoading}
                    />
                    <div className={cx("genderButton", { selected: gender === "female" })}>
                      Nữ
                    </div>
                  </label>
                </div>
              </div>

              {/* Birth Date */}
              <div className={cx("form-group")}>
                <label className={cx("label")}>Ngày sinh *</label>
                <div className={cx("input-wrapper")}>
                  <Calendar className={cx("input-icon")} />
                  <input
                    type="date"
                    name="birthDate"
                    value={birthday}
                    onChange={(e) => setBirthDay(e.target.value)}
                    className={cx("input")}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className={cx("error-message")}>
                {errorMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              disabled={!isFormValid || isLoading}
              onClick={handleSubmit}
              className={cx("btn", { disabled: !isFormValid || isLoading })}
            >
              {isLoading ? (
                "Đang xử lý..."
              ) : isSubmitted ? (
                <span className={cx("successMessage")}>
                  <Check />
                  Đã lưu thành công!
                </span>
              ) : (
                "Lưu thông tin"
              )}
            </button>
          </form>

          {/* Form Data Preview */}
          {(fullname || gender || birthday || avatar) && (
            <div className={cx("preview")}>
              <h3 className={cx("previewTitle")}>Thông tin đã nhập:</h3>
              <div className={cx("previewContent")}>
                {fullname && (
                  <p>
                    <span>Họ tên:</span> {fullname}
                  </p>
                )}
                {gender && (
                  <p>
                    <span>Giới tính:</span> {gender === "male" ? "Nam" : "Nữ"}
                  </p>
                )}
                {birthday && (
                  <p>
                    <span>Ngày sinh:</span> {new Date(birthday).toLocaleDateString("vi-VN")}
                  </p>
                )}
                <p>
                  <span>Ảnh:</span>{" "}
                  {avatar ? avatar.name : "Ảnh mặc định"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoForm;