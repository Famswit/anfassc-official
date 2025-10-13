import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ThemeRegistry from "@/theme/themeRegistry"
import Footer from "@/components/layouts/footer/footer"
import Navbar from "@/components/layouts/navbar/navbar"
import { CartProvider } from "@/context/CartContext"
import { AuthProvider } from "@/context/AuthContext"
import "@/styles/globals.css" 
import WhatsAppSupport from "@/components/ui/HomePage/supportChat/whatsappSupport"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ANFASSC",
  description: "AUTHENTIC NIGERIA FOOTBALL SUPPORTER'S CLUB",
  icons: {
    icon: "/officialLogo.jpg", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          <AuthProvider>
            <CartProvider>
              <Navbar />
              {children}
              <WhatsAppSupport />
              <Footer />
            </CartProvider>
          </AuthProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
