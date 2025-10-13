"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Collapse,
  Chip,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import { CartItem } from "../CartPage"


interface WishlistSectionProps {
  onMoveToCart: (item: CartItem) => void
}

declare global {
  interface Window {
    addToWishlist?: (item: CartItem) => void
  }
}

const WishlistSection = ({ onMoveToCart }: WishlistSectionProps) => {
  const [wishlistItems, setWishlistItems] = useState<CartItem[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedWishlist = localStorage.getItem("shopping-wishlist")
      if (savedWishlist) {
        try {
          const parsedWishlist = JSON.parse(savedWishlist)
          if (Array.isArray(parsedWishlist)) {
            setWishlistItems(parsedWishlist)
          }
        } catch (error) {
          console.error("Error loading wishlist from localStorage:", error)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("shopping-wishlist", JSON.stringify(wishlistItems))
    }
  }, [wishlistItems])

  const addToWishlist = (item: CartItem) => {
    setWishlistItems((prev) => {
      const exists = prev.find((wishItem) => wishItem.id === item.id)
      if (!exists) {
        return [...prev, { ...item, quantity: 1 }]
      }
      return prev
    })
  }

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id))
  }

  const moveToCart = (item: CartItem) => {
    onMoveToCart(item)
    removeFromWishlist(item.id)
  }

  useEffect(() => {
    window.addToWishlist = addToWishlist
  }, [])

  if (wishlistItems.length === 0) {
    return null
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
          cursor: "pointer",
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Saved for Later
          </Typography>
          <Chip label={`${wishlistItems.length} items`} size="small" color="primary" variant="outlined" />
        </Box>
        <IconButton>{isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}</IconButton>
      </Box>

      <Collapse in={isExpanded}>
        {/* ✅ Flexbox layout instead of Grid */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {wishlistItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                flex: "1 1 calc(25% - 16px)", 
                minWidth: 250,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image || "/placeholder.svg"}
                alt={item.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                  {item.name}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                  {item.price}
                </Typography>
                <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => moveToCart(item)}
                    size="small"
                    sx={{ flex: 1 }}
                  >
                    Add to Cart
                  </Button>
                  <IconButton onClick={() => removeFromWishlist(item.id)} color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Collapse>
    </Box>
  )
}

export default WishlistSection
