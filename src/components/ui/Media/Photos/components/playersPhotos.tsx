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
    { src: "/media/players/player01.jpeg", alt: "Dignitory Photo 1" },
    { src: "/media/players/player2.jpeg", alt: "Dignitory Photo 2" },
    { src: "/media/players/player02.jpg", alt: "Dignitory Photo 3" },
    { src: "/media/players/player3.jpg", alt: "Dignitory Photo 4" },
    { src: "/media/players/player03.jpg", alt: "Dignitory Photo 5" },
    { src: "/media/players/player4.jpeg", alt: "Dignitory Photo 6" },
    { src: "/media/players/player5.jpeg", alt: "Dignitory Photo 7" },
    { src: "/media/players/player6.jpeg", alt: "Dignitory Photo 8" },
    { src: "/media/players/player7.jpeg", alt: "Dignitory Photo 9" },
    { src: "/media/players/player9.jpeg", alt: "Dignitory Photo 9" },
    { src: "/media/players/player10.jpg", alt: "Dignitory Photo 9" },
    { src: "/media/players/player11.jpeg", alt: "Dignitory Photo 9" },
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