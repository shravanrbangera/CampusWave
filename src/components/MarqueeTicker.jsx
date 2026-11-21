import React from 'react';

export const MarqueeTicker = ({ 
  text = "⚡ NMAMIT 90.4 MHZ • HARD BASS & CAMPUS DROPS • ZERO FADE // ALL PUNCH • HOSTELLER INDIE • CODE & LOFI • INCRIEDA BEATS • TUNE IN NOW",
  bgColor = "#000000",
  textColor = "var(--color-acid)",
  reverse = false,
  speed = "normal"
}) => {
  const items = [
    "⚡ 90.4 MHZ DIGITAL TRANSMISSION",
    "🎧 HOSTELLER INDIE & MIDNIGHT LOFI",
    "💥 ZERO FADE // ALL PUNCH",
    "🔥 INCRIEDA FESTIVAL MIXES LIVE",
    "🦖 RETRO GAME BOY SYNTHS",
    "📻 STUDENT RADIO NMAMIT NITTE",
    "⚡ DROP YOUR SONG REQUESTS TONIGHT"
  ];

  const trackClass = reverse 
    ? "marquee-track-reverse" 
    : speed === "fast" 
      ? "marquee-track-fast" 
      : "marquee-track";

  return (
    <div 
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderTop: '3px solid #000000',
        borderBottom: '3px solid #000000',
        overflow: 'hidden',
        padding: '12px 0',
        userSelect: 'none',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className={trackClass}>
        {/* Sequence 1 */}
        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
          {items.map((item, idx) => (
            <span 
              key={`seq1-${idx}`}
              className="font-black"
              style={{
                fontSize: '1.15rem',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                padding: '0 28px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span>{item}</span>
              <span style={{ opacity: 0.4 }}>/</span>
            </span>
          ))}
        </div>

        {/* Sequence 2 (Duplicate for seamless continuous loop) */}
        <div style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }} aria-hidden="true">
          {items.map((item, idx) => (
            <span 
              key={`seq2-${idx}`}
              className="font-black"
              style={{
                fontSize: '1.15rem',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                padding: '0 28px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span>{item}</span>
              <span style={{ opacity: 0.4 }}>/</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarqueeTicker;

