"use client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import OrderSuccessPage from "@/components/ui/OrderSuccess/OrderSuccess";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <Box>
      <OrderSuccessPage />
    </Box>
  );
}
