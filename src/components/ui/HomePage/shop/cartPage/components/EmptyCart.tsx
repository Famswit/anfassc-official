import { Box, Typography, Button } from "@mui/material"

const EmptyCartMessage = () => {
  return (
    <Box sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h6" color="text.secondary">
        Your cart is empty
      </Typography>
      <Button component="a" href="/" variant="contained" sx={{ mt: 2, bgcolor: "primary.main" }}>
        Continue Shopping
      </Button>
    </Box>
  )
}

export default EmptyCartMessage
