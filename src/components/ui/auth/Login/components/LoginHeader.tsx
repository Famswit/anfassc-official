"use client"

import type React from "react"
import { Box, Typography } from "@mui/material"
import { motion } from "framer-motion"

const LoginHeader: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={itemVariants}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#2e7d32", mb: 1 }}>
          Welcome Back
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Sign in to your ANFASSC account
        </Typography>
      </Box>
    </motion.div>
  )
}

export default LoginHeader
