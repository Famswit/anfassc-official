// app/login/page.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, Container, Paper, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import LoginFooter from "./components/LoginFooter";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/cart-payment-page";
  const { login, isAuthenticated, isLoading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/^[A-Z][0-9A-Za-z!@#$%^&*]*$/.test(formData.password)) {
      newErrors.password =
        "Password must start with a capital letter and contain at least one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: "",
        }));
      }
      setLoginError("");
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoginError("");
    const success = await login(formData.email, formData.password);

    if (!success) {
      setLoginError(
        "Invalid email or password. For first-time users, this will create an account."
      );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  if (isAuthenticated) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          mt: 5,
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Paper
              elevation={24}
              sx={{
                p: 4,
                borderRadius: 3,
                background: "white",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
              }}
            >
              <Alert
                icon={<CheckCircleIcon fontSize="large" />}
                severity="success"
                sx={{
                  bgcolor: "#e8f5e8",
                  color: "#2e7d32",
                  border: "1px solid #4caf50",
                  fontSize: "1.1rem",
                  "& .MuiAlert-icon": {
                    color: "#4caf50",
                  },
                }}
              >
                Login successful! Redirecting you now...
              </Alert>
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
        bgcolor: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        mt: 5,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Paper
            elevation={24}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "white",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <LoginHeader />

            <LoginForm
              formData={formData}
              errors={errors}
              loginError={loginError}
              isLoading={isLoading}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />

            <LoginFooter />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;
