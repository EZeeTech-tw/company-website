"use client";

import { useState, useEffect } from "react";

interface VideoCarouselProps {
  videos: string[];
  interval?: number;
}

export function VideoCarousel({ videos, interval = 5000 }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (videos.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, interval);

    return () => clearInterval(timer);
  }, [videos, interval]);

  if (videos.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      {videos.map((video, index) => (
        <video
          key={video}
          src={video}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-40" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
