
// import React, { use, useEffect } from 'react';
// import classNames from "classnames/bind";
// import styles from "./chatList.module.scss";
// import { Pin, Users } from 'lucide-react';
// import axios from 'axios';
// import { useState } from 'react';


// const cx = classNames.bind(styles);

// function ChatList({ onSelectFriend, chatData1 }) { 

//   console.log("Chat List :", chatData1);

//   const [userChats, setUserChats] = useState([]);
//   const [leakInfoList, setLeakInfoList] = useState([]);

//   useEffect(() => {
//     if (!chatData1) return;

//     const fetchChats = async () => {
//       try {
//         const res = await axios.post(
//           "http://localhost:5000/api/chat/chat-list",
//           { userId: chatData1 } // gửi userId trong body
//         );

//         if (res.status === 200) {
//           setUserChats(res.data);
//           console.log(res.data); // log dữ liệu trả về trực tiếp
//         }
//       } catch (err) {
//         console.error("Error fetching chats:", err);
//       }
//     };

//     fetchChats();
//   }, [chatData1]);

//   console.log("Chat List1 : ", userChats)

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const userIdsToFetch = userChats.map(chat =>
//           chat.members.find(member => member !== chatData1)
//         );

//         if (userIdsToFetch.length === 0) return;

//         const promises = userIdsToFetch.map(userId =>
//           axios.post("http://localhost:5000/api/auth/leak-info1", { data: userId })
//         );

//         const results = await Promise.all(promises);
//         setLeakInfoList(results.map(res => res.data));
//         console.log(results.map(res => res.data)); // Sửa ở đây
//       } catch (err) {
//         console.log("Lỗi khi lấy dữ liệu:", err);
//       }
//     };

//     fetchAll();
//   }, [userChats, chatData1]);

//   useEffect(() => {

//   });

//   // B5: Duyệt qua từng cuộc trò chuyện và ghép dữ liệu
//   const chatData = userChats.map((chat, index) => {
//     const userInfo = leakInfoList && leakInfoList[index] ? leakInfoList[index] : {};

//     console.log(userInfo.fullname)
//     console.log(userChats[index].last_message.sender)
//     console.log(chat.last_message.timestamp)
//     console.log(userInfo.gender)

//     const timel = chat.last_message.timestamp;
//     const dateToCheck = new Date(timel);
//     const now = new Date();
//     const diffMs = now - dateToCheck;

//     let tx = "";
//     if (diffMs <= 0) tx = "Vài giây";
//     else {
//       const diffSeconds = Math.floor(diffMs / 1000);
//       const diffMinutes = Math.floor(diffSeconds / 60);
//       const diffHours = Math.floor(diffMinutes / 60);
//       const diffDays = Math.floor(diffHours / 24);

//       if (diffDays > 7) {
//         const day = dateToCheck.getDate();
//         const month = dateToCheck.getMonth() + 1;
//         tx = `${day}/${month}`;
//       } 
//       else if (diffDays > 0) tx = `${diffDays} ngày`;
//       else if (diffHours > 0) tx = `${diffHours} giờ`;
//       else if (diffMinutes > 0) tx = `${diffMinutes} phút`;
//       else tx = "Vài giây";
//     }

//     console.log(tx);
    
//     let msg = "";
//     if (chat.last_message.sender !== chatData1) {
//       msg = chat.last_message.content;
//     }
//     else {
//       msg ="Bạn: " + chat.last_message.content;
//     }

//     console.log(chat.members)

//     return {
//       id: chat.id,
//       avatar: userInfo.avatar || "/default-avatar.png",
//       name: userInfo.fullname || "Đang tải...",
//       message: msg || "",
//       time: tx,
//       isPinned: true,
//       unreadCount: 0,
//       member: chat.members[0] === chatData1 ? chat.members[1] : chat.members[0], // Sửa lỗi ở đây
//       gender: userInfo.gender,
//       sender: chatData1,
//     };
//   });

//   const renderGroupMembers = (chat) => {
//     if (!chat.isGroup) return null;
    
//     return (
//       <div className={cx('group-info')}>
//         <Users className={cx('group-icon')} />
//         {chat.groupMembers && (
//           <div className={cx('member-avatars')}>
//             {chat.groupMembers.slice(0, 2).map((member, index) => (
//               <div key={index} className={cx('member-avatar')}>
//                 <img src={member} alt="" />
//               </div>
//             ))}
//           </div>
//         )}
//         {chat.memberCount && (
//           <span className={cx('member-count')}>{chat.memberCount}</span>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className={cx('chatList')}>
//       <div className={cx('chat-container')}>
//         {chatData.map((chat) => (
//           <div 
//             key={chat.id} 
//             className={cx('chat-item')} 
//             onClick={() => onSelectFriend(chat)} // Thêm sự kiện onClick
//             role="button" // Cải thiện khả năng truy cập
//             tabIndex={0} // Cho phép focus bằng bàn phím
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' || e.key === ' ') { // Hỗ trợ nhấn Enter hoặc Space
//                 onSelectFriend(chat);
//               }
//             }}
//           >
//             {/* Avatar */}
//             <div className={cx('avatar-section')}>
//               <img 
//                 src={`http://localhost:5000${chat.avatar}`}
//                 alt={chat.name}
//                 className={cx('avatar')}
//               />
//               {chat.isOfficial && (
//                 <div className={cx('official-badge')}>
//                   <span>Z</span>
//                 </div>
//               )}
//             </div>

//             {/* Content */}
//             <div className={cx('content')}>
//               <div className={cx('header')}>
//                 <div className={cx('title-section')}>
//                   {chat.isGroup && renderGroupMembers(chat)}
//                   <h3 className={cx('name')}>{chat.name}</h3>
//                 </div>
//                 <div className={cx('meta')}>
//                   {chat.isPinned && (
//                     <Pin className={cx('pin-icon')} />
//                   )}
//                   <span className={cx('time')}>{chat.time}</span>
//                 </div>
//               </div>
              
//               <div className={cx('message-section')}>
//                 <p className={cx('message', 'custom-font')}>{chat.message}</p>
//                 {chat.unreadCount > 0 && (
//                   <div className={cx('unread-badge')}>
//                     {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ChatList;




// import React, { useEffect, useState } from 'react';
// import classNames from 'classnames/bind';
// import styles from './chatList.module.scss';
// import { Pin, Users } from 'lucide-react';
// import axios from 'axios';

// const cx = classNames.bind(styles);

// function ChatList({ onSelectFriend, chatData1, onUpdateChat, setUpdateChatList }) {
//   const [userChats, setUserChats] = useState([]);
//   const [leakInfoList, setLeakInfoList] = useState([]);

//   // Lấy danh sách chat
//   useEffect(() => {
//     if (!chatData1) return;

//     const fetchChats = async () => {
//       try {
//         const res = await axios.post('http://localhost:5000/api/chat/chat-list', { userId: chatData1 });
//         if (res.status === 200) {
//           setUserChats(res.data);
//           console.log('[ChatList] Danh sách chat:', res.data);
//         }
//       } catch (err) {
//         console.error('[ChatList] Lỗi khi lấy danh sách chat:', err);
//       }
//     };

//     fetchChats();
//   }, [chatData1]);

//   // Lấy thông tin người dùng
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const userIdsToFetch = userChats.map((chat) =>
//           chat.members.find((member) => member !== chatData1)
//         );

//         if (userIdsToFetch.length === 0) return;

//         const promises = userIdsToFetch.map((userId) =>
//           axios.post('http://localhost:5000/api/auth/leak-info1', { data: userId })
//         );

//         const results = await Promise.all(promises);
//         setLeakInfoList(results.map((res) => res.data));
//         console.log('[ChatList] Thông tin người dùng:', results.map((res) => res.data));
//       } catch (err) {
//         console.log('[ChatList] Lỗi khi lấy thông tin người dùng:', err);
//       }
//     };

//     if (userChats.length > 0) {
//       fetchAll();
//     }
//   }, [userChats, chatData1]);

//   // Hàm cập nhật chat khi có tin nhắn mới
//   const updateChatInList = (chatId, messageData) => {
//     console.log('[ChatList] updateChatInList được gọi với:', { chatId, messageData });
//     setUserChats((prevChats) => {
//       const updatedChats = prevChats.map((chat) =>
//         chat.id === chatId
//           ? {
//               ...chat,
//               last_message: {
//                 content: messageData.message_type === 'text' 
//                   ? messageData.content 
//                   : messageData.message_type, // Hiển thị "image", "video", hoặc "file"
//                 sender: messageData.sender,
//                 timestamp: messageData.timestamp,
//                 message_type: messageData.message_type,
//               },
//             }
//           : chat
//       );

//       // Sắp xếp để đưa chat có tin nhắn mới lên đầu
//       const updatedChat = updatedChats.find((chat) => chat.id === chatId);
//       const otherChats = updatedChats.filter((chat) => chat.id !== chatId);

//       console.log('[ChatList] Cập nhật userChats:', [updatedChat, ...otherChats]);
//       return updatedChat ? [updatedChat, ...otherChats] : updatedChats;
//     });
//   };

//   // Đăng ký hàm updateChatInList với Dashboard
//   useEffect(() => {
//     if (setUpdateChatList && typeof setUpdateChatList === 'function') {
//       console.log('[ChatList] Đăng ký updateChatInList với Dashboard');
//       setUpdateChatList(updateChatInList);
//     } else {
//       console.warn('[ChatList] setUpdateChatList không phải là hàm hoặc không được truyền:', setUpdateChatList);
//     }
//   }, [setUpdateChatList]);

//   // Logic xử lý dữ liệu chat
//   const chatData = userChats.map((chat, index) => {
//     const userInfo = leakInfoList && leakInfoList[index] ? leakInfoList[index] : {};

//     const timel = chat.last_message?.timestamp;
//     const dateToCheck = new Date(timel);
//     const now = new Date();
//     const diffMs = now - dateToCheck;

//     let tx = '';
//     if (diffMs <= 0 || isNaN(diffMs)) tx = 'Vài giây';
//     else {
//       const diffSeconds = Math.floor(diffMs / 1000);
//       const diffMinutes = Math.floor(diffSeconds / 60);
//       const diffHours = Math.floor(diffMinutes / 60);
//       const diffDays = Math.floor(diffHours / 24);

//       if (diffDays > 7) {
//         const day = dateToCheck.getDate();
//         const month = dateToCheck.getMonth() + 1;
//         tx = `${day}/${month}`;
//       } else if (diffDays > 0) tx = `${diffDays} ngày`;
//       else if (diffHours > 0) tx = `${diffHours} giờ`;
//       else if (diffMinutes > 0) tx = `${diffMinutes} phút`;
//       else tx = 'Vài giây';
//     }

//     let msg = '';
//     if (chat.last_message?.sender !== chatData1) {
//       msg = chat.last_message?.content || '';
//     } else {
//       msg = 'Bạn: ' + (chat.last_message?.content || '');
//     }

//     return {
//       id: chat.id,
//       avatar: userInfo.avatar || '/default-avatar.png',
//       name: userInfo.fullname || 'Đang tải...',
//       message: msg,
//       time: tx,
//       isPinned: true,
//       unreadCount: 0,
//       member: chat.members[0] === chatData1 ? chat.members[1] : chat.members[0],
//       gender: userInfo.gender,
//       sender: chatData1,
//     };
//   });

//   const renderGroupMembers = (chat) => {
//     if (!chat.isGroup) return null;

//     return (
//       <div className={cx('group-info')}>
//         <Users className={cx('group-icon')} />
//         {chat.groupMembers && (
//           <div className={cx('member-avatars')}>
//             {chat.groupMembers.slice(0, 2).map((member, index) => (
//               <div key={index} className={cx('member-avatar')}>
//                 <img src={member} alt="" />
//               </div>
//             ))}
//           </div>
//         )}
//         {chat.memberCount && <span className={cx('member-count')}>{chat.memberCount}</span>}
//       </div>
//     );
//   };

//   return (
//     <div className={cx('chatList')}>
//       <div className={cx('chat-container')}>
//         {chatData.map((chat) => (
//           <div
//             key={chat.id}
//             className={cx('chat-item')}
//             onClick={() => onSelectFriend(chat)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' || e.key === ' ') {
//                 onSelectFriend(chat);
//               }
//             }}
//           >
//             <div className={cx('avatar-section')}>
//               <img src={`http://localhost:5000${chat.avatar}`} alt={chat.name} className={cx('avatar')} />
//               {chat.isOfficial && (
//                 <div className={cx('official-badge')}>
//                   <span>Z</span>
//                 </div>
//               )}
//             </div>
//             <div className={cx('content')}>
//               <div className={cx('header')}>
//                 <div className={cx('title-section')}>
//                   {chat.isGroup && renderGroupMembers(chat)}
//                   <h3 className={cx('name')}>{chat.name}</h3>
//                 </div>
//                 <div className={cx('meta')}>
//                   {chat.isPinned && <Pin className={cx('pin-icon')} />}
//                   <span className={cx('time')}>{chat.time}</span>
//                 </div>
//               </div>
//               <div className={cx('message-section')}>
//                 <p className={cx('message', 'custom-font')}>{chat.message}</p>
//                 {chat.unreadCount > 0 && (
//                   <div className={cx('unread-badge')}>
//                     {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ChatList;




// import React, { useEffect, useState } from 'react';
// import classNames from 'classnames/bind';
// import styles from './chatList.module.scss';
// import { Pin, Users } from 'lucide-react';
// import axios from 'axios';

// const cx = classNames.bind(styles);

// function ChatList({ onSelectFriend, chatData1, setUpdateChatList }) {
//   const [userChats, setUserChats] = useState([]);
//   const [leakInfoMap, setLeakInfoMap] = useState({});
//   const [selectedChatId, setSelectedChatId] = useState(null);

//   // Lấy danh sách chat
//   useEffect(() => {
//     if (!chatData1) return;

//     const fetchChats = async () => {
//       try {
//         const res = await axios.post('http://localhost:5000/api/chat/chat-list', { userId: chatData1 });
//         if (res.status === 200) {
//           setUserChats(res.data);
//           console.log('[ChatList] Danh sách chat:', res.data);
//         }
//       } catch (err) {
//         console.error('[ChatList] Lỗi khi lấy danh sách chat:', err);
//       }
//     };

//     fetchChats();
//   }, [chatData1]);

//   // Lấy thông tin người dùng
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const userIdsToFetch = userChats.map((chat) =>
//           chat.members.find((member) => member !== chatData1)
//         );

//         const uniqueUserIds = [...new Set(userIdsToFetch)].filter(userId => !(userId in leakInfoMap));

//         if (uniqueUserIds.length === 0) return;

//         const promises = uniqueUserIds.map((userId) =>
//           axios.post('http://localhost:5000/api/auth/leak-info1', { data: userId })
//         );

//         const results = await Promise.all(promises);

//         const newLeakInfoMap = { ...leakInfoMap };
//         results.forEach((res, index) => {
//           const userId = uniqueUserIds[index];
//           newLeakInfoMap[userId] = res.data;
//         });

//         setLeakInfoMap(newLeakInfoMap);
//         console.log('[ChatList] Thông tin người dùng (map):', newLeakInfoMap);
//       } catch (err) {
//         console.log('[ChatList] Lỗi khi lấy thông tin người dùng:', err);
//       }
//     };

//     if (userChats.length > 0 && Object.keys(leakInfoMap).length < userChats.length) {
//       fetchAll();
//     }
//   }, [userChats, chatData1, leakInfoMap]);

//   // Hàm cập nhật chat khi có tin nhắn mới
//   const updateChatInList = (chatId, messageData) => {
//     console.log('[ChatList] updateChatInList được gọi với:', { chatId, messageData });
//     setUserChats((prevChats) => {
//       const chatExists = prevChats.find((chat) => chat.id === chatId);
//       if (!chatExists) {
//         console.warn('[ChatList] ChatId không tồn tại:', chatId);
//         return prevChats;
//       }

//       const updatedChats = prevChats.map((chat) =>
//         chat.id === chatId
//           ? {
//               ...chat,
//               last_message: {
//                 content: messageData.message_type === 'text'
//                   ? messageData.content
//                   : messageData.message_type,
//                 sender: messageData.sender,
//                 timestamp: messageData.timestamp,
//                 message_type: messageData.message_type,
//               },
//             }
//           : chat
//       );

//       // Sắp xếp theo timestamp của last_message
//       const sortedChats = [...updatedChats].sort((a, b) => {
//         const timeA = new Date(a.last_message?.timestamp || 0).getTime();
//         const timeB = new Date(b.last_message?.timestamp || 0).getTime();
//         return timeB - timeA;
//       });

//       console.log('[ChatList] Cập nhật userChats (sorted):', sortedChats);
//       return sortedChats;
//     });
//   };

//   // Đăng ký hàm updateChatInList với Dashboard
//   useEffect(() => {
//     if (setUpdateChatList && typeof setUpdateChatList === 'function') {
//       console.log('[ChatList] Đăng ký updateChatInList với Dashboard');
//       setUpdateChatList(updateChatInList);
//     } else {
//       console.warn('[ChatList] setUpdateChatList không phải là hàm hoặc không được truyền:', setUpdateChatList);
//     }
//   }, [setUpdateChatList]);

//   // Xử lý khi chọn một friend
//   const handleSelectFriend = (chat) => {
//     setSelectedChatId(chat.id);
//     onSelectFriend(chat);
//     console.log('[ChatList] Đã chọn chat:', { chatId: chat.id, name: chat.name });
//   };

//   // Logic xử lý dữ liệu chat
//   const chatData = userChats.map((chat) => {
//     const otherUserId = chat.members.find((member) => member !== chatData1);
//     const userInfo = leakInfoMap[otherUserId] || {};

//     const timel = chat.last_message?.timestamp;
//     const dateToCheck = new Date(timel);
//     const now = new Date();
//     const diffMs = now - dateToCheck;

//     let tx = '';
//     if (diffMs <= 0 || isNaN(diffMs)) tx = 'Vài giây';
//     else {
//       const diffSeconds = Math.floor(diffMs / 1000);
//       const diffMinutes = Math.floor(diffSeconds / 60);
//       const diffHours = Math.floor(diffMinutes / 60);
//       const diffDays = Math.floor(diffHours / 24);

//       if (diffDays > 7) {
//         const day = dateToCheck.getDate();
//         const month = dateToCheck.getMonth() + 1;
//         tx = `${day}/${month}`;
//       } else if (diffDays > 0) tx = `${diffDays} ngày`;
//       else if (diffHours > 0) tx = `${diffHours} giờ`;
//       else if (diffMinutes > 0) tx = `${diffMinutes} phút`;
//       else tx = 'Vài giây';
//     }

//     let msg = '';
//     if (chat.last_message?.sender !== chatData1) {
//       msg = chat.last_message?.content || '';
//     } else {
//       msg = 'Bạn: ' + (chat.last_message?.content || '');
//     }

//     return {
//       id: chat.id,
//       avatar: userInfo.avatar || '/default-avatar.png',
//       name: userInfo.fullname || 'Đang tải...',
//       message: msg,
//       time: tx,
//       isPinned: true,
//       unreadCount: 0,
//       member: chat.members[0] === chatData1 ? chat.members[1] : chat.members[0],
//       gender: userInfo.gender,
//       sender: chatData1,
//     };
//   });

//   const renderGroupMembers = (chat) => {
//     if (!chat.isGroup) return null;

//     return (
//       <div className={cx('group-info')}>
//         <Users className={cx('group-icon')} />
//         {chat.groupMembers && (
//           <div className={cx('member-avatars')}>
//             {chat.groupMembers.slice(0, 2).map((member, index) => (
//               <div key={index} className={cx('member-avatar')}>
//                 <img src={member} alt="" />
//               </div>
//             ))}
//           </div>
//         )}
//         {chat.memberCount && <span className={cx('member-count')}>{chat.memberCount}</span>}
//       </div>
//     );
//   };

//   return (
//     <div className={cx('chatList')}>
//       <div className={cx('chat-container')}>
//         {chatData.map((chat) => (
//           <div
//             key={chat.id}
//             className={cx('chat-item', { 'selected': chat.id === selectedChatId })}
//             onClick={() => handleSelectFriend(chat)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={(e) => {
//               if (e.key === 'Enter' || e.key === ' ') {
//                 handleSelectFriend(chat);
//               }
//             }}
//           >
//             <div className={cx('avatar-section')}>
//               <img src={`http://localhost:5000${chat.avatar}`} alt={chat.name} className={cx('avatar')} />
//               {chat.isOfficial && (
//                 <div className={cx('official-badge')}>
//                   <span>Z</span>
//                 </div>
//               )}
//             </div>
//             <div className={cx('content')}>
//               <div className={cx('header')}>
//                 <div className={cx('title-section')}>
//                   {chat.isGroup && renderGroupMembers(chat)}
//                   <h3 className={cx('name')}>{chat.name}</h3>
//                 </div>
//                 <div className={cx('meta')}>
//                   {chat.isPinned && <Pin className={cx('pin-icon')} />}
//                   <span className={cx('time')}>{chat.time}</span>
//                 </div>
//               </div>
//               <div className={cx('message-section')}>
//                 <p className={cx('message', 'custom-font')}>{chat.message}</p>
//                 {chat.unreadCount > 0 && (
//                   <div className={cx('unread-badge')}>
//                     {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ChatList;


import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './chatList.module.scss';
import { Pin, Users, File, Image, Video } from 'lucide-react';
import axios from 'axios';

const cx = classNames.bind(styles);

function ChatList({ onSelectFriend, chatData1, setUpdateChatList }) {
  const [userChats, setUserChats] = useState([]);
  const [leakInfoMap, setLeakInfoMap] = useState({});
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date()); // Track current time for real-time updates

  // Lấy danh sách chat
  useEffect(() => {
    if (!chatData1) return;

    const fetchChats = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/chat/chat-list', { userId: chatData1 });
        if (res.status === 200) {
          setUserChats(res.data);
          console.log('[ChatList] Danh sách chat:', res.data);
        }
      } catch (err) {
        console.error('[ChatList] Lỗi khi lấy danh sách chat:', err);
      }
    };

    fetchChats();
  }, [chatData1]);

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const userIdsToFetch = userChats.map((chat) =>
          chat.members.find((member) => member !== chatData1)
        );

        const uniqueUserIds = [...new Set(userIdsToFetch)].filter(userId => !(userId in leakInfoMap));

        if (uniqueUserIds.length === 0) return;

        const promises = uniqueUserIds.map((userId) =>
          axios.post('http://localhost:5000/api/auth/leak-info1', { data: userId })
        );

        const results = await Promise.all(promises);

        const newLeakInfoMap = { ...leakInfoMap };
        results.forEach((res, index) => {
          const userId = uniqueUserIds[index];
          newLeakInfoMap[userId] = res.data;
        });

        setLeakInfoMap(newLeakInfoMap);
        console.log('[ChatList] Thông tin người dùng (map):', newLeakInfoMap);
      } catch (err) {
        console.log('[ChatList] Lỗi khi lấy thông tin người dùng:', err);
      }
    };

    if (userChats.length > 0 && Object.keys(leakInfoMap).length < userChats.length) {
      fetchAll();
    }
  }, [userChats, chatData1, leakInfoMap]);

  // Hàm cập nhật chat khi có tin nhắn mới
  const updateChatInList = (chatId, messageData) => {
    console.log('[ChatList] updateChatInList được gọi với:', { chatId, messageData });
    setUserChats((prevChats) => {
      const chatExists = prevChats.find((chat) => chat.id === chatId);
      if (!chatExists) {
        console.warn('[ChatList] ChatId không tồn tại:', chatId);
        return prevChats;
      }

      const updatedChats = prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              last_message: {
                content: messageData.message_type === 'text'
                  ? messageData.content
                  : messageData.message_type,
                sender: messageData.sender,
                timestamp: messageData.timestamp,
                message_type: messageData.message_type,
              },
            }
          : chat
      );

      // Sắp xếp theo timestamp của last_message
      const sortedChats = [...updatedChats].sort((a, b) => {
        const timeA = new Date(a.last_message?.timestamp || 0).getTime();
        const timeB = new Date(b.last_message?.timestamp || 0).getTime();
        return timeB - timeA;
      });

      console.log('[ChatList] Cập nhật userChats (sorted):', sortedChats);
      return sortedChats;
    });
  };

  // Đăng ký hàm updateChatInList với Dashboard
  useEffect(() => {
    if (setUpdateChatList && typeof setUpdateChatList === 'function') {
      console.log('[ChatList] Đăng ký updateChatInList với Dashboard');
      setUpdateChatList(updateChatInList);
    } else {
      console.warn('[ChatList] setUpdateChatList không phải là hàm hoặc không được truyền:', setUpdateChatList);
    }
  }, [setUpdateChatList]);

  // Cập nhật thời gian real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Cập nhật mỗi phút

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  // Xử lý khi chọn một friend
  const handleSelectFriend = (chat) => {
    setSelectedChatId(chat.id);
    onSelectFriend(chat);
    console.log('[ChatList] Đã chọn chat:', { chatId: chat.id, name: chat.name });
  };

  // Logic xử lý dữ liệu chat
  const chatData = userChats.map((chat) => {
    const otherUserId = chat.members.find((member) => member !== chatData1);
    const userInfo = leakInfoMap[otherUserId] || {};

    const timel = chat.last_message?.timestamp;
    const dateToCheck = new Date(timel);
    const now = currentTime; // Sử dụng currentTime để tính thời gian real-time
    const diffMs = now - dateToCheck;

    let tx = '';
    if (diffMs <= 0 || isNaN(diffMs)) tx = 'Vài giây';
    else {
      const diffSeconds = Math.floor(diffMs / 1000);
      const diffMinutes = Math.floor(diffSeconds / 60);
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 7) {
        const day = dateToCheck.getDate();
        const month = dateToCheck.getMonth() + 1;
        tx = `${day}/${month}`;
      } else if (diffDays > 0) tx = `${diffDays} ngày`;
      else if (diffHours > 0) tx = `${diffHours} giờ`;
      else if (diffMinutes > 0) tx = `${diffMinutes} phút`;
      else tx = 'Vài giây';
    }

    let msg = '';
    const messageType = chat.last_message?.message_type;
    const prefix = chat.last_message?.sender !== chatData1 ? '' : 'Bạn: ';

    if (messageType === 'text') {
      msg = prefix + (chat.last_message?.content || '');
    } else if (messageType === 'image') {
      msg = prefix + 'Hình ảnh';
    } else if (messageType === 'video') {
      msg = prefix + 'Video';
    } else if (messageType === 'file') {
      msg = prefix + 'Tệp';
    } else {
      msg = prefix + (chat.last_message?.content || '');
    }

    return {
      id: chat.id,
      avatar: userInfo.avatar || '/default-avatar.png',
      name: userInfo.fullname || 'Đang tải...',
      message: msg,
      time: tx,
      isPinned: true,
      unreadCount: 0,
      member: chat.members[0] === chatData1 ? chat.members[1] : chat.members[0],
      gender: userInfo.gender,
      sender: chatData1,
      messageType: messageType, // Lưu message_type để sử dụng trong render
    };
  });

  const renderGroupMembers = (chat) => {
    if (!chat.isGroup) return null;

    return (
      <div className={cx('group-info')}>
        <Users className={cx('group-icon')} />
        {chat.groupMembers && (
          <div className={cx('member-avatars')}>
            {chat.groupMembers.slice(0, 2).map((member, index) => (
              <div key={index} className={cx('member-avatar')}>
                <img src={member} alt="" />
              </div>
            ))}
          </div>
        )}
        {chat.memberCount && <span className={cx('member-count')}>{chat.memberCount}</span>}
      </div>
    );
  };

  return (
    <div className={cx('chatList')}>
      <div className={cx('chat-container')}>
        {chatData.map((chat) => (
          <div
            key={chat.id}
            className={cx('chat-item', { 'selected': chat.id === selectedChatId })}
            onClick={() => handleSelectFriend(chat)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSelectFriend(chat);
              }
            }}
          >
            <div className={cx('avatar-section')}>
              <img src={`http://localhost:5000${chat.avatar}`} alt={chat.name} className={cx('avatar')} />
              {chat.isOfficial && (
                <div className={cx('official-badge')}>
                  <span>Z</span>
                </div>
              )}
            </div>
            <div className={cx('content')}>
              <div className={cx('header')}>
                <div className={cx('title-section')}>
                  {chat.isGroup && renderGroupMembers(chat)}
                  <h3 className={cx('name')}>{chat.name}</h3>
                </div>
                <div className={cx('meta')}>
                  {chat.isPinned && <Pin className={cx('pin-icon')} />}
                  <span className={cx('time')}>{chat.time}</span>
                </div>
              </div>
              <div className={cx('message-section')}>
                <div className={cx('message-wrapper')}>
                  {chat.messageType === 'image' && <Image className={cx('message-icon')} size={16} />}
                  {chat.messageType === 'video' && <Video className={cx('message-icon')} size={16} />}
                  {chat.messageType === 'file' && <File className={cx('message-icon')} size={16} />}
                  <p className={cx('message', 'custom-font')}>{chat.message}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className={cx('unread-badge')}>
                    {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatList;