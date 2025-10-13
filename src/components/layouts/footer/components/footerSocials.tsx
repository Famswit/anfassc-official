"use client"

import { Box, Typography, IconButton } from "@mui/material"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { SocialMediaLink } from "@/constants/footerData"

interface FooterSocialsProps {
  socialMedia: SocialMediaLink[]
  itemVariants: Variants
  socialIconVariants: Variants
}

export default function FooterSocials({
  socialMedia,
  itemVariants,
  socialIconVariants,
}: FooterSocialsProps) {

  return (
    <motion.div variants={itemVariants}>
      <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
        <Box
          sx={{
            width: { xs: 200, sm: 150, md: 200 }, 
            height: { xs: 200, sm: 150, md: 200 },
            mx: { xs: "auto", md: 0 },
            my: { xs: "50px", md: 0},        
            mb: 2,
            position: "relative",
            borderRadius: "50%", 
            overflow: "hidden",
            bgcolor: "white",
          }}
        >
          <Image
            src="/officialLogo.jpg"
            alt="ANFASSC Logo"
            fill
            style={{ 
              objectFit: "contain",
              width: "100%",
              height: "100%",
              borderRadius: "50%", 
            }}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(255,255,255,0.8)",
            mb: 1,
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          Connect us on socials
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: { xs: "center", md: "flex-start" },
            mt: 1,
          }}
        >
          {socialMedia.map((social) => {
            const IconComponent = social.icon
            return (
              <motion.div
                key={social.name}
                variants={socialIconVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <IconButton
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "#fff",
                    "&:hover": {
                      bgcolor: "rgba(255,255,255,0.2)",
                    },
                  }}
                >
                  <IconComponent sx={{ fontSize: 24 }} />
                </IconButton>
              </motion.div>
            )
          })}
        </Box>
      </Box>
    </motion.div>
  )
}