import { Button, CircularProgress } from "@mui/material"
import { motion } from "framer-motion"

interface SubmitButtonProps {
  children: React.ReactNode
  isLoading: boolean
}

export const SubmitButton = ({ children, isLoading }: SubmitButtonProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <Button
      type="submit"
      variant="contained"
      fullWidth
      disabled={isLoading}
      sx={{ py: 1.5, borderRadius: 2, bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  </motion.div>
)