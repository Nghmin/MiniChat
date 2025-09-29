// import React, { useState } from 'react';
// import { Search, Filter, Mail } from 'lucide-react';
// import classNames from "classnames/bind";
// import styles from "./Request.module.scss";

// const cx = classNames.bind(styles);

// // Placeholder avatar
// const avatarIcon = "data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='20' cy='20' r='20' fill='%23e5e7eb'/%3e%3ccircle cx='20' cy='16' r='6' fill='%239ca3af'/%3e%3cpath d='M20 22c-6 0-11 3-11 7v3h22v-3c0-4-5-7-11-7z' fill='%239ca3af'/%3e%3c/svg%3e";

// function Request() {
//     return (
//         <div className={cx('request')}>Trang moi</div>
//     );
// }

// export default Request;


import React from 'react';
import { Search } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './Request.module.scss';

const cx = classNames.bind(styles);

// Placeholder avatar
const avatarIcon = 'data:image/svg+xml,%3csvg width="40" height="40" xmlns="http://www.w3.org/2000/svg"%3e%3ccircle cx="20" cy="20" r="20" fill="%23e5e7eb"/%3e%3ccircle cx="20" cy="16" r="6" fill="%239ca3af"/%3e%3cpath d="M20 22c-6 0-11 3-11 7v3h22v-3c0-4-5-7-11-7z" fill="%239ca3af"/%3e%3c/svg%3e';

function Request() {
  const requests = [
    { id: 1, name: 'Hữu Đạt', status: 'Hôm qua', avatar: avatarIcon },
    { id: 2, name: 'Xuân Mai', status: '1 hôm trước', avatar: avatarIcon, mutual: true },
    { id: 3, name: 'Đỗ Duy', status: 'Có thể bạn quen', avatar: avatarIcon, highlight: true },
    { id: 4, name: 'Hoàng Thanh Hà', status: 'Có thể bạn quen', avatar: 'https://via.placeholder.com/40', mutual: true },
    { id: 5, name: 'Lê Đăng Hoàng An', status: 'Có thể bạn quen', avatar: 'https://via.placeholder.com/40', mutual: true },
    { id: 6, name: 'Việt Hà', status: 'Có thể bạn quen', avatar: 'https://via.placeholder.com/40', mutual: true },
  ];

  return (
    <div className={cx('content1')}>
      <div className={cx('header')}>
        <h2>Lời mời kết bạn</h2>
        <div className={cx('search-icon')}>
          <Search size={20} />
        </div>
      </div>
      <div className={cx('mail-icon')}>
        <img src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24'%3e%3cpath fill='%234b90ef' d='M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z'/%3e%3cpath fill='%23fff' d='M20 18H4v-1l8-5l8 5v1z'/%3e%3c/svg%3e" alt="Mail icon" />
        <p>Bạn chưa có lời mời nào</p>
      </div>
      {requests.map((request) => (
        <div key={request.id} className={cx('request-card')}>
          <img src={request.avatar} alt={request.name} className={cx('avatar')} />
          <div className={cx('info')}>
            <p className={cx('name')}>{request.name}</p>
            <p className={cx('status', { highlight: request.highlight, mutual: request.mutual })}>{request.status}</p>
          </div>
          <div className={cx('buttons')}>
            <button className={cx('btn', 'skip')}>Bỏ qua</button>
            <button className={cx('btn', 'add')}>Kết bạn</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Request;