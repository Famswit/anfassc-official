// app/api/sync-user/route.ts
import { NextResponse } from "next/server";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export async function POST(req: Request) {
  const wcApi = new WooCommerceRestApi({
    url: process.env.WC_STORE_URL as string,
    consumerKey: process.env.WC_CONSUMER_KEY as string,
    consumerSecret: process.env.WC_CONSUMER_SECRET as string,
    version: "wc/v3",
  });

  // Validate environment variables
  if (!process.env.WC_STORE_URL || !process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET) {
    return NextResponse.json(
      { error: "WooCommerce configuration is missing" },
      { status: 500 }
    );
  }

  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    // Check user existence
    const usersResponse = await wcApi.get("customers", { email });
    let user = usersResponse.data.length > 0 ? usersResponse.data[0] : null;

    if (!user) {
      // Create new user if not exists
      const newUserResponse = await wcApi.post("customers", {
        email,
        first_name: name,
        billing: { email },
        shipping: { email },
      });
      user = newUserResponse.data;
    } else {
      
      if (user.first_name !== name) {
        await wcApi.put(`customers/${user.id}`, {
          first_name: name,
        });
        user.first_name = name;
      }
    }

    return NextResponse.json(
      { success: true, userId: user.id, email: user.email, name: user.first_name },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("User sync error:", error.message);
      return NextResponse.json(
        { error: "Failed to sync user", details: error.message },
        { status: 500 }
      );
    }

    console.error("Unknown user sync error:", error);
    return NextResponse.json(
      { error: "Unknown failure while syncing user" },
      { status: 500 }
    );
  }
}
