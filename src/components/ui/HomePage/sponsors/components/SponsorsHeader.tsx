'use client'
import { Typography, useTheme } from "@mui/material"
import { motion } from "framer-motion"
import { headerVariants } from "./sponsorsVariants"

export default function SponsorsHeader() {
  const theme = useTheme()

  return (
    <motion.div
      initial={headerVariants.initial}
      animate={headerVariants.animate}
      transition={headerVariants.transition}
    >
      <Typography
        variant="h2"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: {
            xs: "1.8rem",
            sm: "2.2rem",
            md: "2.8rem",
            lg: "3.2rem",
          },
          mb: { xs: 4, md: 6 },
          color: theme.palette.primary.main,
          letterSpacing: "0.02em",
        }}
      >
        OUR SPONSORS
      </Typography>
    </motion.div>
  )
}