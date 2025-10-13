import { Box, Card, CardContent, CardMedia, Typography, useTheme } from "@mui/material";
import { motion, Variants } from "framer-motion"; // ✅ import Variants type

interface NewsItem {
  title: string;
  category?: string;
  date: string;
  image: string;
  body?: string;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

interface NewsCardProps {
  item: NewsItem;
  index: number;
  isMobile: boolean;
  isTablet: boolean;
}

export default function NewsCard({ item, index, isMobile, isTablet }: NewsCardProps) {
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
        maxWidth: isMobile ? "100%" : isTablet ? "calc(50% - 12px)" : "calc(33.333% - 16px)",
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
            "& .card-image": {
              transform: "scale(1.02)",
            },
          },
        }}
      >
        <Box sx={{ overflow: "hidden", borderRadius: 1, flex: "0 0 auto", height: 250, width: "100%" }}>
          <motion.div variants={imageVariants} whileHover="hover">
            <CardMedia
              component="img"
              height="100%" // Ensure height matches parent Box
              image={item.image}
              alt={item.title}
              className="card-image"
              sx={{
                borderRadius: 1,
                transition: "transform 0.3s ease",
                width: "100%",
                height: "100%",
                objectFit: "contain", 
              }}
            />
          </motion.div>
        </Box>

        <CardContent
          sx={{ px: 0, py: 2, flex: "1 1 auto", display: "flex", flexDirection: "column" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}
          >
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                mt: 1,
                mb: 1,
                px: 2,
                color: theme.palette.primary.main,
                fontSize: { xs: "0.95rem", sm: "1rem" },
                lineHeight: 1.4,
              }}
            >
              {item.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 2,
                px: 2,
                color: theme.palette.text.secondary,
                fontSize: { xs: "0.85rem", sm: "0.8rem" },
                lineHeight: 1.5,
                flex: "1 1 auto",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.body || "Click to read more..."}
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
                  px: 2,
                }}
              >
                {item.category || "General"}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: { xs: "0.7rem", sm: "0.75rem" }, px: 2 }}
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