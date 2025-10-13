"use client";

import { Box, Container, Typography, Button, Card } from "@mui/material";
import { useRouter } from "next/navigation";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion } from "framer-motion";

const OrderFailedPage = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{
              textAlign: "center",
              p: 4,
              borderRadius: 3,
              boxShadow: 3,
              bgcolor: "#ffffff",
            }}
          >
            <CancelIcon sx={{ fontSize: 80, color: "#e53935", mb: 2 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#c62828", mb: 2 }}
            >
              Payment Failed ❌
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Unfortunately, your payment could not be processed. Please try
              again or use another payment method.
            </Typography>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#e53935", "&:hover": { bgcolor: "#c62828" } }}
                onClick={() => router.push("/cart")}
              >
                Try Again
              </Button>
              <Button
                variant="outlined"
                sx={{ borderColor: "#e53935", color: "#c62828" }}
                onClick={() => router.push("/")}
              >
                Back to Home
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default OrderFailedPage;
