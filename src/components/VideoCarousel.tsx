"use client";

import { useState, useRef, useEffect } from "react";

interface VideoCarouselProps {
  videos: string[];
}

export function VideoCarousel({ videos }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, videos.length);
  }, [videos.length]);

  useEffect(() => {
    // Play the current video when index changes
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.currentTime = 0;
      currentVideo.play().catch((err) => {
        console.error("Failed to play video:", err);
      });
    }
  }, [currentIndex]);

  const handleVideoEnded = () => {
    if (videos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  if (videos.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full">
      {videos.map((video, index) => (
        <video
          key={video}
          ref={(el) => {
            videoRefs.current[index] = el;
          }}
          src={video}
          autoPlay={index === 0}
          muted
          playsInline
          onEnded={handleVideoEnded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-40" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
