"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

interface FlutterwaveTransaction {
  tx_ref?: string;
  transaction_id?: string;
  flw_ref?: string;
  status?: string;
  amount?: number;
  currency?: string;
}

interface PaystackTransaction {
  reference?: string;
  status?: string;
  amount?: number;
  currency?: string;
}

interface FlutterwaveCheckoutOptions {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: string;
  payment_options: string;
  customer: {
    email: string;
    phonenumber: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  callback: (data: FlutterwaveTransaction) => void;
  onClose: () => void;
}

declare global {
  interface Window {
    FlutterwaveCheckout?: (opts: FlutterwaveCheckoutOptions) => void;
    PaystackPop?: {
      setup: (opts: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        metadata?: {
          custom_fields: { display_name: string; variable_name: string; value: string }[];
        };
        callback: (response: PaystackTransaction) => void;
        onClose: () => void;
      }) => { openIframe: () => void };
    };
  }
}

export default function CartPaymentPage() {
  const { cartItems, getCartTotal, cartCount, clearCart } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEnquiry = searchParams.get("type") === "enquiry";
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"flutterwave" | "paystack">("flutterwave");

  const [customer, setCustomer] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    address: user?.address || "",
    city: user?.city || "",
    stateCountry: user?.stateCountry || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    stateCountry: "",
    phone: "",
    email: "",
  });

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) => {
    const cleaned = phone.replace(/[\s-]/g, "");
    return /^[+]?\d{10,15}$/.test(cleaned);
  };

  const validateField = (name: keyof typeof customer, value: string): string => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required";
        if (value.trim().length < 2) return "First name must be at least 2 characters";
        break;
      case "lastName":
        if (!value.trim()) return "Last name is required";
        if (value.trim().length < 2) return "Last name must be at least 2 characters";
        break;
      case "address":
        if (!value.trim()) return "Address is required";
        if (value.trim().length < 6) return "Please provide a complete address";
        break;
      case "city":
        if (!value.trim()) return "City is required";
        if (value.trim().length < 2) return "City name must be at least 2 characters";
        break;
      case "stateCountry":
        if (!value.trim()) return "State and country are required";
        if (!value.includes(",")) return "Please provide state and country (e.g., Lagos, NG)";
        break;
      case "phone":
        if (!value.trim()) return "Phone number is required";
        if (!validatePhone(value)) return "Please enter a valid phone number (10-15 digits)";
        break;
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!validateEmail(value)) return "Please enter a valid email address";
        break;
    }
    return "";
  };

  const handleInputChange = (name: keyof typeof customer, value: string) => {
    setCustomer((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const subtotal = getCartTotal();
  const total = subtotal;

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/cart-payment-page");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  if (cartItems.length === 0) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f8f9fa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Card sx={{ textAlign: "center", p: 4 }}>
            <ShoppingCartIcon sx={{ fontSize: 64, color: "#e0e0e0", mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: "text.secondary" }}>
              Your cart is empty
            </Typography>
            <Button
              variant="contained"
              onClick={() => router.push("/")}
              sx={{ bgcolor: "#4caf50", "&:hover": { bgcolor: "#388e3c" } }}
            >
              Continue Shopping
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  const isFormValid =
    !Object.values(errors).some((err) => err !== "") &&
    Object.values(customer).every((val) => val.trim() !== "");

  const loadFlutterwaveScript = (): Promise<void> =>
    new Promise((resolve, reject) => {
      if (typeof window === "undefined") return reject(new Error("Window is undefined"));
      if (window.FlutterwaveCheckout) return resolve();

      const existing = document.querySelector<HTMLScriptElement>(
        'script[src="https://checkout.flutterwave.com/v3.js"]'
      );
      if (existing) {
        setTimeout(() => {
          if (window.FlutterwaveCheckout) resolve();
          else reject(new Error("Flutterwave script failed to initialize"));
        }, 500);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.async = true;
      script.onload = () => {
        if (window.FlutterwaveCheckout) resolve();
        else reject(new Error("Failed to initialize Flutterwave"));
      };
      script.onerror = () => reject(new Error("Failed to load Flutterwave script"));
      document.head.appendChild(script);
    });

  const loadPaystackScript = (): Promise<void> =>
    new Promise((resolve, reject) => {
      if (typeof window === "undefined") return reject(new Error("Window is undefined"));
      if (window.PaystackPop) return resolve();

      const existing = document.querySelector<HTMLScriptElement>(
        'script[src="https://js.paystack.co/v1/inline.js"]'
      );
      if (existing) {
        setTimeout(() => {
          if (window.PaystackPop) resolve();
          else reject(new Error("Paystack script failed to initialize"));
        }, 500);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => {
        if (window.PaystackPop) resolve();
        else reject(new Error("Failed to initialize Paystack"));
      };
      script.onerror = () => reject(new Error("Failed to load Paystack script"));
      document.head.appendChild(script);
    });

  const handlePayment = async () => {
    const newErrors = {
      firstName: validateField("firstName", customer.firstName),
      lastName: validateField("lastName", customer.lastName),
      address: validateField("address", customer.address),
      city: validateField("city", customer.city),
      stateCountry: validateField("stateCountry", customer.stateCountry),
      phone: validateField("phone", customer.phone),
      email: validateField("email", customer.email),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((e) => e !== "")) {
      alert("Please fix validation errors before proceeding.");
      return;
    }

    if (isEnquiry) {
      alert("Your enquiry has been submitted successfully!");
      clearCart();
      router.push("/enquiry-success");
      return;
    }

    if (!isFormValid) {
      alert("Please complete all required customer details.");
      return;
    }

    setLoading(true);
    try {
      if (paymentMethod === "flutterwave") {
        await loadFlutterwaveScript();
        const txRef = `ANFASSC_${Date.now()}`;
        const flutterwaveOptions: FlutterwaveCheckoutOptions = {
          public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
          tx_ref: txRef,
          amount: total,
          currency: "NGN",
          payment_options: "card,banktransfer,ussd",
          customer: {
            email: customer.email,
            phonenumber: customer.phone,
            name: `${customer.firstName} ${customer.lastName}`,
          },
          customizations: {
            title: "ANFASSC Payment",
            description: "Payment for your order",
            logo: "/officialLogo.jpg",
          },
          callback: async (data: FlutterwaveTransaction) => {
            console.log("Flutterwave Callback:", data);
            setLoading(true);
            try {
              const reference = data.tx_ref || data.flw_ref || txRef;
              if (data.status !== "successful") throw new Error("Payment not successful");

              const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...customer,
                  total,
                  flutterwaveRef: reference,
                  cartItems,
                }),
              });

              const responseData = await res.json();
              console.log("Create-order Response:", responseData, "Status:", res.status);
              if (!res.ok) throw new Error(`Order creation failed: ${responseData.error || "Unknown error"}`);

              clearCart();
              router.push(`/order-success?orderId=${responseData.id}&ref=${reference}`);
            } catch (error: unknown) {
              const errorMessage = error instanceof Error ? error.message : "Unknown error";
              console.error("Flutterwave Callback Error:", errorMessage);
              alert(`Payment processed, but order creation failed: ${errorMessage}. Contact support.`);
              router.push("/order-failed");
            } finally {
              setLoading(false);
            }
          },
          onClose: () => {
            console.log("Flutterwave Payment closed");
            setLoading(false);
            alert("Payment was cancelled. Please try again.");
            router.push("/order-failed");
          },
        };

        if (window.FlutterwaveCheckout) {
          window.FlutterwaveCheckout(flutterwaveOptions);
        } else {
          throw new Error("Flutterwave checkout not available");
        }
      } else if (paymentMethod === "paystack") {
        await loadPaystackScript();
        const paystackOptions = {
          key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
          email: customer.email,
          amount: total * 100, 
          currency: "NGN",
          ref: `ANFASSC_${Date.now()}`,
          metadata: {
            custom_fields: [
              { display_name: "First Name", variable_name: "first_name", value: customer.firstName },
              { display_name: "Last Name", variable_name: "last_name", value: customer.lastName },
              { display_name: "Address", variable_name: "address", value: customer.address },
              { display_name: "City", variable_name: "city", value: customer.city },
              { display_name: "State/Country", variable_name: "state_country", value: customer.stateCountry },
              { display_name: "Phone", variable_name: "phone", value: customer.phone },
            ],
          },
          callback: (response: PaystackTransaction) => {
            console.log("Paystack Callback:", response);
            setLoading(true);
            (async () => {
              try {
                const reference = response.reference || "";
                if (response.status !== "success") throw new Error("Payment not successful");

                const res = await fetch("/api/create-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...customer,
                    total,
                    paystackRef: reference,
                    cartItems,
                  }),
                });

                const responseData = await res.json();
                console.log("Create-order Response:", responseData, "Status:", res.status);
                if (!res.ok) throw new Error(`Order creation failed: ${responseData.error || "Unknown error"}`);

                clearCart();
                router.push(`/order-success?orderId=${responseData.id}&ref=${reference}`);
              } catch (error: unknown) {
                const errorMessage = error instanceof Error ? error.message : "Unknown error";
                console.error("Paystack Callback Error:", errorMessage);
                alert(`Payment processed, but order creation failed: ${errorMessage}. Contact support.`);
                router.push("/order-failed");
              } finally {
                setLoading(false);
              }
            })();
          },
          onClose: () => {
            console.log("Paystack Payment closed");
            setLoading(false);
            alert("Payment was cancelled. Please try again.");
            router.push("/order-failed");
          },
        };

        if (window.PaystackPop) {
          try {
            const handler = window.PaystackPop.setup(paystackOptions);
            handler.openIframe();
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error("Paystack Setup Error:", errorMessage);
            throw new Error(`Failed to set up Paystack: ${errorMessage}`);
          }
        } else {
          throw new Error("Paystack checkout not available");
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      console.error(`${paymentMethod} Initiation Error:`, errorMessage);
      alert(`Failed to initiate ${paymentMethod} payment: ${errorMessage}. Try again later.`);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f8f9fa", py: 4, mt: "80px" }}>
      <Container maxWidth="lg">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2, color: "#2e7d32" }}>
                {isEnquiry ? "Enquiry Checkout" : "Checkout"}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
              </Typography>
            </Box>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card sx={{ flex: 1.5, borderRadius: 2, mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", color: "#2e7d32" }}>
                  Customer Details
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={customer.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                    />
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={customer.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Home Address"
                    value={customer.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    required
                    error={!!errors.address}
                    helperText={errors.address}
                  />
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
                    <TextField
                      fullWidth
                      label="City"
                      value={customer.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                    <TextField
                      fullWidth
                      label="State and Country (e.g., Lagos, NG)"
                      value={customer.stateCountry}
                      onChange={(e) => handleInputChange("stateCountry", e.target.value)}
                      required
                      error={!!errors.stateCountry}
                      helperText={errors.stateCountry}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    label="Active Phone Number"
                    value={customer.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    error={!!errors.phone}
                    helperText={errors.phone}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={customer.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card sx={{ flex: 1.5, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold", color: "#2e7d32" }}>
                  Order Summary
                </Typography>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography>
                      {item.name} x {item.quantity}
                    </Typography>
                    <Typography>₦{(item.price * item.quantity).toLocaleString("en-NG")}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>₦{subtotal.toLocaleString("en-NG")}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6">Total:</Typography>
                  <Typography variant="h6" sx={{ color: "#2e7d32" }}>
                    ₦{total.toLocaleString("en-NG")}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginBottom: 3 }}>
            <FormControl component="fieldset">
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold", color: "#2e7d32" }}>
                Select Payment Method
              </Typography>
              <RadioGroup
                row
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as "flutterwave" | "paystack")}
              >
                <FormControlLabel value="flutterwave" control={<Radio />} label="Flutterwave" />
                <FormControlLabel value="paystack" control={<Radio />} label="Paystack" />
              </RadioGroup>
            </FormControl>
          </motion.div>

          <Box
            sx={{
              position: { xs: "fixed", md: "static" },
              bottom: { xs: 0, md: "auto" },
              left: 0,
              right: 0,
              bgcolor: isFormValid ? "#2e7d32" : "#9e9e9e",
              py: 1.5,
              px: 4,
              mt: 5,
              borderRadius: "30px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease-in-out",
              color: "white",
              "&:hover": {
                bgcolor: isFormValid ? "#1b5e20" : "#9e9e9e",
                transform: isFormValid ? "translateY(-2px)" : "none",
                boxShadow: isFormValid ? "0 6px 14px rgba(0,0,0,0.25)" : "0 4px 12px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Button
              onClick={handlePayment}
              disabled={loading || !isFormValid}
              sx={{
                width: "100%",
                background: "transparent",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "16px",
                textTransform: "uppercase",
                border: "none",
                cursor: isFormValid ? "pointer" : "not-allowed",
                opacity: isFormValid ? 1 : 0.7,
                py: 1.2,
              }}
            >
              {loading ? "Processing..." : isEnquiry ? "Submit Enquiry" : `Proceed with ${paymentMethod === "flutterwave" ? "Flutterwave" : "Paystack"}`}
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}