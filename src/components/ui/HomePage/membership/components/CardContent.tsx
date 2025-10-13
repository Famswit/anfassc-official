import { CardContent, Box, Typography } from "@mui/material";

interface CardContentProps {
  membership: {
    name: string;
    subtitle: string;
    description: string;
    textColor: string;
  };
  button: React.ReactNode;
}

export default function CardContentTemplate({
  membership,
  button,
}: CardContentProps) {
  return (
    <CardContent
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: { xs: 2, sm: 2.5 },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
            color: "#fff",
            mb: 1.5,
            letterSpacing: "0.02em",
          }}
        >
          {membership.name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "0.85rem", sm: "0.9rem" },
            fontWeight: 600,
            color: "#fff",
            mb: 2,
            opacity: 0.9,
          }}
        >
          {membership.subtitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.8rem",
            color: "#fff",
            opacity: 0.8,
            lineHeight: 1.5,
          }}
        >
          {membership.description}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>{button}</Box>
    </CardContent>
  );
}
