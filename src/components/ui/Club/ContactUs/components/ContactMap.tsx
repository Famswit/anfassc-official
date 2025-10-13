"use client"

import { Box } from "@mui/material"
import { motion, Variants } from "framer-motion"

const ContactMap = () => {
  // variants
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

  const mapUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.2847982082896!2d3.3515625!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c0b1f1c1c1f%3A0x1f1c1c1f1c1c1c1f!2s96%20Ogunlana%20Dr%2C%20Surulere%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1629794729807!5m2!1sen!2sus"

  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.6 }}
    >
      <Box sx={{ width: "100%", height: 400, position: "relative" }}>
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: "8px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="ANFASSC Academy Location - 96, Ogunlana Drive, Surulere, Lagos, Nigeria"
        />
      </Box>
    </motion.div>
  )
}

export default ContactMap
