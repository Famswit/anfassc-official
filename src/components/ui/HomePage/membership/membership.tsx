"use client";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { containerVariants } from "./components/MembershipVariant";
import { memberships } from "./components/MembershipData";
import TemplateCard from "./components/TemplateCard";
import CustomButton from "./components/CustomButton";
import CardContentTemplate from "./components/CardContent";

export default function MembershipCards() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, sm: 4, md: 8 } }}>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem",
              md: "2.8rem",
              lg: "3.2rem",
            },
            mb: { xs: 4, md: 6 },
            color: "primary.main",
            letterSpacing: "0.02em",
          }}
        >
          CHOOSE YOUR MEMBERSHIP
        </Typography>
      </motion.div>

      {/* Membership Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 2, sm: 3 },
            maxWidth: "1200px",
            mx: "auto",
            justifyItems: "center",
          }}
        >
          {memberships.map((membership) => (
            <TemplateCard
              key={membership.name}
              membership={membership}
              onHover={() => {}}
            >
              <CardContentTemplate
                membership={membership}
                button={<CustomButton buttonColor={membership.buttonColor} />}
              />
            </TemplateCard>
          ))}
        </Box>
      </motion.div>
    </Box>
  );
}
