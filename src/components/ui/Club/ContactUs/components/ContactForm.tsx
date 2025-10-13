"use client"

import type React from "react"
import { Box, Button, Typography } from "@mui/material"
import { motion, Variants } from "framer-motion"
import { CustomTextField } from "@/components/ui/Membership/components/customFieldText"

interface ContactFormProps {
  onSubmit: (event: React.FormEvent) => void
}

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <Box sx={{ bgcolor: "white", p: 4, borderRadius: 2 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 3,
            fontWeight: 600,
            color: "#333",
            textAlign: "center",
          }}
        >
          Contact Form
        </Typography>

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <CustomTextField label="Your Name" name="name" required />
          <CustomTextField label="Your Email" name="email" type="email" required />
          <CustomTextField label="Subject" name="subject" required />
          <CustomTextField
            label="Your Message"
            name="message"
            multiline
            rows={6}
            required
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              borderColor: "primary.main",
              color: "white",
              "&:hover": {
                borderColor: "primary.dark",
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            Send Message
          </Button>
        </Box>
      </Box>
    </motion.div>
  )
}

export default ContactForm
