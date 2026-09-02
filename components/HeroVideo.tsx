"use client";
import { useState } from "react";

export default function HeroVideo() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <div className={`hero-video-skeleton${ready ? " is-hidden" : ""}`} aria-hidden="true" />
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        onLoadedData={() => setReady(true)}
        onCanPlay={() => setReady(true)}
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
