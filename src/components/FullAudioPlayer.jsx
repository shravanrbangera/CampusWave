import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Shuffle, 
  Repeat, 
  Share2, 
  Heart, 
  ListMusic, 
  Sparkles, 
  Disc3,
  Radio
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { VinylRecord } from './VinylRecord';
import { AudioWaveform } from './AudioWaveform';

export const FullAudioPlayer = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    nextTrack, 
    prevTrack, 
    currentTime, 
    duration, 
    formatTime, 
    seekTo,
    isFullPlayerOpen,
    setIsFullPlayerOpen,
    playbackSpeed,
    setPlaybackSpeed,
    isLooping,
    setIsLooping,
    isShuffling,
    setIsShuffling,
    queue,
    playTrack
  } = useAudio();

  const { likedTracks, toggleLikeTrack } = useAuth();
  const [activeTab, setActiveTab] = useState('player'); // 'player' | 'queue' | 'ai'
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullPlayerOpen) {
        setIsFullPlayerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullPlayerOpen, setIsFullPlayerOpen]);

  if (!isFullPlayerOpen || !currentTrack) return null;

  const isLiked = likedTracks.includes(currentTrack.id);

  const handleSeekChange = (e) => {
    seekTo(parseFloat(e.target.value));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `/live`);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  return (
    <div 
      className="full-player-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="CampusWave Immersive Audio Console"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: 'rgba(18, 22, 24, 0.96)',
        backdropFilter: 'blur(26px)',
        WebkitBackdropFilter: 'blur(26px)',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto'
      }}
    >
      {/* Top Header Bar */}
      <div 
        className="full-player-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-md) var(--space-xl)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio size={18} color="var(--color-coral)" />
          <span 
            className="full-player-header-title"
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.78rem', 
              color: 'rgba(255, 255, 255, 0.7)',
              letterSpacing: '0.05em' 
            }}
          >
            STUDIO PLAYBACK CONSOLE • 90.4 FM
          </span>
        </div>

        {/* Tab Switcher */}
        <div 
          className="full-player-tabs"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-full)',
            padding: '3px',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <button
            onClick={() => setActiveTab('player')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: activeTab === 'player' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
              backgroundColor: activeTab === 'player' ? 'var(--color-coral)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Disc3 size={15} />
            Player
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: activeTab === 'queue' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
              backgroundColor: activeTab === 'queue' ? 'var(--color-coral)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ListMusic size={15} />
            Queue ({queue.length})
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            style={{
              padding: '6px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.84rem',
              fontWeight: 700,
              color: activeTab === 'ai' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
              backgroundColor: activeTab === 'ai' ? 'var(--color-coral)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={15} />
            AI Takeaways
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsFullPlayerOpen(false)}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Minimize Console (Esc)"
          aria-label="Close"
        >
          <X size={19} />
        </button>
      </div>

      {/* Main Container Content */}
      <div 
        className="full-player-body"
        style={{
          flex: 1,
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          padding: 'var(--space-xl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {activeTab === 'player' && (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(280px, 380px) 1fr',
              gap: 'var(--space-2xl)',
              alignItems: 'center'
            }}
            className="hero-split-grid full-player-grid"
          >
            {/* Left: Vinyl Record Showcase */}
            <div 
              className="full-player-vinyl-box"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <VinylRecord 
                isPlaying={isPlaying} 
                coverImage={currentTrack.cover} 
                size={320} 
                albumTitle={currentTrack.title}
                showArm={true}
              />
              <div 
                style={{
                  marginTop: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span className="editorial-badge" style={{ backgroundColor: 'var(--color-coral-soft)', color: 'var(--color-coral)', border: '1px solid rgba(245, 45, 58, 0.3)' }}>
                  {currentTrack.type === 'live' ? 'LIVE TRANSMISSION' : currentTrack.category || 'STUDENT AUDIO'}
                </span>
                <span 
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}
                >
                  90.4 MHZ DIGITAL
                </span>
              </div>
            </div>

            {/* Right: Audio Info, Waveform & Controls */}
            <div className="full-player-controls-box" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
              <div>
                <h2 
                  style={{
                    fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)',
                    marginBottom: '8px',
                    lineHeight: 1.2,
                    color: '#FFFFFF'
                  }}
                >
                  {currentTrack.title}
                </h2>
                <p 
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--color-amber)',
                    fontWeight: 700
                  }}
                >
                  {currentTrack.artist || currentTrack.host}
                </p>
                <p 
                  style={{
                    fontSize: '0.88rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginTop: '4px'
                  }}
                >
                  {currentTrack.showName} • {currentTrack.badge}
                </p>
              </div>

              {/* Dynamic Waveform Visualizer */}
              <div 
                className="full-player-waveform-box"
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: '8px'
                  }}
                >
                  <span>FREQUENCY MODULATION</span>
                  <span>{isPlaying ? 'LIVE SPECTRUM' : 'MUTED / PAUSED'}</span>
                </div>
                <AudioWaveform height={60} barsCount={32} />
              </div>

              {/* Seek Slider & Timestamps */}
              <div>
                <input 
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeekChange}
                  style={{
                    width: '100%',
                    height: '6px',
                    accentColor: 'var(--color-coral)',
                    cursor: 'pointer'
                  }}
                />
                <div 
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    marginTop: '6px'
                  }}
                >
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Control Buttons */}
              <div 
                className="full-player-controls-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                {/* Secondary toggles (Shuffle, Like) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    onClick={setIsShuffling}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isShuffling ? 'var(--color-coral-soft)' : 'rgba(255, 255, 255, 0.08)',
                      color: isShuffling ? 'var(--color-coral)' : 'rgba(255, 255, 255, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isShuffling ? '1px solid var(--color-coral)' : '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                    title="Toggle Shuffle"
                  >
                    <Shuffle size={17} />
                  </button>

                  <button
                    onClick={() => toggleLikeTrack(currentTrack.id)}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isLiked ? 'var(--color-coral-soft)' : 'rgba(255, 255, 255, 0.08)',
                      color: isLiked ? 'var(--color-coral)' : 'rgba(255, 255, 255, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isLiked ? '1px solid var(--color-coral)' : '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                    title={isLiked ? "Saved to favorites" : "Add to favorites"}
                  >
                    <Heart size={17} fill={isLiked ? "var(--color-coral)" : "none"} />
                  </button>
                </div>

                {/* Core Playback Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                  <button
                    onClick={prevTrack}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Previous Track"
                  >
                    <SkipBack size={20} />
                  </button>

                  <button
                    onClick={togglePlay}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-coral)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-coral)',
                      transition: 'transform var(--transition-fast)'
                    }}
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause size={28} fill="#FFFFFF" /> : <Play size={28} fill="#FFFFFF" style={{ marginLeft: '3px' }} />}
                  </button>

                  <button
                    onClick={nextTrack}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Next Track"
                  >
                    <SkipForward size={20} />
                  </button>
                </div>

                {/* Speed, Loop, Share */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={cycleSpeed}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: playbackSpeed > 1 ? 'var(--color-coral)' : 'rgba(255, 255, 255, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Change Playback Speed"
                  >
                    {playbackSpeed}x
                  </button>

                  <button
                    onClick={setIsLooping}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: isLooping ? 'var(--color-coral-soft)' : 'rgba(255, 255, 255, 0.08)',
                      color: isLooping ? 'var(--color-coral)' : 'rgba(255, 255, 255, 0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isLooping ? '1px solid var(--color-coral)' : '1px solid rgba(255, 255, 255, 0.12)'
                    }}
                    title="Toggle Loop"
                  >
                    <Repeat size={17} />
                  </button>

                  <button
                    onClick={handleShare}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    title="Share Broadcast Link"
                  >
                    <Share2 size={17} />
                  </button>
                </div>
              </div>

              {copyFeedback && (
                <div 
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    border: '1px solid #22c55e',
                    color: '#22c55e',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.84rem',
                    textAlign: 'center'
                  }}
                >
                  ✓ Broadcast link copied to clipboard!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Queue Tab */}
        {activeTab === 'queue' && (
          <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', color: '#FFFFFF' }}>
              <ListMusic color="var(--color-coral)" />
              Next Up in Session ({queue.length} Tracks)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '55vh', overflowY: 'auto' }}>
              {queue.map((item, index) => {
                const isCurrent = item.id === currentTrack.id;
                return (
                  <div
                    key={item.id + index}
                    onClick={() => playTrack(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 18px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isCurrent ? 'rgba(245, 45, 58, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                      border: isCurrent ? '1.5px solid var(--color-coral)' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: isCurrent ? 'var(--color-coral)' : 'rgba(255, 255, 255, 0.4)', width: '20px' }}>
                        {index + 1}
                      </span>
                      <img 
                        src={item.cover} 
                        alt={item.title} 
                        style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.92rem', color: isCurrent ? 'var(--color-coral)' : '#FFFFFF' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                          {item.artist || item.host} • {item.category}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.5)' }}>
                        {item.duration}
                      </span>
                      {isCurrent && isPlaying ? (
                        <Pause size={17} color="var(--color-coral)" />
                      ) : (
                        <Play size={17} color="rgba(255, 255, 255, 0.5)" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Takeaways Tab */}
        {activeTab === 'ai' && (
          <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '16px'
              }}
            >
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--color-coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sparkles size={18} color="#FFFFFF" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#FFFFFF' }}>CampusWave AI Synthesis</h3>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)' }}>Automated episode breakdown for NMAMIT students</span>
              </div>
            </div>

            <div 
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                lineHeight: 1.7
              }}
            >
              <h4 style={{ color: 'var(--color-amber)', marginBottom: '8px', fontSize: '1.05rem' }}>Executive Summary</h4>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', marginBottom: '20px', fontSize: '0.92rem' }}>
                {currentTrack.description || "A student-led broadcast celebrating original college culture, technical workshops, and campus community discussions at NMAMIT Nitte."}
              </p>

              <h4 style={{ color: '#FFFFFF', marginBottom: '12px', fontSize: '1rem' }}>Key Takeaways for Students</h4>
              <ul style={{ paddingLeft: '20px', color: 'rgba(255, 255, 255, 0.75)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                <li>Listen live on 90.4 FM Digital or via the web companion anywhere on campus Wi-Fi.</li>
                <li>Submit your own band recordings, lo-fi beats, or podcast proposals to the Media Cell.</li>
                <li>Bookmark this episode in your personal Library to access offline notes anytime.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
