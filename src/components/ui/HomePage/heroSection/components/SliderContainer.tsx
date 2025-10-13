"use client"

import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { Box } from "@mui/material"
import { slideVariants, swipeConfidenceThreshold, swipePower } from "./SlideVariants"
import type { SliderImage } from "./SliderImages"
import ContentOverlay from "./ContentOverlay"

interface SliderContainerProps {
  currentIndex: number
  direction: number
  paginate: (newDirection: number) => void
  setIsAutoPlay: (value: boolean) => void
  images: SliderImage[]
}

export default function SliderContainer({
  currentIndex,
  direction,
  paginate,
  setIsAutoPlay,
  images,
}: SliderContainerProps) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 400, damping: 40 },
            opacity: { duration: 0.3 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }: PanInfo) => {
            const swipe = swipePower(offset.x, velocity.x)
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          style={{
            position: "absolute",
            inset: 0,
            cursor: "grab",
          }}
        >
          {/* Background image */}
          <Box
            component="img"
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />

          {/* Overlay content */}
          <ContentOverlay currentImage={images[currentIndex]} />
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}
