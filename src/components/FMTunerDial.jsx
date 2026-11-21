import React from 'react';
import { Radio, Play, Pause, Volume2 } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { mockLiveShow } from '../data/music';

export const FMTunerDial = () => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const isLiveActive = currentTrack?.id === mockLiveShow.id && isPlaying;

  const handleTuneClick = () => {
    if (currentTrack?.id === mockLiveShow.id) {
      togglePlay();
    } else {
      playTrack(mockLiveShow);
    }
  };

  const frequencies = [
    { freq: '88.0', label: '' },
    { freq: '90.4', label: 'CAMPUSWAVE', active: true },
    { freq: '94.0', label: '' },
    { freq: '98.5', label: '' },
    { freq: '104.0', label: '' },
    { freq: '108.0', label: '' }
  ];

  return (
    <div 
      className="retro-fm-tuner-card"
      onClick={handleTuneClick}
      role="button"
      tabIndex={0}
      title="Click to tune in to 90.4 FM"
      style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        padding: '16px 20px',
        boxShadow: 'var(--shadow-sm)',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Header Row of Tuner Faceplate */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div 
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              backgroundColor: isLiveActive ? 'var(--color-orange)' : 'var(--bg-secondary)',
              color: isLiveActive ? '#FFFFFF' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
          >
            <Radio size={15} />
          </div>
          <div>
            <span 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'var(--text-primary)',
                textTransform: 'uppercase'
              }}
            >
              FM STEREO RECEIVER
            </span>
            <span 
              style={{
                marginLeft: '8px',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-orange)',
                fontWeight: 800,
                backgroundColor: 'var(--color-orange-soft)',
                padding: '1px 6px',
                borderRadius: '4px'
              }}
            >
              90.4 MHZ
            </span>
          </div>
        </div>

        {/* Live Indicator / Tune Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '0.68rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isLiveActive ? 'var(--color-orange)' : 'var(--bg-secondary)',
              color: isLiveActive ? '#FFF' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            <span 
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isLiveActive ? '#FFF' : 'var(--color-orange)',
                animation: isLiveActive ? 'pulse 1.2s infinite' : 'none'
              }} 
            />
            {isLiveActive ? "BROADCASTING" : "TAP TO TUNE"}
          </span>

          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: isLiveActive ? 'var(--color-orange)' : 'var(--color-forest)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {isLiveActive ? <Pause size={14} fill="#FFF" /> : <Play size={14} fill="#FFF" style={{ marginLeft: '2px' }} />}
          </div>
        </div>
      </div>

      {/* Retro Dial Ruler (Inspired by iPod & 70s Hi-Fi Radio) */}
      <div 
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px 10px',
          border: '1px solid var(--border-color)',
          position: 'relative'
        }}
      >
        {/* Frequency Marks Track */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            paddingBottom: '6px'
          }}
        >
          {frequencies.map((item, idx) => (
            <div 
              key={idx} 
              style={{ 
                textAlign: 'center',
                position: 'relative',
                flex: item.active ? 1.4 : 1
              }}
            >
              <div 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: item.active ? '0.78rem' : '0.68rem',
                  fontWeight: item.active ? 800 : 600,
                  color: item.active ? 'var(--color-orange)' : 'var(--text-muted)',
                  letterSpacing: '0.02em'
                }}
              >
                {item.freq}
              </div>
              {item.label && (
                <div 
                  style={{
                    fontSize: '0.58rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    color: 'var(--color-orange)',
                    letterSpacing: '0.04em',
                    marginTop: '1px'
                  }}
                >
                  {item.label}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Vintage Radio Tick Marks with Glowing Orange Tuning Needle */}
        <div 
          style={{
            height: '14px',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '3px'
          }}
        >
          {Array.from({ length: 33 }).map((_, i) => {
            const isTarget = i === 7; // Aligned near 90.4 MHz
            const isMajor = i % 5 === 0;
            return (
              <div
                key={i}
                style={{
                  width: isTarget ? '3px' : '1px',
                  height: isTarget ? '16px' : (isMajor ? '10px' : '5px'),
                  backgroundColor: isTarget ? 'var(--color-orange)' : 'var(--text-muted)',
                  opacity: isTarget ? 1 : 0.45,
                  borderRadius: '1px',
                  boxShadow: isTarget ? '0 0 8px var(--color-orange)' : 'none',
                  transform: isTarget ? 'translateY(-2px)' : 'none'
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Tuner Subtext */}
      <div 
        style={{
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          color: 'var(--text-secondary)',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <span>STATUS: {isLiveActive ? 'LIVE TRANSMITTING (320 KBPS)' : 'STATION TUNED • READY'}</span>
        <span style={{ color: 'var(--color-orange)', fontWeight: 700 }}>NMAMIT CAMPUS</span>
      </div>
    </div>
  );
};
