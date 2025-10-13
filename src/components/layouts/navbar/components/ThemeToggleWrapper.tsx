"use client"
import Box from "@mui/material/Box"
import ThemeToggle from "@/theme/themeToggle"
import type React from "react"

export default function ThemeToggleWrapper() {
  return (
    <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
      <ThemeToggle />
    </Box>
  )
}