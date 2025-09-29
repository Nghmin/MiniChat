

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ResetPassword.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const { email, phone } = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/reset-password", {
        phone,
        email,
        password,
        confirmPassword,
      });

      if (res.status === 200) {
        alert("Mật khẩu của bạn đã được đặt lại thành công!");
        navigate('/');
      }
    }
    catch(error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Đăng nhập thất bại');
      } else {
        setErrorMessage('Lỗi kết nối server');
      }
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("box")}>
          <h2 className={cx("title")}>Đặt lại mật khẩu</h2>
          <p className={cx("subtitle")}>
            Nhập mật khẩu mới và xác nhận để tiếp tục.
          </p>

          <form onSubmit={handleSubmit} className={cx("form")}>
            {/* Mật khẩu mới */}
            <div className={cx("form-group")}>
              <label htmlFor="password">Mật khẩu mới</label>
              <div className={cx("input-wrapper")}>
                <i className="fi fi-rr-lock" aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới..."
                  className={cx("input")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={cx("toggle-btn")}
                  onClick={toggleShowPassword}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <i
                    className={showPassword ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {/* Xác nhận mật khẩu */}
            <div className={cx("form-group")}>
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <div className={cx("input-wrapper")}>
                <i className="fi fi-rr-lock" aria-hidden="true" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu..."
                  className={cx("input")}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={cx("toggle-btn")}
                  onClick={toggleShowConfirmPassword}
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  <i
                    className={showConfirmPassword ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            {errorMessage && <p className={cx("error")}>{errorMessage}</p>}

            <button type="submit" className={cx("btn")}>
              Xác nhận
            </button>
          </form>

          <p className={cx("note")}>
            <a href="/">Quay lại đăng nhập</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;



