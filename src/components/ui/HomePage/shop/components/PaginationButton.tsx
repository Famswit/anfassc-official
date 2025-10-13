
import { Box } from "@mui/material";
import { motion } from "framer-motion";

interface PaginationButtonProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (index: number) => void;
}

export default function PaginationButton({ totalPages, currentPage, setCurrentPage }: PaginationButtonProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, gap: 1 }}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <motion.div key={index}  whileHover="hover" whileTap="tap">
          <Box
            onClick={() => setCurrentPage(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              bgcolor: currentPage === index ? "#fff" : "rgba(255,255,255,0.4)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        </motion.div>
      ))}
    </Box>
  );
}
