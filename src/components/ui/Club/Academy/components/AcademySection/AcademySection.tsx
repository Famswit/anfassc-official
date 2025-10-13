"use client";
import { Box, Typography, Container, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import NewsCard from "@/components/ui/HomePage/latestNews/components/NewsCard";
import { facilities, programs } from "./components/academyData";
import SuccessStory from "./components/successStat";

export default function AcademySection() {
  const [showAllPrograms, setShowAllPrograms] = useState(false);
  const [showAllFacilities, setShowAllFacilities] = useState(false);

  const displayedPrograms = showAllPrograms ? programs : programs.slice(0, 3);
  const displayedFacilities = showAllFacilities
    ? facilities
    : facilities.slice(0, 3);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            mb: 2,
            color: "primary.main",
          }}
        >
          ANFASSC FOOTBALL ACADEMY
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            maxWidth: 600,
            mx: "auto",
            textAlign: "center",
            mb: 6,
          }}
        >
          Developing the next generation of football talent through professional
          training, world-class facilities, and expert coaching.
        </Typography>
      </motion.div>

      {/* Programs Section */}
      <Box mb={8}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              textAlign: "center",
              mb: 4,
              color: "primary.main",
            }}
          >
            TRAINING PROGRAMS
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {displayedPrograms.map((program, index) => (
            <NewsCard
              key={index}
              item={{
                title: program.title,
                category: "Training Program",
                date: new Date().toLocaleDateString(),
                image: program.image,
                body: program.features.join(" • "),
              }}
              index={index}
              isMobile={false}
              isTablet={false}
            />
          ))}
        </Box>

        {programs.length > 3 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setShowAllPrograms(!showAllPrograms)}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "primary.dark",
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                {showAllPrograms ? "See Less Programs" : "See More Programs"}
              </Button>
            </motion.div>
          </Box>
        )}
      </Box>

      {/* Facilities Section */}
      <Box mb={8}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              textAlign: "center",
              mb: 4,
              color: "primary.main",
            }}
          >
            FACILITIES
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {displayedFacilities.map((facility, index) => (
            <NewsCard
              key={index}
              item={{
                title: facility.title,
                category: "Facility",
                date: new Date().toLocaleDateString(),
                image:
                  "https://britishfootball.academy/wp-content/uploads/2023/07/Pic-2.jpg",
                body: facility.description,
              }}
              index={index}
              isMobile={false}
              isTablet={false}
            />
          ))}
        </Box>

        {facilities.length > 3 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setShowAllFacilities(!showAllFacilities)}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  borderColor: "primary.main",
                  color: "primary.main",
                  "&:hover": {
                    borderColor: "primary.dark",
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                {showAllFacilities
                  ? "See Less Facilities"
                  : "See More Facilities"}
              </Button>
            </motion.div>
          </Box>
        )}
      </Box>

      {/* Success Stats */}
      <SuccessStory />
    </Container>
  );
}
