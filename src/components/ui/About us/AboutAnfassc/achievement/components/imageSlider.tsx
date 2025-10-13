"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sliderImages = [
  "/homepage/home1.webp",
  "/homepage/home2.webp",
  "/homepage/home3.webp",
];

const ImageSlider: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "40%" },
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 250, md: "100%" },
          minHeight: 400,
        }}
      >
        {sliderImages.map((src, index) => (
          <motion.div
            key={src}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentImage ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={src}
              alt="Achievement Slide"
              fill
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
