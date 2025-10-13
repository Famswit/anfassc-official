"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  ThemeProvider,
} from "@mui/material";
import { motion } from "framer-motion";
import PaginationArrows from "./components/PaginationArrows";
import VideoCard from "./components/VideoCard";
import PaginationDots from "./components/paginationDots";
import VideoPlayer from "./components/VideoPlayers";
import { containerVariants, videos } from "./components/videoData";

export default function LatestVideos() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Cards per page
  const cardsPerPage = isMobile ? 1 : isTablet ? 2 : 3;
  const totalPages = Math.ceil(videos.length / cardsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
    setSelectedVideo(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    setSelectedVideo(null);
  };

  // Get current videos to display
  const getCurrentVideos = () => {
    const startIndex = currentIndex * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return videos.slice(startIndex, endIndex);
  };

  const handleVideoPlay = (index: number) => {
    const globalIndex = currentIndex * cardsPerPage + index;
    setSelectedVideo(videos[globalIndex].video);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, sm: 4, md: 8 } }}>
        
        {/* Header & Pagination */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              fontWeight="bold"
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              Latest Videos →
            </Typography>

            <PaginationArrows prevSlide={prevSlide} nextSlide={nextSlide} />
          </Box>
        </motion.div>

        {/* Paginated Video Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "center",
              minHeight: "400px",
              alignItems: "stretch",
            }}
          >
            {getCurrentVideos().map((item, index) => (
              <VideoCard
                key={`${currentIndex}-${index}`}
                item={item}
                index={index}
                isMobile={isMobile}
                isTablet={isTablet}
                handleVideoPlay={handleVideoPlay}
              />
            ))}
          </Box>

          <PaginationDots
            totalPages={totalPages}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />

          {selectedVideo && (
            <VideoPlayer
              selectedVideo={selectedVideo}
              setSelectedVideo={setSelectedVideo}
            />
          )}
        </motion.div>
      </Box>
    </ThemeProvider>
  );
}
