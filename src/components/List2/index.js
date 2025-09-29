
// import React, { useState } from "react";
// import classNames from "classnames/bind";
// import styles from "./List2.module.scss";
// import UserInfo from "./userInfo";
// import ChatList from "./chatList";
// import FriendList from "./friendList";

// const cx = classNames.bind(styles);

// function List2({ selectedItem, onSelect, onSelectFriend }) {
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);

//   return (
//     <div className={cx("list")}>
//       <UserInfo
//         isSearchExpanded={isSearchExpanded}
//         setIsSearchExpanded={setIsSearchExpanded}
//         onSelectFriend={onSelectFriend} // Truyền callback vào UserInfo (cho AddFriend)
//       />
//       {isSearchExpanded ? (
//         <FriendList onSelectFriend={onSelectFriend} /> // Truyền callback vào FriendList
//       ) : (
//         <ChatList selectedItem={selectedItem} onSelect={onSelect} />
//       )}
//     </div>
//   );
// }

// export default List2;




import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./List2.module.scss";
import UserInfo from "./userInfo";
import ChatList from "./chatList";
import FriendList from "./friendList";

const cx = classNames.bind(styles);

function List2({ selectedItem, onSelect, onSelectFriend }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <div className={cx("list")}>
      <UserInfo
        isSearchExpanded={isSearchExpanded}
        setIsSearchExpanded={setIsSearchExpanded}
        onSelectFriend={onSelectFriend} // Truyền callback vào UserInfo (cho AddFriend)
      />
      {isSearchExpanded ? (
        <FriendList onSelectFriend={onSelectFriend} /> // Truyền callback vào FriendList
      ) : (
        <ChatList
          selectedItem={selectedItem}
          onSelect={onSelect}
          onSelectFriend={onSelectFriend} // Truyền callback vào ChatList
        />
      )}
    </div>
  );
}

export default List2;