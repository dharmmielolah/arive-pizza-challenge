import { Connection, Size, Toppings, Checkout, Success } from "components";
import React, { useState, useEffect } from "react";
import PIZZAMOCK from "__mock__/allpizza.json";
import "./style.scss";

function Order() {
  const [noInternet, setNoInternet] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderPricing, setOrderPricing] = useState({ size: 0, toppings: 0 });
  const [size, setSize] = useState(null);
  const [toppings, setToppings] = useState(null);

  const handleConnectionChange = () => {
    navigator.onLine ? setNoInternet(false) : setNoInternet(true);
  };

  useEffect(() => {
    window.addEventListener("online", handleConnectionChange);
    window.addEventListener("offline", handleConnectionChange);
  }, []);

  if (noInternet) {
    return <Connection />;
  }

  const onGetSizePrice = data => {
    setOrderPricing({ ...orderPricing, size: data.price });
    setSize(data);
  };

  const onGetToppingsPrice = data => {
    let total = 0;
    data.map(p => {
      total += p.price;
    });
    setOrderPricing({ ...orderPricing, toppings: total });
    setToppings(data);
  };

  const onPlaceOrder = () => {
    if (total > 0 && orderPricing.size > 0) {
      setShowCheckout(true);
    } else {
      alert("Please select a pizza size");
    }
  };

  const onConfirmOrder = data => {
    setShowCheckout(false);
    setShowSuccess(true);
    const payload = {
      order_details: {
        size,
        toppings
      },
      ...data,
      total
    };
    console.log("Place order payload=>", payload);
  };

  const total = Number(orderPricing.size) + Number(orderPricing.toppings);

  return (
    <>
      <div className="container">
        <h1 className="page-title">🍕 Pizza Challenge.</h1>
        <div className="page-content flex justify-between">
          <div className="pizza-item-image br-8 flex items-center justify-center">
            <img src={PIZZAMOCK.image} alt="pizza-image" className={`scale-${size && size.size}`} />
          </div>
          <div className="pizza-item-options">
            <p className="p-label">TODAY&apos;S CHOICE</p>
            <h1 className="mb-45">Chicken Curry.</h1>
            <Size data={PIZZAMOCK.prices} onGetSelectedSize={onGetSizePrice} />
            <Toppings data={PIZZAMOCK.toppings} onGetSelectedTopping={onGetToppingsPrice} />
            <p className="p-label">TOTAL</p>
            <h1 className="total mb-45">$ {total}</h1>
            <button onClick={onPlaceOrder}>PLACE ORDER FOR $ {total}</button>
          </div>
        </div>
      </div>
      {showCheckout ? <Checkout onHide={() => setShowCheckout(false)} onOrder={onConfirmOrder} /> : null}
      {showSuccess ? <Success /> : null}
    </>
  );
}

export default Order;
