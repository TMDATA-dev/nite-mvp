"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { AudioWaves } from "./AudioWaves";

interface AudioPlayerProps {
  audioUrl: string;
}

export function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col p-3 bg-gray-50 rounded-xl shadow-sm border border-gray-200 w-full max-w-md">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      <div className="flex items-center justify-between mb-2">
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center hover:bg-blue-800 transition"
        >
          {isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-1" />
          )}
        </button>

        <div className="flex-1 mx-4">
          <AudioWaves isPlaying={isPlaying} />
        </div>

        <button
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center hover:bg-gray-300 transition"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-600 font-mono mb-1">
        <span>{formatTime(progress)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <input
        type="range"
        min="0"
        max={duration || 100}
        value={progress}
        onChange={handleProgressChange}
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #1e3a8a 0%, #1e3a8a ${
            (progress / (duration || 1)) * 100
          }%, #e5e7eb ${(progress / (duration || 1)) * 100}%, #e5e7eb 100%)`,
        }}
      />
    </div>
  );
}
