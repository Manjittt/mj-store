import { useState, useContext, createContext ,useEffect } from "react";

// Create a context
const CartContext = createContext();

// Provider component to wrap around your App
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); 

  useEffect(() => {
    let existingCartItems =localStorage.getItem("cart");
    if (existingCartItems) 
      setCart(JSON.parse(existingCartItems));
    },[]);
    
  return (
    <CartContext.Provider value={{cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};


// Custom hook for easy usage
const useCart = () => useContext(CartContext);


export { useCart, CartProvider };
