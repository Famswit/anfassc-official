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

      {/* Register Link */}
      <motion.div variants={itemVariants}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            You already have an account?
            <Link
              component={NextLink}
              href="/login"
              sx={{
                color: "#2e7d32",
                fontWeight: "bold",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </motion.div>

    </>
  )
}

export default LoginFooter
