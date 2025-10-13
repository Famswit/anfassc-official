"use client"
import { Box, Typography, Button } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useCart } from "@/context/CartContext"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  price: string
  originalPrice: string
  image: string
  onSale: boolean
}

interface ProductsSectionProps {
  jerseys: Product[]
}

const ProductsSection = ({ jerseys }: ProductsSectionProps) => {
  const theme = useTheme()
  const { addToCart } = useCart()
  const router = useRouter()

  const onSaleJerseys = jerseys.filter((jersey) => jersey.onSale)

  return (
    <Box
      sx={{
        flex: "0 0 30%",
        minWidth: 0,
        py: { xs: 12, md: 14 },
        borderLeft: "1px solid #e0e0e0",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          color: theme.palette.primary.main,
          mb: 3,
          textAlign: "start",
          px: 5,
        }}
      >
        Products
      </Typography>

      {/* Donations */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: "row",
            px: 5,
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="/homepage/hero09.webp"
            alt="Donation Image"
            sx={{
              width: "40%",
              height: "80px",
              objectFit: "cover",
              mb: 2,
              borderRadius: 1,
            }}
          />
          <Box sx={{ px: 1 }}>
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                color: theme.palette.text.primary,
                fontWeight: 800,
              }}
            >
              Donate
            </Typography>
            <br />

            {/* Donation button */}
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mb: 2, px: 2, py: 1 }}
                onClick={() => router.push("/donation")}
              >
                Donate now
              </Button>
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      {/* OnSale Jerseys */}
      <Typography
        variant="h6"
        fontWeight="bold"
        sx={{
          color: theme.palette.primary.main,
          mb: 2,
          textAlign: "center",
        }}
      >
        ANFASSC Jerseys (On Sale)
      </Typography>

      {onSaleJerseys.length > 0 ? (
        onSaleJerseys.map((jersey, index) => (
          <motion.div
            key={jersey.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
          >
            <Box
              sx={{
                mb: 4,
                display: "flex",
                flexDirection: "row",
                px: 5,
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  height: "80px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  overflow: "hidden",
                  backgroundColor: "#fafafa",
                }}
              >
                <Box
                  component="img"
                  src={jersey.image}
                  alt={jersey.name}
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>

              <Box sx={{ px: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.primary }}>
                  {jersey.name}
                </Typography>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                  Price: {jersey.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.disabled,
                    textDecoration: "line-through",
                  }}
                >
                  Original: {jersey.originalPrice}
                </Typography>

                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1, px: 2, py: 1 }}
                    onClick={() =>
                      addToCart({
                        id: jersey.id,
                        name: jersey.name,
                        price: jersey.price,
                        image: jersey.image,
                        quantity: 1,
                      })
                    }
                  >
                    Add to Cart
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </motion.div>
        ))
      ) : (
        <Typography sx={{ textAlign: "center", color: theme.palette.text.secondary }}>No jerseys on sale.</Typography>
      )}
    </Box>
  )
}

export default ProductsSection
