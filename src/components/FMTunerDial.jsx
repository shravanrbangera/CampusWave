import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Play, Pause } from 'lucide-react';
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
      style={{
        background: 'var(--bg-card)',
        border: '1.5px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        padding: '16px 18px',
        boxShadow: 'var(--shadow-sm)',
        transition: 'all var(--transition-fast)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Header Row of Tuner Faceplate (Matching User Image 1) */}
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
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Radio size={15} color="var(--text-primary)" />
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

        {/* Live Indicator & Play Button (Matching User Image 1) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleTuneClick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: isLiveActive ? 'var(--color-orange-soft)' : 'var(--bg-secondary)',
              color: isLiveActive ? 'var(--color-orange)' : 'var(--text-secondary)',
              border: isLiveActive ? '1px solid var(--color-orange)' : '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <span 
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isLiveActive ? 'var(--color-orange)' : '#F15A24',
                animation: isLiveActive ? 'pulse 1.2s infinite' : 'none'
              }} 
            />
            {isLiveActive ? "BROADCASTING" : "TAP TO TUNE"}
          </button>

          <button
            onClick={handleTuneClick}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: isLiveActive ? 'var(--color-orange)' : '#123D2C',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
              cursor: 'pointer',
              border: 'none',
              transition: 'transform var(--transition-fast)'
            }}
            title={isLiveActive ? "Pause broadcast" : "Tune into 90.4 FM"}
            aria-label={isLiveActive ? "Pause" : "Play"}
          >
            {isLiveActive ? (
              <Pause size={17} fill="#FFFFFF" />
            ) : (
              <Play size={17} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
            )}
          </button>
        </div>
      </div>

      {/* Retro Dial Ruler (Exact match to User Image 1) */}
      <div 
        onClick={handleTuneClick}
        style={{
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px 10px',
          border: '1px solid var(--border-color)',
          position: 'relative',
          cursor: 'pointer'
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
                  fontSize: item.active ? '0.82rem' : '0.7rem',
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
                    fontSize: '0.6rem',
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

      {/* Live Track Info Strip (Merged so this is the complete player) */}
      <div 
        style={{
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 10px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
          <img 
            src={mockLiveShow.cover} 
            alt={mockLiveShow.title} 
            style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} 
          />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {mockLiveShow.title}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Hosted by {mockLiveShow.rj}
            </div>
          </div>
        </div>

        {isLiveActive ? (
          <span className="sound-equalizer" style={{ height: '16px', gap: '2.5px', flexShrink: 0 }}>
            <span className="sound-bar" style={{ backgroundColor: 'var(--color-orange)', width: '2.5px' }} />
            <span className="sound-bar" style={{ backgroundColor: 'var(--color-orange)', width: '2.5px' }} />
            <span className="sound-bar" style={{ backgroundColor: 'var(--color-orange)', width: '2.5px' }} />
            <span className="sound-bar" style={{ backgroundColor: 'var(--color-orange)', width: '2.5px' }} />
          </span>
        ) : (
          <Link
            to="/live"
            style={{
              fontSize: '0.74rem',
              color: 'var(--color-orange)',
              fontWeight: 700,
              textDecoration: 'none',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              flexShrink: 0
            }}
          >
            Live Studio
          </Link>
        )}
      </div>

      {/* Tuner Subtext (Exact match to User Image 1) */}
      <div 
        style={{
          marginTop: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.7rem',
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
