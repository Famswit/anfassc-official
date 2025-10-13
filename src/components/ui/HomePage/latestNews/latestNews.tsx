"use client";
import { useState } from "react";
import type React from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
  ThemeProvider,
} from "@mui/material";
import { motion } from "framer-motion";
import SupportersClubNews from "./components/SupportersClubNews";
import SportNews from "./components/SportNews";

export default function LatestNews() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 4, md: 8 } }}>
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
            Latest News →
          </Typography>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
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
                label="SUPPORTERS CLUB"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textTransform: "none",
                  borderRadius: "25px",
                  px: { xs: 2, sm: 4 },
                  py: 1.5,
                  minHeight: "auto",
                  bgcolor:
                    activeTab === 0
                      ? theme.palette.primary.main
                      : "transparent",
                  color:
                    activeTab === 0 ? "#ffffff" : theme.palette.primary.main,
                  border: `2px solid ${theme.palette.primary.main}`,
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
                    color: "#ffffff !important",
                  },
                  transition: "all 0.3s ease",
                  "&.Mui-selected": {
                    color: "#ffffff !important",
                  },
                }}
              />
              <Tab
                label="SPORT"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  textTransform: "none",
                  borderRadius: "25px",
                  px: { xs: 2, sm: 4 },
                  py: 1.5,
                  minHeight: "auto",
                  bgcolor:
                    activeTab === 1
                      ? theme.palette.primary.main
                      : "transparent",
                  color:
                    activeTab === 1 ? "#ffffff" : theme.palette.primary.main,
                  border: `2px solid ${theme.palette.primary.main}`,
                  "&:hover": {
                    bgcolor: theme.palette.primary.main,
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

        {/* News Sections */}
        {activeTab === 0 && <SupportersClubNews />}
        {activeTab === 1 && <SportNews />}
      </Box>
    </ThemeProvider>
  );
}
