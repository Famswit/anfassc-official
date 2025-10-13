"use client"

import { useEffect } from "react"

interface CartItem {
  id: number
  name: string
  price: string
  quantity: number
  image: string
  images?: string[]
}

export const useCartPersistence = (cartItems: CartItem[], setCartItems: (items: CartItem[]) => void) => {
  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("shopping-cart")
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart)
          if (Array.isArray(parsedCart) && parsedCart.length > 0) {
            setCartItems(parsedCart)
          }
        } catch (error) {
          console.error("Error loading cart from localStorage:", error)
        }
      }
    }
  }, [setCartItems])

  // Save cart to localStorage 
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shopping-cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Clear cart from localStorage
  const clearPersistedCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("shopping-cart")
    }
  }

  return { clearPersistedCart }
}
