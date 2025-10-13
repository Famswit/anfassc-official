import { Box, Button } from "@mui/material"
import { motion } from "framer-motion"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { seeMoreVariants } from "./MerchandiseVariants"

interface SeeMoreButtonProps {
  handleSeeMore: () => void
}

export default function SeeMoreButton({ handleSeeMore }: SeeMoreButtonProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        right: { xs: "10px", sm: "20px", md: "-50px" },
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
      }}
    >
      <motion.div variants={seeMoreVariants} whileHover="hover" whileTap="tap">
        <Button
          onClick={handleSeeMore}
          endIcon={<ArrowForwardIcon />}
          sx={{
            color: "#fff",
            fontSize: { xs: "0.9rem", sm: "1rem" },
            fontWeight: "bold",
            textTransform: "none",
            bgcolor: "primary.main",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "25px",
            px: 3,
            py: 1.5,
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.3)",
              transform: "translateX(5px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          See More
        </Button>
      </motion.div>
    </Box>
  )
}