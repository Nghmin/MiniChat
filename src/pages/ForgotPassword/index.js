
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage('');
  
  try {
    const res = await axios.post("http://localhost:5000/api/auth/forgot-password", {
      email,
      phone,
    });
    
    if (res.status === 200) {
      navigate('/reset-password', {
        state : {
          email: email,
          phone: phone
        }
      });
    }
  } catch (error) {
    if (error.response) {
      setErrorMessage(error.response.data.message || 'Đăng nhập thất bại');
    } else {
      setErrorMessage('Lỗi kết nối mạng');
    }
  } 
};

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("box")}>
          <h2 className={cx("title")}>Xác nhận tài khoản</h2>
          <p className={cx("subtitle")}>
            Nhập email và số điện thoại đã đăng ký để xác nhận tài khoản.
          </p>

          <form onSubmit={handleSubmit} className={cx("form")}>
            {/* Email */}
            <div className={cx("form-group")}>
              <label htmlFor="email">Email</label>
              <div className={cx("input-wrapper")}>
                <i className="fi fi-rr-envelope" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn..."
                  className={cx("input")}
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div className={cx("form-group")}>
              <label htmlFor="phone">Số điện thoại</label>
              <div className={cx("input-wrapper")}>
                <i className="fi fi-rr-phone-call" aria-hidden="true" />
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại của bạn..."
                  className={cx("input")}
                  autoComplete="off"
                />
              </div>
            </div>

            <button type="submit" className={cx("btn")}>
              Gửi yêu cầu xác nhận
            </button>
          </form>

          <p className={cx("note")}>
            <a href="/">Quay lại đăng nhập</a>
          </p>
        </div>
        {errorMessage && <p className={cx("error")}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;