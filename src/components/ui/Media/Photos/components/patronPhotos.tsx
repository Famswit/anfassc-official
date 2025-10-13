"use client"
import { useState } from "react"
import type React from "react"
import PhotoCard from "../../components/photoCard"

const DignitoriesPhotos = () => {
  const [visiblePhotos, setVisiblePhotos] = useState(8)
  const [selectedPhoto, setSelectedPhoto] = useState<{
    src: string
    alt: string
  } | null>(null)

  const photos = [
    { src: "/media/patrons/patron1.webp", alt: "Dignitory Photo 1" },
    { src: "/media/patrons/patron2.webp", alt: "Dignitory Photo 2" },
    { src: "/media/patrons/patron3.webp", alt: "Dignitory Photo 3" },
    { src: "/media/patrons/patron4.webp", alt: "Dignitory Photo 4" },
    { src: "/media/patrons/patron5.webp", alt: "Dignitory Photo 5" },
   
  ]

  const handleSeeMore = () => {
    setVisiblePhotos((prev) => prev + 4)
  }

  const handlePhotoClick = (photo: { src: string; alt: string }) => {
    setSelectedPhoto(photo)
  }

  const handleCloseZoom = () => {
    setSelectedPhoto(null)
  }

  return (
    <PhotoCard
      photos={photos}
      visiblePhotos={visiblePhotos}
      selectedPhoto={selectedPhoto}
      handleSeeMore={handleSeeMore}
      handlePhotoClick={handlePhotoClick}
      handleCloseZoom={handleCloseZoom}
    />
  )
}

export default DignitoriesPhotos