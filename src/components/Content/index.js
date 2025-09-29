
import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import classNames from "classnames/bind";
import styles from "./Content.module.scss";

const cx = classNames.bind(styles);

// Placeholder avatar
const avatarIcon = "data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='20' cy='20' r='20' fill='%23e5e7eb'/%3e%3ccircle cx='20' cy='16' r='6' fill='%239ca3af'/%3e%3cpath d='M20 22c-6 0-11 3-11 7v3h22v-3c0-4-5-7-11-7z' fill='%239ca3af'/%3e%3c/svg%3e";

const friendRequestsData = [
  { id: 1, name: "Hữu Đạt", avatar: avatarIcon, time: "2 ngày" },
  { id: 2, name: "Nguyễn Văn An", avatar: avatarIcon, time: "1 ngày" },
  { id: 3, name: "Trần Thị Bình", avatar: avatarIcon, time: "3 giờ" },
  { id: 4, name: "Phạm Minh Châu", avatar: avatarIcon, time: "5 ngày" },
  { id: 5, name: "Lê Quốc Dũng", avatar: avatarIcon, time: "1 giờ" },
  { id: 6, name: "Vũ Thị Hương", avatar: avatarIcon, time: "4 ngày" },
  { id: 7, name: "Hoàng Minh Khang", avatar: avatarIcon, time: "2 giờ" },
  { id: 8, name: "Hoàng Minh Long", avatar: avatarIcon, time: "2 giờ" },
  { id: 8, name: "Hoàng Minh Long", avatar: avatarIcon, time: "2 giờ" },
  { id: 8, name: "Hoàng Minh Long", avatar: avatarIcon, time: "2 giờ" },
  { id: 8, name: "Hoàng Minh Long", avatar: avatarIcon, time: "2 giờ" }
];

const sentRequestsData = [
  { id: 1, name: "Xuân Mai", avatar: avatarIcon },
  { id: 2, name: "Đỗ Duy", avatar: avatarIcon, initials: "DD", bgColor: "#ff6b35" },
  { id: 3, name: "Hoàng Thanh Hà", avatar: avatarIcon },
  { id: 4, name: "Lê Đăng Hoàng An", avatar: avatarIcon },
  { id: 5, name: "Việt Hà", avatar: avatarIcon },
  { id: 6, name: "Nguyễn Thành Nam", avatar: avatarIcon, initials: "TN", bgColor: "#10b981" },
  { id: 7, name: "Trần Thị Lan", avatar: avatarIcon },
  { id: 8, name: "Phạm Văn Hùng", avatar: avatarIcon },
];

function Content() {
  return (
    <div className={cx('content1')}>
      {/* Header */}
      <div className={cx('header')}>
        <div className={cx('header-container')}>
          <div className={cx('header-title')}>
            <UserPlus className={cx('header-icon')} />
            <span className={cx('title-text')}>Lời mời kết bạn</span>
          </div>
        </div>
      </div>

      <div className={cx('main-container')}>
        {/* Friend Requests Section */}
        <div className={cx('section')}>
          <div className={cx('section-header')}>
            <h2 className={cx('section-title')}>Lời mời kết bạn ({friendRequestsData.length})</h2>
          </div>

          {friendRequestsData.length === 0 ? (
            <div className={cx('empty-state')}>
              <div className={cx('empty-icon-wrapper')}>
                <svg className={cx('empty-icon')} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className={cx('empty-text')}>Bạn không có lời mời nào</h3>
            </div>
          ) : (
            <div className={cx('cards-grid')}>
              {friendRequestsData.map(request => (
                <div key={request.id} className={cx('card')}>
                  <div className={cx('card-content')}>
                    <div className={cx('card-header')}>
                      <img
                        src={request.avatar}
                        alt={request.name}
                        className={cx('avatar')}
                      />
                      <div className={cx('user-info')}>
                        <h4 className={cx('user-name')}>{request.name}</h4>
                        <p className={cx('user-time')}>{request.time}</p>
                      </div>
                      <button className={cx('card-menu-button')}>
                        <svg className={cx('card-menu-icon')} fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                    </div>

                    <div className={cx('card-actions')}>
                      <button className={cx('btn-secondary')}>
                        Xóa
                      </button>
                      <button className={cx('btn-primary')}>
                        Xác nhận
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sent Requests Section */}
        <div className={cx('section')}>
          <div className={cx('section-header')}>
            <h2 className={cx('section-title')}>Lời mời đã gửi ({sentRequestsData.length})</h2>
          </div>

          <div className={cx('cards-grid')}>
            {sentRequestsData.map(friend => (
              <div key={friend.id} className={cx('card')}>
                <div className={cx('card-content')}>
                  <div className={cx('card-header')}>
                    {friend.initials ? (
                      <div 
                        className={cx('avatar-initials')}
                        style={{ backgroundColor: friend.bgColor }}
                      >
                        {friend.initials}
                      </div>
                    ) : (
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className={cx('avatar')}
                      />
                    )}
                    <div className={cx('user-info')}>
                      <h4 className={cx('user-name')}>{friend.name}</h4>
                    </div>
                    <button className={cx('card-menu-button')}>
                      <svg className={cx('card-menu-icon')} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                  </div>

                  <div className={cx('card-actions')}>
                    <button className={cx('btn-secondary')}>
                      Thu hồi
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;