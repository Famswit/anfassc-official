import ArchiveNewsPage from "@/components/ui/News/ArchiveNews";
import { ExternalNews, fetchNigeriaSportsNews } from "@/hooks/newsAPI";
import { Box } from "@mui/material";


export default async function Page() {
  const externalNews: ExternalNews[] = await fetchNigeriaSportsNews();
  console.log("Fetched news data:", externalNews); 

  
  return (
    <Box>
      <ArchiveNewsPage />
    </Box>
  );
}