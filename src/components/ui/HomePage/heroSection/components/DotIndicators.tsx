
import { Box, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { SliderImage } from "./SliderImages";

interface DotIndicatorsProps {
  images: SliderImage[];
  currentIndex: number;
  goToSlide: (index: number) => void;
}

export default function DotIndicators({ images, currentIndex, goToSlide }: DotIndicatorsProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: theme.spacing(3),
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: theme.spacing(1.5),
        zIndex: 10,
      }}
    >
      {images.map((_, index) => (
        <Box
          key={index}
          component={motion.button}
          onClick={() => goToSlide(index)}
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
            backgroundColor: index === currentIndex ? "#ffffff" : alpha("#ffffff", 0.5),
            "&:hover": {
              backgroundColor: index === currentIndex ? "#ffffff" : alpha("#ffffff", 0.75),
            },
          }}
          whileHover={{ scale: index === currentIndex ? 1.25 : 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={false}
          animate={{
            scale: index === currentIndex ? 1.25 : 1,
            backgroundColor: index === currentIndex ? "#ffffff" : alpha("#ffffff", 0.5),
          }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </Box>
  );
}
