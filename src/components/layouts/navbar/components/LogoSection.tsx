"use client"
import { motion } from "framer-motion"
import Box from "@mui/material/Box"
import Image from "next/image"

export default function LogoSection() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 2, sm: 4, md: 6, lg: 10 },
        width: "100%",
        maxWidth: { xs: "auto", md: "none" },
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          component="a"
          href="#"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: { xs: 1, sm: 1.5, md: 2 },
            backgroundColor: "white",
            borderRadius: "50%",
            padding: { xs: "1px", sm: "1px", md: "0" },
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            border: "2px solid #2e7d32",
          }}
        >
          <Image
            src="/officialLogo.jpg"
            alt="Logo"
            quality={100}
            width={100}
            height={100}
            style={{
              borderRadius: "50%",
              width: "clamp(45px, 8vw, 70px)",
              height: "clamp(45px, 8vw, 70px)",
            }}
          />
        </Box>
      </motion.div>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          gap: { md: 0.5, lg: 1 },
          flexWrap: "wrap",
        }}
      >
      </Box>
    </Box>
  )
}
