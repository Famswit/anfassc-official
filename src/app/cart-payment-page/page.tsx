// src/app/cart-payment-page/page.tsx
"use client";

import React, { Suspense } from "react";
import CartPaymentPage from "@/components/ui/HomePage/shop/cartPaymentPage/cartPayment";

export default function PageWrapper() {
  return (
    <Suspense fallback={<div>Loading checkout...</div>}>
      <CartPaymentPage />
    </Suspense>
  );
}
