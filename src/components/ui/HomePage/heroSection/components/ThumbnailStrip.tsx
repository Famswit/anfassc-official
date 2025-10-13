
import { Box, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { SliderImage } from "./SliderImages";

interface ThumbnailStripProps {
  images: SliderImage[];
  currentIndex: number;
  goToSlide: (index: number) => void;
}

export default function ThumbnailStrip({ images, currentIndex, goToSlide }: ThumbnailStripProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: theme.spacing(10),
        left: "50%",
        transform: "translateX(-50%)",
        display: { xs: "none", md: "flex" },
        gap: theme.spacing(1),
        backgroundColor: alpha("#000000", 0.5),
        backdropFilter: "blur(10px)",
        borderRadius: theme.spacing(1),
        p: theme.spacing(1),
      }}
    >
      {images.map((image, index) => (
        <Box
          key={image.id}
          component={motion.button}
          onClick={() => goToSlide(index)}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: theme.spacing(0.5),
            border: index === currentIndex ? "2px solid white" : "none",
            opacity: index === currentIndex ? 1 : 0.6,
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              opacity: 1,
            },
          }}
          whileHover={{ scale: index === currentIndex ? 1.1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Box
            component="img"
            src={image.src}
            alt={image.alt}
            sx={{
              width: 64,
              height: 40,
              objectFit: "cover",
              display: "block",
              userSelect: "none",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
