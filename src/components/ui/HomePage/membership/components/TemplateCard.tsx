import { Card, Box } from "@mui/material";
import { motion } from "framer-motion";

interface TemplateCardProps {
  children: React.ReactNode;
  membership: {
    color: string;
    bgGradient: string;
  };
  onHover?: () => void;
}

export default function TemplateCard({
  children,
  membership,
  onHover,
}: TemplateCardProps) {
  return (
    <motion.div whileHover={onHover ? { ...onHover } : {}}>
      <Card
        elevation={0}
        sx={{
          height: "280px",
          width: "100%",
          maxWidth: "250px",
          mx: "auto",
          background: "green",
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100px",
            height: "100px",
            background: `radial-gradient(circle, ${membership.color}20 0%, transparent 70%)`,
            borderRadius: "50%",
            transform: "translate(30px, -30px)",
          }}
        />
        {children}
      </Card>
    </motion.div>
  );
}
