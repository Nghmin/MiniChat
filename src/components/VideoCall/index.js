import React, { useEffect, useRef } from "react";
import "./VideoCall.css";

function VideoCall({ currentUser, peerUser, onClose }) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null); // giữ stream để cleanup

  useEffect(() => {
    console.log("Bắt đầu gọi video từ", currentUser, "đến", peerUser);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localStreamRef.current = stream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        } else {
          console.warn("localVideoRef chưa sẵn sàng");
        }

        // TODO: gửi stream tới peer qua WebRTC
      })
      .catch((err) => {
        console.error("Không lấy được stream:", err);
      });

    return () => {
      // Cleanup khi component unmount
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [currentUser, peerUser]);

  const handleClose = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
    }
    onClose();
  };

  return (
    <div className="video-call-container">
      <div className="video-call-header">
        <h3>Đang gọi: {peerUser}</h3>
        <button onClick={handleClose}>Kết thúc cuộc gọi</button>
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