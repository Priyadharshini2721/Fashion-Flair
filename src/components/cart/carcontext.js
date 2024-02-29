// carcontext.js
import React, { createContext, useContext, useReducer } from 'react';

// Create a new context for the cart
const CartContext = createContext();

// Initial state of the cart
const initialState = {
  cartItems: [],
};

const isItemInCart = (cartItems, itemId) => {
  const foundItem = cartItems.find((item) => item.id === itemId);
  return foundItem ? { found: true, size: foundItem.size } : { found: false, size: null };
};

// Reducer function to handle cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the item already exists in the cart before adding it
      if (!isItemInCart(state.cartItems, action.payload.id).found) {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      }
      return state;
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.itemId
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        ),
      };
    default:
      return state;
  }
};

// Cart context provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart: (item) => dispatch({ type: 'ADD_TO_CART', payload: item }),
        removeFromCart: (itemId) => dispatch({ type: 'REMOVE_FROM_CART', payload: itemId }),
        updateQuantity: (itemId, newQuantity) =>
          dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, newQuantity } }),
        isItemInCart, // Add the isItemInCart function to the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return cartContext;
};
