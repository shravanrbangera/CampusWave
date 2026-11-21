import React from 'react';

/**
 * High-fidelity animated Vinyl Record with realistic microgrooves,
 * center label, reflective sheen, and retro tonearm needle.
 * Updated to CampusWave modern Coral & Teal palette.
 */
export const VinylRecord = ({ 
  isPlaying = false, 
  coverImage, 
  size = 280, 
  showArm = true, 
  albumTitle = "CampusWave Vinyl" 
}) => {
  return (
    <div 
      className="vinyl-wrapper"
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Warm ambient backlight glow */}
      <div 
        style={{
          position: 'absolute',
          width: '85%',
          height: '85%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 45, 58, 0.35) 0%, rgba(18, 60, 64, 0.35) 60%, transparent 80%)',
          filter: 'blur(26px)',
          zIndex: 0,
          opacity: isPlaying ? 1 : 0.45,
          transition: 'opacity 0.6s ease'
        }}
      />

      {/* Rotating Vinyl Disc */}
      <div 
        className={`spin-vinyl ${!isPlaying ? 'paused' : ''}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #202020 0%, #151515 35%, #0d0d0d 65%, #050505 100%)',
          boxShadow: '0 14px 40px rgba(0,0,0,0.45), inset 0 0 10px rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          border: '3px solid #1a1a1a',
          cursor: 'pointer'
        }}
      >
        {/* Concentric Vinyl Grooves SVG */}
        <svg 
          viewBox="0 0 300 300" 
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.28
          }}
        >
          <circle cx="150" cy="150" r="140" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="3 4" />
          <circle cx="150" cy="150" r="132" fill="none" stroke="#fff" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="124" fill="none" stroke="#fff" strokeWidth="0.75" strokeDasharray="6 2" />
          <circle cx="150" cy="150" r="116" fill="none" stroke="#fff" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="108" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="2 4" />
          <circle cx="150" cy="150" r="100" fill="none" stroke="#fff" strokeWidth="0.75" />
          <circle cx="150" cy="150" r="92" fill="none" stroke="#fff" strokeWidth="0.5" strokeDasharray="5 3" />
          <circle cx="150" cy="150" r="84" fill="none" stroke="#fff" strokeWidth="0.5" />
          <circle cx="150" cy="150" r="76" fill="none" stroke="#fff" strokeWidth="0.75" />
          <circle cx="150" cy="150" r="68" fill="none" stroke="#fff" strokeWidth="0.5" />
        </svg>

        {/* Reflective Vinyl Light Sheen */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.1) 35deg, transparent 70deg, transparent 180deg, rgba(255,255,255,0.1) 215deg, transparent 250deg)',
            pointerEvents: 'none'
          }}
        />

        {/* Center Label (Album Art + Branding) */}
        <div 
          style={{
            position: 'relative',
            width: '38%',
            height: '38%',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #1a1a1a',
            boxShadow: '0 0 12px rgba(0,0,0,0.8), inset 0 0 8px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-teal)'
          }}
        >
          {coverImage ? (
            <img 
              src={coverImage} 
              alt={albumTitle}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              textAlign: 'center',
              padding: '4px'
            }}>
              <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1px' }}>CAMPUS</span>
              <span style={{ fontSize: '8px', color: 'var(--color-coral)', fontWeight: 700 }}>WAVE 90.4</span>
            </div>
          )}

          {/* Center Spindle Hole */}
          <div 
            style={{
              position: 'absolute',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: '#0a0a0a',
              border: '2px solid rgba(255,255,255,0.35)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)'
            }}
          />
        </div>
      </div>

      {/* Retro Turntable Tonearm Needle */}
      {showArm && (
        <div 
          className={`tonearm ${isPlaying ? 'playing' : 'paused'}`}
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-15px',
            width: '80px',
            height: '140px',
            zIndex: 3,
            pointerEvents: 'none'
          }}
        >
          {/* Base Pivot */}
          <div 
            style={{
              position: 'absolute',
              top: '10px',
              right: '25px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e5e5e5 0%, #888888 50%, #404040 100%)',
              border: '2px solid #202020',
              boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
            }}
          />

          {/* Arm Stem */}
          <div 
            style={{
              position: 'absolute',
              top: '24px',
              right: '37px',
              width: '5px',
              height: '95px',
              background: 'linear-gradient(to right, #ffffff, #b5b5b5, #525252)',
              borderRadius: '3px',
              transformOrigin: 'top center',
              transform: 'rotate(-18deg)',
              boxShadow: '2px 4px 8px rgba(0,0,0,0.3)'
            }}
          />

          {/* Cartridge & Needle Head (Coral Red) */}
          <div 
            style={{
              position: 'absolute',
              top: '110px',
              right: '58px',
              width: '16px',
              height: '24px',
              background: 'linear-gradient(135deg, var(--color-coral) 0%, #B81520 100%)',
              borderRadius: '3px',
              transform: 'rotate(-12deg)',
              boxShadow: '0 2px 8px rgba(245, 45, 58, 0.45)',
              border: '1px solid #1a1a1a'
            }}
          />
        </div>
      )}
    </div>
  );
};
