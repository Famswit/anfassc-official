"use client"

import { createContext, useContext, useState, useCallback } from "react"

export interface CartItem {
  id: number
  name: string
  price: number    
  quantity: number
  image?: string
  images?: string[]
}

type AddToCartPayload = {
  id: number
  name: string
  price: number | string   
  quantity?: number
  image?: string
}

interface CartContextProps {
  cartCount: number
  cartItems: CartItem[]
  addToCart: (item: AddToCartPayload) => void
  updateQuantity: (id: number, quantity: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const normalizePrice = (p: number | string): number => {
    if (typeof p === "number" && Number.isFinite(p)) return p
    if (typeof p === "string") {
      const cleaned = p.replace(/[^\d.-]+/g, "")
      const parsed = Number(cleaned)
      return Number.isFinite(parsed) ? parsed : 0
    }
    return 0
  }

  const addToCart = (item: AddToCartPayload) => {
    const priceNum = normalizePrice(item.price)
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        const inc = item.quantity ?? 1
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + inc } : i))
      }
      // new item
      const toAdd: CartItem = {
        id: item.id,
        name: item.name,
        price: priceNum,
        quantity: item.quantity ?? 1,
        image: item.image ?? "/placeholder.svg",
      }
      return [...prev, toAdd]
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartCount,
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within a CartProvider")
  return context
}
