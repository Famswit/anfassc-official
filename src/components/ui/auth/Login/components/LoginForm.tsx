// app/login/components/LoginForm.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { Box, Button, Alert, InputAdornment, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { CustomTextField } from "@/components/ui/Membership/components/customFieldText";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
  };
  errors: { [key: string]: string };
  loginError: string;
  isLoading: boolean;
  onInputChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  errors,
  loginError,
  isLoading,
  onInputChange,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Login Error */}
      <AnimatePresence>
        {loginError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="error" sx={{ mb: 3 }}>
              {loginError}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Form */}
      <motion.form onSubmit={onSubmit} variants={itemVariants}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <CustomTextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={onInputChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#2e7d32" }} />
                </InputAdornment>
              ),
            }}
            required
          />

          <CustomTextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={onInputChange("password")}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#2e7d32" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              disabled={isLoading}
              sx={{
                bgcolor: "#1b5e20", // Deep green background
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#0d4f14" }, // Even deeper green on hover
                "&:disabled": { bgcolor: "#a5d6a7" },
              }}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </motion.div>
        </Box>
      </motion.form>
    </>
  );
};

export default LoginForm;