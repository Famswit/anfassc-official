"use client";

import { Box, IconButton, useTheme, alpha } from "@mui/material";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

interface NavigationButtonsProps {
  paginate: (newDirection: number) => void;
}

export default function NavigationButtons({
  paginate,
}: NavigationButtonsProps) {
  const theme = useTheme();

  return (
    <>
      <Box
        component={motion.div}
        sx={{
          position: "absolute",
          left: theme.spacing(1),
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: { xs: "flex", sm: "flex" },
        }}
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconButton
          onClick={() => paginate(-1)}
          sx={{
            backgroundColor: alpha("#4CAF50", 0.7),
            color: "white",
            "&:hover": {
              backgroundColor: alpha("#4CAF50", 0.9),
            },
            transition: "all 0.3s ease",
            width: { xs: 36, sm: 48 },
            height: { xs: 36, sm: 48 },
          }}
        >
          <ChevronLeft sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
        </IconButton>
      </Box>
      <Box
        component={motion.div}
        sx={{
          position: "absolute",
          right: theme.spacing(1),
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          display: { xs: "flex", sm: "flex" },
        }}
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconButton
          onClick={() => paginate(1)}
          sx={{
            backgroundColor: alpha("#4CAF50", 0.7),
            color: "white",
            "&:hover": {
              backgroundColor: alpha("#4CAF50", 0.9),
            },
            transition: "all 0.3s ease",
            width: { xs: 36, sm: 48 },
            height: { xs: 36, sm: 48 },
          }}
        >
          <ChevronRight sx={{ fontSize: { xs: "1.5rem", sm: "2rem" } }} />
        </IconButton>
      </Box>
    </>
  );
}
