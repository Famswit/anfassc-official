"use client"

import type React from "react"
import { Box, Container } from "@mui/material"
import { motion } from "framer-motion"
import ContactForm from "./components/ContactForm"
import ContactDetails from "./components/ContactDetails"
import ContactMap from "./components/ContactMap"
import HeroSection from "./components/HeroSection"

const ContactUsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Form submitted")
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Hero Section */}
      <Box>
        <HeroSection />
      </Box>

      {/* Main Content - Form and Contact Info */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 4,
              alignItems: "flex-start",
            }}
          >
            {/* Contact Form */}
            <Box sx={{ flex: 1, width: "100%" }}>
              <ContactForm onSubmit={handleSubmit} />
            </Box>

            {/* Contact Information */}
            <Box sx={{ flex: 1, width: "100%" }}>
              <ContactDetails />
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* Full Width Map */}
      <ContactMap />
    </Box>
  )
}

export default ContactUsPage
