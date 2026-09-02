"use client";
import { useEffect, useRef, useState } from "react";

export default function HeroVideo() {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Fuerza el play apenas se monta, sin esperar interacción del usuario.
    const tryPlay = () => {
      v.play().catch(() => {
        // Si el navegador bloquea el autoplay, reintenta en la primera interacción.
        const resume = () => {
          v.play().catch(() => {});
          window.removeEventListener("pointerdown", resume);
          window.removeEventListener("touchstart", resume);
        };
        window.addEventListener("pointerdown", resume, { once: true });
        window.addEventListener("touchstart", resume, { once: true });
      });
    };
    tryPlay();
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") tryPlay();
    });
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
