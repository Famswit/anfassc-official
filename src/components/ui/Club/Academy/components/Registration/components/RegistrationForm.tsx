"use client"
import {
  Typography,
  Card,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Divider,
  SelectChangeEvent,
  Box,
} from "@mui/material"
import { motion } from "framer-motion"

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

interface RegistrationFormProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    program: string
    experience: string
    emergencyName: string
    emergencyPhone: string
    medicalConditions: string
    termsAccepted: boolean
  }
  handleInputChange: (
    field: string
  ) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => void
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function RegistrationForm({
  formData,
  handleInputChange,
  handleCheckboxChange,
  handleSubmit,
}: RegistrationFormProps) {
  return (
    <motion.div initial="hidden" animate="visible" variants={formVariants}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
          Registration Form
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
          >
            Personal Information
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mb: 3,
            }}
          >
            <Box sx={{ flex: "1 1 250px" }}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                required
              />
            </Box>
            <Box sx={{ flex: "1 1 250px" }}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                required
              />
            </Box>
            <Box sx={{ flex: "1 1 250px" }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                required
              />
            </Box>
            <Box sx={{ flex: "1 1 250px" }}>
              <TextField
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange("phone")}
                required
              />
            </Box>
            <Box sx={{ flex: "1 1 250px" }}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange("dateOfBirth")}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Program Selection */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
          >
            Program Selection
          </Typography>

          <Box sx={{ mb: 3, maxWidth: "400px" }}>
            <FormControl fullWidth required>
              <InputLabel>Training Program</InputLabel>
              <Select
                value={formData.program}
                onChange={handleInputChange("program")}
                label="Training Program"
              >
                <MenuItem value="youth">Youth Development (Ages 12-15)</MenuItem>
                <MenuItem value="junior">Junior Academy (Ages 15-18)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Emergency Contact */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
          >
            Emergency Contact
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mb: 3,
            }}
          >
            <Box sx={{ flex: "1 1 250px" }}>
              <TextField
                fullWidth
                label="Emergency Contact Name"
                value={formData.emergencyName}
                onChange={handleInputChange("emergencyName")}
                required
              />
            </Box>
            <Box sx={{ flex: "1 1 250px" }}>
              <TextField
                fullWidth
                label="Emergency Contact Phone"
                value={formData.emergencyPhone}
                onChange={handleInputChange("emergencyPhone")}
                required
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Medical Information */}
          <Typography
            variant="h6"
            gutterBottom
            sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
          >
            Medical Information
          </Typography>

          <TextField
            fullWidth
            label="Medical Conditions or Allergies"
            multiline
            rows={3}
            value={formData.medicalConditions}
            onChange={handleInputChange("medicalConditions")}
            placeholder="Please list any medical conditions, allergies, or medications (leave blank if none)"
            sx={{ mb: 3 }}
          />

          {/* Terms and Conditions */}
          <FormControlLabel
            control={
              <Checkbox checked={formData.termsAccepted} onChange={handleCheckboxChange} required />
            }
            label="I agree to the terms and conditions and understand the training requirements"
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Submit Registration
          </Button>
        </form>
      </Card>
    </motion.div>
  )
}
