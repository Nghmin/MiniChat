import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export function useVideoCall(currentUserId, peerUserId) {
  const [isCalling, setIsCalling] = useState(false);
  const [incomingOffer, setIncomingOffer] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    socket.emit("register", currentUserId);

    socket.on("incoming-call", ({ from, offer }) => {
      if (from === peerUserId) {
        setIncomingOffer(offer);
        setIsCalling(true);
      }
    });

    socket.on("call-accepted", async ({ answer }) => {
      await peerRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on("ice-candidate", ({ candidate }) => {
      peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on("end-call", () => {
      endCall();
    });

    return () => {
      socket.off("incoming-call");
      socket.off("call-accepted");
      socket.off("ice-candidate");
      socket.off("end-call");
    };
  }, [currentUserId, peerUserId]);

  const initMedia = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    streamRef.current = stream;
    localVideoRef.current.srcObject = stream;

    const peer = new RTCPeerConnection();
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
    peerRef.current = peer;

    peer.ontrack = e => {
      remoteVideoRef.current.srcObject = e.streams[0];
    };

    peer.onicecandidate = e => {
      if (e.candidate) {
        socket.emit("ice-candidate", { to: peerUserId, candidate: e.candidate });
      }
    };
  };

  const startCall = async () => {
    await initMedia();
    const offer = await peerRef.current.createOffer();
    await peerRef.current.setLocalDescription(offer);
    socket.emit("call-user", { to: peerUserId, from: currentUserId, offer });
    setIsCalling(true);
  };

  const acceptCall = async () => {
    await initMedia();
    await peerRef.current.setRemoteDescription(new RTCSessionDescription(incomingOffer));
    const answer = await peerRef.current.createAnswer();
    await peerRef.current.setLocalDescription(answer);
    socket.emit("answer-call", { to: peerUserId, answer });
    setIsCalling(false);
  };

  const endCall = () => {
    if (peerRef.current) peerRef.current.close();
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    socket.emit("end-call", { to: peerUserId });
    setIsCalling(false);
  };

  return {
    localVideoRef,
    remoteVideoRef,
    isCalling,
    incomingOffer,
    startCall,
    acceptCall,
    endCall,
  };
}