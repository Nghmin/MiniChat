

// import React, { useState } from "react";
// import classNames from "classnames/bind";
// import styles from "./List.module.scss";
// import UserInfo from "./userInfo";
// import ChatList from "./chatList";
// import FriendList from "./friendList";

// const cx = classNames.bind(styles);

// function List({ onSelectFriend, selectedFriend, datax, onUpdateChat }) {
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);

//   console.log("List : ", datax);

//   return (
//     <div className={cx("list")}>
//       <UserInfo
//         isSearchExpanded={isSearchExpanded}
//         setIsSearchExpanded={setIsSearchExpanded}
//         onSelectFriend={onSelectFriend} // Truyền callback vào UserInfo (cho AddFriend)
//       />
//       {isSearchExpanded ? (
//         <FriendList
//           onSelectFriend={onSelectFriend} 
//           selectedFriend={selectedFriend} 
//         /> // Truyền callback và selectedFriend
//       ) : (
//         <ChatList
//           onSelectFriend={onSelectFriend} 
//           selectedFriend={selectedFriend} 
//           chatData1={datax}
//           onUpdateChat={onUpdateChat}
//         /> // Truyền callback và selectedFriend
//       )}
//     </div>
//   );
// }

// export default List;

import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./List.module.scss";
import UserInfo from "./userInfo";
import ChatList from "./chatList";
import FriendList from "./friendList";

const cx = classNames.bind(styles);

function List({ onSelectFriend, selectedFriend, datax, onUpdateChat, setUpdateChatList }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  console.log("List props:", { datax, selectedFriend });

  return (
    <div className={cx("list")}>
      <UserInfo
        isSearchExpanded={isSearchExpanded}
        setIsSearchExpanded={setIsSearchExpanded}
        onSelectFriend={onSelectFriend}
        datax={datax}
      />
      {isSearchExpanded ? (
        <FriendList
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
          datax={datax}
        />
      ) : (
        <ChatList
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
          chatData1={datax}
          onUpdateChat={onUpdateChat}
          setUpdateChatList={setUpdateChatList} // Truyền setUpdateChatList xuống ChatList
        />
      )}
    </div>
  );
}

export default List;