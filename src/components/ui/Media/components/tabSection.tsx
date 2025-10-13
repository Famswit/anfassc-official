"use client"
import { useState } from "react"
import type React from "react"
import { Box, Tabs, Tab, useTheme } from "@mui/material"
import { motion } from "framer-motion"

interface TabSectionProps {
  tabs: { label: string; content: React.ReactNode }[];
  initialActiveTab?: number;
}

export default function TabSection({ tabs, initialActiveTab = 0 }: TabSectionProps) {
  const theme = useTheme()
  const [activeTab, setActiveTab] = useState(initialActiveTab)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  return (
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
          {tabs.map((tab, index) => (
            <Tab
              key={tab.label}
              label={tab.label}
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                textTransform: "none",
                borderRadius: "25px",
                px: { xs: 2, sm: 4 },
                py: 1.5,
                minHeight: "auto",
                bgcolor: activeTab === index ? theme.palette.primary.main : "transparent",
                color: activeTab === index ? "#ffffff" : theme.palette.primary.main,
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
          ))}
        </Tabs>
      </Box>
      {tabs[activeTab].content}
    </motion.div>
  )
}