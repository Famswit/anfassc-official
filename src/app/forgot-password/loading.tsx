import { Box, CircularProgress } from "@mui/material"

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "white",
      }}
    >
      <CircularProgress sx={{ color: "#2e7d32" }} />
    </Box>
  )
}
