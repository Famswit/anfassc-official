import { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const buttonVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

export const seeMoreVariants: Variants = {
  hover: {
    x: 5,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

export const paginationVariants: Variants = {
  hover: {
    x: 5,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};
