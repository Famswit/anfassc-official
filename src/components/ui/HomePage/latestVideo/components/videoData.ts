import { Variants } from "framer-motion"  // ✅ import Variants type

export const videos = [
  {
    title: "Chanting for Victory! ANFASSC Motivates Our Players from the Stand",
    category: "MATCH HIGHLIGHTS",
    date: "17 JUL 25",
    duration: "3:45",
    video: "https://www.youtube.com/embed/v7QCUd0llMA",
    thumbnail: "https://img.youtube.com/vi/v7QCUd0llMA/hqdefault.jpg",
  },
  {
    title: "Training Session: Team Preparation for Euro Semi-Final",
    category: "TRAINING",
    date: "16 JUL 25",
    duration: "2:30",
    video: "https://www.youtube.com/embed/uGXqT-QkyNY",
    thumbnail: "https://img.youtube.com/vi/uGXqT-QkyNY/hqdefault.jpg",
  },
  {
    title: "ANFASSC in action during the Round of 16 match against Cameroon..",
    category: "INTERVIEWS",
    date: "15 JUL 25",
    duration: "4:12",
    video: "https://www.youtube.com/embed/JW0esa3_JqI",
    thumbnail: "https://img.youtube.com/vi/JW0esa3_JqI/hqdefault.jpg",
  },
  {
    title: "ANFASSC in Action: Unleashing the Power of Sport Passion",
    category: "BEHIND THE SCENES",
    date: "14 JUL 25",
    duration: "5:20",
    video: "https://www.youtube.com/embed/z3pqizReJwI",
    thumbnail: "https://img.youtube.com/vi/z3pqizReJwI/hqdefault.jpg",
  },
  {
    title: "ANFASSC welcome junior female footballers",
    category: "ACADEMY",
    date: "13 JUL 25",
    duration: "3:15",
    video: "https://www.youtube.com/embed/yubJ6t6tgew",
    thumbnail: "https://img.youtube.com/vi/yubJ6t6tgew/hqdefault.jpg",
  },
]

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export const videoVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

export const buttonVariants: Variants = {
  hover: {
    scale: 1.1,
    backgroundColor: "#1b5e20",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
}

export const playButtonVariants: Variants = {
  hover: {
    scale: 1.2,
    backgroundColor: "rgba(76, 175, 80, 0.9)",
    transition: {
      duration: 0.2,
    },
  },
  tap: {
    scale: 0.9,
  },
}
