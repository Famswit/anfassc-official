"use client";
import { Box, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { motion, Variants } from "framer-motion";

interface Member {
  name: string;
  role: string;
  image: string;
}

interface MemberCardProps {
  member: Member;
  index: number;
  isMobile: boolean;
  isTablet: boolean;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants: Variants = {
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeInOut" } },
};

export default function MemberCard({
  member,
  index,
  isMobile,
  isTablet,
}: MemberCardProps) {
  return (
    <motion.div
      key={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ y: -8 }}
      style={{
        flex: "1 1 0",
        maxWidth: isMobile
          ? "100%"
          : isTablet
          ? "calc(50% - 12px)"
          : "calc(33.333% - 16px)",
        minWidth: isMobile ? "280px" : "300px",
      }}
    >
      <Card
        elevation={0}
        sx={{
          bgcolor: "transparent",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            "& .member-image": { transform: "scale(1.02)" },
          },
        }}
      >
        {/* Image Box */}
        <Box
          sx={{
            height: 250,
            width: "100%",
            overflow: "hidden",
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f5f5f5",
          }}
        >
          <motion.div
            variants={imageVariants}
            whileHover="hover"
            style={{ width: "100%", height: "100%" }}
          >
            <CardMedia
              component="img"
              image={member.image}
              alt={member.name}
              className="member-image"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </motion.div>
        </Box>

        {/* Name & Role */}
        <CardContent sx={{ px: 2, py: 2, flex: "1 1 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Typography variant="body1" fontWeight="bold" sx={{ mb: 1 }}>
              {member.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {member.role}
            </Typography>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
