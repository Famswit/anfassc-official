"use client"

import { motion } from "framer-motion"
import { Box, Typography } from "@mui/material"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

export default function SuccessStory() {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.3, 
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      ref={ref}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          component="h3"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          Our Success Story
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
          }}
        >
          {/* Students Trained */}
          <Box sx={{ minWidth: "200px" }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
              {inView ? <CountUp end={50} duration={2} suffix="+" /> : "0+"}
            </Typography>
            <Typography variant="body1">Students Trained</Typography>
          </Box>

          {/* Professional Players */}
          <Box sx={{ minWidth: "200px" }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
              {inView ? <CountUp end={5} duration={2} suffix="+" /> : "0+"}
            </Typography>
            <Typography variant="body1">Professional Players</Typography>
          </Box>

          {/* Championships Won */}
          <Box sx={{ minWidth: "200px" }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
              {inView ? <CountUp end={2} duration={2} suffix="+" /> : "0+"}
            </Typography>
            <Typography variant="body1">Championships Won</Typography>
          </Box>

          {/* Years Experience */}
          <Box sx={{ minWidth: "200px" }}>
            <Typography variant="h3" component="div" sx={{ fontWeight: "bold", mb: 1 }}>
              {inView ? <CountUp end={10} duration={2} /> : "0"}
            </Typography>
            <Typography variant="body1">Years Experience</Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}
