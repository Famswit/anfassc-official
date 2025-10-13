"use client";
import { Box, Typography, Container, Paper } from "@mui/material";
import { motion } from "framer-motion";

const eventsData = [
  {
    title: "Annual Sports Day",
    description: "A day of athletic excellence and team spirit",
    date: "February 28, 2025",
    type: "Sports",
  },
  {
    title: "Cultural Festival",
    description: "Celebrating diversity through arts and performances",
    date: "March 25, 2025",
    type: "Cultural",
  },
  {
    title: "Career Guidance Workshop",
    description: "Expert guidance for future career paths",
    date: "April 15, 2025",
    type: "Workshop",
  },
  {
    title: "Alumni Meet",
    description: "Reconnecting with our distinguished graduates",
    date: "May 30, 2025",
    type: "Social",
  },
  {
    title: "Graduation Ceremony",
    description: "Celebrating academic achievements and new beginnings",
    date: "June 20, 2025",
    type: "Ceremony",
  },
];

export default function OtherEventsSection() {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "primary.main",
          }}
        >
          Other Events
        </Typography>
      </motion.div>

      <Box sx={{ position: "relative", maxWidth: 800, mx: "auto" }}>
        {/* Timeline line */}
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: "primary.light",
            transform: "translateX(-50%)",
            zIndex: 0,
          }}
        />

        {eventsData.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 4,
                position: "relative",
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
              }}
            >
              {/* Timeline dot */}
              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  width: 16,
                  height: 16,
                  bgcolor: "primary.main",
                  borderRadius: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                  border: "3px solid white",
                  boxShadow: 2,
                }}
              />

              {/* Event card */}
              <Box
                sx={{
                  width: { xs: "100%", sm: "48%", md: "45%" },
                  px: { xs: 0, sm: 2 },
                  mb: { xs: 2, sm: 3 },
                }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 2, md: 3 },
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {event.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {event.description}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary.main"
                    >
                      {event.date}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: "primary.light",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {event.type}
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Box>
          </motion.div>
        ))}
      </Box>
    </Container>
  );
}
