"use client"

import { useState } from "react"
import { Box, Button, TextField, Typography, Alert } from "@mui/material"
import MembershipForm from "./MembershipForm"

const MembershipAccess = () => {
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [unlocked, setUnlocked] = useState(false)

  // Temporary hardcoded password (can later be dynamic / from backend)
  const CORRECT_PASSWORD = "MYSECRET123"

  const handleCheckPassword = () => {
    if (password === CORRECT_PASSWORD) {
      setUnlocked(true)
      setError("")
    } else {
      setError("❌ Invalid password. Please use the password sent after your enquiry payment.")
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      {/* STEP 1: Button to open password prompt */}
      {!showPasswordPrompt && !unlocked && (
       <Box
  sx={{
    display: "flex",
    justifyContent: "center", // horizontal center
    alignItems: "center",     // vertical center (optional)
    mt: 4,                    // margin top
  }}
>
  <Button
    variant="contained"
    onClick={() => setShowPasswordPrompt(true)}
    sx={{ py: 1.5, px: 4, borderRadius: 25 }}
  >
    Open Membership Form
  </Button>
</Box>

      )}

      {/* STEP 2: Password input */}
      {showPasswordPrompt && !unlocked && (
        <Box sx={{ mt: 3, maxWidth: 400, mx: "auto", textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            To view the Membership Benefits, enter the password sent to you after your enquiry
            payment is confirmed.
          </Typography>

          <TextField
            fullWidth
            type="password"
            label="Enter Membership Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button variant="contained" onClick={handleCheckPassword} fullWidth>
            Submit
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      )}

      {/* STEP 3: Show Membership Form if unlocked */}
      {unlocked && (
        <Box sx={{ mt: 4 }}>
          <MembershipForm />
        </Box>
      )}
    </Box>
  )
}

export default MembershipAccess
