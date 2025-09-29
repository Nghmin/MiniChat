// // import React, { useState } from "react";
// // import { X, ChevronDown, ArrowLeft, Upload, Pencil, Camera } from "lucide-react";
// // import classNames from "classnames/bind";
// // import styles from "./AddFriend.module.scss";

// // const cx = classNames.bind(styles);

// // const AddFriend = ({ onClose }) => {
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [searchResults, setSearchResults] = useState(null);
// //   const [showProfile, setShowProfile] = useState(false);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [showEditInfo, setShowEditInfo] = useState(false);
// //   const [showEditAvatar, setShowEditAvatar] = useState(false);
// //   const [selectedGender, setSelectedGender] = useState("Nam");
// //   const [birthDay, setBirthDay] = useState("27");
// //   const [birthMonth, setBirthMonth] = useState("02");
// //   const [birthYear, setBirthYear] = useState("2005");
// //   const [displayName, setDisplayName] = useState("Trịnh Như Nhật");

// //   // Database mẫu
// //   const phoneDatabase = {
// //     "0389923023": {
// //       name: "Nguyentruongson",
// //       avatar:
// //         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
// //       phone: "0389923023",
// //       gender: "Nam",
// //       birthDate: "15/03/1995",
// //     },
// //     "0919980850": {
// //       name: "Ngọc Diệp",
// //       avatar:
// //         "https://images.unsplash.com/photo-1494790108755-2616b15d2f4b?w=100&h=100&fit=crop&crop=face",
// //       phone: "0919980850",
// //       gender: "Nữ",
// //       birthDate: "22/08/1997",
// //     },
// //     "0389927069": {
// //       name: "Trịnh Như Nhật",
// //       avatar: "https://i.pravatar.cc/64?img=32",
// //       phone: "0389927069",
// //       gender: "Nam",
// //       birthDate: "27/02/2005",
// //     },
// //   };

// //   const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
// //   const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
// //   const currentYear = new Date().getFullYear();
// //   const years = Array.from({ length: 100 }, (_, i) => (currentYear - i).toString());

// //   const handleSearch = () => {
// //     if (!phoneNumber.trim()) {
// //       alert("Vui lòng nhập số điện thoại");
// //       return;
// //     }
// //     const user = phoneDatabase[phoneNumber.trim()];
// //     setSearchResults(user || false);
// //     if (user && phoneNumber.trim() === "0389927069") {
// //       setShowProfile(true);
// //       setSelectedUser(user);
// //       setDisplayName(user.name);
// //       setSelectedGender(user.gender);
// //       const [day, month, year] = user.birthDate.split('/');
// //       setBirthDay(day);
// //       setBirthMonth(month);
// //       setBirthYear(year);
// //     } else {
// //       setShowProfile(false);
// //     }
// //   };

// //   const handleShowProfile = (user) => {
// //     setSelectedUser(user);
// //     setDisplayName(user.name);
// //     setSelectedGender(user.gender);
// //     const [day, month, year] = user.birthDate.split('/');
// //     setBirthDay(day);
// //     setBirthMonth(month);
// //     setBirthYear(year);
// //     setShowProfile(true);
// //   };

// //   const handleAddFriend = (e) => {
// //     e.stopPropagation();
// //     e.target.textContent = "Đã gửi";
// //     e.target.classList.add(cx("btn-sent"));
// //     e.target.disabled = true;
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter") {
// //       handleSearch();
// //     }
// //   };

// //   const handleEditInfoClick = () => {
// //     setShowEditInfo(true);
// //   };

// //   const handleEditAvatarClick = () => {
// //     setShowEditAvatar(true);
// //   };

// //   const handleSaveInfo = () => {
// //     setShowEditInfo(false);
// //   };

// //   const handleCancelInfo = () => {
// //     setShowEditInfo(false);
// //   };

// //   const handleCloseAvatar = () => {
// //     setShowEditAvatar(false);
// //   };

// //   const handleMessage = () => {
// //     // Tạm thời để trống vì không yêu cầu hành động cụ thể
// //   };

// //   const handleBack = () => {
// //     setShowProfile(false);
// //     setSearchResults(null);
// //     setPhoneNumber("");
// //     setSelectedUser(null);
// //   };

// //   // Edit Info Modal
// //   if (showEditInfo && selectedUser) {
// //     return (
// //       <div className={cx("overlay")}>
// //         <div className={cx("modal")}>
// //           <div className={cx("header")}>
// //             <div className={cx("header-left")}>
// //               <button onClick={handleCancelInfo} className={cx("icon-btn")}>
// //                 <ArrowLeft size={20} />
// //               </button>
// //               <h2 className={cx("title")}>Cập nhật thông tin cá nhân</h2>
// //             </div>
// //             <button onClick={handleCancelInfo} className={cx("icon-btn")}>
// //               <X size={20} />
// //             </button>
// //           </div>

// //           <div className={cx("content")}>
// //             <div className={cx("form-group")}>
// //               <label className={cx("label")}>Tên hiển thị</label>
// //               <input
// //                 type="text"
// //                 value={displayName}
// //                 onChange={(e) => setDisplayName(e.target.value)}
// //                 className={cx("input")}
// //               />
// //             </div>

// //             <div className={cx("personal-info")}>
// //               <h3 className={cx("section-title")}>Thông tin cá nhân</h3>
              
// //               <div className={cx("gender-group")}>
// //                 <label className={cx("radio-label")}>
// //                   <input
// //                     type="radio"
// //                     name="gender"
// //                     value="Nam"
// //                     checked={selectedGender === "Nam"}
// //                     onChange={(e) => setSelectedGender(e.target.value)}
// //                     className={cx("radio")}
// //                   />
// //                   <span>Nam</span>
// //                 </label>
// //                 <label className={cx("radio-label")}>
// //                   <input
// //                     type="radio"
// //                     name="gender"
// //                     value="Nữ"
// //                     checked={selectedGender === "Nữ"}
// //                     onChange={(e) => setSelectedGender(e.target.value)}
// //                     className={cx("radio")}
// //                   />
// //                   <span>Nữ</span>
// //                 </label>
// //               </div>

// //               <div className={cx("form-group")}>
// //                 <label className={cx("label")}>Ngày sinh</label>
// //                 <div className={cx("date-selects")}>
// //                   <div className={cx("select-wrapper")}>
// //                     <select
// //                       value={birthDay}
// //                       onChange={(e) => setBirthDay(e.target.value)}
// //                       className={cx("select")}
// //                     >
// //                       {days.map(day => (
// //                         <option key={day} value={day}>{day}</option>
// //                       ))}
// //                     </select>
// //                     <ChevronDown size={16} className={cx("select-icon")} />
// //                   </div>
// //                   <div className={cx("select-wrapper")}>
// //                     <select
// //                       value={birthMonth}
// //                       onChange={(e) => setBirthMonth(e.target.value)}
// //                       className={cx("select")}
// //                     >
// //                       {months.map(month => (
// //                         <option key={month} value={month}>{month}</option>
// //                       ))}
// //                     </select>
// //                     <ChevronDown size={16} className={cx("select-icon")} />
// //                   </div>
// //                   <div className={cx("select-wrapper")}>
// //                     <select
// //                       value={birthYear}
// //                       onChange={(e) => setBirthYear(e.target.value)}
// //                       className={cx("select")}
// //                     >
// //                       {years.map(year => (
// //                         <option key={year} value={year}>{year}</option>
// //                       ))}
// //                     </select>
// //                     <ChevronDown size={16} className={cx("select-icon")} />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className={cx("footer")}>
// //             <button onClick={handleCancelInfo} className={cx("btn", "btn-secondary")}>
// //               Hủy
// //             </button>
// //             <button onClick={handleSaveInfo} className={cx("btn", "btn-primary")}>
// //               Cập nhật
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Edit Avatar Modal
// //   if (showEditAvatar && selectedUser) {
// //     return (
// //       <div className={cx("overlay")}>
// //         <div className={cx("modal")}>
// //           <div className={cx("header")}>
// //             <div className={cx("header-left")}>
// //               <button onClick={handleCloseAvatar} className={cx("icon-btn")}>
// //                 <ArrowLeft size={20} />
// //               </button>
// //               <h2 className={cx("title")}>Cập nhật ảnh đại diện</h2>
// //             </div>
// //             <button onClick={handleCloseAvatar} className={cx("icon-btn")}>
// //               <X size={20} />
// //             </button>
// //           </div>

// //           <div className={cx("content")}>
// //             <button className={cx("upload-btn")}>
// //               <Upload size={20} />
// //               <span>Tải lên từ máy tính</span>
// //             </button>

// //             <div className={cx("avatar-section")}>
// //               <h3 className={cx("section-title")}>Ảnh đại diện của tôi</h3>
// //               <div className={cx("avatar-display")}>
// //                 <img
// //                   className={cx("current-avatar")}
// //                   src={selectedUser.avatar}
// //                   alt="Current Avatar"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Profile View
// //   if (showProfile && selectedUser) {
// //     const isMainUser = selectedUser.phone === "0389927069";
// //     return (
// //       <div className={cx("overlay")}>
// //         <div className={cx("modal")}>
// //           <div className={cx("header")}>
// //             <div className={cx("header-left")}>
// //               <button onClick={handleBack} className={cx("icon-btn")}>
// //                 <ArrowLeft size={20} />
// //               </button>
// //               <h2 className={cx("title")}>Thông tin tài khoản</h2>
// //             </div>
// //             <button onClick={onClose} className={cx("icon-btn")}>
// //               <X size={20} />
// //             </button>
// //           </div>

// //           <div className={cx("cover")}>
// //             <img
// //               src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/08/12/lich-nghi-le-quoc-khanh-2-9-nguoi-lao-dong.jpg"
// //               alt="Cover"
// //               className={cx("cover-image")}
// //             />
// //             <div className={cx("avatar-container")}>
// //               <div className={cx("avatar-wrapper")}>
// //                 <img
// //                   className={cx("avatar")}
// //                   src={selectedUser.avatar}
// //                   alt="Avatar"
// //                 />
// //                 {isMainUser && (
// //                   <button
// //                     onClick={handleEditAvatarClick}
// //                     className={cx("camera-btn")}
// //                   >
// //                     <Camera size={12} />
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           <div className={cx("name-section")}>
// //             <div className={cx("name-edit")}>
// //               <h3 className={cx("display-name")}>{displayName}</h3>
// //               {isMainUser && (
// //                 <button
// //                   onClick={handleEditInfoClick}
// //                   className={cx("icon-btn")}
// //                 >
// //                   <Pencil size={16} />
// //                 </button>
// //               )}
// //             </div>
// //           </div>

// //           <div className={cx("info-section")}>
// //             <h4 className={cx("section-title")}>Thông tin cá nhân</h4>
// //             <div className={cx("info-list")}>
// //               <div className={cx("info-item")}>
// //                 <span className={cx("info-label")}>Giới tính</span>
// //                 <span className={cx("info-value")}>{selectedGender}</span>
// //               </div>
// //               <div className={cx("info-item")}>
// //                 <span className={cx("info-label")}>Ngày sinh</span>
// //                 <span className={cx("info-value")}>{birthDay} tháng {birthMonth}, {birthYear}</span>
// //               </div>
// //               <div className={cx("info-item")}>
// //                 <span className={cx("info-label")}>Điện thoại</span>
// //                 <span className={cx("info-value")}>+84 {selectedUser.phone.slice(1)}</span>
// //               </div>
// //             </div>
// //             <p className={cx("privacy-note")}>
// //               Chỉ bạn bè có lưu số của bạn trong danh bạ máy xem được số này
// //             </p>
// //           </div>

// //           <div className={cx("update-section")}>
// //             {isMainUser ? (
// //               <button
// //                 onClick={handleEditInfoClick}
// //                 className={cx("btn", "btn-update")}
// //               >
// //                 <Pencil size={16} />
// //                 <span>Cập nhật</span>
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={handleMessage}
// //                 className={cx("btn", "btn-message")}
// //               >
// //                 Nhắn tin
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Main Modal
// //   return (
// //     <div className={cx("overlay")}>
// //       <div className={cx("modal")}>
// //         <div className={cx("header")}>
// //           <h2>Thêm bạn</h2>
// //           <button onClick={onClose} className={cx("btn-close")}>
// //             <X size={20} />
// //           </button>
// //         </div>

// //         <div className={cx("search-box")}>
// //           <input
// //             type="text"
// //             value={phoneNumber}
// //             onChange={(e) => setPhoneNumber(e.target.value)}
// //             onKeyPress={handleKeyPress}
// //             placeholder="Nhập số điện thoại"
// //           />
// //         </div>

// //         {searchResults !== null && (
// //           <div className={cx("results")}>
// //             {searchResults ? (
// //               <div
// //                 className={cx("result-item")}
// //                 onClick={() => handleShowProfile(searchResults)}
// //               >
// //                 <img
// //                   src={searchResults.avatar}
// //                   alt="Avatar"
// //                   className={cx("result-avatar")}
// //                 />
// //                 <div className={cx("result-info")}>
// //                   <div className={cx("result-name")}>{searchResults.name}</div>
// //                   <div className={cx("result-phone")}>
// //                     {searchResults.phone}
// //                   </div>
// //                 </div>
// //                 <div className={cx("actions")}>
// //                   <button onClick={handleAddFriend} className={cx("btn-add")}>
// //                     Kết bạn
// //                   </button>
// //                   <button onClick={handleMessage} className={cx("btn-msg")}>
// //                     Nhắn tin
// //                   </button>
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className={cx("not-found")}>
// //                 <div>📱</div>
// //                 <p>Không tìm thấy người dùng</p>
// //                 <span>
// //                   Số điện thoại "{phoneNumber}" không được liên kết với tài
// //                   khoản nào.
// //                 </span>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         <div className={cx("footer")}>
// //           <button onClick={onClose} className={cx("btn", "btn-cancel")}>
// //             Hủy
// //           </button>
// //           <button onClick={handleSearch} className={cx("btn", "btn-search")}>
// //             Tìm kiếm
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddFriend;






// import React, { useState } from "react";
// import { X, ArrowLeft, Pencil, Camera } from "lucide-react";
// import classNames from "classnames/bind";
// import styles from "./AddFriend.module.scss";
// import Chat from "~/components/Chat";

// const cx = classNames.bind(styles);

// const AddFriend = ({ onClose, onSelectFriend }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [searchResults, setSearchResults] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [selectedGender, setSelectedGender] = useState("Nam");
//   const [birthDay, setBirthDay] = useState("27");
//   const [birthMonth, setBirthMonth] = useState("02");
//   const [birthYear, setBirthYear] = useState("2005");
//   const [displayName, setDisplayName] = useState("Trịnh Như Nhật");
//   const [view, setView] = useState("main"); // main | profile

//   // Database mẫu
//   const phoneDatabase = {
//     "0389923023": {
//       name: "Nguyentruongson",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
//       phone: "0389923023",
//       gender: "Nam",
//       birthDate: "15/03/1995",
//     },
//     "0919980850": {
//       name: "Ngọc Diệp",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b15d2f4b?w=100&h=100&fit=crop&crop=face",
//       phone: "0919980850",
//       gender: "Nữ",
//       birthDate: "22/08/1997",
//     },
//     "0389927069": {
//       name: "Trịnh Như Nhật",
//       avatar: "https://i.pravatar.cc/64?img=32",
//       phone: "0389927069",
//       gender: "Nam",
//       birthDate: "27/02/2005",
//     },
//   };

//   const days = Array.from({ length: 31 }, (_, i) =>
//     (i + 1).toString().padStart(2, "0")
//   );
//   const months = Array.from({ length: 12 }, (_, i) =>
//     (i + 1).toString().padStart(2, "0")
//   );
//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 100 }, (_, i) =>
//     (currentYear - i).toString()
//   );

//   const handleSearch = () => {
//     if (!phoneNumber.trim()) {
//       alert("Vui lòng nhập số điện thoại");
//       return;
//     }
//     const user = phoneDatabase[phoneNumber.trim()];
//     setSearchResults(user || false);
//     if (user) {
//       setSelectedUser(user);
//       setDisplayName(user.name);
//       setSelectedGender(user.gender);
//       const [day, month, year] = user.birthDate.split("/");
//       setBirthDay(day);
//       setBirthMonth(month);
//       setBirthYear(year);
//     }
//   };

//   const handleShowProfile = (user) => {
//     setSelectedUser(user);
//     setDisplayName(user.name);
//     setSelectedGender(user.gender);
//     const [day, month, year] = user.birthDate.split("/");
//     setBirthDay(day);
//     setBirthMonth(month);
//     setBirthYear(year);
//     setView("profile");
//   };

//   const handleAddFriend = (e) => {
//     e.stopPropagation();
//     e.target.textContent = "Đã gửi";
//     e.target.classList.add(cx("btn-sent"));
//     e.target.disabled = true;
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSearch();
//   };

//   const handleMessage = () => {
//     if (!selectedUser) return;
//     const isMainUser = selectedUser.phone === "0389927069";
//     if (!isMainUser) {
//       onSelectFriend(selectedUser); // Gọi callback để cập nhật selectedFriend
//       onClose(); // Đóng overlay AddFriend
//     }
//   };

//   const handleBack = () => {
//     if (view === "profile") setView("main");
//   };

//   // UI Render
//   return (
//     <div className={cx("overlay")}>
//       <div className={cx("modal")}>
//         {/* Header */}
//         <div className={cx("header")}>
//           <div className={cx("header-left")}>
//             {view !== "main" && (
//               <button onClick={handleBack} className={cx("icon-btn")}>
//                 <ArrowLeft size={20} />
//               </button>
//             )}
//             <h2 className={cx("title")}>
//               {view === "main" && "Thêm bạn"}
//               {view === "profile" && "Thông tin tài khoản"}
//             </h2>
//           </div>
//           <button onClick={onClose} className={cx("icon-btn")}>
//             <X size={20} />
//           </button>
//         </div>

//         {/* Main View */}
//         {view === "main" && (
//           <>
//             <div className={cx("search-box")}>
//               <input
//                 type="text"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Nhập số điện thoại"
//               />
//             </div>

//             {searchResults !== null && (
//               <div className={cx("results")}>
//                 {searchResults ? (
//                   <div
//                     className={cx("result-item")}
//                     onClick={() => handleShowProfile(searchResults)}
//                   >
//                     <img
//                       src={searchResults.avatar}
//                       alt="Avatar"
//                       className={cx("result-avatar")}
//                     />
//                     <div className={cx("result-info")}>
//                       <div className={cx("result-name")}>
//                         {searchResults.name}
//                       </div>
//                       <div className={cx("result-phone")}>
//                         {searchResults.phone}
//                       </div>
//                     </div>
//                     <div className={cx("actions")}>
//                       <button
//                         onClick={handleAddFriend}
//                         className={cx("btn-add")}
//                       >
//                         Kết bạn
//                       </button>
//                       {/* Bỏ nút Nhắn tin ở đây */}
//                     </div>
//                   </div>
//                 ) : (
//                   <div className={cx("not-found")}>
//                     <div>📱</div>
//                     <p>Không tìm thấy người dùng</p>
//                     <span>
//                       Số điện thoại "{phoneNumber}" không được liên kết với tài
//                       khoản nào.
//                     </span>
//                   </div>
//                 )}
//               </div>
//             )}

//             <div className={cx("footer")}>
//               <button onClick={onClose} className={cx("btn", "btn-cancel")}>
//                 Hủy
//               </button>
//               <button
//                 onClick={handleSearch}
//                 className={cx("btn", "btn-search")}
//               >
//                 Tìm kiếm
//               </button>
//             </div>
//           </>
//         )}

//         {/* Profile View */}
//         {view === "profile" && selectedUser && (
//           <div className={cx("profile-view")}>
//             <div className={cx("cover")}>
//               <img
//                 src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2025/08/12/lich-nghi-le-quoc-khanh-2-9-nguoi-lao-dong.jpg"
//                 alt="Cover"
//                 className={cx("cover-image")}
//               />
//               <div className={cx("avatar-container")}>
//                 <div className={cx("avatar-wrapper")}>
//                   <img
//                     className={cx("avatar")}
//                     src={selectedUser.avatar}
//                     alt="Avatar"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className={cx("name-section")}>
//               <h3 className={cx("display-name")}>{displayName}</h3>
//             </div>

//             <div className={cx("info-section")}>
//               <h4 className={cx("section-title")}>Thông tin cá nhân</h4>
//               <div className={cx("info-list")}>
//                 <div className={cx("info-item")}>
//                   <span className={cx("info-label")}>Giới tính</span>
//                   <span className={cx("info-value")}>{selectedGender}</span>
//                 </div>
//                 <div className={cx("info-item")}>
//                   <span className={cx("info-label")}>Ngày sinh</span>
//                   <span className={cx("info-value")}>
//                     {birthDay} tháng {birthMonth}, {birthYear}
//                   </span>
//                 </div>
//                 <div className={cx("info-item")}>
//                   <span className={cx("info-label")}>Điện thoại</span>
//                   <span className={cx("info-value")}>
//                     +84 {selectedUser.phone.slice(1)}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className={cx("update-section")}>
//               {selectedUser.phone === "0389927069" ? (
//                 <button className={cx("btn", "btn-update")}>
//                   <Pencil size={16} />
//                   <span>Cập nhật</span>
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleMessage}
//                   className={cx("btn", "btn-message")}
//                 >
//                   Nhắn tin
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddFriend;









import React, { useState } from "react";
import { X, ChevronDown, ArrowLeft, Upload, Pencil, Camera } from "lucide-react";
import classNames from "classnames/bind";
import styles from "./AddFriend.module.scss";

const cx = classNames.bind(styles);

const AddFriend = ({ onClose, onSelectFriend }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditInfo, setShowEditInfo] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [selectedGender, setSelectedGender] = useState("Nam");
  const [birthDay, setBirthDay] = useState("27");
  const [birthMonth, setBirthMonth] = useState("02");
  const [birthYear, setBirthYear] = useState("2005");
  const [displayName, setDisplayName] = useState("Trịnh Như Nhật");

  // Database mẫu
  const phoneDatabase = {
    "0389923023": {
      name: "Nguyentruongson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      phone: "0389923023",
      gender: "Nam",
      birthDate: "15/03/1995",
    },
    "0919980850": {
      name: "Ngọc Diệp",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b15d2f4b?w=100&h=100&fit=crop&crop=face",
      phone: "0919980850",
      gender: "Nữ",
      birthDate: "22/08/1997",
    },
    "0389927069": {
      name: "Trịnh Như Nhật",
      avatar: "https://i.pravatar.cc/64?img=32",
      phone: "0389927069",
      gender: "Nam",
      birthDate: "27/02/2005",
    },
  };

  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const months = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString()
  );

  const handleSearch = () => {
    if (!phoneNumber.trim()) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }
    const user = phoneDatabase[phoneNumber.trim()];
    setSearchResults(user || false);
    if (user && phoneNumber.trim() === "0389927069") {
      setShowProfile(true);
      setSelectedUser(user);
      setDisplayName(user.name);
      setSelectedGender(user.gender);
      const [day, month, year] = user.birthDate.split("/");
      setBirthDay(day);
      setBirthMonth(month);
      setBirthYear(year);
    } else {
      setShowProfile(false);
    }
  };

  const handleShowProfile = (user) => {
    setSelectedUser(user);
    setDisplayName(user.name);
    setSelectedGender(user.gender);
    const [day, month, year] = user.birthDate.split("/");
    setBirthDay(day);
    setBirthMonth(month);
    setBirthYear(year);
    setShowProfile(true);
  };

  const handleAddFriend = (e) => {
    e.stopPropagation();
    e.target.textContent = "Đã gửi";
    e.target.classList.add(cx("btn-sent"));
    e.target.disabled = true;
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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

  const handleMessage = () => {
    if (!selectedUser) return;
    const isMainUser = selectedUser.phone === "0389927069";
    if (!isMainUser) {
      onSelectFriend(selectedUser); // Gọi callback để cập nhật selectedFriend
      onClose(); // Đóng overlay AddFriend
    }
  };

  const handleBack = () => {
    setShowProfile(false);
    setSearchResults(null);
    setPhoneNumber("");
    setSelectedUser(null);
  };

  // Edit Info Modal
  if (showEditInfo && selectedUser) {
    return (
      <div className={cx("overlay")}>
        <div className={cx("modal")}>
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

          <div className={cx("content")}>
            <div className={cx("form-group")}>
              <label className={cx("label")}>Tên hiển thị</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={cx("input")}
              />
            </div>

            <div className={cx("personal-info")}>
              <h3 className={cx("section-title")}>Thông tin cá nhân</h3>

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

              <div className={cx("form-group")}>
                <label className={cx("label")}>Ngày sinh</label>
                <div className={cx("date-selects")}>
                  <div className={cx("select-wrapper")}>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className={cx("select")}
                    >
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
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
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
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
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className={cx("select-icon")} />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
  if (showEditAvatar && selectedUser) {
    return (
      <div className={cx("overlay")}>
        <div className={cx("modal")}>
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

          <div className={cx("content")}>
            <button className={cx("upload-btn")}>
              <Upload size={20} />
              <span>Tải lên từ máy tính</span>
            </button>

            <div className={cx("avatar-section")}>
              <h3 className={cx("section-title")}>Ảnh đại diện của tôi</h3>
              <div className={cx("avatar-display")}>
                <img
                  className={cx("current-avatar")}
                  src={selectedUser.avatar}
                  alt="Current Avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile View
  if (showProfile && selectedUser) {
    const isMainUser = selectedUser.phone === "0389927069";
    return (
      <div className={cx("overlay")}>
        <div className={cx("modal")}>
          <div className={cx("header")}>
            <div className={cx("header-left")}>
              <button onClick={handleBack} className={cx("icon-btn")}>
                <ArrowLeft size={20} />
              </button>
              <h2 className={cx("title")}>Thông tin tài khoản</h2>
            </div>
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
                {isMainUser && (
                  <button
                    onClick={handleEditAvatarClick}
                    className={cx("camera-btn")}
                  >
                    <Camera size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className={cx("name-section")}>
            <div className={cx("name-edit")}>
              <h3 className={cx("display-name")}>{displayName}</h3>
              {isMainUser && (
                <button
                  onClick={handleEditInfoClick}
                  className={cx("icon-btn")}
                >
                  <Pencil size={16} />
                </button>
              )}
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
                <span className={cx("info-value")}>
                  {birthDay} tháng {birthMonth}, {birthYear}
                </span>
              </div>
              <div className={cx("info-item")}>
                <span className={cx("info-label")}>Điện thoại</span>
                <span className={cx("info-value")}>
                  +84 {selectedUser.phone.slice(1)}
                </span>
              </div>
            </div>
            <p className={cx("privacy-note")}>
              Chỉ bạn bè có lưu số của bạn trong danh bạ máy xem được số này
            </p>
          </div>

          <div className={cx("update-section")}>
            {isMainUser ? (
              <button
                onClick={handleEditInfoClick}
                className={cx("btn", "btn-update")}
              >
                <Pencil size={16} />
                <span>Cập nhật</span>
              </button>
            ) : (
              <button
                onClick={handleMessage}
                className={cx("btn", "btn-message")}
              >
                Nhắn tin
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Modal
  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <div className={cx("header")}>
          <h2>Thêm bạn</h2>
          <button onClick={onClose} className={cx("btn-close")}>
            <X size={20} />
          </button>
        </div>

        <div className={cx("search-box")}>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập số điện thoại"
          />
        </div>

        {searchResults !== null && (
          <div className={cx("results")}>
            {searchResults ? (
              <div
                className={cx("result-item")}
                onClick={() => handleShowProfile(searchResults)}
              >
                <img
                  src={searchResults.avatar}
                  alt="Avatar"
                  className={cx("result-avatar")}
                />
                <div className={cx("result-info")}>
                  <div className={cx("result-name")}>{searchResults.name}</div>
                  <div className={cx("result-phone")}>{searchResults.phone}</div>
                </div>
                <div className={cx("actions")}>
                  <button onClick={handleAddFriend} className={cx("btn-add")}>
                    Kết bạn
                  </button>
                  <button onClick={handleMessage} className={cx("btn-msg")}>
                    Nhắn tin
                  </button>
                </div>
              </div>
            ) : (
              <div className={cx("not-found")}>
                <div>📱</div>
                <p>Không tìm thấy người dùng</p>
                <span>
                  Số điện thoại "{phoneNumber}" không được liên kết với tài khoản
                  nào.
                </span>
              </div>
            )}
          </div>
        )}

        <div className={cx("footer")}>
          <button onClick={onClose} className={cx("btn", "btn-cancel")}>
            Hủy
          </button>
          <button onClick={handleSearch} className={cx("btn", "btn-search")}>
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddFriend;