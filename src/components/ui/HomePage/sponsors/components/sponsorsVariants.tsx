export const headerVariants = {
  initial: { opacity: 0, y: -30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export const cardVariants = {
  animate: {
    scale: [1, 1.05, 1], 
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
  whileHover: { scale: 1.1 },
  transition: { duration: 0.3 },
}

export const footerVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.3 },
}