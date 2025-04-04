"use client";

import React, { useState } from "react";
import { Headphones, X } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";

interface AudioMessageProps {
  url: string;
}

export function AudioMessage({ url }: AudioMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!url) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-2">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 rounded-xl hover:from-blue-200 hover:to-blue-100 transition-colors shadow-sm hover:shadow transform hover:scale-[1.02] transition-all"
        >
          <div className="flex-shrink-0 rounded-full bg-blue-900/10 p-1 mr-1">
            <Headphones size={18} className="text-blue-800" />
          </div>
          <span className="font-medium">Reproducir mensaje de audio</span>
          <div className="ml-2 flex space-x-0.5">
            {[1, 2, 3].map((bar) => (
              <div
                key={bar}
                className="w-0.5 bg-blue-600 rounded-full animate-pulse"
                style={{
                  height: `${8 + bar * 3}px`,
                  animationDelay: `${bar * 0.1}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </button>
      ) : (
        <div className="transition-all duration-300 ease-in-out animate-fadeIn">
          <div className="flex flex-col space-y-2 bg-gradient-to-br from-blue-50 to-white p-3 rounded-xl shadow-sm border border-blue-100">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-sm font-medium text-blue-900">
                Mensaje de audio
              </h4>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <AudioPlayer audioUrl={url} />
          </div>
        </div>
      )}
    </div>
  );
}
