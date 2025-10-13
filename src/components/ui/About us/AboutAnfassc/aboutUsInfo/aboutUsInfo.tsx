"use client";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function AboutUsInfo() {
  return (
    <Box id="about" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h3"
            component="h2"
            align="center"
            gutterBottom
            sx={{
              background: "linear-gradient(270deg, #32CD32, #006400)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              ml: { xs: 0, sm: 2, md: 6, lg: 12 },
              fontSize: { xs: "2rem", sm: "2rem", md: "2.5rem", lg: "3rem" },
            }}
          >
            About ANFASSC
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Box
            sx={{
              width: { xs: 300, sm: 350, md: 400 },
              height: { xs: 280, sm: 330, md: 400 },
              position: "relative",
              mx: "auto",
              my: 5,
              "&:hover .border-box": {
                top: 0,
                left: 0,
              },
            }}
          >
            <Box
              className="border-box"
              sx={{
                position: "absolute",
                top: "-1.5rem",
                left: "-1.7rem",
                width: "100%",
                height: "100%",
                outline: "8px solid #1e6233",
                transition: "all 1s ease-in-out",
                zIndex: 0,
              }}
            />

            <motion.img
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              src="/officialLogo.jpg"
              alt="Profile"
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                objectFit: "cover",
                position: "relative",
                zIndex: 10,
                display: "block",
                margin: "0 auto",
              }}
            />
          </Box>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            style={{ flex: 1 }}
          >
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="h5" gutterBottom>
                Who ANFASSC is?
              </Typography>
              <Typography paragraph>
                The Authentic Nigeria Football and Allied Sport Supporters Club
                (ANFASSC) is the official Nigerian Football Supporters Club. We
                are recognised as Africa’s premier sports supporters’ club by
                the Confederation of African Football (CAF) and endorsed by FIFA
                for exceptional contributions to international sporting events.
              </Typography>
              <Typography paragraph>
                We are duly registered with the Corporate Affairs Commission as
                the Authentic Nigeria Football Supporters Club with over three
                decades of unwavering support for Nigerian sports.
              </Typography>
            </Box>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
