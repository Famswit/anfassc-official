"use client"

import { useState } from "react"
import { Box, Typography, Chip } from "@mui/material"
import { motion } from "framer-motion"
import ProductCard from "./components/ProductCard"
import SeeMoreButton from "./components/SeeMoreButton"
import PaginationButton from "./components/PaginationButton"
import { AllProducts } from "./components/AllProducts"
import { containerVariants } from "./components/MerchandiseVariants"

export default function MerchandiseCart() {
  const [currentPage, setCurrentPage] = useState(0)
  const [cartItems, setCartItems] = useState<number[]>([])

  const itemsPerPage = 4
  const totalPages = Math.ceil(AllProducts.length / itemsPerPage)

  const getCurrentProducts = () => {
    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return AllProducts.slice(startIndex, endIndex)
  }

  const handleSeeMore = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const handleAddToCart = (productId: number) => {
    setCartItems((prev) => [...prev, productId])
  }

  return (
    <Box
      sx={{
        background: 'green',
        py: { xs: 6, md: 8 },
        px: { xs: 2, sm: 4, md: 8 },
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          filter: "blur(100px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
          filter: "blur(120px)",
        }}
      />

      {/* Authentic Shop Badge */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
      >
        <Chip
          label="ANFASSC MERCHANDISE SHOP"
          sx={{
            bgcolor: "#fff",
            color: "primary.main",
            fontSize: "1rem",
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: "25px",
          }}
        />
      </motion.div>

      {/* Header and Cart Count */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3.5rem",
              lg: "4rem",
            },
            mb: { xs: 2, md: 4 },
            color: "#fff",
            letterSpacing: "0.02em",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          NEW STOCK IN
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            color: "#fff",
            mb: { xs: 4, md: 6 },
          }}
        >
          Cart Items: {cartItems.length}
        </Typography>
      </motion.div>

      {/* Product Cards */}
      <motion.div variants={containerVariants} initial="hidden" animate="visible" key={currentPage}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: 3, sm: 4 },
            maxWidth: "1400px",
            mx: "auto",
            position: "relative",
          }}
        >
          {getCurrentProducts().map((product, index) => (
            <ProductCard
              key={`${currentPage}-${product.id}`}
              product={product}
              index={index}
              handleAddToCart={handleAddToCart}
            />
          ))}

          {/* See More Button */}
          {currentPage < totalPages - 1 && (
            <SeeMoreButton handleSeeMore={handleSeeMore} />
          )}
        </Box>
      </motion.div>

      {/* Pagination Indicator */}
      <PaginationButton
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  )
}