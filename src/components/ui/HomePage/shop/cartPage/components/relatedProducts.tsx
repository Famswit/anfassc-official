"use client";

import { useCart } from "@/context/CartContext";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { AllProducts } from "../../components/AllProducts";

const RelatedProducts = ({ cartItems }: { cartItems: { id: number }[] }) => {
  const { addToCart } = useCart();

  // Filter out products that are already in the cart
  const relatedProducts = AllProducts.filter(
    (product) => !cartItems.some((item) => item.id === product.id)
  );

  // Limit to 4 related products
  const displayedProducts = relatedProducts.slice(0, 4);

  const handleAddToCart = (product: typeof AllProducts[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
        Related Products
      </Typography>
      {displayedProducts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: "center" }}>
          No related products available.
        </Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 3,
          }}
        >
          {displayedProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card sx={{ maxWidth: 300, mx: "auto", borderRadius: 2, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.price}
                  </Typography>
                  
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 2 }}>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product)}
                    sx={{
                      textTransform: "none",
                      borderRadius: "25px",
                      bgcolor: "primary.main",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default RelatedProducts;