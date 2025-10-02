import { useRef, useState, useEffect } from "react";
import { socket } from "../socket";

export default function useVideoCall(myId, friendId) {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const [isCalling, setIsCalling] = useState(false);
  const [incomingOffer, setIncomingOffer] = useState(null);
  const [isRinging, setIsRinging] = useState(false); // 🔔 hiệu ứng chuông

  const createPeerConnection = (targetUserId) => {
    const peer = new RTCPeerConnection();

    peer.ontrack = (e) => {
      remoteVideoRef.current.srcObject = e.streams[0];
    };

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit("ice-candidate", { toUserId: targetUserId, candidate: e.candidate });
      }
    };

    return peer;
  };

  useEffect(() => {
    socket.on("video-offer", ({ from, offer }) => {
      if (from === friendId) {
        setIncomingOffer({ from, offer });
        setIsRinging(true); // 🔔 bật chuông
      }
    });

    socket.on("video-answer", ({ answer }) => {
      if (peerRef.current) {
        peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    socket.on("ice-candidate", ({ candidate }) => {
      if (peerRef.current) {
        peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socket.on("end-call", () => {
      endCall();
    });

    return () => {
      socket.off("video-offer");
      socket.off("video-answer");
      socket.off("ice-candidate");
      socket.off("end-call");
    };
  }, [friendId]);

  const startCall = async () => {
    setIsCalling(true);
    peerRef.current = createPeerConnection(friendId);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));

    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);

    socket.emit("video-offer", { toUserId: friendId, offer });
  };

  const acceptCall = async () => {
    setIsCalling(true);
    setIsRinging(false); // 🔕 tắt chuông
    peerRef.current = createPeerConnection(incomingOffer.from);

    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach(track => peerRef.current.addTrack(track, stream));

    await peerRef.current.setRemoteDescription(new RTCSessionDescription(incomingOffer.offer));
    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(answer);

    socket.emit("video-answer", { toUserId: incomingOffer.from, answer });
  };

  const endCall = () => {
    setIsCalling(false);
    setIsRinging(false); // 🔕 tắt chuông
    socket.emit("end-call", { toUserId: friendId });
    peerRef.current?.close();
    peerRef.current = null;
    localVideoRef.current.srcObject = null;
    remoteVideoRef.current.srcObject = null;
  };

  return {
    localVideoRef,
    remoteVideoRef,
    isCalling,
    incomingOffer,
    isRinging,
    startCall,
    acceptCall,
    endCall
  };
}