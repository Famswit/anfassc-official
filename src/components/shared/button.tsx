import { Button, ButtonProps } from "@mui/material";
import { motion, TargetAndTransition, VariantLabels } from "framer-motion";

type MotionProps = TargetAndTransition | VariantLabels;

interface CustomButtonProps extends ButtonProps {
  variant?: "contained" | "outlined" | "text";
  whileHover?: MotionProps;
  whileTap?: MotionProps;
}

export default function CustomButton({
  children,
  variant = "contained",
  whileHover,
  whileTap,
  ...props
}: CustomButtonProps) {
  return (
    <motion.div
      whileHover={whileHover || { scale: 1.05 }}
      whileTap={whileTap || { scale: 0.95 }}
    >
      <Button variant={variant} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
