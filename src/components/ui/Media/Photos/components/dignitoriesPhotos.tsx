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
    { src: "/media/dignitories/dig1.webp", alt: "Dignitory Photo 1" },
    { src: "/media/dignitories/dig2.webp", alt: "Dignitory Photo 2" },
    { src: "/media/dignitories/dig3.webp", alt: "Dignitory Photo 3" },
    { src: "/media/dignitories/dig4.webp", alt: "Dignitory Photo 4" },
    { src: "/media/dignitories/dig5.webp", alt: "Dignitory Photo 5" },
    { src: "/media/dignitories/dig6.webp", alt: "Dignitory Photo 6" },
    { src: "/media/dignitories/dig7.webp", alt: "Dignitory Photo 7" },
    { src: "/media/dignitories/dig8.webp", alt: "Dignitory Photo 8" },
    { src: "/media/dignitories/dig9.webp", alt: "Dignitory Photo 9" },
    { src: "/media/dignitories/dig10.webp", alt: "Dignitory Photo 9" },
    { src: "/media/dignitories/dig010.webp", alt: "Dignitory Photo 9" },
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