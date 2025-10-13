"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Typography,
  Tooltip,
  useMediaQuery,
  Card,
  CardContent,
  Divider,
} from "@mui/material"
import { useTheme } from "@mui/material/styles"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import FavoriteIcon from "@mui/icons-material/Favorite"

export interface CartItemType {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
  images?: string[]
}

interface CartItemsTableProps {
  cartItems: CartItemType[]
  updateQuantity: (id: number, quantity: number) => void
  removeItem: (id: number) => void
  onSaveForLater?: (item: CartItemType) => void
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 2 }).format(value)

const CartItemsTable = ({ cartItems, updateQuantity, removeItem, onSaveForLater }: CartItemsTableProps) => {
  const [currentImages, setCurrentImages] = useState<{ [key: number]: number }>({})
  const imageRefs = useRef<{ [key: number]: HTMLImageElement | null }>({})
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    const initialImageIndices = cartItems.reduce((acc, item) => {
      acc[item.id] = 0
      return acc
    }, {} as { [key: number]: number })
    setCurrentImages(initialImageIndices)
  }, [cartItems])

  const handleImageChange = (id: number, direction: "next" | "prev") => {
    setCurrentImages((prev) => {
      const item = cartItems.find((i) => i.id === id)
      const images = item?.images && item.images.length > 0 ? item.images : [item?.image || "/placeholder.svg"]
      const currentIndex = prev[id] || 0
      const newIndex =
        direction === "next"
          ? (currentIndex + 1) % images.length
          : currentIndex === 0
          ? images.length - 1
          : currentIndex - 1
      return { ...prev, [id]: newIndex }
    })
  }

  const handleSaveForLater = (item: CartItemType) => {
    if (onSaveForLater) onSaveForLater(item)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const img = imageRefs.current[id]
    if (img) {
      img.style.transformOrigin = `${x * 100}% ${y * 100}%`
    }
  }

  // Mobile View (Cards)
  if (isMobile) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {cartItems.map((item) => {
          const images = item.images && item.images.length > 0 ? item.images : [item.image || "/placeholder.svg"]
          const currentImageIndex = currentImages[item.id] || 0
          const unitPrice = Number.isFinite(item.price) ? item.price : 0
          const total = unitPrice * item.quantity

          return (
            <Card key={item.id} sx={{ borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: 120,
                      height: 120,
                      flexShrink: 0,
                      overflow: "hidden",
                      borderRadius: 2,
                      "&:hover img": { transform: "scale(1.3)", transition: "0.3s" },
                    }}
                    onMouseMove={(e) => handleMouseMove(e, item.id)}
                  >
                    <Image
                      src={images[currentImageIndex] || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      sizes="120px"
                      style={{ objectFit: "cover", borderRadius: 8 }}
                      onLoadingComplete={(img) => {
                        imageRefs.current[item.id] = img
                      }}
                    />
                    {images.length > 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <IconButton onClick={() => handleImageChange(item.id, "prev")} size="small" sx={{ bgcolor: "rgba(255,255,255,0.7)" }}>
                          <ArrowBackIosIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleImageChange(item.id, "next")} size="small" sx={{ bgcolor: "rgba(255,255,255,0.7)" }}>
                          <ArrowForwardIosIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatCurrency(unitPrice)}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} size="small">
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        type="number"
                        size="small"
                        sx={{ width: 60, mx: 1 }}
                        inputProps={{ min: 1 }}
                      />
                      <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small">
                        <AddIcon />
                      </IconButton>
                    </Box>

                    <Typography sx={{ mt: 1 }} fontWeight="bold">
                      Total: {formatCurrency(total)}
                    </Typography>

                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Tooltip title="Save for Later">
                        <IconButton onClick={() => handleSaveForLater(item)} color="primary" size="small">
                          <FavoriteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove from Cart">
                        <IconButton onClick={() => removeItem(item.id)} color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )
        })}
      </Box>
    )
  }

  // Desktop View (Table)
  return (
    <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2, overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => {
            const images = item.images && item.images.length > 0 ? item.images : [item.image || "/placeholder.svg"]
            const currentImageIndex = currentImages[item.id] || 0
            const unitPrice = Number.isFinite(item.price) ? item.price : 0
            const total = unitPrice * item.quantity

            return (
              <TableRow key={item.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        position: "relative",
                        width: 180,
                        height: 160,
                        overflow: "hidden",
                        "&:hover img": { transform: "scale(1.5)", transition: "0.3s" },
                      }}
                      onMouseMove={(e) => handleMouseMove(e, item.id)}
                    >
                      <Image
                        src={images[currentImageIndex] || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        sizes="180px"
                        style={{ objectFit: "cover", borderRadius: 4 }}
                        onLoadingComplete={(img) => {
                          imageRefs.current[item.id] = img
                        }}
                      />
                      {images.length > 1 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <IconButton onClick={() => handleImageChange(item.id, "prev")} size="small" sx={{ bgcolor: "rgba(255,255,255,0.8)" }}>
                            <ArrowBackIosIcon />
                          </IconButton>
                          <IconButton onClick={() => handleImageChange(item.id, "next")} size="small" sx={{ bgcolor: "rgba(255,255,255,0.8)" }}>
                            <ArrowForwardIosIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                    <Typography>{item.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{formatCurrency(unitPrice)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} size="small">
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      type="number"
                      size="small"
                      sx={{ width: 60, mx: 1 }}
                      inputProps={{ min: 1 }}
                    />
                    <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small">
                      <AddIcon />
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell align="center">{formatCurrency(total)}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <Tooltip title="Save for Later">
                      <IconButton onClick={() => handleSaveForLater(item)} color="primary" size="small">
                        <FavoriteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove from Cart">
                      <IconButton onClick={() => removeItem(item.id)} color="error" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CartItemsTable
