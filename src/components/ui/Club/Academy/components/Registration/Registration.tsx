"use client";
import { Container, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { PersonAdd } from "@mui/icons-material";
import RegistrationForm from "./components/RegistrationForm";
import NeedHelpSection from "./components/NeedHelpSection";
import TrainingSchedule from "./components/TrainingSchedule";
import { SelectChangeEvent } from "@mui/material";

export default function RegistrationSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    program: "",
    experience: "",
    emergencyName: "",
    emergencyPhone: "",
    medicalConditions: "",
    termsAccepted: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange =
    (field: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
    ) => {
      const value = "target" in event ? event.target.value : "";
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      termsAccepted: event.target.checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    console.log("Registration submitted:", formData);
  };

  if (submitted) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <PersonAdd sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              Registration Successful!
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Thank you for registering with ANFASSC Football Academy. We will
              contact you within 24 hours to confirm your enrollment and provide
              further details.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Player Registration
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Join ANFASSC Football Academy and take your first step towards
            becoming a professional footballer.
          </Typography>
        </Box>
      </motion.div>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        {/* Left side */}
        <Box sx={{ flex: { xs: "1 1 100%", md: "2 1 0" } }}>
          <RegistrationForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            handleSubmit={handleSubmit}
          />
        </Box>

        {/* Right side */}
        <Box
          sx={{
            flex: { xs: "1 1 100%", md: "1 1 0" },
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <TrainingSchedule />
          <NeedHelpSection />
        </Box>
      </Box>
    </Container>
  );
}
