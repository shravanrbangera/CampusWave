import React from 'react';

export const MarqueeTicker = ({ 
  text = "NMAMIT 90.4 MHZ STEREO • STUDENT AUDIO NETWORK • ZERO STATIC // PURE GROOVE • HOSTELLER INDIE • CODE & LOFI • INCRIEDA LIVE",
  bgColor = "#000000",
  textColor = "var(--color-amber)",
  reverse = false,
  speed = "normal"
}) => {
  const items = [
    "NMAMIT 90.4 MHZ STEREO BROADCAST",
    "HOSTELLER INDIE & MIDNIGHT LOFI",
    "ZERO STATIC // ALL ANALOG PUNCH",
    "INCRIEDA FESTIVAL MIXES LIVE",
    "VINTAGE SYNTHS & VINYL TAPES",
    "STUDENT DIGITAL RADIO NMAMIT NITTE",
    "STUDIO REQUEST CONSOLE ACTIVE"
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
        padding: '8px 0',
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
              style={{
                fontFamily: 'var(--font-radio)',
                fontSize: '1.05rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
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
              style={{
                fontFamily: 'var(--font-radio)',
                fontSize: '1.05rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
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

