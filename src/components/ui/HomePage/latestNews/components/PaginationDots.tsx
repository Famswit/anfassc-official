import { Box, useTheme } from "@mui/material"
import { motion } from "framer-motion"

interface PaginationDotsProps {
  totalPages: number
  currentIndex: number
  setCurrentIndex: (index: number) => void
}

export default function PaginationDots({ totalPages, currentIndex, setCurrentIndex }: PaginationDotsProps) {
  const theme = useTheme()

  return (
    <>
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 1 }}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <motion.div key={index} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
              <Box
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: currentIndex === index ? theme.palette.primary.main : "rgba(0,0,0,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor: currentIndex === index ? theme.palette.primary.dark : "rgba(0,0,0,0.4)",
                  },
                }}
              />
            </motion.div>
          ))}
        </Box>
      )}
    </>
  )
}