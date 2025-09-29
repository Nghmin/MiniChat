
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import classNames from "classnames/bind";
// import styles from "./Login.module.scss";
// import axios from "axios";

// const cx = classNames.bind(styles);

// function Login() {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       navigate("/dashboard"); 
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');
    
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         username,
//         password,
//       });
      
//       console.log(res.data.message);
      
//       if (res.status === 200) {

//         localStorage.setItem("user", JSON.stringify(res.data.user));

//         const infoStr = localStorage.getItem("user");
//         const info = JSON.parse(infoStr);

//         if (!info?.avatar || info.avatar === "null") {
//           console.log('Username trước khi navigate:', username);
//           navigate("/person-info", {
//             state: { username: username }
//           });
//         }
//         else {
//           localStorage.setItem("token", res.data.token);
//           console.log(username);
//           navigate("/dashboard", { 
//             state : { username: username } 
//           }); 
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       if (error.response && error.response.data) {
//         setErrorMessage(error.response.data.message);
//       } else {
//         setErrorMessage("Lỗi kết nối server!");
//       }
//     }
//   };

//   return (
//     <div className={cx("container")}>
//       <div className={cx("wrapper")}>
//         <div className={cx("box")}>
//           <h2 className={cx("title")}>Đăng nhập</h2>

//           <form onSubmit={handleSubmit} className={cx("form")}>
//             {/* Username */}
//             <div className={cx("form-group")}>
//               <label>Tên đăng nhập</label>
//               <div className={cx("input-wrapper")}>
//                 <i className="fi fi-rr-user" />
//                 <input
//                   type="text"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Nhập tên đăng nhập..."
//                   className={cx("input")}
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div className={cx("form-group")}>
//               <label>Mật khẩu</label>
//               <div className={cx("password-wrapper")}>
//                 <i className="fi fi-rr-lock" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Nhập mật khẩu..."
//                   className={cx("input")}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   tabIndex={-1}
//                   className={cx("toggle-btn")}
//                   aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
//                 >
//                   {showPassword ? (
//                     <i className="fi fi-rr-eye-crossed" />
//                   ) : (
//                     <i className="fi fi-rr-eye" />
//                   )}
//                 </button>
//               </div>
//               <a href="/forgot-password" className={cx("forgot")}>
//                 Quên mật khẩu?
//               </a>
//             </div>

//             <button type="submit" className={cx("btn")}>
//               Đăng nhập
//             </button>
//           </form>

//           <p className={cx("note")}>
//             Chưa có tài khoản? <a href="/register">Đăng ký</a>
//           </p>
//         </div>

//         {/* Dòng lỗi ngoài box, căn giữa */}
//         {errorMessage && <p className={cx("error")}>{errorMessage}</p>}
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // FIX: Sửa useEffect để truyền state khi auto-login
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        console.log('Auto-login with stored user:', user);
        
        // Truyền username từ localStorage khi auto-login
        navigate("/dashboard", {
          state: { username: user.username }
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        // Nếu có lỗi, xóa localStorage và để user login lại
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      
      console.log(res.data.message);
      
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data.user));

        const infoStr = localStorage.getItem("user");
        const info = JSON.parse(infoStr);

        if (!info?.avatar || info.avatar === "null") {
          console.log('Username trước khi navigate to person-info:', username);
          navigate("/person-info", {
            state: { username: username }
          });
        }
        else {
          localStorage.setItem("token", res.data.token);
          console.log('Username trước khi navigate to dashboard:', username);
          navigate("/dashboard", { 
            state: { username: username } 
          }); 
        }
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Lỗi kết nối server!");
      }
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("box")}>
          <h2 className={cx("title")}>Đăng nhập</h2>

          <form onSubmit={handleSubmit} className={cx("form")}>
            {/* Username */}
            <div className={cx("form-group")}>
              <label>Tên đăng nhập</label>
              <div className={cx("input-wrapper")}>
                <i className="fi fi-rr-user" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập..."
                  className={cx("input")}
                />
              </div>
            </div>

            {/* Password */}
            <div className={cx("form-group")}>
              <label>Mật khẩu</label>
              <div className={cx("password-wrapper")}>
                <i className="fi fi-rr-lock" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu..."
                  className={cx("input")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className={cx("toggle-btn")}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <i className="fi fi-rr-eye-crossed" />
                  ) : (
                    <i className="fi fi-rr-eye" />
                  )}
                </button>
              </div>
              <a href="/forgot-password" className={cx("forgot")}>
                Quên mật khẩu?
              </a>
            </div>

            <button type="submit" className={cx("btn")}>
              Đăng nhập
            </button>
          </form>

          <p className={cx("note")}>
            Chưa có tài khoản? <a href="/register">Đăng ký</a>
          </p>
        </div>

        {/* Dòng lỗi ngoài box, căn giữa */}
        {errorMessage && <p className={cx("error")}>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;