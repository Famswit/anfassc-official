"use client"
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import type React from "react"

import CssBaseline from "@mui/material/CssBaseline"
import { Poppins } from "next/font/google"
import { useTheme } from "@/theme/theme-context"
import { ThemeProvider as NextThemeProvider } from "@/theme/theme-context"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider>
      <ThemeRegistryContent>{children}</ThemeRegistryContent>
    </NextThemeProvider>
  )
}

function ThemeRegistryContent({ children }: { children: React.ReactNode }) {
  const { mode } = useTheme()

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // Light mode
            primary: {
              main:"#1e6233"
            },
            secondary: {
              main: "#FF6584", 
            },
            background: {
              default: "#FFFFFF", 
              paper: "#FFFFFF", 
            },
            text: {
              primary: "#151C39", 
              secondary: "#4A4A6A",
            },
          }
        : {
            // Dark mode
            primary: {
              main: "#8F88FF", 
            },
            secondary: {
              main: "#FF7A97",
            },
            background: {
              default: "#121212",
              paper: "#1E1E1E",
            },
            text: {
              primary: "#F5F5F7",
              secondary: "#ABABC4",
            },
          }),
    },
    typography: {
      fontFamily: poppins.style.fontFamily,
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            textTransform: "none",
            fontWeight: 500,
            padding: "10px 24px",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === "light" ? "0 10px 30px rgba(0, 0, 0, 0.05)" : "0 10px 30px rgba(0, 0, 0, 0.3)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  })

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}

