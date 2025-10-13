"use client"

import type React from "react"
import { Box, Typography, Link, Divider } from "@mui/material"
import { motion } from "framer-motion"
import NextLink from "next/link"

const LoginFooter: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      {/* Divider */}
      <motion.div variants={itemVariants}>
        <Divider sx={{ my: 3 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
        </Divider>
      </motion.div>

      {/* Forgot Password Link */}
      <motion.div variants={itemVariants}>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Link
            component={NextLink}
            href="/forgot-password"
            sx={{
              color: "#2e7d32",
              fontSize: "0.875rem",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Forgot Password?
          </Link>
        </Box>
      </motion.div>

      {/* Demo Credentials */}
     
    </>
  )
}

export default LoginFooter
