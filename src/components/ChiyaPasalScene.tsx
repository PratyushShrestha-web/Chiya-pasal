"use client";

import { useEffect, useState } from "react";

export default function ChiyaPasalScene() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kathmandu",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* Background image */}
      <img
        src="/images/chiya-pasal.png"
        alt="Nepali chiya pasal"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Slight dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18), transparent 35%, rgba(0,0,0,0.12))",
          pointerEvents: "none",
        }}
      />

      {/* Nepal time - top left */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "22px",

          padding: "7px 11px",

          borderRadius: "10px",

          background: "rgba(0, 0, 0, 0.30)",
          border: "1px solid rgba(255, 255, 255, 0.16)",

          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",

          color: "rgba(255, 255, 255, 0.92)",

          fontSize: "12px",
          fontWeight: 500,
          letterSpacing: "0.5px",

          textShadow: "0 1px 5px rgba(0, 0, 0, 0.5)",

          zIndex: 20,
        }}
      >
        {time} NPT
      </div>

      {/* Top right music navigation */}
      <div
        style={{
          position: "absolute",
          top: "18px",
          right: "22px",

          display: "flex",
          alignItems: "center",
          gap: "6px",

          padding: "6px",

          borderRadius: "14px",

          background: "rgba(0, 0, 0, 0.30)",
          border: "1px solid rgba(255, 255, 255, 0.16)",

          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",

          zIndex: 20,
        }}
      >
        {/* Spotify */}
        <a
          href="https://open.spotify.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spotify playlist"
          title="Spotify playlist"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",

            padding: "7px 9px",

            borderRadius: "9px",

            color: "rgba(255,255,255,0.88)",
            textDecoration: "none",

            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.3px",

            background: "rgba(255,255,255,0.06)",
          }}
        >
          {/* Spotify logo */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#1DB954"
            aria-hidden="true"
          >
            <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5Zm4.82 15.15a.87.87 0 0 1-1.2.29c-3.29-2.01-7.43-2.47-12.3-1.35a.87.87 0 1 1-.39-1.69c5.34-1.22 9.91-.7 13.6 1.55.4.24.53.77.29 1.2Zm1.62-3.6a1.09 1.09 0 0 1-1.5.36c-3.76-2.31-9.49-2.98-13.93-1.63a1.09 1.09 0 1 1-.63-2.08c5.08-1.54 11.4-.79 15.72 1.86.51.31.67.98.34 1.49Zm.14-3.75C14.08 6.66 7.27 6.42 3.27 7.63a1.31 1.31 0 0 1-.76-2.5c4.59-1.39 12.24-1.12 16.87 1.63a1.31 1.31 0 0 1-.8 2.54Z" />
          </svg>

          <span>Spotify</span>

          <span
            style={{
              fontSize: "12px",
              opacity: 0.65,
            }}
          >
            ↗
          </span>
        </a>

        {/* YouTube Music */}
        <a
          href="https://music.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube Music playlist"
          title="YouTube Music playlist"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",

            padding: "7px 9px",

            borderRadius: "9px",

            color: "rgba(255,255,255,0.88)",
            textDecoration: "none",

            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.3px",

            background: "rgba(255,255,255,0.06)",
          }}
        >
          {/* YouTube Music logo */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" fill="#FF0000" />

            <circle cx="12" cy="12" r="4" fill="white" />

            <path
              d="M12 5.2a6.8 6.8 0 0 1 5.89 3.4"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            <path
              d="M17.89 15.4A6.8 6.8 0 0 1 12 18.8"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
            />

            <path
              d="M8.11 15.4A6.8 6.8 0 0 1 6.11 12"
              stroke="white"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>

          <span>YouTube Music</span>

          <span
            style={{
              fontSize: "12px",
              opacity: 0.65,
            }}
          >
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}