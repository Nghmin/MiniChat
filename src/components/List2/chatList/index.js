
import React from "react";
import classNames from "classnames/bind";
import styles from "./chatList.module.scss";
import { Users, UserPlus, UsersRound, UserCheck } from "lucide-react";

const cx = classNames.bind(styles);

function ChatList({ selectedItem, onSelect }) {
  const menuItems = [
    { id: 1, icon: <Users size={20} />, title: "Danh sách bạn bè" },
    { id: 2, icon: <UsersRound size={20} />, title: "Danh sách nhóm và cộng đồng" },
    { id: 3, icon: <UserPlus size={20} />, title: "Lời mời kết bạn" },
    { id: 4, icon: <UserCheck size={20} />, title: "Lời mời vào nhóm và cộng đồng" },
  ];

  return (
    <div className={cx("chatList")}>
      <div className={cx("menu-container")}>
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={cx("menu-item", { selected: selectedItem === item.id })}
            onClick={() => onSelect(item.id)}
          >
            <div className={cx("icon-wrapper")}>{item.icon}</div>
            <span className={cx("menu-title")}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;
