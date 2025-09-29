
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal } from 'lucide-react';
import classNames from "classnames/bind";
import styles from "./Content3.module.scss";

const cx = classNames.bind(styles);

// Placeholder avatar
const avatarIcon = "data:image/svg+xml,%3csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='20' cy='20' r='20' fill='%23e5e7eb'/%3e%3ccircle cx='20' cy='16' r='6' fill='%239ca3af'/%3e%3cpath d='M20 22c-6 0-11 3-11 7v3h22v-3c0-4-5-7-11-7z' fill='%239ca3af'/%3e%3c/svg%3e";

const friendsData = [
  { id: 1, name: "Bảo Khánh", avatar: avatarIcon, phone: "0123456789", gender: "Nam", birthDate: "01/01/2000" },
  { id: 2, name: "Bin Nhỏ", avatar: avatarIcon, phone: "0123456790", gender: "Nam", birthDate: "02/02/2001" },
  { id: 3, name: "Long", avatar: avatarIcon, phone: "0123456791", gender: "Nam", birthDate: "03/03/2002" },
  { id: 4, name: "Định Tiến Đạt", avatar: avatarIcon, phone: "0123456792", gender: "Nam", birthDate: "04/04/2003" },
  { id: 5, name: "Duy Mạnh", avatar: avatarIcon, phone: "0123456793", gender: "Nam", birthDate: "05/05/2004" },
  { id: 6, name: "Duy Tùng", avatar: avatarIcon, phone: "0123456794", gender: "Nam", birthDate: "06/06/2005" },
  { id: 7, name: "Gemm Linn", avatar: avatarIcon, phone: "0123456795", gender: "Nữ", birthDate: "07/07/2006" },
  { id: 8, name: "Giáp Văn Trang", avatar: avatarIcon, phone: "0123456796", gender: "Nam", birthDate: "08/08/2007" }
];

function Content3({ onSelectFriend }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  // Filter friends based on search term
  const filteredFriends = friendsData.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered friends by first letter
  const groupedFriends = filteredFriends.reduce((groups, friend) => {
    const firstLetter = friend.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(friend);
    return groups;
  }, {});

  // Sort groups alphabetically
  const sortedGroups = Object.keys(groupedFriends).sort();

  // Hiển thị thông báo khi không có kết quả
  const showNoResults = searchTerm && filteredFriends.length === 0;

  return (
    <div className={cx('content1')}>
      {/* Header Title - Fixed */}
      <div className={cx('header-fixed')}>
        <div className={cx('header-title')}>
          <svg className={cx('icon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a.75.75 0 01.75.75v1.5a.75.75 0 01-.75.75H21l-3.228-3.228z" />
          </svg>
          <span className={cx('title-text')}>Danh sách bạn bè</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className={cx('scrollable-content')}>
        {/* Friends count and Search - Scrollable */}
        <div className={cx('search-section')}>
          <div className={cx('friends-count')}>
            Bạn bè ({friendsData.length})
          </div>

          <div className={cx('search-controls')}>
            <div className={cx('search-input-wrapper')}>
              <Search className={cx('search-icon')} />
              <input
                type="text"
                placeholder="Tìm bạn"
                className={cx('search-input')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className={cx('select-wrapper')}>
              <select 
                className={cx('select-input')}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Tên (A-Z)</option>
                <option value="recent">Gần đây nhất</option>
                <option value="online">Đang online</option>
              </select>
              <svg className={cx('select-arrow')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <button className={cx('filter-button')}>
              <Filter className={cx('filter-icon')} />
              <span className={cx('filter-text')}>Tất cả</span>
              <svg className={cx('filter-arrow')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Friends List hoặc thông báo không tìm thấy */}
        {showNoResults ? (
          <div className={cx('no-results')}>
            <svg className={cx('no-results-icon')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className={cx('no-results-text')}>Không tìm thấy kết quả</p>
            <p className={cx('no-results-subtext')}>Vui lòng thử lại với từ khóa khác</p>
          </div>
        ) : (
          <div className={cx('friends-list')}>
            {sortedGroups.map(letter => (
              <div key={letter}>
                <div className={cx('letter-header')}>
                  <h3 className={cx('letter-title')}>{letter}</h3>
                </div>

                {groupedFriends[letter].map(friend => (
                  <div 
                    key={friend.id}
                    className={cx('friend-item')}
                    onClick={() => onSelectFriend(friend)} // Gọi callback khi nhấn vào friend-item
                  >
                    <div className={cx('friend-info')}>
                      <div className={cx('avatar-wrapper')}>
                        <img
                          src={friend.avatar}
                          alt={friend.name}
                          className={cx('avatar')}
                        />
                        <div className={cx('online-status')}></div>
                      </div>
                      <div className={cx('friend-name-wrapper')}>
                        <h4 className={cx('friend-name')}>{friend.name}</h4>
                      </div>
                    </div>
                    
                    <button className={cx('more-button')}>
                      <MoreHorizontal className={cx('more-icon')} />
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Content3;