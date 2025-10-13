import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { cardVariants } from "./MerchandiseVariants";
import AddToCartButton from "./AddtoCartButton";

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  onSale: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
  handleAddToCart: (productId: number) => void;
}

export default function ProductCard({
  product,
  index,
  handleAddToCart,
}: ProductCardProps) {
  const theme = useTheme();

  return (
    <motion.div
      key={`${product.id}`}
      variants={cardVariants}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        elevation={0}
        sx={{
          height: "100%",
          minHeight: "400px",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.3s ease",
          border: "1px solid rgba(255,255,255,0.2)",
          "&:hover": {
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            background: "rgba(255,255,255,1)",
          },
        }}
      >
        {/* Sale/Preorder Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
          style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            zIndex: 2,
          }}
        >
          <Chip
            label={product.onSale ? "Sale!" : "Preorder"}
            sx={{
              bgcolor: product.onSale ? theme.palette.primary.main : "#ff0000",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "0.8rem",
            }}
          />
        </motion.div>

        {/* Product Image */}
        <Box
          sx={{
            position: "relative",
            height: "250px",
            overflow: "hidden",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <CardMedia
            component="img"
            height="250"
            image={product.image}
            alt={product.name}
            sx={{
              objectFit: "contain",
              objectPosition: "center",
              width: "100%",
              height: "100%",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Box>

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          {/* Product Info */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontSize: "1.1rem",
                color: "#333",
                mb: 2,
                textAlign: "center",
              }}
            >
              {product.name}
            </Typography>

            <Box sx={{ textAlign: "center", mb: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: theme.palette.primary.main,
                  fontSize: "1.3rem",
                }}
              >
                {product.price}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "line-through",
                    color: "#999",
                    fontSize: "0.9rem",
                  }}
                >
                  {product.originalPrice}
                </Typography>
              )}
            </Box>
          </Box>

          {/* Add to Cart Button */}
          <AddToCartButton
            productId={product.id}
            handleAddToCart={handleAddToCart}
            disabled={!product.onSale}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
