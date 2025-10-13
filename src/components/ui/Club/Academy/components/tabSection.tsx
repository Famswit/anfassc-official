"use client";
import { useState } from "react";
import type React from "react";

import { Box, Tabs, Tab, Container } from "@mui/material";
import { motion } from "framer-motion";
import CompetitionsSection from "./CompetitionSection/CompetitionsSection";
import OtherEventsSection from "./OtherEventSection/OtherEventsSection";
import AcademySection from "./AcademySection/AcademySection";
import RegistrationSection from "./Registration/Registration";

export default function TabSection() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", pt: 4, mb: 2 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiTabs-flexContainer": {
                  gap: 1,
                },
              }}
            >
              <Tab
                label="COMPETITIONS"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textTransform: "none",
                  borderRadius: "25px",
                  px: { xs: 2, sm: 4 },
                  py: 1.5,
                  minHeight: "auto",
                  bgcolor: activeTab === 0 ? "primary.main" : "transparent",
                  color: activeTab === 0 ? "#ffffff" : "primary.main",
                  border: "2px solid",
                  borderColor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "#ffffff !important",
                  },
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    color: "#ffffff !important",
                  },
                }}
              />
              <Tab
                label="OTHER EVENTS"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textTransform: "none",
                  borderRadius: "25px",
                  px: { xs: 2, sm: 4 },
                  py: 1.5,
                  minHeight: "auto",
                  bgcolor: activeTab === 1 ? "primary.main" : "transparent",
                  color: activeTab === 1 ? "#ffffff" : "primary.main",
                  border: "2px solid",
                  borderColor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "#ffffff !important",
                  },
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    color: "#ffffff !important",
                  },
                }}
              />
              <Tab
                label="ACADEMY"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textTransform: "none",
                  borderRadius: "25px",
                  px: { xs: 2, sm: 4 },
                  py: 1.5,
                  minHeight: "auto",
                  bgcolor: activeTab === 2 ? "primary.main" : "transparent",
                  color: activeTab === 2 ? "#ffffff" : "primary.main",
                  border: "2px solid",
                  borderColor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "#ffffff !important",
                  },
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    color: "#ffffff !important",
                  },
                }}
              />
              <Tab
                label="REGISTRATION"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textTransform: "none",
                  borderRadius: "25px",
                  px: { xs: 2, sm: 4 },
                  py: 1.5,
                  minHeight: "auto",
                  bgcolor: activeTab === 3 ? "primary.main" : "transparent",
                  color: activeTab === 3 ? "#ffffff" : "primary.main",
                  border: "2px solid",
                  borderColor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "#ffffff !important",
                  },
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    color: "#ffffff !important",
                  },
                }}
              />
            </Tabs>
          </Box>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 0 && <CompetitionsSection />}
          {activeTab === 1 && <OtherEventsSection />}
          {activeTab === 2 && <AcademySection />}
          {activeTab === 3 && <RegistrationSection />}
        </motion.div>
      </Container>
    </Box>
  );
}
