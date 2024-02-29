import React, { useState } from 'react';
import { useCart } from './carcontext';
import './Cart.css'; // Import the CSS file

const Cart = () => {
  const { cartItems,removeFromCart, updateQuantity } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(itemId, newQuantity);
    }
  };



  // Update the total price whenever cartItems or their quantities change
  React.useEffect(() => {
      // Calculate the total price based on the quantities of items in the cart
    const calculateTotalPrice = () => {
      const total = cartItems.reduce((accumulator, item) => {
        return accumulator + item.price * (item.quantity || 1); // Use 1 as default if quantity is empty
      }, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartItems]);

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Please continue shopping</p>
        </div>
      ) : (
        <>
          <div className="cart-list">
            <h2>Shopping Cart</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt="Clothing item" />
                </div>
                <div className="cart-item-details">
                  <h3  style={{top:"0px",position:"absolute"}} >{item.title}</h3>
                  <p style={{top:"50px",position:"absolute" ,fontSize:"14.5px"}} >Size:&nbsp;&nbsp;&nbsp;&nbsp;{item.size}</p>
                  <p style={{top:"95px",position:"absolute",fontSize:"14.5px"}} >Price:&nbsp;&nbsp;&nbsp;Rs.{item.price}</p>
                  <p style={{bottom:"0px",position:"absolute",fontSize:"10px"}} >*14 days return policy is applicable</p>
                  <div style={{top:"50px",right:"45px",position:"absolute",fontSize:"14.5px"}} >
                    <label htmlFor={`quantity-${item.id}`}>Qty :&nbsp;&nbsp;</label>
                    <input style={{height:"1px",width:"50px"}}
                      type="number"
                      id={`quantity-${item.id}`}
                      name="quantity"
                      value={item.quantity || 1} // Use 1 as default if quantity is empty
                      onChange={(e) => handleQuantityChange(item.id, e)}
                      min="1"
                      max="10"
                    />
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Place Order</h2>
            <p>Total Price: Rs.{totalPrice}</p>
            <button className="place-order-button">Place Order</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
