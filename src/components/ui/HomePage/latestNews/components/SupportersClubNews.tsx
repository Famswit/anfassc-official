import { useState } from "react"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import { motion, AnimatePresence } from "framer-motion"
import PaginationArrows from "./PaginationArrows"
import PaginationDots from "./PaginationDots"
import NewsCard from "./NewsCard"
import { containerVariants, newsData } from "./newsData"

export default function SupportersClubNews() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const [currentIndex, setCurrentIndex] = useState(0)

  const news = newsData.supportersClub
  const cardsPerPage = isMobile ? 1 : isTablet ? 2 : 3
  const totalPages = Math.ceil(news.length / cardsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const getCurrentCards = () => {
    const startIndex = currentIndex * cardsPerPage
    const endIndex = startIndex + cardsPerPage
    return news.slice(startIndex, endIndex)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" key="supportersClub">
      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "center",
          minHeight: "400px",
          alignItems: "stretch",
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {getCurrentCards().map((item, index) => (
            <NewsCard
              key={`supportersClub-${currentIndex}-${index}`}
              item={item}
              index={index}
              isMobile={isMobile}
              isTablet={isTablet}
            />
          ))}
        </AnimatePresence>

        <PaginationArrows
          totalPages={totalPages}
          prevSlide={prevSlide}
          nextSlide={nextSlide}
        />
      </Box>

      <PaginationDots
        totalPages={totalPages}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </motion.div>
  )
}