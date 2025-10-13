"use client";
import type React from "react";
import {
  Box,
  Typography,
  useTheme,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import ClubPhotos from "./components/generalPhotos";
import DignitoriesPhotos from "./components/dignitoriesPhotos";
import PlayersPhotos from "./components/playersPhotos";
import SponsorsPhoto from "./components/sponsorsPhoto";
import PatronPhotos from "./components/patronPhotos";
import CharityPhotos from "./components/charityPhotos";
import TabSection from "../components/tabSection";

export default function PhotoSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tabs = [
    { label: "CLUB", content: <ClubPhotos /> },
    { label: "DIGNITORIES", content: <DignitoriesPhotos /> },
    { label: "PLAYERS", content: <PlayersPhotos /> },
    { label: "SPONSORS", content: <SponsorsPhoto /> },
    { label: "PATRON", content: <PatronPhotos /> },
    { label: "CHARITY", content: <CharityPhotos /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ py: { xs: 4, md: 16 }, px: { xs: 2, sm: 4, md: 8 } }}>
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            sx={{
              color: theme.palette.primary.main,
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              textAlign: "center",
              mb: 4,
            }}
          >
            Welcome to ANFASSC Gallery →
          </Typography>
        </motion.div>

        {/* Tab Navigation */}
        <TabSection tabs={tabs} />
      </Box>
    </ThemeProvider>
  );
}
