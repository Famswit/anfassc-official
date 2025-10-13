"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Typography, Container, TextField, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { motion } from "framer-motion";
import ArchiveNewsCard from "./components/ArchiveNewsCard";
import NewsModal from "./components/NewsModal";
import ProductsSection from "./ProductSection";
import { AllProducts } from "../HomePage/shop/components/AllProducts";
import { ExternalNews, fetchNigeriaSportsNews } from "@/hooks/newsAPI";

interface NewsItem {
  id: number;
  title: string;
  image: string;
  date: string;
  author: string;
  contentSnippet: string;
}

const ArchiveNewsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const mapToNewsItem = (data: ExternalNews[], startIndex = 0): NewsItem[] =>
    data.map((item, index) => ({
      id: startIndex + index + 1,
      title: item.title || "No Title",
      image: item.image || "/default-image.jpg",
      date: item.publishedAt || new Date().toISOString(),
      author: item.author || "Unknown",
      contentSnippet: item.content || "No content available",
    }));

  // Load first page
  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      const latestNews = await fetchNigeriaSportsNews(1);
      setNews(mapToNewsItem(latestNews));
      setLoading(false);
    };
    loadNews();
  }, []);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setLoading(true);
          const nextPage = page + 1;
          const moreNews = await fetchNigeriaSportsNews(nextPage);

          if (!moreNews.length) {
            setHasMore(false);
          } else {
            setNews((prev) => [
              ...prev,
              ...mapToNewsItem(moreNews, prev.length),
            ]);
            setPage(nextPage);
          }
          setLoading(false);
        }
      },
      { threshold: 1.0 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [page, loading, hasMore]);

  const filteredNews = news.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderSkeletons = () =>
    Array.from(new Array(3)).map((_, i) => (
      <Box
        key={i}
        sx={{
          flex: isMobile
            ? "1 1 100%"
            : isTablet
            ? "1 1 calc(50% - 12px)"
            : "1 1 calc(33.33% - 16px)",
          minWidth: isMobile ? "100%" : "300px",
        }}
      >
        <Skeleton
          variant="rectangular"
          height={200}
          sx={{ borderRadius: 2, mb: 2 }}
        />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </Box>
    ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          flex: { xs: "1 1 100%", md: "0 0 70%" },
          py: { xs: 6, md: 14 },
          px: { xs: 1, sm: 2, md: 4 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            sx={{
              color: theme.palette.primary.main,
              textAlign: "center",
              mb: 4,
              mt: 2,
            }}
          >
            NEWS PAGE
          </Typography>
        </motion.div>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
          <TextField
            variant="outlined"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: { xs: "100%", sm: "50%" } }}
          />
        </Box>

        {filteredNews.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            {filteredNews.map((item, index) => (
              <ArchiveNewsCard
                key={item.id}
                item={item}
                index={index}
                isMobile={isMobile}
                isTablet={isTablet}
                onClick={() => setSelectedNews(item)}
              />
            ))}
          </Box>
        ) : !loading ? (
          <Typography sx={{ textAlign: "center", width: "100%" }}>
            No news articles available.
          </Typography>
        ) : null}

        {loading && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
              mt: 4,
            }}
          >
            {renderSkeletons()}
          </Box>
        )}

        <Box ref={loaderRef} sx={{ height: "50px" }} />
      </Container>

      {/* Products Section */}
      <Box
        sx={{ flex: { xs: "1 1 100%", md: "0 0 30%" }, px: { xs: 1, sm: 2 } }}
      >
        <ProductsSection jerseys={AllProducts} />
      </Box>

      {/* Modal */}
      {selectedNews && (
        <NewsModal
          open={!!selectedNews}
          onClose={() => setSelectedNews(null)}
          image={selectedNews.image}
          contentSnippet={selectedNews.contentSnippet}
          title={selectedNews.title}
          author={selectedNews.author}
          publishedAt={selectedNews.date}
        />
      )}
    </Box>
  );
};

export default ArchiveNewsPage;
