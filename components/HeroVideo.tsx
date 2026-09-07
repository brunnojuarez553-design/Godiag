"use client";
import { useEffect, useRef, useState } from "react";

const poster =
  "https://res.cloudinary.com/dvvuwigmy/video/upload/so_0,f_jpg,q_auto:good,w_1600/v1788231305/InDown_jrusrr.jpg";

export default function HeroVideo() {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const tryPlay = () => {
      v.play().catch(() => {
        const resume = () => v.play().catch(() => {});
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
        preload="metadata"
        poster={poster}
        aria-hidden="true"
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
        onPlaying={() => setReady(true)}
      >
        <source
          media="(max-width: 700px)"
          src="https://res.cloudinary.com/dvvuwigmy/video/upload/f_mp4,q_auto:good,vc_auto,w_900/v1788231305/InDown_jrusrr.mp4"
          type="video/mp4"
        />
        <source
          src="https://res.cloudinary.com/dvvuwigmy/video/upload/f_mp4,q_auto:good,vc_auto,w_1920/v1788231305/InDown_jrusrr.mp4"
          type="video/mp4"
        />
      </video>
    </>
  );
}
