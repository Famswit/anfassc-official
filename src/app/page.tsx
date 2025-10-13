
import HeroPage from "@/components/ui/HomePage/heroSection/hero";
import LatestNews from "@/components/ui/HomePage/latestNews/latestNews";
import LatestVideos from "@/components/ui/HomePage/latestVideo/latestVideo";
import MembershipCards from "@/components/ui/HomePage/membership/membership";
import PresidentSpeech from "@/components/ui/HomePage/PresidentSpeachSection/SpeachSection";
import MerchandiseCart from "@/components/ui/HomePage/shop/shop";
import Sponsors from "@/components/ui/HomePage/sponsors/sponsors";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <HeroPage />
      <MembershipCards />
      <MerchandiseCart />
      <LatestNews />
      <LatestVideos />
      <PresidentSpeech />
      <Sponsors />
    </Box>
  );
}
