import React from 'react';
import { 
  Play, 
  Pause, 
  Maximize2, 
  Heart,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';

export const MiniPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    currentTime, 
    duration, 
    volume, 
    setVolume, 
    isMuted, 
    toggleMute, 
    formatTime, 
    seekTo,
    setIsFullPlayerOpen 
  } = useAudio();

  const { likedTracks, toggleLikeTrack } = useAuth();
  const isLiked = currentTrack ? likedTracks?.includes(currentTrack.id) : false;

  if (!currentTrack) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(ratio * duration);
  };

  return (
    <aside 
      className="mini-player-container"
      aria-label="Audio Mini Player"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--mini-player-height)',
        backgroundColor: 'var(--bg-mini-player)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid var(--border-color)',
        zIndex: 95,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-lg)',
        transition: 'bottom var(--transition-fast), background-color var(--transition-normal), border-color var(--transition-normal)'
      }}
    >
      {/* Clickable Scrub Progress Bar along top edge */}
      <div 
        onClick={handleProgressClick}
        style={{
          width: '100%',
          height: '3px',
          backgroundColor: 'var(--border-color)',
          cursor: 'pointer',
          position: 'relative'
        }}
        title={`Scrub: ${formatTime(currentTime)} / ${formatTime(duration)}`}
      >
        <div 
          style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: 'var(--color-orange)',
            position: 'relative',
            transition: 'width 0.15s linear'
          }}
        />
      </div>

      {/* Mini Player Inner Content */}
      <div 
        style={{
          flex: 1,
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--space-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Track Info (Click to open Full Player) */}
        <div 
          onClick={() => setIsFullPlayerOpen(true)}
          className="mini-player-track-info"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            minWidth: 0,
            flex: '1'
          }}
          title="Click to expand audio player"
        >
          {/* Small Episode Artwork */}
          <div 
            style={{
              position: 'relative',
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              overflow: 'hidden',
              flexShrink: 0,
              backgroundColor: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-color)'
            }}
          >
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <div 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.2
              }}
            >
              {currentTrack.title}
            </div>
            <div 
              style={{
                fontSize: '0.74rem',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '2px'
              }}
            >
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentTrack.artist || currentTrack.host}
              </span>
              {currentTrack.type === 'live' && (
                <span 
                  style={{
                    padding: '1px 5px',
                    fontSize: '0.62rem',
                    backgroundColor: 'var(--color-orange)',
                    color: '#FFF',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    letterSpacing: '0.04em'
                  }}
                >
                  LIVE
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0
          }}
        >
          {/* Desktop-Only Volume Slider (Hidden on mobile) */}
          <div 
            className="desktop-only"
            style={{
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <button 
              onClick={toggleMute}
              style={{ color: 'var(--text-secondary)', padding: '4px' }}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                width: '65px',
                accentColor: 'var(--color-orange)',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* Like Button (Desktop & Tablet) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLikeTrack(currentTrack.id);
            }}
            className="desktop-only"
            style={{
              padding: '6px',
              color: isLiked ? 'var(--color-orange)' : 'var(--text-secondary)',
              alignItems: 'center'
            }}
            title={isLiked ? "Saved to Liked" : "Like track"}
          >
            <Heart size={18} fill={isLiked ? "var(--color-orange)" : "none"} />
          </button>

          {/* Play/Pause Button (Primary touch control) */}
          <button
            onClick={togglePlay}
            style={{
              width: '42px',
              height: '42px',
              minWidth: '42px',
              minHeight: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-orange)',
              color: '#FFFFFF',
              border: 'none',
              boxShadow: '0 2px 8px var(--color-orange-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
          >
            {isPlaying ? <Pause size={18} fill="#FFF" /> : <Play size={18} fill="#FFF" style={{ marginLeft: '2px' }} />}
          </button>

          {/* Expand Full Player Button */}
          <button
            onClick={() => setIsFullPlayerOpen(true)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-card-subtle)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
            title="Expand player"
            aria-label="Expand player"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
