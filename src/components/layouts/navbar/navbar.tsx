"use client";
import { useState, useEffect } from "react";
import type React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

import LogoSection from "./components/LogoSection";
import NavLinks from "./components/NavLinks";
import { useCart } from "@/context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

function CartBadge({ count }: { count: number }) {
  return (
    <Badge
      badgeContent={count}
      color="error"
      sx={{
        "& .MuiBadge-badge": {
          fontSize: "0.7rem",
          height: 18,
          minWidth: 18,
        },
      }}
    >
      <ShoppingCartIcon sx={{ fontSize: "1.6rem", color: "green" }} />
    </Badge>
  );
}

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
    setMobileMenuOpen(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    handleCloseNavMenu();
    const section = document.getElementById(sectionId.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: scrolled ? 3 : 0,
        bgcolor: "white",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: 0,
        transition: "all 0.3s ease",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar
          sx={{
            px: 0,
            display: "flex",
            justifyContent: "space-between",
            position: "relative",
            minHeight: { xs: "60px", md: "80px" },
            width: "100%",
          }}
        >
          <Box
            sx={{
              flex: 1,
              height: { xs: "60px", md: "80px" },
              bgcolor: "white",
              display: "flex",
              gap: { xs: 2, md: "150px" },
              alignItems: "center",
              px: { xs: 2, md: 3 },
              position: "relative",
              zIndex: 1,
            }}
          >
            <LogoSection />

            {/* Mobile Cart */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                ml: "auto",
                alignItems: "center",
                gap: 1,
              }}
            >
              <IconButton component={Link} href="/cart">
                <CartBadge count={cartCount} />
              </IconButton>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                sx={{
                  color: "green",
                  zIndex: 3,
                }}
              >
                {mobileMenuOpen ? (
                  <CloseIcon sx={{ fontSize: "2rem" }} />
                ) : (
                  <MenuIcon sx={{ fontSize: "2rem" }} />
                )}{" "}
              </IconButton>
            </Box>
          </Box>

          {/* Desktop Only */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flex: 1,
              height: "80px",
              background: "green",
              alignItems: "center",
              justifyContent: "flex-end",
              px: 4,
              position: "absolute",
              right: 0,
              top: 0,
              zIndex: 2,
              clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
              overflow: "hidden",
              minWidth: "50%",
              maxWidth: "70%",
            }}
          >
            <NavLinks onSectionClick={scrollToSection} />
          </Box>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorElNav}
            open={mobileMenuOpen}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiPaper-root": {
                bgcolor: "green",
                color: "white",
                width: "100%",
                left: "0 !important",
                right: 0,
                borderRadius: 0,
                mt: { xs: "60px", md: "80px" },
              },
            }}
            MenuListProps={{
              sx: {
                py: 2,
                px: 3,
              },
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <NavLinks onSectionClick={scrollToSection} mobile />
            </Box>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
