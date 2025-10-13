"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Badge,
  Avatar,
  IconButton,
  Collapse,
} from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"

interface NavLinksProps {
  onSectionClick: (sectionId: string) => void
  mobile?: boolean
}

const pages = [
  { name: "Home", path: "/" },
  {
    name: "About us",
    path: "/about",
    dropdown: [
      { name: "Club", path: "/about/club" },
      { name: "Team & Members", path: "/about/team" },
    ],
  },
  { name: "Membership", path: "/member" },
  {
    name: "Media",
    path: "/media",
    dropdown: [
      { name: "Photos", path: "/media/photos" },
      { name: "Videos", path: "/media/videos" },
    ],
  },
  { name: "News", path: "/news" },
  {
    name: "Club",
    path: "/club",
    dropdown: [
      { name: "Authentic club", path: "/club/authentic" },
      { name: "Contact us", path: "/club/contact" },
      { name: "Others", path: "/club/others" },
    ],
  },
  { name: "Donation", path: "/donation" }, // 
  { name: "Cart", path: "/cart", icon: true },
]

//  cart badge
function CartBadge({ count, color }: { count: number; color: string }) {
  return (
    <Badge
      badgeContent={count}
      color="error"
      sx={{
        ml: 1,
        "& .MuiBadge-badge": {
          fontSize: "0.7rem",
          height: 18,
          minWidth: 18,
        },
      }}
    >
      <ShoppingCartIcon sx={{ fontSize: "1.4rem", color }} />
    </Badge>
  )
}

export default function NavLinks({ onSectionClick, mobile = false }: NavLinksProps) {
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({})
  const [mobileDropdowns, setMobileDropdowns] = useState<{ [key: string]: boolean }>({})
  const { cartCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, pageName: string) => {
    setAnchorEl((prev) => ({ ...prev, [pageName]: event.currentTarget }))
  }

  const handleMenuClose = (pageName: string) => {
    setAnchorEl((prev) => ({ ...prev, [pageName]: null }))
  }

  const toggleMobileDropdown = (pageName: string) => {
    setMobileDropdowns((prev) => ({ ...prev, [pageName]: !prev[pageName] }))
  }

  const handleLogout = () => {
    logout()
    handleMenuClose("avatar")
  }

  const getUserInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  // Mobile menu
  if (mobile) {
    const mobilePages = pages.filter((p) => p.name !== "Cart")

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%" }}>
        {mobilePages.map((page) => (
          <Box key={page.name} sx={{ width: "100%" }}>
            <Button
              component={page.dropdown ? "button" : Link}
              href={page.dropdown ? undefined : page.path}
              onClick={() => {
                if (page.dropdown) toggleMobileDropdown(page.name)
                else onSectionClick(page.name)
              }}
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                py: 1.5,
                px: 2,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              {page.name}
              {page.dropdown && (
                <ExpandMoreIcon
                  sx={{
                    fontSize: "1.2rem",
                    transform: mobileDropdowns[page.name] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              )}
            </Button>

            {page.dropdown && (
              <Collapse in={mobileDropdowns[page.name]}>
                <Box sx={{ pl: 3, py: 1 }}>
                  {page.dropdown.map((item) => (
                    <Button
                      key={item.name}
                      component={Link}
                      href={item.path}
                      onClick={() => onSectionClick(item.name)}
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.8)",
                        justifyContent: "flex-start",
                        width: "100%",
                        py: 1,
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                          color: "white",
                        },
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                </Box>
              </Collapse>
            )}
          </Box>
        ))}

        {isAuthenticated && user && (
          <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.2)", pt: 2, mt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1, color: "white" }}>
              <Avatar sx={{ width: 32, height: 32, bgcolor: "white", color: "green", mr: 2 }}>
                {user.name ? getUserInitials(user.name) : <PersonIcon />}
              </Avatar>
              <Box sx={{ fontSize: "0.9rem", fontWeight: 500 }}>{user.name || user.email}</Box>
            </Box>
            <Button
              onClick={handleLogout}
              sx={{
                fontSize: "0.9rem",
                color: "white",
                justifyContent: "flex-start",
                width: "100%",
                py: 1.5,
                px: 2,
                "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
              }}
            >
              <LogoutIcon sx={{ mr: 1, fontSize: "1.1rem" }} /> Logout
            </Button>
          </Box>
        )}
      </Box>
    )
  }

  //  Desktop menu
  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1, flex: 1, ml: 10 }}>
      <AnimatePresence>
        {pages.map((page, index) => (
          <motion.div
            key={page.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center" }}
              onMouseLeave={() => page.dropdown && handleMenuClose(page.name)}
            >
              <Button
                component={Link}
                href={page.path}
                onMouseEnter={(e) => page.dropdown && handleMenuOpen(e, page.name)}
                onClick={() => !page.dropdown && onSectionClick(page.name)}
                sx={{
                  fontSize: { sm: "0.85rem", md: "0.9rem" },
                  fontWeight: 600,
                  mx: 0.5,
                  px: 1,
                  py: 1,
                  color: page.name === "Cart" ? "green" : "white",
                  backgroundColor: page.name === "Cart" ? "white" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  textTransform: "none",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: "4px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: page.name === "Cart" ? "green" : "white",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": { width: "80%" },
                  "&:hover": {
                    backgroundColor:
                      page.name === "Cart"
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.1)",
                  },
                }}
              >
                {page.name}
                {page.icon && <CartBadge count={cartCount} color={page.name === "Cart" ? "green" : "white"} />}
                {page.dropdown && <ArrowDropDownIcon sx={{ ml: 0.5, fontSize: "1.2rem" }} />}
              </Button>

              {page.dropdown && (
                <Menu
                  anchorEl={anchorEl[page.name]}
                  open={Boolean(anchorEl[page.name])}
                  onClose={() => handleMenuClose(page.name)}
                  MenuListProps={{
                    sx: { bgcolor: "white", color: "green" },
                    onMouseLeave: () => handleMenuClose(page.name),
                  }}
                  PaperProps={{ sx: { mt: 1 } }}
                >
                  {page.dropdown.map((item) => (
                    <MenuItem
                      key={item.name}
                      component={Link}
                      href={item.path}
                      onClick={() => handleMenuClose(page.name)}
                      sx={{
                        minWidth: 140,
                        color: "green",
                        "&:hover": { backgroundColor: "rgba(0,128,0,0.1)" },
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>

      {isAuthenticated && user && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <IconButton onClick={(e) => handleMenuOpen(e, "avatar")} sx={{ ml: 2, p: 0 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: "white", color: "green", border: "2px solid white" }}>
              {user.name ? getUserInitials(user.name) : <PersonIcon />}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl["avatar"]}
            open={Boolean(anchorEl["avatar"])}
            onClose={() => handleMenuClose("avatar")}
            PaperProps={{ sx: { mt: 1, minWidth: 160 } }}
          >
            <MenuItem disabled sx={{ color: "green", fontWeight: 500 }}>
              <PersonIcon sx={{ mr: 1, fontSize: "1.1rem" }} />
              {user.name || user.email}
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              sx={{ color: "green", "&:hover": { backgroundColor: "rgba(0,128,0,0.1)" } }}
            >
              <LogoutIcon sx={{ mr: 1, fontSize: "1.1rem" }} /> Logout
            </MenuItem>
          </Menu>
        </motion.div>
      )}
    </Box>
  )
}
