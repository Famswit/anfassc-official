import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { cardVariants, playButtonVariants, videoVariants } from "./videoData";

interface VideoItem {
  title: string;
  category: string;
  date: string;
  duration: string;
  video: string;
  thumbnail: string;
}

interface VideoCardProps {
  item: VideoItem;
  index: number;
  isMobile: boolean;
  isTablet: boolean;
  handleVideoPlay: (index: number) => void;
}

export default function VideoCard({
  item,
  index,
  isMobile,
  isTablet,
  handleVideoPlay,
}: VideoCardProps) {
  const theme = useTheme();

  return (
    <motion.div
      key={`${index}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ y: -8 }}
      style={{
        flex: "1 1 0",
        maxWidth: isMobile
          ? "100%"
          : isTablet
          ? "calc(50% - 12px)"
          : "calc(33.333% - 16px)",
        minWidth: isMobile ? "280px" : "300px",
      }}
    >
      <Card
        elevation={0}
        sx={{
          bgcolor: "transparent",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            "& .video-thumbnail": {
              transform: "scale(1.02)",
            },
          },
        }}
      >
        <Box
          sx={{
            overflow: "hidden",
            borderRadius: 1,
            flex: "0 0 auto",
            position: "relative",
          }}
        >
          <motion.div variants={videoVariants} whileHover="hover">
            <Box
              sx={{
                position: "relative",
                height: isMobile ? "180px" : "200px",
                borderRadius: 1,
                transition: "transform 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
              className="video-thumbnail"
            >
              {/* ✅ Thumbnail Image */}
              <Box
                component="img"
                src={item.thumbnail}
                alt={item.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />

              {/* Dark Overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  bgcolor: "rgba(0, 0, 0, 0.3)",
                  zIndex: 1,
                }}
              />

              {/* Play Button Overlay */}
              <motion.div
                variants={playButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => handleVideoPlay(index)}
                style={{ position: "relative", zIndex: 2 }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "rgba(76, 175, 80, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  <PlayArrowIcon
                    sx={{ fontSize: 30, color: "#fff", ml: 0.5 }}
                  />
                </Box>
              </motion.div>

              {/* Duration Badge */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  bgcolor: "rgba(0, 0, 0, 0.8)",
                  color: "#fff",
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  zIndex: 2,
                }}
              >
                {item.duration}
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Title & Meta */}
        <CardContent
          sx={{
            px: 0,
            py: 2,
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            style={{
              flex: "1 1 auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                mt: 1,
                mb: 2,
                color: theme.palette.primary.main,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                lineHeight: 1.4,
                flex: "1 1 auto",
              }}
            >
              {item.title}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: `1px solid ${theme.palette.primary.light}`,
                pt: 1.5,
                mt: "auto",
              }}
            >
              <Typography
                variant="caption"
                fontWeight={600}
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                }}
              >
                {item.category}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" } }}
              >
                {item.date}
              </Typography>
            </Box>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
