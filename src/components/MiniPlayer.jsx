import React from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Heart
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';

export const MiniPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    prevTrack, 
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
  const isLiked = currentTrack ? likedTracks.includes(currentTrack.id) : false;

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
        backgroundColor: '#111111',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '2.5px solid #000000',
        zIndex: 95,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 -6px 0 rgba(0, 0, 0, 0.1)',
        transition: 'bottom var(--transition-fast)'
      }}
    >
      {/* Clickable Scrub Progress Bar along top edge */}
      <div 
        onClick={handleProgressClick}
        style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.12)',
          cursor: 'pointer',
          position: 'relative'
        }}
        title={`Scrub position: ${formatTime(currentTime)} / ${formatTime(duration)}`}
      >
        <div 
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, var(--color-teal), var(--color-coral))',
            position: 'relative',
            transition: 'width 0.15s linear'
          }}
        >
          <div 
            style={{
              position: 'absolute',
              right: '-4px',
              top: '-3px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-coral)',
              boxShadow: '0 0 8px rgba(245, 45, 58, 0.8)'
            }}
          />
        </div>
      </div>

      {/* Mini Player Inner Content */}
      <div 
        style={{
          flex: 1,
          maxWidth: '1320px',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--space-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-md)'
        }}
      >
        {/* Track Info (Click to open Full Player) */}
        <div 
          onClick={() => setIsFullPlayerOpen(true)}
          className="mini-player-track-info"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            minWidth: '180px',
            maxWidth: '360px',
            flex: '1'
          }}
          title="Click to expand full audio console"
        >
          <div 
            style={{
              position: 'relative',
              width: '46px',
              height: '46px',
              borderRadius: '10px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.35)',
              border: '1px solid rgba(255, 255, 255, 0.15)'
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
            {isPlaying && (
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div 
                  className="spin-vinyl"
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    border: '2px dashed var(--color-coral)'
                  }}
                />
              </div>
            )}
          </div>

          <div style={{ overflow: 'hidden' }}>
            <div 
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {currentTrack.title}
            </div>
            <div 
              style={{
                fontSize: '0.78rem',
                color: 'rgba(255, 255, 255, 0.7)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '1px'
              }}
            >
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentTrack.artist || currentTrack.host}
              </span>
              {currentTrack.type === 'live' && (
                <span 
                  className="editorial-badge"
                  style={{
                    padding: '1px 6px',
                    fontSize: '0.62rem',
                    background: 'var(--color-coral)',
                    color: '#fff',
                    border: 'none',
                    fontWeight: 800
                  }}
                >
                  LIVE
                </span>
              )}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLikeTrack(currentTrack.id);
            }}
            style={{
              padding: '6px',
              color: isLiked ? 'var(--color-coral)' : 'rgba(255, 255, 255, 0.5)',
              marginLeft: '4px',
              display: 'flex',
              alignItems: 'center'
            }}
            title={isLiked ? "Saved to Liked Songs" : "Like track"}
          >
            <Heart size={17} fill={isLiked ? "var(--color-coral)" : "none"} />
          </button>
        </div>

        {/* Center Controls */}
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={prevTrack}
              style={{ color: 'rgba(255, 255, 255, 0.7)', padding: '6px' }}
              className="secondary-control"
              title="Previous Track"
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={togglePlay}
              className="btn-brutal"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-orange)',
                color: '#FFFFFF',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={18} fill="#FFF" /> : <Play size={18} fill="#FFF" style={{ marginLeft: '2px' }} />}
            </button>

            <button
              onClick={nextTrack}
              style={{ color: 'rgba(255, 255, 255, 0.7)', padding: '6px' }}
              className="secondary-control"
              title="Next Track"
            >
              <SkipForward size={18} />
            </button>
          </div>

          {/* Time Display */}
          <div 
            className="mini-player-time"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(255, 255, 255, 0.5)'
            }}
          >
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Right Controls (Volume, Expand) */}
        <div 
          className="mini-player-controls"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: '160px',
            justifyContent: 'flex-end'
          }}
        >
          <div 
            className="secondary-control"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <button 
              onClick={toggleMute}
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                width: '70px',
                accentColor: 'var(--color-coral)',
                cursor: 'pointer'
              }}
            />
          </div>

          <button
            onClick={() => setIsFullPlayerOpen(true)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Expand Full Screen Console"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
};
