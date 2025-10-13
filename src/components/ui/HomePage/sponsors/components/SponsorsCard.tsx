import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

interface Sponsor {
  id: number;
  name: string;
  logo: string;
  width: number;
  height: number;
}

interface SponsorCardProps {
  sponsors: Sponsor[];
}

const cardVariants = {
  whileHover: { scale: 1.1 },
  hoverTransition: { duration: 0.3 },
};

export default function SponsorCard({ sponsors }: SponsorCardProps) {
  const extendedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
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
          background: "linear-gradient(to right, #ffffff, transparent)",
        },
        "&::after": {
          right: 0,
          background: "linear-gradient(to left, #ffffff, transparent)",
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
            duration: 20,
            ease: "linear",
          },
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          width: "fit-content",
        }}
      >
        {extendedSponsors.map((sponsor, index) => (
          <motion.div
            key={`sponsor-${sponsor.id}-${index}`}
            variants={cardVariants}
            whileHover="whileHover"
            transition={cardVariants.hoverTransition}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "250px",
              height: "150px",
              padding: "1rem",
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={sponsor.logo || "/placeholder.svg"}
                alt={sponsor.name}
                width={sponsor.width}
                height={sponsor.height}
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(100%)";
                }}
                unoptimized
              />
            </Box>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
}
