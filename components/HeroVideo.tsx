"use client";
import { useEffect, useRef } from "react";

const HERO_VIDEO = "https://res.cloudinary.com/dvvuwigmy/video/upload/f_mp4/v1788231305/InDown_jrusrr.mp4";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playNow = () => {
      const promise = video.play();
      if (promise) promise.catch(() => {});
    };

    playNow();

    const onCanPlay = () => playNow();
    const onVisibility = () => {
      if (document.visibilityState === "visible") playNow();
    };

    video.addEventListener("canplay", onCanPlay);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="hero-video"
      src={HERO_VIDEO}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
    />
  );
}
