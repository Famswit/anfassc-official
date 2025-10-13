// components/Footer/FooterSection.tsx

"use client"

import { Box, Typography } from "@mui/material"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { FooterLink } from "@/constants/footerData"

interface FooterSectionProps {
  title: string
  links: FooterLink[]
  itemVariants: Variants  
}

export default function FooterSection({ title, links, itemVariants }: FooterSectionProps) {
  return (
    <motion.div variants={itemVariants}>
      <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "1rem", md: "1.1rem" },
            color: "#fff",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
            pb: 1,
            display: "inline-block",
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
          {links.map((link) => (
            <Link key={link.name} href={link.href} style={{ textDecoration: "none" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  cursor: "pointer",
                  fontSize: { xs: "0.85rem", md: "0.9rem" },
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#fff",
                    transform: "translateX(5px)",
                  },
                }}
              >
                {link.name}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </motion.div>
  )
}
