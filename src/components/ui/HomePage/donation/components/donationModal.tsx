"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Modal, Paper, Typography, TextField, Button, Box, Alert, Snackbar } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { charityProjects } from "./charityProject"

interface DonationModalProps {
  open: boolean
  onClose: () => void
  selectedProject: number | null
}

const DonationModal = ({ open, onClose, selectedProject }: DonationModalProps) => {
  const { addToCart } = useCart()
  const [donorName, setDonorName] = useState("")
  const [donationAmount, setDonationAmount] = useState("")
  const [notification, setNotification] = useState<{
    message: string
    severity: "success" | "error" | "info"
  } | null>(null)

  const handleDonationSubmit = () => {
    if (!donorName.trim() || !donationAmount.trim()) {
      setNotification({
        message: "Please fill in all fields",
        severity: "error",
      })
      return
    }

    const amount = Number.parseFloat(donationAmount)
    if (isNaN(amount) || amount <= 0) {
      setNotification({
        message: "Please enter a valid donation amount",
        severity: "error",
      })
      return
    }

    const donationItem = {
      id: Date.now(),
      name: selectedProject
        ? `Donation - ${charityProjects.find((p) => p.id === selectedProject)?.title}`
        : `Donation from ${donorName}`,
      price: amount,
      quantity: 1,
      image: "/donation-heart-icon.jpg",
      images: ["/donation-heart-icon.jpg"],
    }

    addToCart(donationItem)

    setNotification({
      message: `Thank you ${donorName}! Your donation of ₦${amount.toLocaleString()} has been added to cart.`,
      severity: "success",
    })

    setDonorName("")
    setDonationAmount("")
    onClose()
  }

  const handleClose = () => {
    setDonorName("")
    setDonationAmount("")
    onClose()
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: { xs: "90%", sm: 500 },
            p: 4,
            borderRadius: 3,
            outline: "none",
          }}
        >
          <Typography variant="h5" textAlign="center" mb={3} fontWeight="bold">
            <FavoriteIcon sx={{ mr: 1, color: "#e91e63" }} />
            Make a Donation
          </Typography>

          {selectedProject && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Donating to: {charityProjects.find((p) => p.id === selectedProject)?.title}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Your Name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Donation Amount (₦)"
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            margin="normal"
            required
            inputProps={{ min: 1000, step: 1000 }}
          />

          <Box display="flex" gap={2} mt={3}>
            <Button variant="outlined" fullWidth onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={handleDonationSubmit}
              sx={{
                bgcolor: "#2e7d32",
                "&:hover": {
                  bgcolor: "#1b5e20",
                },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Paper>
      </Modal>

      {/* Notification Snackbar */}
      <Snackbar
        open={!!notification}
        autoHideDuration={4000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setNotification(null)} severity={notification?.severity || "info"} sx={{ width: "100%" }}>
          {notification?.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default DonationModal
