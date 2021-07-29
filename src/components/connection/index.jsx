import React from "react";

export default function Connection() {
  return (
    <div className="flex items-center justify-center" style={{ width: "100%", height: "100vh" }}>
      <h1 data-testid="message">🍕 No Internet Connection.</h1>
    </div>
  );
}
