import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

export const createWcApi = () => {
  const storeUrl = process.env.WC_STORE_URL;
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!storeUrl || !consumerKey || !consumerSecret) {
    console.error("Missing WooCommerce environment variables:", {
      storeUrl: !!storeUrl,
      consumerKey: !!consumerKey,
      consumerSecret: !!consumerSecret,
    });
    throw new Error("WooCommerce environment variables are missing");
  }

  try {
    return new WooCommerceRestApi({
      url: storeUrl as string,
      consumerKey: consumerKey as string,
      consumerSecret: consumerSecret as string,
      version: "wc/v3",
    });
  } catch (error) {
    console.error("Failed to initialize WooCommerce API:", error);
    throw new Error("Failed to initialize WooCommerce API");
  }
};