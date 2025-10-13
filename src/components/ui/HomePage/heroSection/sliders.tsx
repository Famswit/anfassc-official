"use client";

import { useState, useEffect } from "react";
import { Box } from "@mui/material";

import GradientOverlay from "./components/GradientOverlay";
import NavigationButtons from "./components/NavigationButton";
import DotIndicators from "./components/DotIndicators";
import ThumbnailStrip from "./components/ThumbnailStrip";
import SliderContainer from "./components/SliderContainer";
import { images } from "./components/SliderImages";

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === images.length - 1 ? 0 : prevIndex + 1;
      } else {
        return prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      }
    });
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: {
          xs: "60vh",
          sm: "70vh",
          md: "85vh",
          lg: "100vh",
        },
        overflow: "hidden",
        marginTop: { xs: "56px", md: "72px" },
      }}
    >
      <SliderContainer
        currentIndex={currentIndex}
        direction={direction}
        paginate={paginate}
        setIsAutoPlay={setIsAutoPlay}
        images={images}
      />

      <GradientOverlay />
      <NavigationButtons paginate={paginate} />
      <DotIndicators
        images={images}
        currentIndex={currentIndex}
        goToSlide={goToSlide}
      />
      <ThumbnailStrip
        images={images}
        currentIndex={currentIndex}
        goToSlide={goToSlide}
      />
    </Box>
  );
}
