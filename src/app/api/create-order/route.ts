import { NextResponse } from "next/server";
import { createWcApi } from "@/lib/woocommerce";

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface OrderRequestBody {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  stateCountry: string;
  phone: string;
  email: string;
  total: number;
  flutterwaveRef?: string;
  paystackRef?: string;
  cartItems: CartItem[];
}

interface WooCommerceOrder {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  status: string;
  currency: string;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    city: string;
    state: string;
    country: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    country: string;
  };
  line_items: {
    product_id: number;
    name: string;
    quantity: number;
    price: number;
    subtotal: string;
    total: string;
  }[];
  total: string;
  meta_data: { key: string; value: string | object }[];
}

export async function POST(req: Request) {
  const wcApi = createWcApi();

  try {
    const body = (await req.json()) as OrderRequestBody;
    console.log("Received order body:", body);
    const { firstName, lastName, address, city, stateCountry, phone, email, total, flutterwaveRef, paystackRef, cartItems } = body;

    // Validate required fields
    if (!firstName || !lastName || !address || !city || !stateCountry || !phone || !email || !cartItems || cartItems.length === 0) {
      console.error("Validation failed:", { firstName, lastName, address, city, stateCountry, phone, email, cartItems });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Split and validate stateCountry
    const [state, country] = stateCountry.split(",").map((s) => s.trim());
    if (!state || !country) {
      return NextResponse.json({ error: "Invalid state and country format. Use 'State, Country' (e.g., 'Lagos, NG')" }, { status: 400 });
    }

    // Validate cart items
    const line_items = cartItems.map((item: CartItem) => {
      if (!item.id || !item.quantity || !item.name || item.price <= 0) {
        console.error("Invalid cart item:", item);
        throw new Error("Invalid cart item data");
      }
      const itemTotal = (item.price * item.quantity).toFixed(2);
      return {
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        subtotal: itemTotal,
        total: itemTotal,
      };
    });

    // Prepare metadata
    const metaData = [
      { key: "_order_origin", value: "Next.js Frontend" },
      { key: "_order_currency", value: "NGN" },
    ];

    // Conditional Add Flutterwave details 
    if (flutterwaveRef) {
      metaData.push(
        { key: "_flutterwave_tx_ref", value: flutterwaveRef },
        { key: "_payment_method", value: "Flutterwave" },
        {
          key: "_flutterwave_transaction_details",
          value: JSON.stringify({
            reference: flutterwaveRef,
            payment_method: "card,banktransfer,ussd",
            currency: "NGN",
            amount: total,
            timestamp: new Date().toISOString(),
          }),
        }
      );
    }

    // Conditional Add Paystack details 
    if (paystackRef) {
      metaData.push(
        { key: "_paystack_reference", value: paystackRef },
        { key: "_payment_method", value: "Paystack" },
        {
          key: "_paystack_transaction_details",
          value: JSON.stringify({
            reference: paystackRef,
            payment_method: "card",
            currency: "NGN",
            amount: total,
            timestamp: new Date().toISOString(),
          }),
        }
      );
    }

    const orderData: WooCommerceOrder = {
      payment_method: flutterwaveRef ? "flutterwave" : paystackRef ? "paystack" : "manual",
      payment_method_title: flutterwaveRef ? "Flutterwave" : paystackRef ? "Paystack" : "Manual Payment",
      set_paid: !!flutterwaveRef || !!paystackRef,
      status: flutterwaveRef || paystackRef ? "completed" : "pending",
      currency: "NGN",
      billing: {
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address_1: address,
        city,
        state,
        country,
      },
      shipping: {
        first_name: firstName,
        last_name: lastName,
        address_1: address,
        city,
        state,
        country,
      },
      line_items,
      total: total.toFixed(2),
      meta_data: metaData,
    };

    console.log("Sending order data to WooCommerce:", orderData);
    const response = await wcApi.post("orders", orderData);
    console.log("WooCommerce response:", response.data);

    if (!response.data.id) {
      throw new Error("Order creation failed: No ID returned from WooCommerce");
    }

    return NextResponse.json({ id: response.data.id, status: response.data.status }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("WooCommerce order creation error:", errorMessage, "Stack:", error instanceof Error ? error.stack : "");
    return NextResponse.json(
      { error: "Failed to create order", details: errorMessage },
      { status: 500 }
    );
  }
}