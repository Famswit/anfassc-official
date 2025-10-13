// app/forgot-password/page.tsx
"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Alert,
  Link,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { CustomTextField } from "@/components/ui/Membership/components/customFieldText";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import type { FirebaseError } from "firebase/app";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSubmitted(true);
    } catch (err) {
      const firebaseError = err as FirebaseError; // ✅ Narrow type
      console.error("Password reset error:", firebaseError.message);
      setError(
        firebaseError.code === "auth/user-not-found"
          ? "No account found with this email."
          : "Failed to send reset link. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "white",
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={3}
              sx={{ p: 4, borderRadius: 3, textAlign: "center" }}
            >
              <Typography
                variant="h4"
                gutterBottom
                color="#2e7d32"
                fontWeight="bold"
              >
                Check Your Email
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We have sent a password reset link to <strong>{email}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Please check your email and click the link to reset your
                password. If you do not see the email, check your spam folder.
              </Typography>
              <Link
                component={NextLink}
                href="/login"
                sx={{
                  color: "#2e7d32",
                  fontWeight: "bold",
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Back to Login
              </Link>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white",
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            {/* Header */}
            <motion.div variants={itemVariants}>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  color="#2e7d32"
                  fontWeight="bold"
                >
                  Forgot Password?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Enter your email address and we will send you a link to reset
                  your password.
                </Typography>
              </Box>
            </motion.div>

            {/* Form */}
            <motion.div variants={itemVariants}>
              <Box component="form" onSubmit={handleSubmit}>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <CustomTextField
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  sx={{ mb: 3 }}
                  required
                />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      py: 1.5,
                      bgcolor: "#2e7d32",
                      "&:hover": { bgcolor: "#1b5e20" },
                      borderRadius: 2,
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                  >
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </motion.div>
              </Box>
            </motion.div>

            {/* Footer */}
            <motion.div variants={itemVariants}>
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Remember your password?{" "}
                  <Link
                    component={NextLink}
                    href="/login"
                    sx={{
                      color: "#2e7d32",
                      fontWeight: "bold",
                      textDecoration: "none",
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Back to Login
                  </Link>
                </Typography>
              </Box>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ForgotPasswordPage;
