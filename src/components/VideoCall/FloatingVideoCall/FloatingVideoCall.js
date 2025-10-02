import React from "react";
import "./FloatingVideoCall.css";

function FloatingVideoCall({ localVideoRef, remoteVideoRef, onEnd, onAccept, incomingOffer }) {
  return (
    <div className="floating-call">
      <video ref={remoteVideoRef} autoPlay className="remote" />
      <video ref={localVideoRef} autoPlay muted className="local" />
      <div className="controls">
        {incomingOffer ? (
          <>
            <button onClick={onAccept}>✅</button>
            <button onClick={onEnd}>❌</button>
          </>
        ) : (
          <button onClick={onEnd}>❌</button>
        )}
      </div>
    </div>
  );
}

export default FloatingVideoCall;