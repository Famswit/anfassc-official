'use client'
import { Box, Container } from "@mui/material";
import SponsorsHeader from "./components/SponsorsHeader";
import { sponsors } from "./components/sponsorsData";
import SponsorsFooter from "./components/SponsorsFooter";
import SponsorCard from "./components/SponsorsCard";

export default function Sponsors() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header */}
      <SponsorsHeader />

      {/* Sponsor Cards */}
      <Box sx={{ my: 6 }}>
        <SponsorCard sponsors={sponsors} />
      </Box>

      {/* Footer */}
      <SponsorsFooter />
    </Container>
  );
}