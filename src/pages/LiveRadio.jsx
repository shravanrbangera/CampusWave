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
  Send,
  Sparkles,
  CheckCircle2
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
    { id: 1, sender: "Varun (Kaveri 204)", text: "Huge shoutout to the robotics crew testing the rover in the mechanical lab!", time: "2m ago" },
    { id: 2, sender: "Sneha (Netravati Block B)", text: "Play some Prateek Kuhad or indie acoustics please!", time: "5m ago" },
    { id: 3, sender: "Karthik (Day Scholar)", text: "Listening on the bus back to Udupi. Sound is crystal clear!", time: "8m ago" }
  ]);
  const [toastMsg, setToastMsg] = useState('');

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
      sender: `${user?.name || "Student"} (${user?.hostel ? user.hostel.split(' ')[0] : 'Campus'})`,
      text: shoutoutText.trim(),
      time: "Just now"
    };

    setShoutouts([newShoutout, ...shoutouts]);
    setShoutoutText('');
    setToastMsg("Shoutout transmitted to RJ Ananya's live studio console!");
    setTimeout(() => setToastMsg(''), 3500);
  };

  return (
    <div className="live-radio-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Top Status Banner with Funky Stickers */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: 'var(--space-md)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="retro-pill retro-pill-orange">
            STUDIO TRANSMISSION ACTIVE
          </span>
          <span className="retro-pill retro-pill-yellow">
            90.4 MHZ STEREO
          </span>
          <span style={{ fontFamily: 'var(--font-serif-retro)', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-orange)' }}>
            Stay Tuned! NMAMIT Campus Digital Airwaves
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          <Users size={16} color="var(--color-orange)" />
          <span>{mockLiveShow.listenersCount} Students Listening Live</span>
        </div>
      </div>

      {toastMsg && (
        <div 
          style={{
            backgroundColor: 'var(--color-success-soft)',
            border: '1px solid var(--color-success)',
            color: 'var(--color-success)',
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '0.9rem'
          }}
        >
          {toastMsg}
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
          <div>
            <div className="folder-tab-bar">
              <span className="folder-tab folder-tab-blue">
                STUDIO DECK 01
              </span>
              <span className="folder-tab folder-tab-yellow">
                90.4 MHZ STEREO
              </span>
            </div>
            {/* Turntable Deck & Artwork */}
            <div 
              className="live-turntable-deck card-modern"
              style={{
                background: 'linear-gradient(145deg, #123C40 0%, #0F1216 100%)',
                padding: 'var(--space-2xl)',
                borderRadius: '0 24px 24px 24px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                color: '#FFFFFF'
              }}
            >
              <div className="washi-tape washi-tape-tr" />
            {/* Interactive LiquidEther Studio Visualizer Background */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                opacity: 0.45,
                pointerEvents: 'auto'
              }}
            >
              <LiquidEther 
                colors={['#FF5500', '#FFB800', '#00F0FF', '#123C40']}
                mouseForce={24}
                cursorSize={90}
                autoDemo={true}
                autoSpeed={0.4}
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
                    backgroundColor: isLivePlaying ? 'var(--color-orange)' : 'rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    letterSpacing: '0.04em'
                  }}
                >
                  <span className={isLivePlaying ? "badge-live-pulse" : ""} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                  {isLivePlaying ? "LIVE ON AIR" : "STUDIO PAUSED"}
                </div>
                <span style={{ fontSize: '0.8rem', color: '#FFB800', fontWeight: 700 }}>
                  90.4 MHZ DIGITAL
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                <span className="sound-equalizer">
                  <span className="sound-bar" style={{ backgroundColor: '#FFF' }} />
                  <span className="sound-bar" style={{ backgroundColor: '#FFF' }} />
                  <span className="sound-bar" style={{ backgroundColor: '#FFF' }} />
                </span>
              </div>
            </div>

            {/* Retro FM Frequency Tuner Dial */}
            <div 
              className="retro-tuner-scale" 
              style={{ 
                width: '100%', 
                maxWidth: '380px', 
                marginBottom: '14px', 
                position: 'relative', 
                zIndex: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span>88 FM</span>
              <span style={{ color: '#FAB005', fontWeight: 800 }}>90.4 MHZ [TUNED]</span>
              <span>96</span>
              <span>102</span>
              <span>108 FM</span>
              <div className="retro-tuner-needle" style={{ left: '26%' }} />
            </div>

            {/* High-Fidelity Vinyl Record */}
            <div style={{ margin: '4px 0 18px', position: 'relative', zIndex: 2 }}>
              <VinylRecord 
                isPlaying={isLivePlaying} 
                coverImage={mockLiveShow.cover} 
                size={260} 
                albumTitle={mockLiveShow.title}
                showArm={true}
              />
            </div>

            {/* Show Titles - FM Retro Display */}
            <div style={{ textAlign: 'center', width: '100%', marginBottom: '18px', position: 'relative', zIndex: 2 }}>
              <div style={{ fontFamily: 'var(--font-serif-retro)', fontStyle: 'italic', color: '#FAB005', fontSize: '1rem', marginBottom: '4px' }}>
                A Wonderful Live Broadcast with...
              </div>
              <h1 
                className="retro-title-shadow"
                style={{ 
                  fontFamily: 'var(--font-retro)', 
                  fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', 
                  color: 'var(--color-retro-yellow)', 
                  fontWeight: 400, 
                  marginBottom: '8px', 
                  lineHeight: 1.2 
                }}
              >
                {mockLiveShow.title}
              </h1>
              <p style={{ fontFamily: 'var(--font-radio)', color: '#FFFFFF', fontSize: '1.05rem', letterSpacing: '0.04em' }}>
                HOSTED BY RJ {mockLiveShow.rj.toUpperCase()}
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.88rem', marginTop: '6px', maxWidth: '480px', margin: '6px auto 0', lineHeight: 1.5 }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', fontWeight: 600, marginBottom: '6px' }}>
                <span>STUDIO EQUALIZER • CHANNEL 1</span>
                <span style={{ color: isLivePlaying ? 'var(--color-orange)' : 'rgba(255, 255, 255, 0.5)' }}>
                  {isLivePlaying ? 'MODULATING' : 'IDLE'}
                </span>
              </div>
              <AudioWaveform height={52} barsCount={32} interactive={false} />
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
                borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Volume Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button 
                  onClick={toggleMute}
                  style={{ color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
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
                    accentColor: 'var(--color-orange)',
                    cursor: 'pointer'
                  }}
                />
              </div>

              {/* Big Center Play/Pause Button */}
              <button
                onClick={handleToggleBroadcast}
                className="btn-primary"
                style={{
                  padding: '14px 32px',
                  fontSize: '0.95rem',
                  backgroundColor: 'var(--color-orange)'
                }}
              >
                {isLivePlaying ? (
                  <>
                    <Pause size={19} fill="#FFF" />
                    <span>PAUSE BROADCAST</span>
                  </>
                ) : (
                  <>
                    <Play size={19} fill="#FFF" style={{ marginLeft: '2px' }} />
                    <span>LISTEN LIVE NOW</span>
                  </>
                )}
              </button>

              {/* Share Stream Button */}
              <button
                onClick={handleShare}
                className="btn-icon"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF'
                }}
                title="Share Live Broadcast Link"
              >
                <Share2 size={17} />
              </button>
            </div>
          </div>
          </div>

          {/* Upcoming Programmes Schedule */}
          <div 
            className="card-modern"
            style={{
              padding: 'var(--space-xl)',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Clock size={18} color="var(--color-orange)" />
              <h3 style={{ fontFamily: 'var(--font-radio)', fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0, letterSpacing: '0.03em' }}>
                UPCOMING TONIGHT ON 90.4 FM
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {mockLiveShow.schedule.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: item.active ? 'var(--color-orange-soft)' : 'var(--bg-card-subtle)',
                    border: item.active ? '1px solid var(--color-orange)' : '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '0.82rem', color: item.active ? 'var(--color-orange)' : 'var(--text-secondary)', fontWeight: 700 }}>
                      {item.time}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: item.active ? 'var(--color-orange)' : 'var(--text-primary)' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                        {item.rj}
                      </div>
                    </div>
                  </div>

                  {item.active && (
                    <span 
                      style={{
                        backgroundColor: 'var(--color-orange)',
                        color: '#fff',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.68rem',
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
            className="card-modern"
            style={{
              padding: 'var(--space-xl)',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <span className="editorial-badge" style={{ marginBottom: '14px' }}>
              STUDIO PRESENTER
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
              <img 
                src={currentRJ.avatar} 
                alt={currentRJ.name} 
                style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-orange)' }} 
              />
              <div>
                <h3 style={{ fontFamily: 'var(--font-radio)', fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '2px', letterSpacing: '0.03em' }}>
                  {currentRJ.name.toUpperCase()}
                </h3>
                <div style={{ fontSize: '0.84rem', color: 'var(--color-orange)', fontWeight: 600 }}>
                  {currentRJ.role}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  {currentRJ.instagram}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '16px' }}>
              {currentRJ.bio}
            </p>

            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                paddingTop: '12px',
                borderTop: '1px solid var(--border-color)',
                fontSize: '0.82rem'
              }}
            >
              <div>
                <div style={{ color: 'var(--color-orange)', fontWeight: 800 }}>42 SHOWS</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Broadcasted</div>
              </div>
              <div>
                <div style={{ color: 'var(--color-orange)', fontWeight: 800 }}>4.8k STUDENTS</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>Monthly Reach</div>
              </div>
            </div>
          </div>

          {/* Live Student Shoutouts Stream */}
          <div 
            className="card-modern"
            style={{
              padding: 'var(--space-xl)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexDirection: 'column',
              height: '460px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={17} color="var(--color-orange)" />
                <h3 style={{ fontFamily: 'var(--font-radio)', fontSize: '1.15rem', color: 'var(--text-primary)', margin: 0, letterSpacing: '0.03em' }}>
                  LIVE STUDIO SHOUTOUTS
                </h3>
              </div>
              <span className="sticker-tag sticker-tag-orange" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
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
                    backgroundColor: 'var(--bg-card-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-orange)' }}>
                      {item.sender}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {item.time}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendShoutout} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="text"
                value={shoutoutText}
                onChange={(e) => setShoutoutText(e.target.value)}
                placeholder="Send a shoutout to RJ Ananya..."
                style={{
                  flex: 1,
                  backgroundColor: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)',
                  padding: '12px 16px',
                  color: 'var(--text-primary)',
                  fontSize: '15px'
                }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{
                  width: '44px',
                  height: '44px',
                  minWidth: '44px',
                  padding: 0,
                  borderRadius: '50%',
                  flexShrink: 0
                }}
                title="Send Shoutout"
                aria-label="Send Shoutout"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
