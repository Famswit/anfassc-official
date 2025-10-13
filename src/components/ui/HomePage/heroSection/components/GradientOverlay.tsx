
import { Box } from "@mui/material";

export default function GradientOverlay() {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%, transparent 100%)",
      }}
    />
  );
}
