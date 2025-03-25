import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { CartItem } from '../types/CartItem';

interface CartContextType {
  cart: CartItem[]; // Array of cart items (books)
  numItems: number;
  totalPrice: number;
  // These are the actions that can be performed on the
  addToCart: (item: CartItem) => void; // pass in a cart item to add
  removeFromCart: (bookID: number) => void;
  clearCart: () => void;
}

// This tells the system to use CartContext when a cart is created
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]); // Create the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      // The following will return true or false
      const existingItem = prevCart.find((c) => c.bookID === item.bookID); // See if that book to be added is already in the cart
      // Update previous cart
      const updatedCart = prevCart.map(
        (c) =>
          c.bookID === item.bookID
            ? {
                ...c,
                price: c.price + item.price, // Adjusts total price
                quantity: c.quantity + item.quantity, // Adjusts quantity
              }
            : c // If book in cart, add to the price. If not, add the book
      );
      // either return the cart with the updated amount or add the item after checking if existingItem is true/false
      return existingItem ? updatedCart : [...prevCart, item];
    });
  };

  const removeFromCart = (bookID: number) => {
    // Recieves current cart and take out all projects that have the projectId = the ID passed in
    setCart((prevCart) => prevCart.filter((c) => c.bookID !== bookID));
  };

  const clearCart = () => {
    setCart(() => []);
  };

  // Calculate numItems and totalPrice using useMemo which watches for changes (like useEffect)
  const numItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart] // Watches to see if cart changes
  );
  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart] // Watches to see if cart changes
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        numItems,
        totalPrice,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
      {/*This is a placeholder for any components that are wrapped in CartProvider*/}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  // error handling
  if (!context) {
    throw new Error('useCart must be used within a cartProvider');
  }
  return context; // Return the created context
};
