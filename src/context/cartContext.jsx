// context/cartContext.js

"use client";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selected, setSelected] = useState([]);
  const [selectedPizzaTotalPrice, setSelectedPizzaTotalPrice] = useState(0);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Fetch prices
  const fetchPrices = async () => {
    // Filter items that either don't have a price in state OR have price=0 in cart
    const itemsToFetch = cart.filter(
      (item) => !prices[item.id] || item.price === 0
    );

    if (itemsToFetch.length > 0) {
      try {
        setLoading(true);
        const response = await axios.post(
          "/api/get-prices",
          {
            items: itemsToFetch.map((item) => item.id),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const priceData = response.data;

        // Update prices state
        setPrices((prev) => ({ ...prev, ...priceData }));

        // Update cart with new prices
        setCart((prevCart) =>
          prevCart.map((item) => ({
            ...item,
            price:
              priceData[item.id] !== undefined
                ? priceData[item.id]
                : item.price,
          }))
        );
      } catch (error) {
        console.error("Error fetching prices:", error.message);
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    // Fetch prices if there are items that need prices
    if (cart.length > 0) {
      fetchPrices();
    } else {
      setLoading(false);
    }
  }, [cart]); // Removed prices and hasAddedPrices from dependencies

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cartToStore = cart.map(({ id, name, quantity }) => ({
        id,
        name,
        quantity,
      }));
      localStorage.setItem("cart", JSON.stringify(cartToStore));
    }
  }, [cart]);

  const getCartWithPrices = () => {
    return cart.map((item) => ({
      ...item,
      price: prices[item.id] || item.price || 0,
    }));
  };

  const addToCart = ({ id, name }) => {
    fetchPrices();
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { id, name, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    fetchPrices();
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItemFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
  };

  const selectedFromCart = getCartWithPrices().filter((item) =>
    selected.includes(item.id)
  );

  return (
    <CartContext.Provider
      value={{
        cart: getCartWithPrices(),
        addToCart,
        removeFromCart,
        removeItemFromCart,
        clearCart,
        selected,
        setSelected,
        selectedFromCart,
        selectedPizzaTotalPrice,
        setSelectedPizzaTotalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
