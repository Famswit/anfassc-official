import { Sports, Group, Schedule } from "@mui/icons-material";

export const programs = [
  {
    title: "Youth Development (Ages 12-15)",
    description:
      "Foundation skills, basic techniques, and fun-focused training to develop love for the game.",
    image:
      "https://www.shutterstock.com/image-photo/african-boy-soccer-player-playing-600nw-2506348227.jpg",
    features: [
      "Basic ball control",
      "Team play introduction",
      "Fun games",
      "Skill development",
    ],
  },
  {
    title: "Junior Academy (Ages 15-18)",
    description:
      "Advanced technical training with tactical awareness and competitive match play.",
    image: "https://internationalfootball.academy/wp-content/uploads/15.png",
    features: [
      "Advanced techniques",
      "Tactical training",
      "Match preparation",
      "Physical conditioning",
    ],
  },
];

export const facilities = [
  {
    icon: <Sports sx={{ fontSize: 32, color: "primary.main" }} />,
    title: " Standard Pitches",
    description: "Grass pitches  for optimal training conditions.",
  },

  {
    icon: <Group sx={{ fontSize: 32, color: "primary.main" }} />,
    title: "Professional Coaching",
    description:
      "  Experience coaches with experience in professional football.",
  },
  {
    icon: <Schedule sx={{ fontSize: 32, color: "primary.main" }} />,
    title: "Flexible Training Times",
    description:
      "Morning, afternoon, and evening sessions to fit your schedule.",
  },
];

export const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export const imageVariants = {
  hover: { scale: 1.02 },
};
