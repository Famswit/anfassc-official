"use client";
import { Box, Typography, Container, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import NewsCard from "@/components/ui/HomePage/latestNews/components/NewsCard";
import { authenticNewsData } from "./authenticNewsData";

export default function NewsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedNews = showAll
    ? authenticNewsData
    : authenticNewsData.slice(0, 3);

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
          AUTHENTIC UNITED FOOTBALL CLUB NEWS
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
        {displayedNews.map((item, index) => (
          <NewsCard
            key={index}
            item={item}
            index={index}
            isMobile={false}
            isTablet={false}
          />
        ))}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => setShowAll(!showAll)}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              textTransform: "none",
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                borderColor: "primary.dark",
                backgroundColor: "primary.main",
                color: "white",
              },
            }}
          >
            {showAll ? "See Less" : "See More"}
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
}
