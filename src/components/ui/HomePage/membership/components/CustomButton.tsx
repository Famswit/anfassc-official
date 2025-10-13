"use client";

import { Button } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

interface CustomButtonProps {
  buttonColor: string;
}

export default function CustomButton({ buttonColor }: CustomButtonProps) {
  return (
    <motion.div
      variants={{ hover: { scale: 1.05 }, tap: { scale: 0.95 } }}
      whileHover="hover"
      whileTap="tap"
    >
      <Button
        component={Link}
        href="/member"
        variant="contained"
        sx={{
          mt: 2,
          py: 1,
          px: 2,
          fontSize: "0.75rem",
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "20px",
          bgcolor: buttonColor,
          color: "#000000",
          width: "100%",
          "&:hover": {
            bgcolor: buttonColor,
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          },
          transition: "all 0.3s ease",
        }}
      >
        FIND OUT MORE
      </Button>
    </motion.div>
  );
}
