"use client";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { competitionsData } from "./competitionData";

export default function CompetitionsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedCompetitions = showAll
    ? competitionsData
    : competitionsData.slice(0, 3);

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
          Upcoming Competitions
        </Typography>
      </motion.div>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {displayedCompetitions.map((competition, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            whileHover={{ y: -8 }}
            style={{
              flex: "1 1 300px",
              maxWidth: "400px",
            }}
          >
            <Card
              elevation={3}
              sx={{
                height: "100%",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <Box
                component="img"
                src={competition.image}
                alt={competition.title}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {competition.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {competition.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="primary.main"
                  >
                    {competition.date}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      bgcolor: "secondary.light",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {competition.status}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="outlined"
          onClick={() => setShowAll(!showAll)}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            fontWeight: "bold",
            textTransform: "none",
            fontSize: "1rem",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 3,
            },
          }}
        >
          {showAll ? "Show Less" : "See More"}
        </Button>
      </Box>
    </Container>
  );
}
