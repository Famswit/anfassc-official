"use client"
import { useState } from "react"
import { Box, Typography, useTheme, useMediaQuery, Button } from "@mui/material"
import type React from "react"
import VideoCard from "../../HomePage/latestVideo/components/VideoCard"
import VideoPlayer from "../../HomePage/latestVideo/components/VideoPlayers"
import { videos } from "./components/videoData"

const VideoSection = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))
  const [visibleVideos, setVisibleVideos] = useState(8)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const handleSeeMore = () => {
    setVisibleVideos((prev) => prev + 4)
  }

  const handleVideoPlay = (index: number) => {
    setSelectedVideo(videos[index].video)
  }

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", p: 2 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 4, mt: 20, color: theme.palette.primary.main, textAlign: "center" }}
      >
        ANFASSC Video Gallery
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          mb: 4,
        }}
      >
        {videos.slice(0, visibleVideos).map((item, index) => (
          <VideoCard
            key={index}
            item={item}
            index={index}
            isMobile={isMobile}
            isTablet={isTablet}
            handleVideoPlay={handleVideoPlay}
          />
        ))}
      </Box>
      {visibleVideos < videos.length && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleSeeMore}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            See More
          </Button>
        </Box>
      )}
      {selectedVideo && (
        <VideoPlayer selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} />
      )}
    </Box>
  )
}

export default VideoSection