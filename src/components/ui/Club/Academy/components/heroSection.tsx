"use client"
import { Box, Typography, Container } from "@mui/material"
import { motion } from "framer-motion"

export default function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: 'url("/homepage/home6.webp") center/cover no-repeat',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "25%",
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 1 }}
        style={{
          position: "absolute",
          bottom: "15%",
          left: "15%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "2rem", sm: "2rem", md: "4rem", lg: "4rem" },
                fontWeight: 800,
                color: "white",
                textShadow: "0 4px 20px rgba(0,0,0,0.8)",
                mb: 2,
                letterSpacing: "-0.02em",
              }}
            >
              AUTHENTIC UNITED FOOTBALL CLUB
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Typography
              variant="h6"
              sx={{
                mt: 4,
                color: "rgba(255, 255, 255, 0.9)",
                fontSize: { xs: "1rem", sm: "2rem" },
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
                textShadow: "0 1px 5px rgba(0,0,0,0.5)",
              }}
            >
              LET ELEVATE GRASSROOT FOOTBALL
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  )
}
