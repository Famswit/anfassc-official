"use client"

import { Box, Typography, Button, TextField, Alert, Chip } from "@mui/material"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import type { CartItem as GlobalCartItem } from "@/context/CartContext" 

interface CartSummaryProps {
  cartItems: GlobalCartItem[]
}

const COUPON_CODES = {
  SAVE10: { discount: 0.1, description: "10% off your order" },
  WELCOME20: { discount: 0.2, description: "20% off for new customers" },
  STUDENT15: { discount: 0.15, description: "15% student discount" },
  FREESHIP: { discount: 0, description: "Free shipping", freeShipping: true },
}

const CartSummary = ({ cartItems }: CartSummaryProps) => {
  const { isAuthenticated, redirectToLogin } = useAuth()
  const router = useRouter()

  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState("")

  //  Utility: normalize price to number
  const parsePrice = (price: string | number): number => {
    if (typeof price === "number") return price
    if (typeof price === "string") {
      return Number(price.replace(/[₦,]/g, "")) || 0
    }
    return 0
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parsePrice(item.price)
      return total + price * item.quantity
    }, 0)
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    let discount = 0

    if (appliedCoupon && COUPON_CODES[appliedCoupon as keyof typeof COUPON_CODES]) {
      const coupon = COUPON_CODES[appliedCoupon as keyof typeof COUPON_CODES]
      discount = subtotal * coupon.discount
    }

    const total = subtotal - discount
    return total.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const applyCoupon = () => {
    const upperCaseCode = couponCode.toUpperCase()
    if (COUPON_CODES[upperCaseCode as keyof typeof COUPON_CODES]) {
      setAppliedCoupon(upperCaseCode)
      setCouponError("")
      setCouponCode("")
    } else {
      setCouponError("Invalid coupon code")
      setTimeout(() => setCouponError(""), 3000)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponError("")
  }

  const subtotal = calculateSubtotal()
  const discount =
    appliedCoupon && COUPON_CODES[appliedCoupon as keyof typeof COUPON_CODES]
      ? subtotal * COUPON_CODES[appliedCoupon as keyof typeof COUPON_CODES].discount
      : 0

  const handleCheckout = () => {
    if (!isAuthenticated) {
      redirectToLogin("/cart-payment-page")
      return
    }
    router.push("/cart-payment-page")
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
      <Box sx={{ minWidth: 350 }}>
        
        {/* Coupon Section */}
        <Box sx={{ mb: 3, p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            Coupon Code
          </Typography>

          {appliedCoupon ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Chip
                label={`${appliedCoupon} - ${COUPON_CODES[appliedCoupon as keyof typeof COUPON_CODES].description}`}
                onDelete={removeCoupon}
                color="success"
                variant="outlined"
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
              <TextField
                size="small"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && applyCoupon()}
                sx={{ flex: 1 }}
              />
              <Button variant="outlined" onClick={applyCoupon} disabled={!couponCode.trim()}>
                Apply
              </Button>
            </Box>
          )}

          {couponError && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {couponError}
            </Alert>
          )}

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            Try: SAVE10, WELCOME20, STUDENT15, FREESHIP
          </Typography>
        </Box>

        {/* Summary Section */}
        <Box sx={{ textAlign: "right" }}>
          <Box sx={{ mb: 2, pb: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">
                ₦{subtotal.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </Typography>
            </Box>

            {discount > 0 && (
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body1" sx={{ color: "success.main" }}>
                  Discount ({appliedCoupon}):
                </Typography>
                <Typography variant="body1" sx={{ color: "success.main" }}>
                  -₦{discount.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Box>
            )}
          </Box>

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Total: ₦{calculateTotal()}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            Note: Delivery charges within Lagos is ₦5,000 and delivery takes within 24 hours
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
            Delivery within Nigeria and outside Nigeria: Kindly call this number for clarity 08133088845.
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              px: 4,
              borderRadius: 25,
              bgcolor: "#2e7d32",
              "&:hover": {
                bgcolor: "#1b5e20",
              },
            }}
            size="large"
            onClick={handleCheckout}
          >
            {isAuthenticated ? "Proceed to Checkout" : "Sign In to Checkout"}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CartSummary
