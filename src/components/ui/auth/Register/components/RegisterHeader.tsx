"use client"

import { Box, Typography } from "@mui/material"
import { motion, type Variants } from "framer-motion"

interface RegisterHeaderProps {
  itemVariants: Variants
}

export const RegisterHeader = ({ itemVariants }: RegisterHeaderProps) => {
  return (
    <motion.div variants={itemVariants}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1 }}>
          Create Account
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Join ANFASSC, the best supporter&apos;s club in Nigeria
        </Typography>
      </Box>
    </motion.div>
  )
}
