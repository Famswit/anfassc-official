// app/reset-password/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import { confirmPasswordReset } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import type { FirebaseError } from "firebase/app";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!oobCode) setError("Invalid or missing reset code.");
  }, [oobCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Both password fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/^[A-Z][0-9A-Za-z!@#$%^&*]*$/.test(newPassword)) {
      setError(
        "Password must start with a capital letter and contain at least one number."
      );
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode!, newPassword);
      setSuccess(true);
    } catch (err) {
      const firebaseError = err as FirebaseError;
      setError(firebaseError.message || "Failed to reset password.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
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
          <Alert severity="success">
            Password reset successful! You can now{" "}
            <Link href="/login">log in</Link>.
          </Alert>
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
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ p: 4, borderRadius: 2, boxShadow: 1 }}
        >
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Typography variant="h5" gutterBottom>
            Reset Your Password
          </Typography>
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{
              mt: 2,
              bgcolor: "#2e7d32",
              "&:hover": { bgcolor: "#1b5e20" },
            }}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;
