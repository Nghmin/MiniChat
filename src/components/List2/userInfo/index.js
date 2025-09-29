
// userInfo.module.jsx
import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./userInfo.module.scss";
import AddFriend from "~/pages/AddFriend";
import ProFile1 from "~/pages/ProFile1";

const cx = classNames.bind(styles);

const UserInfo = ({ isSearchExpanded, setIsSearchExpanded, onSelectFriend }) => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showProfile, setShowProFile] = useState(false);

  const handleActionClick = (action) => {
    if (action === "Tạo nhóm") alert("Chức năng đang phát triển");
    else setShowAddFriend(true);
  };

  const handleSearchClick = () => {
    setIsSearchExpanded(true);
  };

  const handleCloseClick = () => {
    setIsSearchExpanded(false);
  };

  return (
    <div className={cx("userInfo")}>
      <div className={cx("searchBar")}>
        <div
          className={cx("searchInputWrapper")}
          onClick={!isSearchExpanded ? handleSearchClick : undefined}
        >
          <div className={cx("searchIcon")}>🔍</div>
          <input
            type="text"
            placeholder="Tìm kiếm"
            className={cx("searchInput")}
            readOnly={!isSearchExpanded}
          />
        </div>
        <div className={cx("rightSection")}>
          {!isSearchExpanded ? (
            <>
              <button
                className={cx("actionBtn")}
                title="Tìm người"
                onClick={() => handleActionClick("Tìm người")}
              >
                👤
              </button>
              <button
                className={cx("actionBtn")}
                title="Tạo nhóm"
                onClick={() => handleActionClick("Tạo nhóm")}
              >
                📂
              </button>
            </>
          ) : (
            <button
              className={cx("closeBtnWide")}
              onClick={handleCloseClick}
              title="Đóng"
            >
              Đóng
            </button>
          )}
        </div>
      </div>
      {showAddFriend && (
        <AddFriend
          onClose={() => setShowAddFriend(false)}
          onSelectFriend={onSelectFriend} // 👈 Truyền onSelectFriend vào AddFriend
        />
      )}
      {showProfile && <ProFile1 onClose={() => setShowProFile(false)} />}
    </div>
  );
};

export default UserInfo;