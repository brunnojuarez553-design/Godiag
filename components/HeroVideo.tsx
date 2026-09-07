"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      v.play().catch(() => {
        const resume = () => {
          v.play().catch(() => {});
          window.removeEventListener("pointerdown", resume);
          window.removeEventListener("touchstart", resume);
        };
        window.addEventListener("pointerdown", resume, { once: true });
        window.addEventListener("touchstart", resume, { once: true });
      });
    };

    const onVisibility = () => {
      if (document.visibilityState === "visible") tryPlay();
    };

    tryPlay();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      <div className={`hero-video-skeleton${ready ? " is-hidden" : ""}`} aria-hidden="true" />
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        onPlaying={() => setReady(true)}
      >
        <source
          src="https://res.cloudinary.com/dvvuwigmy/video/upload/f_mp4/v1788231305/InDown_jrusrr.mp4"
          type="video/mp4"
        />
        <source
          src="https://res.cloudinary.com/dvvuwigmy/video/upload/v1788231305/InDown_jrusrr.mov"
          type="video/quicktime"
        />
      </video>
    </>
  );
}
