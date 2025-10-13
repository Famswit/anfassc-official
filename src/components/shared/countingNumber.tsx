"use client";

import { useState, useEffect } from "react";
import { Typography } from "@mui/material";

interface CountingNumberProps {
  end: number;
  duration?: number;
  suffix?: string;
  variant?: "h4" | "h5" | "h6";
  color?: string;
  fontWeight?: string | number;
}

const CountingNumber = ({
  end,
  duration = 2000,
  suffix = "",
  variant = "h4",
  color = "primary",
  fontWeight = "bold",
}: CountingNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // counting animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  return (
    <Typography variant={variant} color={color} fontWeight={fontWeight}>
      {count.toLocaleString()}
      {suffix}
    </Typography>
  );
};

export default CountingNumber;
