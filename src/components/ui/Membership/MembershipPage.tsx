"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Box, Typography, Tabs, Tab } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import MembershipProcedure from "./components/MembershipProcedure"
import EnquiryForm from "./components/enquiryForm/EnquiryForm"
import MembershipAccess from "./components/MembershipAccess"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const MembershipPage = () => {
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === "#tabpanel-1") {
        setTabValue(1)
      } else if (hash === "#tabpanel-2") {
        setTabValue(2)
      } else {
        setTabValue(0)
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    handleHashChange()

    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
    window.location.hash = `#tabpanel-${newValue}`
  }

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", my: "100px", p: { xs: 2, md: 4 }, py: 6 }}>
      {isClient && (
        <>
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ mb: 2, textAlign: "center", color: theme.palette.primary.main }}
            >
              BECOME A MEMBER
            </Typography>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <Typography
              variant="h6"
              sx={{ mb: 4, textAlign: "center", color: theme.palette.text.secondary }}
            >
              Kindly read carefully the instructions before proceeding to fill the membership form
            </Typography>
          </motion.div>

          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Membership Procedure" id="tab-0" />
              <Tab label="Enquiry Form" id="tab-1" />
              <Tab label="Membership Form" id="tab-2" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <TabPanel value={tabValue} index={0}>
            <MembershipProcedure />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <EnquiryForm />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <MembershipAccess />
          </TabPanel>
        </>
      )}
    </Box>
  )
}

export default MembershipPage
