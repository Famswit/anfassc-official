"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Box, Button, Card, CardMedia, Typography } from "@mui/material"
import type React from "react"

interface Photo {
  src: string
  alt: string
}

interface PhotoCardProps {
  photos: Photo[]
  visiblePhotos: number
  selectedPhoto: Photo | null
  handleSeeMore: () => void
  handlePhotoClick: (photo: Photo) => void
  handleCloseZoom: () => void
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  photos,
  visiblePhotos,
  selectedPhoto,
  handleSeeMore,
  handlePhotoClick,
  handleCloseZoom,
}) => {
  return (
    <Box sx={{ position: "relative", maxWidth: "1200px", mx: "auto", p: 2 }}>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          mb: 4,
          gridTemplateColumns: {
          xs: "repeat(1, 1fr)", 
          sm: "repeat(2, 1fr)", 
          md: "repeat(3, 1fr)", 
          lg: "repeat(4, 1fr)",
    },
        }}
      >
        <AnimatePresence>
          {photos.slice(0, visiblePhotos).map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1/1",
                  borderRadius: "0 32px 0 32px",
                  overflow: "hidden",
                  boxShadow: 3,
                  cursor: "pointer",
                }}
                onClick={() => handlePhotoClick(photo)}
              >
                <CardMedia
                  component="img"
                  image={photo.src}
                  alt={photo.alt}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "0 0 0 0",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                />
                <Box
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px 0 0 16px",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)", color: "white" }}
                  >
                    OPEN
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
      {visiblePhotos < photos.length && (
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
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleCloseZoom}
          >
            <motion.img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: 8,
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default PhotoCard