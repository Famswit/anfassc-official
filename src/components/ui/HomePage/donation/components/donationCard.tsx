"use client"

import { Card, CardContent, Typography, Button, Box } from "@mui/material"
import { motion } from "framer-motion"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"
import Image from "next/image"

interface CharityProject {
  id: number
  title: string
  description: string
  image: string
  projectDate?: string   // ✅ added
  contact?: string       // ✅ added
  raised?: string
  goal?: string
}

interface DonationCardProps {
  project: CharityProject
  index: number
  onDonate: (projectId: number) => void
}

const DonationCard = ({ project, index, onDonate }: DonationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        flex: "1 1 calc(50% - 16px)",
        maxWidth: "500px",
      }}
    >
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
          transition: "all 0.3s ease",
        }}
      >
        {/* Image */}
        <Box sx={{ position: "relative", height: 250 }}>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>

        {/* Content */}
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            {project.title}
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {project.description}
          </Typography>

          {/* ✅ Project Date */}
          {project.projectDate && (
            <Typography variant="body2" color="green" mb={1}>
              <strong>Project:</strong> {project.projectDate}
            </Typography>
          )}

          {/* ✅ Contact */}
          {project.contact && (
            <Typography variant="body2" color="red" mb={3}>
              <strong>Contact:</strong> {project.contact}
            </Typography>
          )}

          <Button
            variant="contained"
            fullWidth
            startIcon={<VolunteerActivismIcon />}
            onClick={() => onDonate(project.id)}
            sx={{
              py: 1.5,
              borderRadius: 25,
              bgcolor: "#2e7d32",
              "&:hover": {
                bgcolor: "#1b5e20",
              },
            }}
          >
            Support This Project
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DonationCard
