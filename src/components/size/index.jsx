import React, { useState, useEffect } from "react";
import "./style.scss";

export default function Size({ onGetSelectedSize, data }) {
  const [selectedSize, setSelectedSize] = useState({});
  useEffect(() => {
    onGetSelectedSize(selectedSize);
  }, [selectedSize]);
  return (
    <div className="size mb-45">
      <p className="p-label">SIZE</p>
      <div className="sizes flex items-center">
        {data &&
          data.map((s, i) => {
            const { size, kg } = s;
            const className = "select-item flex items-center justify-center br-8".split(/\s+/);
            if (size === selectedSize.size) {
              className.push("item-active");
            }
            return (
              <div onClick={() => setSelectedSize(s)} key={i} className={className.join(" ")}>
                <p>
                  {size} <span>({kg}g)</span>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
