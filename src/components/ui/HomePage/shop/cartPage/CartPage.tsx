"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Box, Typography, Alert, Snackbar } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import EmptyCartMessage from "./components/EmptyCart";
import CartItemsTable, { CartItemType } from "./components/CartItemsTable";
import CartSummary from "./components/CartSummary";
import WishlistSection from "./components/WishlistSection";
import RelatedProducts from "./components/relatedProducts";

export type CartItem = CartItemType;

declare global {
  interface Window {
    addToWishlist?: (item: CartItem) => void;
  }
}

const CartPage = () => {
  const { cartCount, cartItems, updateQuantity, removeItem, addToCart } =
    useCart();
  const { logout, isAuthenticated } = useAuth();
  const [notification, setNotification] = useState<{
    message: string;
    severity: "success" | "info" | "warning" | "error";
  } | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    if (!isAuthenticated) return;
    lastActivityRef.current = Date.now();

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setNotification({
        message: "Session expired due to inactivity. Logging out...",
        severity: "warning",
      });
      setTimeout(() => logout(), 2000);
    }, 60000);
  }, [isAuthenticated, logout]);

  const handleActivity = useCallback(() => resetTimer(), [resetTimer]);

  useEffect(() => {
    if (!isAuthenticated) return;
    resetTimer();

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];
    events.forEach((event) =>
      document.addEventListener(event, handleActivity, true)
    );

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((event) =>
        document.removeEventListener(event, handleActivity, true)
      );
    };
  }, [isAuthenticated, handleActivity, resetTimer]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shopping-cart-backup", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const handleRemoveItem = (id: number) => {
    removeItem(id);
    setNotification({ message: "Item removed from cart", severity: "info" });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      setNotification({
        message: "Quantity must be at least 1",
        severity: "warning",
      });
      return;
    }
    if (quantity > 99) {
      setNotification({
        message: "Maximum quantity is 99",
        severity: "warning",
      });
      return;
    }
    updateQuantity(id, quantity);
  };

  const handleSaveForLater = (item: CartItemType) => {
    if (
      typeof window !== "undefined" &&
      typeof window.addToWishlist === "function"
    ) {
      window.addToWishlist(item);
      setNotification({
        message: "Item saved for later (still in cart)",
        severity: "success",
      });
    }
  };

  const handleMoveToCart = (item: CartItemType) => {
    addToCart(item);
    setNotification({ message: "Item moved to cart", severity: "success" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", mt: "100px", p: 3 }}>
        <Typography
          variant="h4"
          sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}
        >
          Your Shopping Cart
          {cartCount > 0 && (
            <Typography
              component="span"
              variant="h6"
              sx={{ ml: 2, color: "primary.main" }}
            >
              ({cartCount} {cartCount === 1 ? "item" : "items"})
            </Typography>
          )}
        </Typography>

        {cartItems.length === 0 ? (
          <EmptyCartMessage />
        ) : (
          <>
            <CartItemsTable
              cartItems={cartItems}
              updateQuantity={handleUpdateQuantity}
              removeItem={handleRemoveItem}
              onSaveForLater={handleSaveForLater}
            />
            <CartSummary cartItems={cartItems} />
          </>
        )}

        <WishlistSection onMoveToCart={handleMoveToCart} />
        {cartItems.length > 0 && <RelatedProducts cartItems={cartItems} />}

        <Snackbar
          open={!!notification}
          autoHideDuration={3000}
          onClose={() => setNotification(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setNotification(null)}
            severity={notification?.severity || "info"}
            sx={{ width: "100%" }}
          >
            {notification?.message || ""}
          </Alert>
        </Snackbar>
      </Box>
    </motion.div>
  );
};

export default CartPage;
