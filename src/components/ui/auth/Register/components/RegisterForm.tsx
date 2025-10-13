"use client";

import type React from "react";
import {
  Box,
  Alert,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
  Button,
} from "@mui/material";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
} from "@mui/icons-material";
import { CustomTextField } from "@/components/ui/Membership/components/customFieldText";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface RegisterFormProps {
  formData: FormData;
  errors: { [key: string]: string };
  showPassword: boolean;
  showConfirmPassword: boolean;
  isLoading: boolean;
  registrationError: string;
  itemVariants: Variants;
  handleInputChange: (
    field: keyof FormData
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  setShowPassword: (show: boolean) => void;
  setShowConfirmPassword: (show: boolean) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

export const RegisterForm = ({
  formData,
  errors,
  showPassword,
  showConfirmPassword,
  isLoading,
  registrationError,
  itemVariants,
  handleInputChange,
  setShowPassword,
  setShowConfirmPassword,
  handleSubmit,
}: RegisterFormProps) => {
  return (
    <>
      {/* Registration Error */}
      <AnimatePresence>
        {registrationError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert severity="error" sx={{ mb: 3 }}>
              {registrationError}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Form */}
      <motion.form onSubmit={handleSubmit} variants={itemVariants}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Name Fields */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <CustomTextField
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#4caf50" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#4caf50" },
                  "&.Mui-focused fieldset": { borderColor: "#4caf50" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#4caf50" },
              }}
            />
            <CustomTextField
              label="Last Name"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#4caf50" },
                  "&.Mui-focused fieldset": { borderColor: "#4caf50" },
                },
                "& .MuiInputLabel-root.Mui-focused": { color: "#4caf50" },
              }}
            />
          </Box>

          <CustomTextField
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: "#4caf50" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#4caf50" },
                "&.Mui-focused fieldset": { borderColor: "#4caf50" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#4caf50" },
            }}
          />

          <CustomTextField
            label="Phone Number"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone sx={{ color: "#4caf50" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#4caf50" },
                "&.Mui-focused fieldset": { borderColor: "#4caf50" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#4caf50" },
            }}
          />

          <CustomTextField
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange("password")}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#4caf50" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#4caf50" },
                "&.Mui-focused fieldset": { borderColor: "#4caf50" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#4caf50" },
            }}
          />

          <CustomTextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#4caf50" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#4caf50" },
                "&.Mui-focused fieldset": { borderColor: "#4caf50" },
              },
              "& .MuiInputLabel-root.Mui-focused": { color: "#4caf50" },
            }}
          />

          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange("agreeToTerms")}
                  sx={{
                    color: "#4caf50",
                    "&.Mui-checked": { color: "#4caf50" },
                  }}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link href="#" sx={{ color: "#4caf50" }}>
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="#" sx={{ color: "#4caf50" }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
            {errors.agreeToTerms && (
              <Typography
                variant="caption"
                color="error"
                sx={{ display: "block", mt: 0.5 }}
              >
                {errors.agreeToTerms}
              </Typography>
            )}
          </Box>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{
                bgcolor: "#1b5e20", 
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#0d4f14" }, 
                "&:disabled": { bgcolor: "#a5d6a7" },
              }}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </motion.div>
        </Box>
      </motion.form>
    </>
  );
};
