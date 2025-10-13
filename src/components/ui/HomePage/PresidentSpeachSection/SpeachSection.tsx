"use client"

import { Box, Typography, Container } from "@mui/material"
import Image from "next/image"
import { motion, Variants, easeOut } from "framer-motion"

export default function PresidentSpeech() {

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: easeOut,
        staggerChildren: 0.3,
      },
    },
  }

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
  }

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeOut } },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Box
        sx={{
          position: "relative",
          minHeight: "70vh",
          background: "linear-gradient(135deg, #1a5f3f 0%, #2d7a2d 50%, #1a5f3f 100%)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          py: { xs: 6, md: 8 },
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('/nigeria-flag-pattern.png') center/cover",
            opacity: 0.1,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "400px 1fr" },
              gap: { xs: 4, lg: 8 },
              alignItems: "center",
              minHeight: "500px",
            }}
          >
            {/* LEFT SIDE */}
            <motion.div variants={slideInLeft}>
              <Box
                sx={{
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Presidential Badge */}
                <Box
                  sx={{
                    position: "absolute",
                    top: -20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    bgcolor: "#dc2626",
                    color: "white",
                    px: 3,
                    py: 1,
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    zIndex: 2,
                  }}
                >
                  National President
                </Box>

                {/* President Image */}
                <Box
                  sx={{
                    width: 280,
                    height: 280,
                    borderRadius: "20px",
                    overflow: "hidden",
                    mx: "auto",
                    mb: 3,
                    border: "4px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                    "&:hover .overlay": {
                      opacity: 1,
                    },
                  }}
                >
                  <Image
                    src="https://cdn.thenationonlineng.net/wp-content/uploads/2023/06/02073741/NFASSCs-Abayomi-Ogunjimi-and-his-team.jpg"
                    alt="Prince Abayomi Ogunjimi"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(45deg, rgba(26, 95, 63, 0.8), rgba(45, 122, 45, 0.8))",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    ANFASSC Leader
                  </Box>
                </Box>

                {/* Name and Title */}
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: "white",
                    mb: 1,
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Prince Abayomi
                  <br />
                  Ogunjimi
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.9)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontSize: "0.9rem",
                  }}
                >
                  National President • ANFASSC
                </Typography>
              </Box>
            </motion.div>

            {/* RIGHT SIDE - SPEECH */}
            <motion.div variants={slideInRight}>
              <Box
                sx={{
                  bgcolor: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "24px",
                  p: { xs: 4, md: 6 },
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #1a5f3f, #dc2626, #1a5f3f)",
                    borderRadius: "24px 24px 0 0",
                  },
                }}
              >
                {/* Quote marks */}
                <Typography
                  sx={{
                    fontSize: "4rem",
                    color: "#1a5f3f",
                    opacity: 0.3,
                    lineHeight: 1,
                    position: "absolute",
                    top: 10,
                    left: 20,
                    fontFamily: "serif",
                  }}
                >
                  &quot;
                </Typography>

                {/* Main message */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    color: "#0a0a0a",
                    lineHeight: 1.3,
                    mb: 3,
                    fontSize: { xs: "1.8rem", md: "2.2rem" },
                    letterSpacing: "-0.02em",
                  }}
                >
                  Nigerian sports excellence runs through our veins—from the thunderous roar of our football stadiums to
                  the swift strides of our world-class athletes.
                </Typography>

                {/* Mission statement */}
                <Typography
                  variant="h6"
                  sx={{
                    color: "#4b5563",
                    lineHeight: 1.6,
                    fontWeight: 500,
                    mb: 4,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  ANFASSC exists to nurture this legacy, developing grassroots talent into global champions while
                  preserving the spirit of unity that makes Nigerian sports truly exceptional. Together, we build
                  champions who represent not just skill, but the heart of our nation.
                </Typography>

                {/* Signature */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    pt: 2,
                    borderTop: "2px solid #e5e7eb",
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #1a5f3f, #2d7a2d)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                    }}
                  >
                    AO
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#1a5f3f",
                        fontSize: "0.9rem",
                      }}
                    >
                      Prince Abayomi Ogunjimi
                    </Typography>
                    <Typography
                      sx={{
                        color: "#6b7280",
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      National President, ANFASSC
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </motion.div>
  )
}
