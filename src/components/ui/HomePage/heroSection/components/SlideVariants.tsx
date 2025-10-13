import { Variants } from "framer-motion";

export const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1200 : -1200,
    opacity: 0,
    scale: 0.9,
    rotateY: direction > 0 ? 15 : -15,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1200 : -1200,
    opacity: 0,
    scale: 0.9,
    rotateY: direction < 0 ? 15 : -15,
  }),
};

export const swipeConfidenceThreshold = 10000;

export const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
