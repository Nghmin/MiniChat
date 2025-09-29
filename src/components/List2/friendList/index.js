
import React from 'react';
import classNames from "classnames/bind";
import styles from "./friendList.module.scss";
import { avatarIcon } from '../image';

const cx = classNames.bind(styles);

function FriendList({ onSelectFriend }) {
  const friends = [
    { id: 1, avatar: avatarIcon, name: "Cục Quản lý đề điều và PCTT" },
    { id: 2, avatar: avatarIcon, name: "Minh Dương" },
    { id: 3, avatar: avatarIcon, name: "Tuấn Huy" },
    { id: 4, avatar: avatarIcon, name: "Giáp Vân Trang" },
    { id: 5, avatar: avatarIcon, name: "IF KOHOC RETURN 0" },
    { id: 6, avatar: avatarIcon, name: "SS-NHẬT" },
    { id: 7, avatar: avatarIcon, name: "Huy Hoàn" },
    { id: 8, avatar: avatarIcon, name: "Kiều Quân" },
    { id: 9, avatar: avatarIcon, name: "Quốc Thiện" },
    { id: 2, avatar: avatarIcon, name: "Minh Dương" },
    { id: 3, avatar: avatarIcon, name: "Tuấn Huy" },
    { id: 4, avatar: avatarIcon, name: "Giáp Vân Trang" },
    { id: 5, avatar: avatarIcon, name: "IF KOHOC RETURN 0" },
    { id: 6, avatar: avatarIcon, name: "SS-NHẬT" },
    { id: 7, avatar: avatarIcon, name: "Huy Hoàn" },
    { id: 8, avatar: avatarIcon, name: "Kiều Quân" },
    { id: 9, avatar: avatarIcon, name: "Quốc Thiện" },
  ];

  return (
    <div className={cx('friendList')}>
      <div className={cx('friend-container')}>
        {friends.map((friend) => (
          <div
            key={friend.id}
            className={cx('friend-item')}
            onClick={() => onSelectFriend(friend)} // click chọn bạn
          >
            <div className={cx('avatar-section')}>
              <img 
                src={friend.avatar} 
                alt={friend.name} 
                className={cx('avatar')}
              />
            </div>
            <div className={cx('content')}>
              <h3 className={cx('name')}>{friend.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FriendList;
