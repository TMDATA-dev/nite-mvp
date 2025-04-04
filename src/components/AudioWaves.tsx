"use client";

import React, { useEffect, useState } from "react";

interface AudioWavesProps {
  isPlaying: boolean;
}

export function AudioWaves({ isPlaying }: AudioWavesProps) {
  const [amplitudes, setAmplitudes] = useState<number[]>([]);
  const numberOfBars = 20;

  // Generar el patrón de ondas mientras está reproduciendo
  useEffect(() => {
    if (!isPlaying) {
      // Si no está reproduciendo, establecer todas las amplitudes a un valor bajo
      setAmplitudes(Array(numberOfBars).fill(0.3));
      return;
    }

    // Iniciar animación de amplitudes
    let frame: number;
    let lastUpdateTime = Date.now();
    const updateRate = 100; // ms entre actualizaciones

    const updateAmplitudes = () => {
      const now = Date.now();
      if (now - lastUpdateTime > updateRate) {
        lastUpdateTime = now;

        // Generar nuevas amplitudes para simular el efecto de ecualizador
        const newAmplitudes = Array.from({ length: numberOfBars }, () => {
          // Valores entre 0.2 y 1.0
          return 0.2 + Math.random() * 0.8;
        });

        // Suavizar transición entre valores anteriores y nuevos
        setAmplitudes((prev) => {
          if (prev.length === 0) return newAmplitudes;

          return prev.map((value, i) => {
            return value * 0.5 + newAmplitudes[i] * 0.5;
          });
        });
      }

      frame = requestAnimationFrame(updateAmplitudes);
    };

    // Iniciar el primer conjunto de amplitudes
    setAmplitudes(
      Array.from({ length: numberOfBars }, () => 0.2 + Math.random() * 0.8)
    );

    // Iniciar la animación
    frame = requestAnimationFrame(updateAmplitudes);

    // Limpieza
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [isPlaying, numberOfBars]);

  return (
    <div className="flex items-end justify-center h-12 w-full py-1">
      {amplitudes.map((amplitude, index) => (
        <div
          key={index}
          className="w-1 mx-[1px] rounded-full bg-gradient-to-t from-blue-900 to-blue-500 transition-all duration-100"
          style={{
            height: `${Math.max(3, amplitude * 36)}px`,
            opacity: isPlaying ? 0.9 : 0.4,
            transform: `scaleY(${isPlaying ? amplitude : 0.5})`,
          }}
        />
      ))}
    </div>
  );
}
