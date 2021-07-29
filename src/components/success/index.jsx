import React from "react";
import "./style.scss";

export default function Success({}) {
  return (
    <div className="flex items-center justify-center success-modal">
      <div className="modal-box br-8 flex items-center justify-center">
        <h1>🍕 🌶</h1>
        <h1>Order Complete</h1>
        <p>You will get your order in 30 minutes.</p>
        <button onClick={() => window.location.reload()}>ORDER AGAIN</button>
      </div>
    </div>
  );
}
