import React from 'react';
import { useAudio } from '../context/AudioContext';

/**
 * Interactive Audio Waveform Visualizer
 * Reacts dynamically to real-time audio analysis from Web Audio API.
 * Uses the new Coral Red accent.
 */
export const AudioWaveform = ({ 
  barsCount = 28, 
  height = 48, 
  interactive = true,
  barColor = "var(--color-coral)",
  activeBarColor = "#F52D3A",
  inactiveBarColor = "rgba(245, 45, 58, 0.22)"
}) => {
  const { isPlaying, currentTime, duration, seekTo, audioData } = useAudio();

  const handleSeek = (e) => {
    if (!interactive || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(percentage * duration);
  };

  const progressFraction = duration > 0 ? currentTime / duration : 0;
  const activeBarsThreshold = Math.floor(progressFraction * barsCount);

  return (
    <div 
      className="waveform-container"
      onClick={handleSeek}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: `${height}px`,
        width: '100%',
        gap: '3px',
        cursor: interactive ? 'pointer' : 'default',
        padding: '4px 0'
      }}
      title={interactive ? "Click along waveform to scrub" : "Audio frequency modulation"}
    >
      {Array.from({ length: barsCount }).map((_, index) => {
        const dynamicVal = audioData[index % audioData.length] || 20;
        const waveScale = isPlaying ? dynamicVal : (Math.sin(index * 0.4) * 20 + 25);
        const barHeight = Math.max(12, Math.min(100, waveScale));
        const isActive = index <= activeBarsThreshold;

        return (
          <div
            key={index}
            style={{
              flex: 1,
              height: `${barHeight}%`,
              borderRadius: '999px',
              backgroundColor: isActive 
                ? (isPlaying ? activeBarColor : 'var(--color-coral)') 
                : inactiveBarColor,
              boxShadow: (isActive && isPlaying) ? '0 0 8px rgba(245, 45, 58, 0.45)' : 'none',
              transition: isPlaying ? 'height 0.08s ease, background-color 0.15s ease' : 'height 0.3s ease',
              minWidth: '2px'
            }}
          />
        );
      })}
    </div>
  );
};
