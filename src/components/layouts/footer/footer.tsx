"use client"

import { Box, Container, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { footerLinks, socialMedia } from "@/constants/footerData"
import { containerVariants, itemVariants, socialIconVariants } from "@/utils/footerVariants"
import FooterSocials from "./components/footerSocials"
import FooterSection from "./components/footerSection"

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        overflow: "hidden",
        bgcolor: "green",
        position: "relative",
        color: "#fff",
        clipPath: {
          xs: "polygon(0% 0%, 50% 5%, 100% 0%, 100% 100%, 0% 100%)",
          md: "polygon(0% 0%, 50% 15%, 100% 0%, 100% 100%, 0% 100%)",
        },
        minHeight: { xs: "300px", md: "350px" },
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/homepage/home3.jpeg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.1,
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 2, py: { xs: 3, md: 4 }, pt: { xs: "10%", md: "12%" } }}
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 4, md: 6 },
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {/* Left: Socials */}
            <Box sx={{ flex: { xs: "1 1 100%", md: "1 1 25%" } }}>
              <FooterSocials
                socialMedia={socialMedia}
                itemVariants={itemVariants}
                socialIconVariants={socialIconVariants}
              />
            </Box>

            {/* Right: Menu, Support, About Us in row on md+ */}
            <Box
              sx={{
                flex: { xs: "1 1 100%", md: "1 1 70%" },
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                gap: { xs: 4, sm: 6 },
              }}
            >
              <FooterSection title="Menu" links={footerLinks.menu} itemVariants={itemVariants} />
              <FooterSection title="Support" links={footerLinks.support} itemVariants={itemVariants} />
              <FooterSection title="About us" links={footerLinks.aboutUs} itemVariants={itemVariants} />
            </Box>
          </Box>
        </motion.div>
      </Container>

      <Box
        sx={{
          bgcolor: "green",
          py: { xs: 2, md: 3 },
          px: { xs: 2, sm: 4, md: 8 },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: { xs: 2, md: 0 },
          color: "#fff",
          fontSize: { xs: "0.8rem", md: "0.9rem" },
          borderTop: "1px solid rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 2, md: 0 },
          }}
        >
          <Typography
            variant="caption"
            sx={{ fontSize: "0.8rem", opacity: 0.9, textAlign: "center" }}
          >
            © Authentic Nigeria Football and Allied Sport Supporter&apos;s Club. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
