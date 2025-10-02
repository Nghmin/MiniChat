

// // import classNames from "classnames/bind";
// // import styles from "./Chat.module.scss";
// // import { useState, useEffect, useRef, useCallback } from "react";
// // import ProFile1 from "~/pages/ProFile1";
// // import ChatPreview from "./ChatPreview";
// // import FriendRequestBar from "./FriendRequestBar";
// // import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
// // import ChatHeader from "./ChatHeader";
// // import { FileText } from "lucide-react";
// // import axios from "axios";
// // import { io } from "socket.io-client";

// // const cx = classNames.bind(styles);

// // function Chat({ friend, onToggleDetail, onUpdateChat }) {
// //   const [open, setOpen] = useState(false);
// //   const [text, setText] = useState("");
// //   const [showProfile, setShowProFile] = useState(false);
// //   const [previewImage, setPreviewImage] = useState(null);
// //   const messagesContainerRef = useRef(null);
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isLoadingMore, setIsLoadingMore] = useState(false);
// //   const [hasMore, setHasMore] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showSendRequestBar, setShowSendRequestBar] = useState(false);
// //   const socketRef = useRef(null);

// //   const handleAvatarClick = useCallback(() => {
// //     setShowProFile(true);
// //   }, []);

// //   const handleSendFriendRequest = useCallback((friendId, friendName) => {
// //     console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
// //   }, []);

// //   const handleConfirmFriendRequest = useCallback((friendId, friendName) => {
// //     console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// //   }, []);

// //   const handleRejectFriendRequest = useCallback((friendId, friendName) => {
// //     console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
// //   }, []);

// //   const handleClosePreview = useCallback(() => {
// //     setPreviewImage(null);
// //   }, []);

// //   const formatTime = (dateObj) => {
// //     return dateObj.toLocaleTimeString("vi-VN", {
// //       hour: "2-digit",
// //       minute: "2-digit",
// //       hour12: true,
// //     });
// //   };

// //   const formatSeparator = (dateObj) => {
// //     return (
// //       dateObj.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
// //       " " +
// //       formatTime(dateObj)
// //     );
// //   };

// //   const isValidUrl = (url) => {
// //     try {
// //       new URL(url);
// //       return true;
// //     } catch {
// //       return false;
// //     }
// //   };

// //   const renderMessageContent = (message) => {
// //     if (message.uploading) {
// //       return (
// //         <div className={cx("message-uploading")}>
// //           <span>Đang tải {message.fileName}...</span>
// //           <div className={cx("uploading-progress")}>
// //             <div className={cx("progress-bar")}></div>
// //           </div>
// //         </div>
// //       );
// //     }

// //     if (message.error) {
// //       return (
// //         <div className={cx("message-error")}>
// //           <span>Lỗi tải {message.fileName}</span>
// //         </div>
// //       );
// //     }

// //     if (message.temporaryImage || message.image) {
// //       const imageSource = message.temporaryImage || message.image;
// //       const isBase64 = imageSource && imageSource.startsWith("data:image/");

// //       return (
// //         <div
// //           className={cx("message-image", { temporary: message.isTemporary })}
// //           onClick={() => setPreviewImage(imageSource)}
// //           aria-label="Xem trước hình ảnh"
// //         >
// //           <img
// //             src={
// //               isBase64
// //                 ? imageSource
// //                 : imageSource && imageSource.startsWith("http")
// //                 ? imageSource
// //                 : `http://localhost:5000${imageSource}`
// //             }
// //             alt={message.fileName || "Hình ảnh được chia sẻ"}
// //             className={cx("image-content")}
// //             onError={(e) => {
// //               console.error("Lỗi tải hình ảnh:", e.target.src);
// //               e.target.parentElement.style.display = "none";
// //             }}
// //           />
// //           {message.uploading && (
// //             <div className={cx("uploading-indicator")}>
// //               Đang tải...
// //             </div>
// //           )}
// //         </div>
// //       );
// //     }

// //     if (message.temporaryVideo || message.video) {
// //       const videoSource = message.temporaryVideo || message.video;
// //       const isBase64 = videoSource && videoSource.startsWith("data:video/");

// //       return (
// //         <div className={cx("message-video", { temporary: message.isTemporary })}>
// //           <video controls className={cx("video-content")}>
// //             <source
// //               src={
// //                 isBase64
// //                   ? videoSource
// //                   : videoSource && videoSource.startsWith("http")
// //                   ? videoSource
// //                   : `http://localhost:5000${videoSource}`
// //               }
// //               type="video/mp4"
// //             />
// //             Trình duyệt của bạn không hỗ trợ thẻ video.
// //           </video>
// //           {message.uploading && (
// //             <div className={cx("uploading-indicator")}>
// //               Đang tải...
// //             </div>
// //           )}
// //         </div>
// //       );
// //     }

// //     if (message.file) {
// //       const handleDownload = async (url, filename, e) => {
// //         e.preventDefault();
// //         e.stopPropagation();

// //         try {
// //           const response = await fetch(url);
// //           const blob = await response.blob();
// //           const link = document.createElement("a");
// //           link.href = window.URL.createObjectURL(blob);
// //           link.download = filename;
// //           link.click();
// //           window.URL.revokeObjectURL(link.href);
// //         } catch (error) {
// //           console.error("Tải xuống thất bại:", error);
// //         }
// //       };

// //       const fileUrl = message.file.url.startsWith("http")
// //         ? message.file.url
// //         : `http://localhost:5000${message.file.url}`;

// //       return (
// //         <div className={cx("message-file")}>
// //           <div className={cx("file-container")}>
// //             <div className={cx("file-icon")}>
// //               <FileText size={20} />
// //             </div>
// //             <div className={cx("file-info")}>
// //               <div className={cx("file-name")}>{message.file.name}</div>
// //               {message.file.url && (
// //                 <a
// //                   href={fileUrl}
// //                   className={cx("download-link")}
// //                   onClick={(e) => handleDownload(fileUrl, message.file.name, e)}
// //                 >
// //                   Tải xuống
// //                 </a>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       );
// //     }

// //     if (typeof message.text === "string" && message.text) {
// //       const urlRegex = /(https?:\/\/[^\s]+)/g;
// //       const parts = message.text.split(urlRegex);
// //       return (
// //         <span>
// //           {parts.map((part, index) => {
// //             if (part.match(urlRegex) && isValidUrl(part)) {
// //               return (
// //                 <a
// //                   key={index}
// //                   href={part}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className={cx("message-link")}
// //                 >
// //                   {part}
// //                 </a>
// //               );
// //             }
// //             return part;
// //           })}
// //         </span>
// //       );
// //     }
// //     return <span>{message.text || ""}</span>;
// //   };

// //   const scrollToBottom = useCallback(() => {
// //     if (messagesContainerRef.current) {
// //       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
// //     }
// //   }, []);

// //   useEffect(() => {
// //     if (messages.length > 0) {
// //       const lastMessage = messages[messages.length - 1];
// //       const previousLastMessageId = localStorage.getItem('lastMessageId');
// //       if (!previousLastMessageId || previousLastMessageId !== lastMessage.id.toString()) {
// //         scrollToBottom();
// //         localStorage.setItem('lastMessageId', lastMessage.id.toString());
// //       }
// //     }
// //   }, [messages.length, scrollToBottom]);

// //   // Socket connection - sửa đổi để luôn lắng nghe tất cả tin nhắn
// //   useEffect(() => {
// //     if (!friend?.sender) return; // Sử dụng friend.sender như code gốc

// //     // Kết nối socket với userId của người dùng hiện tại
// //     socketRef.current = io("http://localhost:5000", {
// //       query: { userId: friend.sender },
// //     });

// //     // Lắng nghe tin nhắn từ tất cả cuộc trò chuyện
// //     socketRef.current.on("receiveMessage", (data) => {
// //       console.log("Nhận tin nhắn qua Socket.IO:", data);
      
// //       const receivedMessage = {
// //         id: data.message.id || Date.now() + Math.random(),
// //         text: data.message.message_type === "text" && typeof data.message.content === "string" ? data.message.content : "",
// //         type: data.message.sender === friend.sender ? "sent" : "received",
// //         timestamp: new Date(data.message.timestamp),
// //         temporaryImage: data.message.message_type === "image" && data.message.base64Data ? data.message.base64Data : null,
// //         image: data.message.message_type === "image" && data.message.url ? `http://localhost:5000${data.message.url}` : null,
// //         temporaryVideo: data.message.message_type === "video" && data.message.base64Data ? data.message.base64Data : null,
// //         video: data.message.message_type === "video" && data.message.url ? `http://localhost:5000${data.message.url}` : null,
// //         file: data.message.message_type === "file" ? {
// //           name: data.message.content,
// //           url: data.message.url ? `http://localhost:5000${data.message.url}` : null,
// //         } : null,
// //         isTemporary: data.message.message_type === "file" ? false : !!data.message.base64Data,
// //       };

// //       // Nếu tin nhắn thuộc về cuộc trò chuyện hiện tại, thêm vào messages
// //       if (data.message.conversation_id === friend.id) {
// //         setMessages((prev) => {
// //           const existingMessageIndex = prev.findIndex((msg) => msg.id === receivedMessage.id);
// //           if (existingMessageIndex !== -1) {
// //             const updatedMessages = [...prev];
// //             updatedMessages[existingMessageIndex] = {
// //               ...updatedMessages[existingMessageIndex],
// //               temporaryImage: receivedMessage.temporaryImage || updatedMessages[existingMessageIndex].temporaryImage,
// //               image: receivedMessage.image || updatedMessages[existingMessageIndex].image,
// //               temporaryVideo: receivedMessage.temporaryVideo || updatedMessages[existingMessageIndex].temporaryVideo,
// //               video: receivedMessage.video || updatedMessages[existingMessageIndex].video,
// //               file: receivedMessage.file || updatedMessages[existingMessageIndex].file,
// //               isTemporary: data.message.message_type === "file" ? false : false,
// //             };
// //             return updatedMessages;
// //           }
// //           if (!prev.length || receivedMessage.timestamp > prev[prev.length - 1].timestamp) {
// //             return [...prev, receivedMessage];
// //           }
// //           return prev;
// //         });
// //       }

// //       // Luôn cập nhật chat list cho tất cả tin nhắn (không phụ thuộc vào cuộc trò chuyện hiện tại)
// //       if (onUpdateChat) {
// //         console.log("Gọi onUpdateChat từ receiveMessage (global):", data.message.conversation_id, {
// //           content: receivedMessage.text || receivedMessage.file?.name || "Media",
// //           sender: data.message.sender,
// //           timestamp: data.message.timestamp,
// //           message_type: data.message.message_type,
// //         });
// //         onUpdateChat(data.message.conversation_id, {
// //           content: receivedMessage.text || receivedMessage.file?.name || "Media",
// //           sender: data.message.sender,
// //           timestamp: data.message.timestamp,
// //           message_type: data.message.message_type,
// //         });
// //       }
// //     });

// //     socketRef.current.on("updateMessage", (data) => {
// //       console.log("Cập nhật tin nhắn qua Socket.IO:", data);
      
// //       // Chỉ cập nhật tin nhắn nếu đang trong cuộc trò chuyện đó
// //       if (data.message.conversation_id === friend.id) {
// //         setMessages((prev) =>
// //           prev.map((msg) => {
// //             if (msg.id === data.message.id) {
// //               return {
// //                 ...msg,
// //                 image: data.message.url && data.message.message_type === "image" ? `http://localhost:5000${data.message.url}` : msg.image,
// //                 video: data.message.url && data.message.message_type === "video" ? `http://localhost:5000${data.message.url}` : msg.video,
// //                 file: data.message.url && data.message.message_type === "file" ? {
// //                   name: msg.file?.name || data.message.content,
// //                   url: `http://localhost:5000${data.message.url}`,
// //                 } : msg.file,
// //                 isTemporary: false,
// //                 uploading: false,
// //               };
// //             }
// //             return msg;
// //           })
// //         );
        
// //         // Cập nhật chat list khi có update message
// //         if (onUpdateChat) {
// //           console.log("Gọi onUpdateChat từ updateMessage:", friend.id, {
// //             content: data.message.content || "Media",
// //             sender: friend.sender,
// //             timestamp: new Date().toISOString(),
// //             message_type: data.message.message_type,
// //           });
// //           onUpdateChat(friend.id, {
// //             content: data.message.content || "Media",
// //             sender: friend.sender,
// //             timestamp: new Date().toISOString(),
// //             message_type: data.message.message_type,
// //           });
// //         }
// //       }
// //     });

// //     return () => {
// //       if (socketRef.current) {
// //         socketRef.current.disconnect();
// //         console.log("Ngắt kết nối Socket.IO trong Chat");
// //       }
// //     };
// //   }, [friend, onUpdateChat]); // Giữ nguyên dependencies như code gốc

// //   // Join/leave chat room khi chuyển cuộc trò chuyện
// //   useEffect(() => {
// //     if (socketRef.current && friend?.id) {
// //       socketRef.current.emit("joinChat", friend.id);
// //       console.log("Join chat room:", friend.id);
      
// //       return () => {
// //         if (socketRef.current && friend?.id) {
// //           socketRef.current.emit("leaveChat", friend.id);
// //           console.log("Leave chat room:", friend.id);
// //         }
// //       };
// //     }
// //   }, [friend?.id]);

// //   const fetchMessages = useCallback(async (before = null) => {
// //     if (!friend || !friend.id || !friend.sender) {
// //       setMessages([]);
// //       setLoading(false);
// //       setHasMore(false);
// //       return;
// //     }

// //     try {
// //       const payload = {
// //         friendId: friend.id,
// //         limit: 50,
// //       };
// //       if (before) {
// //         payload.before = before;
// //       }

// //       const response = await axios.post("http://localhost:5000/api/chat/messages/", payload);

// //       if (response.status === 200 && Array.isArray(response.data)) {
// //         const transformedMessages = response.data
// //           .map((msg) => ({
// //             id: msg.id,
// //             text: msg.message_type === "text" && typeof msg.content === "string" ? msg.content : "",
// //             type: msg.sender === friend.sender ? "sent" : "received",
// //             timestamp: new Date(msg.timestamp),
// //             image: msg.message_type === "image" ? `http://localhost:5000${msg.url}` : null,
// //             video: msg.message_type === "video" ? `http://localhost:5000${msg.url}` : null,
// //             file: msg.message_type === "file" ? { name: msg.content, url: `http://localhost:5000${msg.url}` } : null,
// //             isTemporary: false,
// //           }))
// //           .filter((msg) => msg.text || msg.image || msg.video || msg.file);

// //         setMessages((prev) => {
// //           if (before) {
// //             return [...transformedMessages, ...prev].filter((msg, index, self) =>
// //               index === self.findIndex((m) => m.id === msg.id)
// //             );
// //           } else {
// //             localStorage.removeItem('lastMessageId');
// //             return transformedMessages;
// //           }
// //         });

// //         setHasMore(transformedMessages.length === 50);
// //       } else {
// //         setError("Dữ liệu tin nhắn không hợp lệ.");
// //         setHasMore(false);
// //       }
// //     } catch (err) {
// //       setError("Lỗi khi tải tin nhắn: " + err.message);
// //       console.error("Lỗi khi lấy tin nhắn:", err);
// //       setHasMore(false);
// //     } finally {
// //       setLoading(false);
// //       setIsLoadingMore(false);
// //     }
// //   }, [friend]);

// //   useEffect(() => {
// //     setLoading(true);
// //     setIsLoadingMore(false);
// //     setHasMore(true);
// //     setError(null);
// //     setMessages([]);
// //     fetchMessages(null);
// //   }, [friend, fetchMessages]);

// //   const loadMoreMessages = useCallback(() => {
// //     if (messages.length === 0) return;
// //     const firstMessage = messages[0];
// //     const before = firstMessage.timestamp.toISOString();
// //     fetchMessages(before);
// //   }, [messages, fetchMessages]);

// //   const handleScroll = useCallback(() => {
// //     const container = messagesContainerRef.current;
// //     if (!container) return;
// //     if (container.scrollTop <= 100 && hasMore && !isLoadingMore && !loading) {
// //       setIsLoadingMore(true);
// //       loadMoreMessages();
// //     }
// //   }, [hasMore, isLoadingMore, loading, loadMoreMessages]);

// //   useEffect(() => {
// //     const container = messagesContainerRef.current;
// //     if (container) {
// //       container.addEventListener("scroll", handleScroll);
// //       return () => container.removeEventListener("scroll", handleScroll);
// //     }
// //   }, [handleScroll]);

// //   const toggleRequestBar = useCallback(() => {
// //     setShowSendRequestBar((prev) => !prev);
// //   }, []);

// //   const emojis = ["😀", "😂", "😍", "😊", "😎", "🤔", "👍", "❤️", "🎉", "🔥", "💯", "✨"];

// //   const handleEmoji = useCallback((emoji) => {
// //     setText((prev) => prev + emoji);
// //     setOpen(false);
// //   }, []);

// //   const handleSend = useCallback(async () => {
// //     if (!friend || !friend.id || !friend.sender) return;

// //     if (text.trim()) {
// //       const newMessage = {
// //         id: Date.now(),
// //         text: text.trim(),
// //         type: "sent",
// //         timestamp: new Date(),
// //         isTemporary: false,
// //       };
// //       setMessages((prev) => [...prev, newMessage]);
// //       setText("");

// //       if (onUpdateChat) {
// //         console.log("Gọi onUpdateChat từ handleSend:", friend.id, {
// //           content: newMessage.text,
// //           sender: friend.sender,
// //           timestamp: newMessage.timestamp.toISOString(),
// //           message_type: "text",
// //         });
// //         onUpdateChat(friend.id, {
// //           content: newMessage.text,
// //           sender: friend.sender,
// //           timestamp: newMessage.timestamp.toISOString(),
// //           message_type: "text",
// //         });
// //       }

// //       if (socketRef.current) {
// //         socketRef.current.emit("sendMessage", {
// //           toUserId: friend.member,
// //           message: {
// //             id: newMessage.id,
// //             conversation_id: friend.id,
// //             sender: friend.sender,
// //             recipient: friend.member,
// //             content: newMessage.text,
// //             message_type: "text",
// //             timestamp: newMessage.timestamp.toISOString(),
// //             url: null,
// //           },
// //         });
// //       }

// //       try {
// //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// //           id: newMessage.id,
// //           conversationId: friend.id,
// //           sender: friend.sender,
// //           content: text.trim(),
// //           message_type: "text",
// //           timestamp: new Date().toISOString(),
// //           recipient: friend.member,
// //         });
// //       } catch (error) {
// //         console.error("Lỗi gửi tin nhắn:", error);
// //       }
// //     } else {
// //       const likeMessage = {
// //         id: Date.now(),
// //         text: "👍",
// //         type: "sent",
// //         timestamp: new Date(),
// //         isTemporary: false,
// //       };
// //       setMessages((prev) => [...prev, likeMessage]);

// //       if (onUpdateChat) {
// //         console.log("Gọi onUpdateChat từ handleSend (like):", friend.id, {
// //           content: likeMessage.text,
// //           sender: friend.sender,
// //           timestamp: likeMessage.timestamp.toISOString(),
// //           message_type: "text",
// //         });
// //         onUpdateChat(friend.id, {
// //           content: likeMessage.text,
// //           sender: friend.sender,
// //           timestamp: likeMessage.timestamp.toISOString(),
// //           message_type: "text",
// //         });
// //       }

// //       if (socketRef.current) {
// //         socketRef.current.emit("sendMessage", {
// //           toUserId: friend.member,
// //           message: {
// //             id: likeMessage.id,
// //             conversation_id: friend.id,
// //             sender: friend.sender,
// //             recipient: friend.member,
// //             content: "👍",
// //             message_type: "text",
// //             timestamp: likeMessage.timestamp.toISOString(),
// //             url: null,
// //           },
// //         });
// //       }

// //       try {
// //         await axios.post("http://localhost:5000/api/chat/send-message/", {
// //           id: likeMessage.id,
// //           conversationId: friend.id,
// //           sender: friend.sender,
// //           content: "👍",
// //           message_type: "text",
// //           timestamp: new Date().toISOString(),
// //           recipient: friend.member,
// //         });
// //       } catch (error) {
// //         console.error("Lỗi gửi tin nhắn like:", error);
// //       }
// //     }
// //   }, [text, friend, onUpdateChat]);

// //   const handleKeyPress = useCallback((e) => {
// //     if (e.key === "Enter") {
// //       handleSend();
// //     }
// //   }, [handleSend]);

// //   const handleMediaSelect = useCallback(async (e, mediaType) => {
// //     if (!friend || !friend.id || !friend.sender) return;

// //     const file = e.target.files[0];
// //     if (!file) {
// //       alert("Vui lòng chọn một tệp.");
// //       return;
// //     }

// //     if (file.size > 50 * 1024 * 1024) {
// //       alert("Tệp quá lớn. Kích thước tối đa là 50MB.");
// //       return;
// //     }

// //     if (mediaType === "image" && !file.type.startsWith("image/")) {
// //       alert("Vui lòng chọn tệp hình ảnh.");
// //       return;
// //     }

// //     if (mediaType === "video" && !file.type.startsWith("video/")) {
// //       alert("Vui lòng chọn tệp video.");
// //       return;
// //     }

// //     const tempMessageId = Date.now() + Math.random();

// //     if (mediaType === "file") {
// //       await uploadFileDirectly(file, mediaType, tempMessageId);
// //     } else {
// //       const reader = new FileReader();
// //       reader.onload = () => {
// //         const tempMessage = {
// //           id: tempMessageId,
// //           type: "sent",
// //           timestamp: new Date(),
// //           uploading: true,
// //           fileName: file.name,
// //           isTemporary: true,
// //         };

// //         let base64Data = null;
// //         if (mediaType === "image") {
// //           tempMessage.temporaryImage = reader.result;
// //           base64Data = reader.result;
// //         } else if (mediaType === "video") {
// //           tempMessage.temporaryVideo = reader.result;
// //           base64Data = reader.result;
// //         }

// //         setMessages((prev) => [...prev, tempMessage]);
// //         scrollToBottom();

// //         if (onUpdateChat) {
// //           console.log("Gọi onUpdateChat từ handleMediaSelect:", friend.id, {
// //             content: file.name,
// //             sender: friend.sender,
// //             timestamp: new Date().toISOString(),
// //             message_type: mediaType,
// //           });
// //           onUpdateChat(friend.id, {
// //             content: file.name,
// //             sender: friend.sender,
// //             timestamp: new Date().toISOString(),
// //             message_type: mediaType,
// //           });
// //         }

// //         if (socketRef.current) {
// //           socketRef.current.emit("sendMessage", {
// //             toUserId: friend.member,
// //             message: {
// //               id: tempMessageId,
// //               conversation_id: friend.id,
// //               sender: friend.sender,
// //               recipient: friend.member,
// //               content: file.name,
// //               message_type: mediaType,
// //               timestamp: new Date().toISOString(),
// //               url: null,
// //               base64Data: base64Data,
// //             },
// //           });
// //         }

// //         uploadFileToServer(file, mediaType, tempMessageId, base64Data);
// //       };

// //       reader.onerror = () => {
// //         alert("Lỗi khi đọc tệp.");
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   }, [friend, scrollToBottom, onUpdateChat]);

// //   const uploadFileDirectly = async (file, mediaType, messageId) => {
// //     if (!friend || !friend.id || !friend.sender) return;

// //     const formData = new FormData();
// //     formData.append("file", file, encodeURIComponent(file.name));

// //     try {
// //       const uploadingMessage = {
// //         id: messageId,
// //         type: "sent",
// //         timestamp: new Date(),
// //         uploading: true,
// //         fileName: file.name,
// //         isTemporary: false,
// //       };
// //       setMessages((prev) => [...prev, uploadingMessage]);
// //       scrollToBottom();

// //       if (onUpdateChat) {
// //         console.log("Gọi onUpdateChat từ uploadFileDirectly:", friend.id, {
// //           content: decodeURIComponent(file.name),
// //           sender: friend.sender,
// //           timestamp: new Date().toISOString(),
// //           message_type: mediaType,
// //         });
// //         onUpdateChat(friend.id, {
// //           content: decodeURIComponent(file.name),
// //           sender: friend.sender,
// //           timestamp: new Date().toISOString(),
// //           message_type: mediaType,
// //         });
// //       }

// //       const uploadResponse = await axios.post(`http://localhost:5000/upload-file`, formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //           "Accept": "application/json",
// //         },
// //       });

// //       if (uploadResponse.data.url) {
// //         const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");
// //         const fullUrl = uploadResponse.data.url;

// //         const fileMessage = {
// //           id: messageId,
// //           type: "sent",
// //           timestamp: new Date(),
// //           uploading: false,
// //           fileName: file.name,
// //           file: {
// //             name: decodeURIComponent(file.name),
// //             url: fullUrl,
// //           },
// //           isTemporary: false,
// //         };

// //         setMessages((prev) =>
// //           prev.map((msg) => {
// //             if (msg.id === messageId) {
// //               return fileMessage;
// //             }
// //             return msg;
// //           })
// //         );

// //         if (onUpdateChat) {
// //           console.log("Gọi onUpdateChat từ uploadFileDirectly (success):", friend.id, {
// //             content: decodeURIComponent(file.name),
// //             sender: friend.sender,
// //             timestamp: new Date().toISOString(),
// //             message_type: mediaType,
// //           });
// //           onUpdateChat(friend.id, {
// //             content: decodeURIComponent(file.name),
// //             sender: friend.sender,
// //             timestamp: new Date().toISOString(),
// //             message_type: mediaType,
// //           });
// //         }

// //         if (socketRef.current) {
// //           socketRef.current.emit("sendMessage", {
// //             toUserId: friend.member,
// //             message: {
// //               id: messageId,
// //               conversation_id: friend.id,
// //               sender: friend.sender,
// //               recipient: friend.member,
// //               content: decodeURIComponent(file.name),
// //               message_type: mediaType,
// //               timestamp: new Date().toISOString(),
// //               url: filePath,
// //             },
// //           });
// //         }

// //         try {
// //           await axios.post("http://localhost:5000/api/chat/send-message/", {
// //             id: messageId,
// //             conversationId: friend.id,
// //             sender: friend.sender,
// //             content: decodeURIComponent(file.name),
// //             message_type: mediaType,
// //             timestamp: new Date().toISOString(),
// //             recipient: friend.member,
// //             url: filePath,
// //           });
// //         } catch (messageError) {
// //           console.error("Lỗi gửi tin nhắn:", messageError);
// //         }
// //       }
// //     } catch (uploadError) {
// //       setMessages((prev) =>
// //         prev.map((msg) => {
// //           if (msg.id === messageId) {
// //             return {
// //               ...msg,
// //               uploading: false,
// //               error: true,
// //               isTemporary: false,
// //             };
// //           }
// //           return msg;
// //         })
// //       );
// //       alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
// //     }
// //   };

// //   const uploadFileToServer = async (file, mediaType, messageId, base64Data = null) => {
// //     if (!friend || !friend.id || !friend.sender) return;

// //     const formData = new FormData();
// //     let endpoint;

// //     if (mediaType === "image") {
// //       formData.append("file", file, encodeURIComponent(file.name));
// //       endpoint = "/upload-file";
// //     } else if (mediaType === "video") {
// //       formData.append("video", file, encodeURIComponent(file.name));
// //       endpoint = "/upload-video";
// //     }

// //     try {
// //       const uploadResponse = await axios.post(`http://localhost:5000${endpoint}`, formData, {
// //         headers: {
// //           "Content-Type": "multipart/form-data",
// //           "Accept": "application/json",
// //         },
// //       });

// //       if (uploadResponse.data.url) {
// //         const filePath = uploadResponse.data.url.replace("http://localhost:5000", "");
// //         const fullUrl = uploadResponse.data.url;

// //         setMessages((prev) =>
// //           prev.map((msg) => {
// //             if (msg.id === messageId) {
// //               const updatedMsg = {
// //                 ...msg,
// //                 uploading: false,
// //                 isTemporary: false,
// //                 image: mediaType === "image" ? fullUrl : msg.image,
// //                 video: mediaType === "video" ? fullUrl : msg.video,
// //               };
// //               return updatedMsg;
// //             }
// //             return msg;
// //           })
// //         );

// //         if (onUpdateChat) {
// //           console.log("Gọi onUpdateChat từ uploadFileToServer:", friend.id, {
// //             content: decodeURIComponent(file.name),
// //             sender: friend.sender,
// //             timestamp: new Date().toISOString(),
// //             message_type: mediaType,
// //           });
// //           onUpdateChat(friend.id, {
// //             content: decodeURIComponent(file.name),
// //             sender: friend.sender,
// //             timestamp: new Date().toISOString(),
// //             message_type: mediaType,
// //           });
// //         }

// //         if (socketRef.current) {
// //           socketRef.current.emit("updateMessage", {
// //             toUserId: friend.member,
// //             message: {
// //               id: messageId,
// //               conversation_id: friend.id,
// //               message_type: mediaType,
// //               url: filePath,
// //             },
// //           });
// //         }

// //         try {
// //           await axios.post("http://localhost:5000/api/chat/send-message/", {
// //             id: messageId,
// //             conversationId: friend.id,
// //             sender: friend.sender,
// //             content: decodeURIComponent(file.name),
// //             message_type: mediaType,
// //             timestamp: new Date().toISOString(),
// //             recipient: friend.member,
// //             url: filePath,
// //           });
// //         } catch (messageError) {
// //           console.error("Lỗi gửi tin nhắn:", messageError);
// //         }
// //       }
// //     } catch (uploadError) {
// //       setMessages((prev) =>
// //         prev.map((msg) => {
// //           if (msg.id === messageId) {
// //             return {
// //               ...msg,
// //               uploading: false,
// //               error: true,
// //               isTemporary: false,
// //             };
// //           }
// //           return msg;
// //         })
// //       );
// //       alert("Upload thất bại: " + (uploadError.response?.data?.error || uploadError.message));
// //     }
// //   };

// //   if (!friend) {
// //     return (
// //       <div className={cx("chat")}>
// //         <div className={cx("empty-state")}>
// //           <div className={cx("empty-content")}>
// //             <div className={cx("empty-icon")}>
// //               <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
// //                 <path
// //                   d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"
// //                   fill="currentColor"
// //                   opacity="0.3"
// //                 />
// //                 <circle cx="8" cy="12" r="1" fill="currentColor" />
// //                 <circle cx="12" cy="12" r="1" fill="currentColor" />
// //                 <circle cx="16" cy="12" r="1" fill="currentColor" />
// //               </svg>
// //             </div>
// //             <div className={cx("empty-text")}>
// //               <h2>Chọn một cuộc trò chuyện</h2>
// //               <p>Chọn một người bạn từ danh sách bên trái để bắt đầu nhắn tin</p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className={cx("chat")}>
// //       <ChatHeader friend={friend} onAvatarClick={handleAvatarClick} onToggleDetail={onToggleDetail} />

// //       {showSendRequestBar ? (
// //         <FriendRequestBar friend={friend} onSendRequest={handleSendFriendRequest} isVisible={false} />
// //       ) : (
// //         <FriendRequestConfirmationBar
// //           friend={friend}
// //           onConfirmRequest={handleConfirmFriendRequest}
// //           onRejectRequest={handleRejectFriendRequest}
// //           isVisible={false}
// //         />
// //       )}

// //       <div className={cx("center")} ref={messagesContainerRef}>
// //         {loading ? (
// //           <div>Đang tải...</div>
// //         ) : error ? (
// //           <div className={cx("error")}>{error}</div>
// //         ) : (
// //           <>
// //             {isLoadingMore && (
// //               <div className={cx("loading-more")}>Đang tải thêm tin nhắn...</div>
// //             )}
// //             {messages.map((message, index) => {
// //               const prevMsg = messages[index - 1];
// //               const nextMsg = messages[index + 1];
// //               const currentTime = message.timestamp;

// //               let showSeparator = false;
// //               let showTime = false;

// //               if (!prevMsg) {
// //                 showSeparator = true;
// //               } else {
// //                 const diffMinutes = (currentTime - prevMsg.timestamp) / 1000 / 60;
// //                 if (diffMinutes >= 10) {
// //                   showSeparator = true;
// //                 }
// //               }

// //               if (!nextMsg) {
// //                 showTime = true;
// //               } else {
// //                 const sameMinute =
// //                   currentTime.getHours() === nextMsg.timestamp.getHours() &&
// //                   currentTime.getMinutes() === nextMsg.timestamp.getMinutes();
// //                 if (!sameMinute) {
// //                   showTime = true;
// //                 }
// //               }

// //               return (
// //                 <div key={message.id} className={cx("message-wrapper", message.type)}>
// //                   {showSeparator && (
// //                     <div className={cx("time-separator")}>
// //                       <div className={cx("time-separator-content")}>
// //                         {formatSeparator(message.timestamp)}
// //                       </div>
// //                     </div>
// //                   )}
// //                   <div className={cx("message", message.type)}>
// //                     <div
// //                       className={cx("message-bubble", {
// //                         "has-media": message.temporaryImage || message.image || message.temporaryVideo || message.video || message.file,
// //                         temporary: message.isTemporary,
// //                         uploading: message.uploading,
// //                       })}
// //                     >
// //                       {renderMessageContent(message)}
// //                     </div>
// //                     {showTime && (
// //                       <div className={cx("message-time")}>{formatTime(message.timestamp)}</div>
// //                     )}
// //                   </div>
// //                 </div>
// //               );
// //             })}
// //           </>
// //         )}
// //       </div>

// //       <div className={cx("cr")}>
// //         <label className={cx("cr-button")} title="Chọn ảnh" aria-label="Chọn ảnh để gửi">
// //           <input
// //             type="file"
// //             accept="image/*"
// //             style={{ display: "none" }}
// //             onChange={(e) => handleMediaSelect(e, "image")}
// //           />
// //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// //             <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
// //           </svg>
// //         </label>
// //         <label className={cx("cr-button")} title="Chọn tệp" aria-label="Chọn tệp để gửi">
// //           <input
// //             type="file"
// //             accept=".pdf,.doc,.docx,.txt,.zip,.rar,.xlsx,.xls,.ppt,.pptx"
// //             style={{ display: "none" }}
// //             onChange={(e) => handleMediaSelect(e, "file")}
// //           />
// //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// //             <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
// //           </svg>
// //         </label>
// //         <label className={cx("cr-button")} title="Chọn video" aria-label="Chọn video để gửi">
// //           <input
// //             type="file"
// //             accept="video/*"
// //             style={{ display: "none" }}
// //             onChange={(e) => handleMediaSelect(e, "video")}
// //           />
// //           <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
// //             <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
// //           </svg>
// //         </label>
// //       </div>

// //       <div className={cx("input-area")}>
// //         <input
// //           type="text"
// //           placeholder="Nhập tin nhắn..."
// //           value={text}
// //           onChange={(e) => setText(e.target.value)}
// //           onKeyPress={handleKeyPress}
// //           className={cx("message-input")}
// //           aria-label="Nhập tin nhắn"
// //         />
// //         <div className={cx("emoji-container")}>
// //           <button
// //             className={cx("emoji-button")}
// //             onClick={() => setOpen((prev) => !prev)}
// //             aria-label="Mở bảng chọn biểu tượng cảm xúc"
// //           >
// //             😊
// //           </button>
// //           <div className={cx("emoji-picker")} style={{ display: open ? "block" : "none" }}>
// //             {emojis.map((emoji, index) => (
// //               <button
// //                 key={index}
// //                 onClick={() => handleEmoji(emoji)}
// //                 className={cx("emoji-item")}
// //                 aria-label={`Chọn biểu tượng ${emoji}`}
// //               >
// //                 {emoji}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //         <button
// //           onClick={handleSend}
// //           className={cx("send-button", { active: text.trim() })}
// //           aria-label={text.trim() ? "Gửi tin nhắn" : "Gửi like"}
// //         >
// //           {text.trim() ? (
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// //               <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
// //             </svg>
// //           ) : (
// //             <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
// //               <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
// //             </svg>
// //           )}
// //         </button>
// //       </div>

// //       {open && <div className={cx("overlay")} onClick={() => setOpen(false)} />}
// //       {showProfile && <ProFile1 onClose={() => setShowProFile(false)} datax={friend} />}
// //       {previewImage && <ChatPreview imageUrl={previewImage} onClose={handleClosePreview} />}
// //     </div>
// //   );
// // }

// // export default Chat;








import classNames from "classnames/bind";
import styles from "./Chat.module.scss";
import { useState, useEffect, useRef, useCallback } from "react";
import ProFile1 from "~/pages/ProFile1";
import ChatPreview from "./ChatPreview";
import EmptyState from "./EmptyState/EmptyState";
import MediaUploadBar from "./MediaUploadBar/MediaUploadBar";
import MessageList from "./MessageList/MessageList";
import useSocketHandler from "./SocketHandler/useSocketHander";
import useMessagesHandler from "./MessageHandler/useMessageHandler";
import useChatActions from "./ChatAction/useChatActions";
import FriendRequestBar from "./FriendRequestBar";
import FriendRequestConfirmationBar from "./FriendRequestConfirmationBar";
import ChatInput from "./ChatInput/ChatInput";
import ChatHeader from "./ChatHeader";
import useVideoCall from "../../hooks/useVideoCall";
import VideoCall from "../../components/VideoCall";


const cx = classNames.bind(styles);
const user = JSON.parse(localStorage.getItem("user"));

function Chat({ friend, onToggleDetail, onUpdateChat }) {
  const {
    messages,
    setMessages,
    loading,
    isLoadingMore,
    hasMore,
    error,
    loadMoreMessages
  } = useMessagesHandler(friend);

  
const {
  localVideoRef,
  remoteVideoRef,
  isCalling,
  incomingOffer,
  startCall,
  acceptCall,
  endCall
} = useVideoCall(user.id, friend.id);



  const { socketRef } = useSocketHandler(friend, onUpdateChat, setMessages);
  const { handleSend, handleMediaSelect } = useChatActions(friend, onUpdateChat, setMessages, socketRef);

  const [showProfile, setShowProFile] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showSendRequestBar, setShowSendRequestBar] = useState(false);
  const [callingUser, setCallingUser] = useState(null);

  // Các hàm callback và logic khác giữ nguyên, chỉ sửa phần liên quan đến emoji
  const handleAvatarClick = useCallback(() => {
    setShowProFile(true);
  }, []);

  const handleSendFriendRequest = useCallback((friendId, friendName) => {
    console.log(`Gửi lời mời kết bạn tới ID ${friendId}: ${friendName}`);
  }, []);

  const handleConfirmFriendRequest = useCallback((friendId, friendName) => {
    console.log(`Xác nhận lời mời kết bạn từ ID ${friendId}: ${friendName}`);
  }, []);

  const handleRejectFriendRequest = useCallback((friendId, friendName) => {
    console.log(`Từ chối lời mời kết bạn từ ID ${friendId}: ${friendName}`);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewImage(null);
  }, []);

  const toggleRequestBar = useCallback(() => {
    setShowSendRequestBar((prev) => !prev);
  }, []);

  const handleStartCall = (user) => {
  setCallingUser(user);
};
  if (!friend) {
    return <EmptyState />;
  }

  return (
    <div className={cx("chat")}>
      <ChatHeader
          friend={friend}
          onAvatarClick={handleAvatarClick}
          onToggleDetail={onToggleDetail}
          onStartCall={handleStartCall}
      />

      {showSendRequestBar ? (
        <FriendRequestBar 
          friend={friend} 
          onSendRequest={handleSendFriendRequest} 
          isVisible={false} 
        />
      ) : (
        <FriendRequestConfirmationBar
          friend={friend}
          onConfirmRequest={handleConfirmFriendRequest}
          onRejectRequest={handleRejectFriendRequest}
          isVisible={false}
        />
      )}
      <MessageList
        messages={messages}
        loading={loading}
        error={error}
        isLoadingMore={isLoadingMore}
        hasMore={hasMore}
        onLoadMore={loadMoreMessages}
        onImagePreview={setPreviewImage}
      />
      <MediaUploadBar onMediaSelect={handleMediaSelect} />
      <ChatInput onSend={handleSend} />

      {showProfile && 
        <ProFile1 
          onClose={() => setShowProFile(false)} 
          datax={friend} 
        />}
      {previewImage && 
        <ChatPreview 
          imageUrl={previewImage} 
          onClose={handleClosePreview} 
        />}
      {isCalling && (
  <VideoCall
    localVideoRef={localVideoRef}
    remoteVideoRef={remoteVideoRef}
    onEnd={endCall}
    onAccept={acceptCall}
    incomingOffer={incomingOffer}

  />
)}

    </div>
  );
}

export default Chat;




