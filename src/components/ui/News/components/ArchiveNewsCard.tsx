import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  cardVariants,
  imageVariants,
} from "../../HomePage/latestNews/components/newsData";
import { useState } from "react";
import NewsModal from "./NewsModal";

interface NewsItem {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
  contentSnippet: string;
}

interface Props {
  item: NewsItem;
  index: number;
  isMobile: boolean;
  isTablet: boolean;
  onClick: () => void;
}

const stripHTML = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export default function ArchiveNewsCard({
  item,
  index,
  isMobile,
  isTablet,
  onClick,
}: Props) {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    onClick();
  };
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
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
          minWidth: isMobile ? "300px" : "400px",
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
              "& .card-image": { transform: "scale(1.02)" },
            },
          }}
        >
          <Box sx={{ overflow: "hidden", borderRadius: 1, flex: "0 0 auto" }}>
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              onClick={handleOpenModal}
            >
              <CardMedia
                component="img"
                height={isMobile ? "180" : "220"}
                image={item.image}
                alt={item.title}
                className="card-image"
                sx={{
                  borderRadius: 1,
                  transition: "transform 0.3s ease",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          </Box>

          <CardContent
            sx={{
              px: 2,
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
                  mb: 1,
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
                  color: "text.secondary",
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {stripHTML(item.contentSnippet).slice(0, 120)}...
              </Typography>

              {/* SEE MORE BUTTON */}
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={handleOpenModal}
                sx={{ textTransform: "none", alignSelf: "flex-start", mb: 1 }}
              >
                See More
              </Button>

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
                  {item.author}
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

      <NewsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        image={item.image}
        contentSnippet={item.contentSnippet}
        title={item.title}
        author={item.author}
        publishedAt={item.date}
      />
    </>
  );
}
