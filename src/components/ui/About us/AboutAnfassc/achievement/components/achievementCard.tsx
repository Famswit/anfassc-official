"use client";

import { Box, Typography, Card, CardContent } from "@mui/material";
import { EmojiEvents } from "@mui/icons-material";
import { motion } from "framer-motion";

interface AchievementCardsProps {
  firstRowAchievements: string[];
  secondRowAchievements: string[];
}

const AchievementCards: React.FC<AchievementCardsProps> = ({
  firstRowAchievements,
  secondRowAchievements,
}) => {
  // infinite scroll
  const tripleFirstRow = [
    ...firstRowAchievements,
    ...firstRowAchievements,
    ...firstRowAchievements,
  ];
  const tripleSecondRow = [
    ...secondRowAchievements,
    ...secondRowAchievements,
    ...secondRowAchievements,
  ];

  const renderCard = (title: string, key: string) => (
    <Card
      key={key}
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        color: "white",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: 1,
        borderRadius: 1,
        width: 150,
        height: 120,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.5,
          p: 1,
          width: "100%",
        }}
      >
        <EmojiEvents fontSize="small" />
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "60%" },
        bgcolor: "#1B5E20",
        px: 4,
        py: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "white",
        position: "relative",
        zIndex: 2,
      }}
    >
      <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
      >
        Our Achievements
      </Typography>

      {/* First Row: Right to Left */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          mb: 2,
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            width: "100px",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(to right, #1B5E20, transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, #1B5E20, transparent)",
          },
        }}
      >
        <motion.div
          animate={{
            x: [0, `-${100 / 3}%`],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "fit-content",
            minWidth: "300%",
          }}
        >
          {tripleFirstRow.map((title, index) =>
            renderCard(title, `first-${title}-${index}`)
          )}
        </motion.div>
      </Box>

      {/* Second Row: Left to Right */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            width: "100px",
            height: "100%",
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(to right, #1B5E20, transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, #1B5E20, transparent)",
          },
        }}
      >
        <motion.div
          animate={{
            x: [`-${100 / 3}%`, 0],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            width: "fit-content",
            minWidth: "300%",
          }}
        >
          {tripleSecondRow.map((title, index) =>
            renderCard(title, `second-${title}-${index}`)
          )}
        </motion.div>
      </Box>
    </Box>
  );
};

export default AchievementCards;
