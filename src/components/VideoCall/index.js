import React, { useEffect, useRef } from "react";
import "./VideoCall.css"; // Bạn có thể tự tạo style cho giao diện gọi

function VideoCall({ currentUser, peerUser, onClose }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    // Đây là nơi bạn sẽ tích hợp WebRTC sau này
    // Ví dụ: khởi tạo peer connection, gán stream vào localVideoRef.current.srcObject
    console.log("Bắt đầu gọi video từ", currentUser, "đến", peerUser);
  }, [currentUser, peerUser]);

  return (
    <div className="video-call-container">
      <div className="video-call-header">
        <h3>Đang gọi: {peerUser}</h3>
        <button onClick={onClose}>Kết thúc cuộc gọi</button>
      </div>

      <div className="video-call-body">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="video-call-local"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          className="video-call-remote"
        />
      </div>
    </div>
  );
}

export default VideoCall;