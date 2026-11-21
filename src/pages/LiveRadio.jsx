import React, { useState } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Share2, 
  Users, 
  Clock, 
  MessageSquare, 
  Send
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { mockLiveShow } from '../data/music';
import { mockRJs } from '../data/rjs';
import { VinylRecord } from '../components/VinylRecord';
import { AudioWaveform } from '../components/AudioWaveform';
import { LiquidEther } from '../components/LiquidEther';

export const LiveRadio = () => {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    playTrack, 
    volume, 
    setVolume, 
    isMuted, 
    toggleMute 
  } = useAudio();

  const { user } = useAuth();

  const [shoutoutText, setShoutoutText] = useState('');
  const [shoutouts, setShoutouts] = useState([
    { id: 1, sender: "Varun (Kaveri 204)", text: "Huge shoutout to the robotics crew testing the rover!", time: "2m ago" },
    { id: 2, sender: "Sneha (Netravati Block B)", text: "Play some Prateek Kuhad or indie acoustics please!", time: "5m ago" },
    { id: 3, sender: "Karthik (Day Scholar)", text: "Listening on the bus back to Udupi. Sound is crystal clear!", time: "8m ago" }
  ]);
  const [toastMsg, setToastMsg] = useState('');
  const [streamQuality, setStreamQuality] = useState('320k'); // '320k' | '128k'

  const isLivePlaying = currentTrack?.id === mockLiveShow.id && isPlaying;
  const currentRJ = mockRJs[0];

  const handleToggleBroadcast = () => {
    if (currentTrack?.id === mockLiveShow.id) {
      togglePlay();
    } else {
      playTrack(mockLiveShow);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setToastMsg("Live broadcast stream URL copied to clipboard!");
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleSendShoutout = (e) => {
    e.preventDefault();
    if (!shoutoutText.trim()) return;

    const newShoutout = {
      id: Date.now(),
      sender: `${user?.name || "Anonymous"} (${user?.hostel ? user.hostel.split(' ')[0] : 'Campus'})`,
      text: shoutoutText.trim(),
      time: "Just now"
    };

    setShoutouts([newShoutout, ...shoutouts]);
    setShoutoutText('');
    setToastMsg("Shoutout transmitted to RJ Ananya's live studio dashboard!");
    setTimeout(() => setToastMsg(''), 3500);
  };

  return (
    <div 
      className="live-radio-page"
      style={{
        backgroundColor: 'var(--color-teal-dark)',
        backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
        backgroundSize: '34px 34px',
        backgroundPosition: '-1px -1px',
        backgroundAttachment: 'fixed',
        minHeight: 'calc(100vh - var(--navbar-height))',
        color: 'var(--color-cream)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Studio Ambient Glows */}
      <div 
        style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '480px',
          height: '480px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 148, 26, 0.22) 0%, rgba(16, 56, 61, 0.4) 60%, transparent 80%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="page-wrapper" style={{ position: 'relative', zIndex: 1, padding: 'var(--space-2xl) var(--space-lg)' }}>
        {/* Top Disclaimer Banner */}
        <div 
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 148, 26, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 16px',
            marginBottom: 'var(--space-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
            fontSize: '0.82rem',
            color: 'var(--color-cream)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge-live-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ fontWeight: 700 }}>STUDIO TRANSMISSION ACTIVE</span>
            <span>•</span>
            <span style={{ color: 'var(--color-amber)' }}>Simulated Live Radio Interface for NMAMIT Nitte</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.78rem', color: 'rgba(245, 235, 221, 0.8)' }}>Bitrate:</span>
            <button
              onClick={() => setStreamQuality(streamQuality === '320k' ? '128k' : '320k')}
              style={{
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgba(245, 45, 58, 0.18)',
                color: 'var(--color-coral)',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                border: '1px solid rgba(245, 45, 58, 0.3)'
              }}
            >
              {streamQuality === '320k' ? '320 kbps Studio HD' : '128 kbps Data Saver'}
            </button>
          </div>
        </div>

        {toastMsg && (
          <div 
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid #22c55e',
              color: '#22c55e',
              padding: '12px 20px',
              borderRadius: 'var(--radius-md)',
              marginBottom: '20px',
              textAlign: 'center',
              fontWeight: 600
            }}
          >
            ✓ {toastMsg}
          </div>
        )}

        {/* Main Flagship Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 'var(--space-2xl)',
            alignItems: 'start'
          }}
          className="hero-split-grid"
        >
          {/* Left: Turntable, Large Controls & Frequency Analyzer */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {/* Turntable Deck & Artwork */}
            <div 
              style={{
                background: 'linear-gradient(145deg, rgba(16, 56, 61, 0.85) 0%, rgba(14, 19, 21, 0.98) 100%)',
                padding: 'var(--space-2xl)',
                borderRadius: '24px',
                border: '3px solid #000000',
                boxShadow: '6px 6px 0 #000000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Interactive LiquidEther Studio Visualizer Background */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                  opacity: 0.55,
                  pointerEvents: 'auto'
                }}
              >
                <LiquidEther 
                  colors={['#F52D3A', '#e8ff00', '#00f0ff', '#123C40']}
                  mouseForce={28}
                  cursorSize={100}
                  autoDemo={true}
                  autoSpeed={0.45}
                  resolution={0.45}
                />
              </div>

              {/* Top Station Tags */}
              <div 
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '18px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backgroundColor: isLivePlaying ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-full)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em'
                    }}
                  >
                    <span className={isLivePlaying ? "badge-live-pulse" : ""} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                    {isLivePlaying ? "LIVE ON AIR" : "STUDIO PAUSED"}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--color-amber)', fontWeight: 700 }}>
                    90.4 MHZ DIGITAL
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--color-cream)', opacity: 0.85 }}>
                  <Users size={14} color="var(--color-amber)" />
                  <span>342 Listening Live</span>
                </div>
              </div>

              {/* High-Fidelity Vinyl Record */}
              <div style={{ margin: '8px 0 20px', position: 'relative', zIndex: 2 }}>
                <VinylRecord 
                  isPlaying={isLivePlaying} 
                  coverImage={mockLiveShow.cover} 
                  size={280} 
                  albumTitle={mockLiveShow.title}
                  showArm={true}
                />
              </div>

              {/* Show Titles */}
              <div style={{ textAlign: 'center', width: '100%', marginBottom: '18px', position: 'relative', zIndex: 2 }}>
                <h1 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)', color: 'var(--color-cream)', marginBottom: '6px', lineHeight: 1.2 }}>
                  {mockLiveShow.title}
                </h1>
                <p style={{ color: 'var(--color-coral)', fontSize: '1rem', fontWeight: 600 }}>
                  Hosted by {mockLiveShow.rj}
                </p>
                <p style={{ color: 'rgba(245, 235, 221, 0.75)', fontSize: '0.88rem', marginTop: '6px', maxWidth: '480px', margin: '6px auto 0' }}>
                  {mockLiveShow.description}
                </p>
              </div>

              {/* Real Audio Waveform Visualizer */}
              <div 
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  marginBottom: '20px',
                  position: 'relative',
                  zIndex: 2
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  <span>STUDIO EQUALIZER • CHANNEL 1</span>
                  <span style={{ color: isLivePlaying ? 'var(--color-coral)' : 'var(--text-muted)' }}>
                    {isLivePlaying ? 'MODULATING' : 'IDLE'}
                  </span>
                </div>
                <AudioWaveform height={56} barsCount={34} interactive={false} />
              </div>

              {/* Core Stream Action Deck */}
              <div 
                className="live-radio-deck"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '14px',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Volume Slider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    onClick={toggleMute}
                    style={{ color: 'var(--color-cream)', cursor: 'pointer' }}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX size={19} /> : <Volume2 size={19} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    style={{
                      width: '80px',
                      accentColor: 'var(--color-coral)',
                      cursor: 'pointer'
                    }}
                  />
                </div>

                {/* Big Center Play/Pause Button */}
                <button
                  onClick={handleToggleBroadcast}
                  className="btn-brutal"
                  style={{
                    padding: '14px 34px',
                    fontSize: '0.95rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    backgroundColor: 'var(--color-acid)',
                    color: '#000000',
                    border: '2px solid #000',
                    boxShadow: '3px 3px 0 #000',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer'
                  }}
                >
                  {isLivePlaying ? (
                    <>
                      <Pause size={20} fill="#000" />
                      <span>PAUSE BROADCAST</span>
                    </>
                  ) : (
                    <>
                      <Play size={20} fill="#000" style={{ marginLeft: '2px' }} />
                      <span>LISTEN LIVE NOW</span>
                    </>
                  )}
                </button>

                {/* Share Stream Button */}
                <button
                  onClick={handleShare}
                  className="btn-icon"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.18)',
                    color: 'var(--color-cream)'
                  }}
                  title="Share Live Broadcast Link"
                >
                  <Share2 size={17} />
                </button>
              </div>
            </div>

            {/* Upcoming Programmes Schedule */}
            <div 
              className="glass-panel"
              style={{
                padding: 'var(--space-xl)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'rgba(16, 56, 61, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Clock size={17} color="var(--color-amber)" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-cream)', margin: 0 }}>
                  Upcoming Tonight on 90.4 FM
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {mockLiveShow.schedule.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: item.active ? 'rgba(245, 45, 58, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                      border: item.active ? '1px solid var(--color-coral)' : '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: item.active ? 'var(--color-coral)' : 'rgba(245, 235, 221, 0.6)', fontWeight: 700 }}>
                        {item.time}
                      </span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: item.active ? 'var(--color-coral)' : 'var(--color-cream)' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'rgba(245, 235, 221, 0.7)' }}>
                          {item.rj}
                        </div>
                      </div>
                    </div>

                    {item.active && (
                      <span 
                        style={{
                          backgroundColor: '#ef4444',
                          color: '#fff',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.66rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800
                        }}
                      >
                        ON AIR
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: RJ Profile & Live Student Shoutout Stream */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            {/* RJ Profile Card */}
            <div 
              className="glass-panel"
              style={{
                padding: 'var(--space-xl)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'rgba(16, 56, 61, 0.45)',
                border: '1px solid rgba(255, 148, 26, 0.25)'
              }}
            >
              <span className="editorial-badge" style={{ marginBottom: '14px' }}>
                STUDIO PRESENTER
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
                <img 
                  src={currentRJ.avatar} 
                  alt={currentRJ.name} 
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-coral)' }} 
                />
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-cream)', marginBottom: '2px' }}>
                    {currentRJ.name}
                  </h3>
                  <div style={{ fontSize: '0.84rem', color: 'var(--color-amber)', fontWeight: 600 }}>
                    {currentRJ.role}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'rgba(245, 235, 221, 0.6)' }}>
                    {currentRJ.instagram}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.86rem', color: 'rgba(245, 235, 221, 0.85)', lineHeight: 1.5, marginBottom: '16px' }}>
                {currentRJ.bio}
              </p>

              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  paddingTop: '12px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <div>
                  <div style={{ color: 'var(--color-amber)', fontWeight: 700 }}>42 SHOWS</div>
                  <div style={{ color: 'rgba(245, 235, 221, 0.6)' }}>Broadcasted</div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-coral)', fontWeight: 700 }}>4.8k STUDENTS</div>
                  <div style={{ color: 'rgba(245, 235, 221, 0.6)' }}>Monthly Reach</div>
                </div>
              </div>
            </div>

            {/* Live Student Shoutouts & Song Requests Stream */}
            <div 
              className="glass-panel"
              style={{
                padding: 'var(--space-xl)',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'rgba(16, 56, 61, 0.45)',
                border: '1px solid rgba(255, 181, 46, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                height: '460px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={17} color="var(--color-amber)" />
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-cream)', margin: 0 }}>
                    Live Studio Shoutouts
                  </h3>
                </div>
                <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--color-coral)', fontWeight: 700 }}>
                  FEED ACTIVE
                </span>
              </div>

              {/* Message Feed */}
              <div 
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  paddingRight: '6px',
                  marginBottom: '12px'
                }}
              >
                {shoutouts.map(item => (
                  <div 
                    key={item.id}
                    style={{
                      padding: '10px 14px',
                      backgroundColor: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--color-amber)' }}>
                        {item.sender}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: 'rgba(245, 235, 221, 0.5)' }}>
                        {item.time}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.84rem', color: 'var(--color-cream)', margin: 0, lineHeight: 1.4 }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendShoutout} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  value={shoutoutText}
                  onChange={(e) => setShoutoutText(e.target.value)}
                  placeholder="Send a shoutout to RJ Ananya..."
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 'var(--radius-full)',
                    padding: '10px 16px',
                    color: 'var(--color-cream)',
                    fontSize: '0.84rem'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--color-coral)',
                    color: '#FFFFFF',
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  title="Send Shoutout"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
