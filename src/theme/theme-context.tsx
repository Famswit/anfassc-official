"use client"
import { createContext, useContext, type ReactNode } from "react"

type ThemeMode = "light"

interface ThemeContextType {
  mode: ThemeMode
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const mode: ThemeMode = "light"

  return <ThemeContext.Provider value={{ mode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
