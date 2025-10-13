import { Typography } from "@mui/material"
import { motion } from "framer-motion"
import { footerVariants } from "./sponsorsVariants"

export default function SponsorsFooter() {
  return (
    <motion.div
      initial={footerVariants.initial}
      animate={footerVariants.animate}
      transition={footerVariants.transition}
    >
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          mt: 4,
          color: "text.secondary",
          fontSize: { xs: "0.9rem", sm: "1rem" },
          fontStyle: "italic",
        }}
      >
        Proudly supported by our amazing partners and sponsors
      </Typography>
    </motion.div>
  )
}