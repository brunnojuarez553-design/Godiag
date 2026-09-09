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
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("autoplay", "");

    let retryTimer: number | null = null;

    const playNow = () => {
      if (document.visibilityState === "hidden") return;
      video.muted = true;
      const promise = video.play();
      if (promise) {
        promise.catch(() => {
          if (retryTimer) window.clearTimeout(retryTimer);
          retryTimer = window.setTimeout(() => {
            video.muted = true;
            video.play().catch(() => {});
          }, 250);
        });
      }
    };

    const onPause = () => {
      if (!video.ended && document.visibilityState === "visible") {
        if (retryTimer) window.clearTimeout(retryTimer);
        retryTimer = window.setTimeout(playNow, 120);
      }
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") playNow();
    };

    const onPageShow = () => playNow();

    playNow();
    requestAnimationFrame(playNow);

    video.addEventListener("loadedmetadata", playNow);
    video.addEventListener("loadeddata", playNow);
    video.addEventListener("canplay", playNow);
    video.addEventListener("canplaythrough", playNow);
    video.addEventListener("pause", onPause);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pageshow", onPageShow);

    return () => {
      if (retryTimer) window.clearTimeout(retryTimer);
      video.removeEventListener("loadedmetadata", playNow);
      video.removeEventListener("loadeddata", playNow);
      video.removeEventListener("canplay", playNow);
      video.removeEventListener("canplaythrough", playNow);
      video.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pageshow", onPageShow);
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
      controls={false}
      aria-hidden="true"
    />
  );
}
