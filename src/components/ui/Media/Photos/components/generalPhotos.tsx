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
    { src: "/media/club/club01.webp", alt: "club Photo 1" },
    { src: "/media/club/club02.webp", alt: "club Photo 1" },
    { src: "/media/club/club1.webp",  alt: "club Photo 2" },
    { src: "/media/club/club2.webp", alt: "club Photo 3" },
    { src: "/media/club/club3.webp", alt: "club Photo 4" },
    { src: "/media/club/club4.webp", alt: "club Photo 5" },
    { src: "/media/club/club5.webp", alt: "club Photo 6" },
    { src: "/media/club/club05.webp", alt: "club Photo 6" },
    { src: "/media/club/club5.webp", alt: "club Photo 6" },
    { src: "/media/club/club06.webp", alt: "club Photo 7" },
    { src: "/media/club/club07.webp", alt: "club Photo 6" },
    { src: "/media/club/club7.webp", alt: "club Photo 8" },
    { src: "/media/club/club8.webp", alt: "club Photo 9" },
    { src: "/media/club/club08.webp", alt: "club Photo 6" },
    { src: "/media/club/club9.webp", alt: "club Photo 9" },
    { src: "/media/club/club10.webp", alt: "club Photo 9" },
    { src: "/media/club/club11.webp", alt: "club Photo 6" },
    { src: "/media/club/club12.webp", alt: "club Photo 6" },
    { src: "/media/club/club13.webp", alt: "club Photo 6" },
    { src: "/media/club/club14.webp", alt: "club Photo 6" },
    { src: "/media/club/club15.webp", alt: "club Photo 6" },
    { src: "/media/club/club16.webp", alt: "club Photo 6" },
    { src: "/media/club/club17.webp", alt: "club Photo 6" },
    { src: "/media/club/club18.webp", alt: "club Photo 6" },
    { src: "/media/club/club19.webp", alt: "club Photo 6" },
    { src: "/media/club/club20.webp", alt: "club Photo 6" },
    { src: "/media/club/club21.webp", alt: "club Photo 6" },
    { src: "/media/club/club22.webp", alt: "club Photo 6" },
    { src: "/media/club/club23.webp", alt: "club Photo 6" },
    { src: "/media/club/club24.webp", alt: "club Photo 6" },
    { src: "/media/club/club44.webp", alt: "club Photo 6" },
    { src: "/media/club/club45.webp", alt: "club Photo 6" },
    { src: "/media/club/club46.webp", alt: "club Photo 6" },
    { src: "/media/club/club47.webp", alt: "club Photo 6" },
    { src: "/media/club/club31.webp", alt: "club Photo 6" },
    { src: "/media/club/club30.webp", alt: "club Photo 6" },
    { src: "/media/club/club31.webp", alt: "club Photo 6" },
    { src: "/media/club/club32.webp", alt: "club Photo 6" },
    { src: "/media/club/club33.webp", alt: "club Photo 6" },
    { src: "/media/club/club34.webp", alt: "club Photo 6" },
    { src: "/media/club/club35.webp", alt: "club Photo 6" },
    { src: "/media/club/club36.webp", alt: "club Photo 6" },
    { src: "/media/club/club37.webp", alt: "club Photo 6" },
    { src: "/media/club/club38.webp", alt: "club Photo 6" },
    { src: "/media/club/club39.webp", alt: "club Photo 6" },
    { src: "/media/club/club40.webp", alt: "club Photo 6" },
    { src: "/media/club/club41.webp", alt: "club Photo 6" },
    { src: "/media/club/club42.webp", alt: "club Photo 6" },
    { src: "/media/club/club43.webp", alt: "club Photo 6" },
    { src: "/media/club/club44.webp", alt: "club Photo 6" },


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