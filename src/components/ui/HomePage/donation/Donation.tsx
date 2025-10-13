"use client";

import { useState } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CountingNumber from "@/components/shared/countingNumber";
import { charityProjects } from "./components/charityProject";
import DonationCard from "./components/donationCard";
import DonationModal from "./components/donationModal";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

const DonationPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const openDonationModal = (projectId?: number) => {
    if (projectId) setSelectedProject(projectId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };

  const stats: Stat[] = [
    { label: "Lives Touched", value: 500, suffix: "+" },
    { label: "Communities Served", value: 15 },
    { label: "Donors", value: 754, suffix: "+" },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #2e7d32, #4caf50)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Make a Difference Today
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Your generosity can transform lives and build stronger communities
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<FavoriteIcon />}
            onClick={() => openDonationModal()}
            sx={{
              py: 2,
              px: 4,
              borderRadius: 25,
              bgcolor: "#2e7d32",
              fontSize: "1.1rem",
              "&:hover": {
                bgcolor: "#1b5e20",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Donate Now
          </Button>
        </Box>

        {/* Impact Section */}
        <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <Typography variant="h5" textAlign="center" mb={3} fontWeight="bold">
            Our Impact So Far
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
              gap: 3,
            }}
          >
            {stats.map((stat, i) => (
              <Box
                key={i}
                sx={{
                  flex: "1 1 200px",
                  textAlign: "center",
                }}
              >
                <CountingNumber
                  end={stat.value}
                  suffix={stat.suffix ?? ""}
                  duration={2500 + i * 200}
                />
                <Typography variant="body1">{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>

        {/* Projects Section */}
        <Typography variant="h4" textAlign="center" mb={4} fontWeight="bold">
          Our Current Projects
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {charityProjects.map((project, index) => (
            <DonationCard
              key={project.id}
              project={project}
              index={index}
              onDonate={openDonationModal}
            />
          ))}
        </Box>

        {/* Donation Modal */}
        <DonationModal
          open={modalOpen}
          onClose={handleCloseModal}
          selectedProject={selectedProject}
        />
      </motion.div>
    </Container>
  );
};

export default DonationPage;
