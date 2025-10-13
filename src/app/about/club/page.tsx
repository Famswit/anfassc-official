import AboutUsInfo from '@/components/ui/About us/AboutAnfassc/aboutUsInfo/aboutUsInfo'
import AchievementsSection from '@/components/ui/About us/AboutAnfassc/achievement/Achievement'
import HeaderSection from '@/components/ui/About us/AboutAnfassc/headerSection/HeaderSection'
import ObjectivesSection from '@/components/ui/About us/AboutAnfassc/objectives/Objectives'
import { Box } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <Box>
      <HeaderSection />
      <AboutUsInfo />
      <ObjectivesSection />
      <AchievementsSection />
      </Box>
  )
}

export default page