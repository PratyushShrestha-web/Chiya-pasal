"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Song } from "@/lib/types";

function fmt(t: number) {
  if (!isFinite(t)) return "0:00";

  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);

  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Player() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [curTime, setCurTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Remembers that the user has manually started playback.
  const userStartedRef = useRef(false);

  // Load songs from Supabase
  useEffect(() => {
    const supabase = createClient();

    supabase
      .from("songs")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error loading songs:", error);
          return;
        }

        if (data) {
          setSongs(data as Song[]);
        }
      });
  }, []);

  useEffect(() => {
    document.body.classList.toggle("playing", playing);

    return () => {
      document.body.classList.remove("playing");
    };
  }, [playing]);

  const current = songs[idx];

  function playPause() {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      userStartedRef.current = true;

      audio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.error("Could not play audio:", error);
        });
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function go(delta: number) {
    if (songs.length === 0) return;

    setIdx((i) => {
      return (i + delta + songs.length) % songs.length;
    });

    setCurTime(0);
    setDuration(0);
  }

  // When the song changes, automatically play the new song
  // if the user had already started the player.
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !current || !userStartedRef.current) {
      return;
    }

    function startNextSong() {
      const currentAudio = audioRef.current;

      if (!currentAudio) return;

      currentAudio
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.error("AUTO-NEXT PLAY FAILED:", error);
          console.error("Error name:", error?.name);
          console.error("Error message:", error?.message);
          console.error("Audio URL:", current.audio_url);
        });
    }

    if (audio.readyState >= 2) {
      startNextSong();
    } else {
      audio.addEventListener("canplay", startNextSong, {
        once: true,
      });
    }

    return () => {
      audio.removeEventListener("canplay", startNextSong);
    };
  }, [idx, current]);

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    const track = trackRef.current;

    if (!audio || !track || !duration) return;

    const rect = track.getBoundingClientRect();

    const pct = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );

    audio.currentTime = pct * duration;
  }

  // Spacebar = play/pause
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.code !== "Space") return;

      const target = e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      e.preventDefault();
      playPause();
    }

    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
    };
  });

  // No songs
  if (!current) {
    return (
      <div className="glass-player empty-player">
        <div className="empty-icon">♫</div>

        <div className="empty-title">
          The radio is quiet
        </div>

        <div className="empty-subtitle">
          No songs uploaded yet
        </div>
      </div>
    );
  }

  const progress = duration
    ? (curTime / duration) * 100
    : 0;

  return (
    <div className="glass-player">
      <audio
        key={current.audio_url}
        ref={audioRef}
        src={current.audio_url}
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          go(1);
        }}
        onError={(e) => {
          console.error(
            "Audio failed to load:",
            e.currentTarget.error
          );
          console.error(
            "Audio URL:",
            current.audio_url
          );
        }}
        onTimeUpdate={(e) =>
          setCurTime(e.currentTarget.currentTime)
        }
        onLoadedMetadata={(e) =>
          setDuration(e.currentTarget.duration)
        }
      />

      {/* Small glass status indicator */}
      <div className="player-top">
        <div className={`status-dot ${playing ? "active" : ""}`} />

        <span>
          {playing ? "NOW PLAYING" : "RADIO"}
        </span>
      </div>

      {/* Song information */}
      <div className="song-info">
        <div className="song-title">
          {current.title}
        </div>

        <div className="song-artist">
          {current.artist}
        </div>
      </div>

      {/* Time */}
      <div className="time-row">
        <span>{fmt(curTime)}</span>
        <span>{fmt(duration)}</span>
      </div>

      {/* Progress */}
      <div
        ref={trackRef}
        className="glass-progress"
        onClick={seek}
        role="slider"
        aria-label="Song progress"
      >
        <div
          className="glass-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      {/* Controls */}
      <div className="glass-controls">
        <button
          type="button"
          className="glass-btn secondary"
          aria-label="Previous song"
          onClick={() => go(-1)}
        >
          <span>‹‹</span>
        </button>

        <button
          type="button"
          className="glass-btn main"
          aria-label={playing ? "Pause" : "Play"}
          onClick={playPause}
        >
          {playing ? (
            <span className="pause-icon">Ⅱ</span>
          ) : (
            <span className="play-icon">▶</span>
          )}
        </button>

        <button
          type="button"
          className="glass-btn secondary"
          aria-label="Next song"
          onClick={() => go(1)}
        >
          <span>››</span>
        </button>
      </div>

      {/* Keyboard hint */}
      <div className="keyboard-hint">
        SPACE TO PLAY / PAUSE
      </div>
    </div>
  );
}
