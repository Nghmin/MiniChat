
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function Register() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try{
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        email,
        phone,
        password,
        confirmPassword,
      });

      if (res.status === 200) {
        alert("Đăng ký thành công");
        navigate('/');
      }
    }
    catch(error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } 
      else {
        setErrorMessage("Lỗi kết nối server!");
      }
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("box")}>
          <h2 className={cx("title")}>Đăng ký</h2>
          <p className={cx("subtitle")}>Nhập thông tin để tạo tài khoản mới.</p>

          <form onSubmit={handleSubmit} className={cx("form")}>
            {/* Email */}
            <div className={cx("form-group")}>
              <label>Email</label>
              <div className={cx("input-wrapper")}>
                <i className="fi-rr-envelope"></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  className={cx("input")}
                />
              </div>
            </div>

            {/* Phone */}
            <div className={cx("form-group")}>
              <label>Số điện thoại</label>
              <div className={cx("input-wrapper")}>
                <i className="fi-rr-phone-call"></i>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại của bạn..."
                  className={cx("input")}
                />
              </div>
            </div>

            {/* Password */}
            <div className={cx("form-group")}>
              <label>Mật khẩu</label>
              <div className={cx("input-wrapper")}>
                <i className="fi-rr-lock"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className={cx("input")}
                />
                <button
                  type="button"
                  className={cx("toggle-btn")}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <i className="fi fi-rr-eye-crossed" />
                  ) : (
                    <i className="fi fi-rr-eye" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className={cx("form-group")}>
              <label>Xác nhận mật khẩu</label>
              <div className={cx("input-wrapper")}>
                <i className="fi-rr-lock"></i>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Xác nhận mật khẩu..."
                  className={cx("input")}
                />
                <button
                  type="button"
                  className={cx("toggle-btn")}
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex={-1}
                  aria-label={showConfirm ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showConfirm ? (
                    <i className="fi fi-rr-eye-crossed" />
                  ) : (
                    <i className="fi fi-rr-eye" />
                  )}
                </button>
              </div>
            </div>

            {/* Dòng lỗi cố định */}
            <p className={cx("error", { active: errorMessage })}>
              {errorMessage || "\u00A0"}
            </p>

            <button type="submit" className={cx("btn")}>
              Đăng ký
            </button>
          </form>

          <p className={cx("note")}>
            Đã có tài khoản? <a href="/">Đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
