"use client"
import { useTheme } from "@/theme/theme-context"
import { IconButton, Tooltip } from "@mui/material"
import { motion } from "framer-motion"
import LightModeIcon from "@mui/icons-material/LightMode"
import DarkModeIcon from "@mui/icons-material/DarkMode"

export default function ThemeToggle() {
  const { mode, toggleTheme } = useTheme()

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        sx={{
          position: "relative",
          overflow: "hidden",
          bgcolor: "transparent",
          backdropFilter: "blur(5px)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3 }}
          key={mode}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </motion.div>
      </IconButton>
    </Tooltip>
  )
}

