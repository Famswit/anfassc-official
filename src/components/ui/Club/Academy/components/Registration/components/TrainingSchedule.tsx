"use client"
import { Card, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { Sports } from "@mui/icons-material"

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

export default function TrainingSchedule() {
  return (
    <motion.div initial="hidden" animate="visible" variants={cardVariants}>
      <Card sx={{ p: 3, mb: 3 }}>
        <Sports sx={{ fontSize: 40, color: "primary.main", mb: 2 }} />
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Training Schedule
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Youth: will be communicated soon
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          • Junior: will be communicated soon
        </Typography>
      </Card>
    </motion.div>
  )
}
