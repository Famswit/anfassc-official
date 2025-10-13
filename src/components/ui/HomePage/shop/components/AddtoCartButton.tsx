import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { buttonVariants } from "./MerchandiseVariants";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { AllProducts } from "./AllProducts";

interface AddToCartButtonProps {
  productId: number;
  handleAddToCart: (productId: number) => void;
  disabled?: boolean;
}

export default function AddToCartButton({ productId, handleAddToCart, disabled }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  const handleClick = () => {
    if (disabled) return; 
    const product = AllProducts.find((p) => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
      handleAddToCart(productId);
    }
  };

  return (
    <motion.div variants={buttonVariants} whileHover={disabled ? {} : "hover"} whileTap={disabled ? {} : "tap"}>
      <Button
        variant="contained"
        fullWidth
        startIcon={<ShoppingCart />}
        onClick={handleClick}
        disabled={disabled}
        sx={{
          py: 1.5,
          fontSize: "0.9rem",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "25px",
          bgcolor: (theme) => disabled ? theme.palette.grey[400] : theme.palette.primary.main,
          color: "#fff",
          "&:hover": {
            bgcolor: (theme) => disabled ? theme.palette.grey[400] : theme.palette.primary.dark,
            transform: disabled ? "none" : "translateY(-2px)",
            boxShadow: disabled ? "none" : "0 8px 25px rgba(0,0,0,0.2)",
          },
          transition: "all 0.3s ease",
        }}
      >
        {disabled ? "Preorder Only" : "Add to Cart"}
      </Button>
    </motion.div>
  );
}