import { Box, Button } from "@mui/material"
import { motion } from "framer-motion"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { useTheme } from "@mui/material"
import { buttonVariants } from "./newsData"

interface PaginationArrowsProps {
  totalPages: number
  prevSlide: () => void
  nextSlide: () => void
}

export default function PaginationArrows({ totalPages, prevSlide, nextSlide }: PaginationArrowsProps) {
  const theme = useTheme()

  return (
    <>
      {totalPages > 1 && (
        <>
          <Box
            sx={{
              position: "absolute",
              left: { xs: -20, sm: -30 },
              top: "30%",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                onClick={prevSlide}
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  minWidth: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                <ArrowBackIosIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: "#fff" }} />
              </Button>
            </motion.div>
          </Box>

          <Box
            sx={{
              position: "absolute",
              right: { xs: -20, sm: -30 },
              top: "30%",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                onClick={nextSlide}
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  minWidth: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                  borderRadius: 1,
                  "&:hover": {
                    bgcolor: theme.palette.primary.dark,
                  },
                }}
              >
                <ArrowForwardIosIcon sx={{ fontSize: { xs: 14, sm: 16 }, color: "#fff" }} />
              </Button>
            </motion.div>
          </Box>
        </>
      )}
    </>
  )
}