"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";

const objectives = [
  "To impact a larger society from the local to national level.",
  "To market our Nigerian sports in general on a global level",
  "To drive local and international support and investment in the Nigerian sports in general.",
  "To support and promote local sports development through support for indigenous matches locally and internationally.",
  "Take our sport from the grassroots to the national level.",
  "To digitalize and revolutionize sports support in keeping with global best practices",
  "To bring in all our foreign sports supporters to come and recognize our own national league",
  "To support both our female and male tournaments on all levels",
];

const splitObjectives = [objectives.slice(0, 4), objectives.slice(4, 8)];

const ObjectivesSection: React.FC = () => {
  return (
    <Box sx={{ py: 8, px: 14, bgcolor: "#f5f5f5" }}>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 6,
          color: "#006400",
          fontWeight: "bold",
          letterSpacing: 1,
        }}
      >
        Our Objectives
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          gap: 6,
        }}
      >
        {splitObjectives.map((column, columnIndex) => (
          <List key={columnIndex} sx={{ flex: 1 }}>
            {column.map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: (index + columnIndex * 4) * 0.1,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
              >
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent:
                      columnIndex === 0 ? "flex-start" : "flex-end",
                    textAlign: columnIndex === 0 ? "left" : "right",
                    alignItems: "center",
                    gap: 2,
                    px: 0,
                    py: 2,
                  }}
                >
                  {/* Bullet Circle */}
                  <Box
                    sx={{
                      minWidth: 24,
                      minHeight: 24,
                      bgcolor: "#006400",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "0.9rem",
                      mt: "2px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </Box>

                  {/* Objective Text */}
                  <ListItemText
                    primary={objective}
                    sx={{ maxWidth: "90%" }}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: "1.05rem",
                        color: "#333",
                        textAlign: "start",
                      },
                    }}
                  />
                </ListItem>
                <Divider />
              </motion.div>
            ))}
          </List>
        ))}
      </Box>
    </Box>
  );
};

export default ObjectivesSection;
