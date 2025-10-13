"use client";

import { Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import type { SliderImage } from "./SliderImages";

interface ContentOverlayProps {
  currentImage: SliderImage;
}

export default function ContentOverlay({ currentImage }: ContentOverlayProps) {
  const theme = useTheme();

  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: "8%",
        left: "5%",
        right: "5%",
        padding: theme.spacing(2),
        color: "#E3FCEC",
        background: "rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(4px)",
        borderRadius: "8px",
        width: "auto",
        maxWidth: "90%",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontWeight: "bold",
          mb: 1,
          fontSize: {
            xs: "1.1rem",
            sm: "1.4rem",
            md: "2rem",
            lg: "2.5rem",
          },
          lineHeight: 1.3,
          wordBreak: "break-word",
        }}
      >
        {currentImage.title}
      </Typography>

      <Typography
        variant="h6"
        sx={{
          opacity: 0.9,
          fontSize: {
            xs: "0.85rem",
            sm: "1rem",
            md: "1.1rem",
            lg: "1.25rem",
          },
          color: "#fff",
          lineHeight: 1.4,
        }}
      >
        {currentImage.description}
      </Typography>
    </motion.div>
  );
}
