"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Box, Container, Paper, Typography } from "@mui/material"
import { motion } from "framer-motion"
import { CheckCircle } from "@mui/icons-material"
import { RegisterHeader } from "./components/RegisterHeader"
import LoginFooter from "./components/RegisterFooter"
import { RegisterForm } from "./components/RegisterForm"

const RegisterPage = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [registrationError, setRegistrationError] = useState("")
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"

    if (!formData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email address"

    if (!formData.phone) newErrors.phone = "Phone number is required"
    else if (!/^\+?[\d\s\-()]{10,}$/.test(formData.phone))
      newErrors.phone = "Please enter a valid phone number"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters"
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password))
      newErrors.password = "Password must contain uppercase, lowercase, and number"

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    setRegistrationError("")
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setRegistrationError("")

    try {
      //  API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (formData.email === "existing@anfassc.com") {
        setRegistrationError(
          "An account with this email already exists. Please use a different email."
        )
        return
      }

      setRegistrationSuccess(true)

      // Auto redirect to login
      setTimeout(() => {
        router.push("/login?message=Registration successful! Please sign in.")
      }, 3000)
    } catch {
      setRegistrationError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  if (registrationSuccess) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <Paper elevation={24} sx={{ p: 4, borderRadius: 3, background: "white", textAlign: "center" }}>
              <CheckCircle sx={{ fontSize: 64, color: "#4caf50", mb: 2 }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#2e7d32", mb: 2 }}>
                Registration Successful!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Welcome to ANFASSC Academy! Your account has been created successfully.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Redirecting to login page in 3 seconds...
              </Typography>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white", display: "flex", alignItems: "center", justifyContent: "center", p: 2, mt: 10 }}>
      <Container maxWidth="sm">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Paper elevation={24} sx={{ p: 4, borderRadius: 3, background: "white" }}>
            <RegisterHeader itemVariants={itemVariants} />

            <RegisterForm
              formData={formData}
              errors={errors}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              isLoading={isLoading}
              registrationError={registrationError}
              itemVariants={itemVariants}
              handleInputChange={handleInputChange}
              setShowPassword={setShowPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              handleSubmit={handleSubmit}
            />

            <LoginFooter />
          </Paper>
        </motion.div>
      </Container>
    </Box>
  )
}

export default RegisterPage
