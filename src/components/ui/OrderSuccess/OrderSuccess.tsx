"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion } from "framer-motion";
import { createWcApi } from "@/lib/woocommerce";

interface Order {
  id: number;
  total: string;
  payment_method_title: string;
  status: string;
  line_items: { id: number; name: string; quantity: number; total: string }[];
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  meta_data: { key: string; value: string | object }[];
}

const OrderSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const reference = searchParams.get("ref");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("Order ID is missing. Please contact support.");
      setLoading(false);
      return;
    }

    const wcApi = createWcApi();

    const fetchOrder = async () => {
      try {
        const response = await wcApi.get(`orders/${orderId}`);
        setOrder(response.data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch order";
        console.error("Error fetching order:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Loading your order...</Typography>
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="error">
          {error || "Order not found. Please contact support."}
        </Typography>
      </Box>
    );
  }

  const paymentDetails = order.meta_data.find(
    (md) =>
      md.key === "_flutterwave_transaction_details" ||
      md.key === "_paystack_transaction_details"
  )?.value;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            sx={{ textAlign: "center", p: 4, borderRadius: 3, boxShadow: 3 }}
          >
            <CheckCircleIcon sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: "#2e7d32", mb: 2 }}
            >
              Payment Successful 🎉
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Thank you {order.billing.first_name}! Your order has been placed
              successfully.
            </Typography>

            <CardContent
              sx={{
                textAlign: "left",
                bgcolor: "#f1f8f4",
                borderRadius: 2,
                mb: 3,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Order Summary (ID: #{order.id})
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Status:</strong>{" "}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Typography>
              {order.line_items.map((item) => (
                <Box key={item.id} sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    {item.quantity} × {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ₦
                    {Number(item.total).toLocaleString("en-NG", {
                      minimumFractionDigits: 2,
                    })}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </Box>
              ))}
              <Typography variant="body2">
                <strong>Total:</strong> ₦
                {Number(order.total).toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                })}
              </Typography>
              <Typography variant="body2">
                <strong>Payment Method:</strong> {order.payment_method_title}
              </Typography>
              {reference && (
                <Typography variant="body2">
                  <strong>Transaction Reference:</strong> {reference}
                </Typography>
              )}
              {paymentDetails && typeof paymentDetails === "string" && (
                <Typography variant="body2">
                  <strong>Transaction Details:</strong> {paymentDetails}
                </Typography>
              )}
              <Typography variant="body2">
                <strong>Email:</strong> {order.billing.email}
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> {order.billing.phone}
              </Typography>
            </CardContent>

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#388e3c" } }}
                onClick={() => router.push("/")}
              >
                Continue Shopping
              </Button>
            </Box>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default OrderSuccessPage;
