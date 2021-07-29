import React, { useState, useEffect } from "react";
import "./style.scss";

export default function Toppings({ onGetSelectedTopping, data }) {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const toggleToppings = clickedTopping => {
    const toppingExistsInSelection = selectedToppings.find(top => top.name === clickedTopping.name);
    const newSelection = toppingExistsInSelection
      ? selectedToppings.filter(top => top.name !== clickedTopping.name)
      : [...selectedToppings, clickedTopping];
    setSelectedToppings(newSelection);
  };
  useEffect(() => {
    onGetSelectedTopping(selectedToppings);
  }, [selectedToppings]);
  return (
    <div className="toppings mb-45">
      <p className="p-label">TOPPINGS</p>
      <div className="topping flex">
        {data &&
          data.map((topping, i) => {
            const { name, price } = topping;
            const className = "select-item flex items-center justify-center br-8".split(/\s+/);
            if (selectedToppings.some(t => t.name === name)) {
              className.push("item-active");
            }
            return (
              <div onClick={() => toggleToppings(topping)} key={i} className={className.join(" ")}>
                <p>
                  {name} <span>(+$ {price})</span>
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
