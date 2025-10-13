"use client"
import { Card, Typography, Alert } from "@mui/material"
import { motion } from "framer-motion"
import { ContactPhone } from "@mui/icons-material"

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

export default function NeedHelpSection() {
  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.2 }}>
        <Card sx={{ p: 3, mb: 3 }}>
          <ContactPhone sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Need Help?
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Contact our registration team:
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Phone: +234 813 308 8845, +234 803 387 1545
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Email: authenticnfsc44@gmail.com
          </Typography>
        </Card>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={cardVariants} transition={{ delay: 0.4 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Registration Fee:</strong> will be communicated soon (includes training kit, equipment, and match fees)
          </Typography>
        </Alert>
      </motion.div>
    </>
  )
}
