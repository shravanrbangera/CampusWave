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
    setToastMsg("Stream link copied!");
    setTimeout(() => setToastMsg(''), 2200);
  };

  const handleSendShoutout = (e) => {
    e.preventDefault();
    if (!shoutoutText.trim()) return;

    const newShoutout = {
      id: Date.now(),
      sender: `${user?.name ? user.name.split(' ')[0] : 'Student'} (${user?.hostel ? user.hostel.split(' ')[0] : 'Campus'})`,
      text: shoutoutText.trim(),
      time: "Just now"
    };

    setShoutouts([newShoutout, ...shoutouts]);
    setShoutoutText('');
    setToastMsg("Shoutout sent to studio console!");
    setTimeout(() => setToastMsg(''), 2500);
  };

  return (
    <div 
      className="live-radio-page page-wrapper" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'clamp(20px, 3.5vw, 28px)',
        paddingTop: 'clamp(6px, 1.5vw, 12px)'
      }}
    >
      {/* Top Header */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="editorial-badge">
              90.4 MHZ DIGITAL FM
            </span>
            <span 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '5px', 
                padding: '3px 9px', 
                borderRadius: 'var(--radius-full)', 
                backgroundColor: isLivePlaying ? 'var(--color-orange)' : 'var(--color-forest)', 
                color: '#FFF', 
                fontSize: '0.7rem', 
                fontWeight: 800 
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFF', animation: 'pulse 1.2s infinite' }} />
              {isLivePlaying ? "STREAMING" : "LIVE ON AIR"}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3.8vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Live Broadcast
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          <Users size={16} color="var(--color-orange)" />
          <span>{mockLiveShow.listenersCount} Listening</span>
        </div>
      </div>

      {toastMsg && (
        <div 
          style={{
            backgroundColor: 'var(--color-forest-soft)',
            border: '1px solid var(--color-forest)',
            color: 'var(--color-forest)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '0.86rem'
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* Main Now Playing Deck (Matches Image 2 & 3: Clean, focused, compact) */}
      <section 
        className="card-forest"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(20px, 4vw, 32px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          position: 'relative',
          overflow: 'hidden',
          color: '#FFFFFF'
        }}
      >
        {/* Tuner Bar Indicator (Matches Image 2 iPod FM Tuner Scale) */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '360px',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.74rem',
            color: 'rgba(255, 255, 255, 0.65)'
          }}
        >
          <span>88 FM</span>
          <span style={{ color: 'var(--color-yellow)', fontWeight: 800 }}>90.4 MHZ [TUNED]</span>
          <span>108 FM</span>
        </div>

        {/* Center Vinyl / Artwork */}
        <div style={{ margin: '8px 0', position: 'relative' }}>
          <VinylRecord 
            isPlaying={isLivePlaying} 
            coverImage={mockLiveShow.cover} 
            size={200} 
            albumTitle={mockLiveShow.title}
            showArm={true}
          />
        </div>

        {/* Show Title & Host */}
        <div style={{ textAlign: 'center', maxWidth: '440px' }}>
          <h2 
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(1.4rem, 3.2vw, 1.85rem)', 
              color: '#FFFFFF', 
              fontWeight: 800, 
              margin: '0 0 4px', 
              lineHeight: 1.2 
            }}
          >
            {mockLiveShow.title}
          </h2>
          <div style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-yellow)', fontSize: '0.92rem', fontWeight: 700 }}>
            Hosted by {mockLiveShow.rj}
          </div>
        </div>

        {/* Real Audio Waveform Visualizer */}
        <div 
          style={{
            width: '100%',
            maxWidth: '480px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            padding: '10px 16px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, marginBottom: '4px' }}>
            <span>STUDIO AUDIO MODULATION</span>
            <span style={{ color: isLivePlaying ? 'var(--color-orange)' : 'rgba(255, 255, 255, 0.4)' }}>
              {isLivePlaying ? '320 KBPS HD' : 'IDLE'}
            </span>
          </div>
          <AudioWaveform height={44} barsCount={30} interactive={false} />
        </div>

        {/* Playback Controls Deck (Matches Image 3 Now Playing controls) */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            paddingTop: '8px',
            width: '100%'
          }}
        >
          {/* Mute Button */}
          <button 
            onClick={toggleMute}
            style={{ 
              color: '#FFFFFF', 
              cursor: 'pointer', 
              background: 'rgba(255, 255, 255, 0.12)', 
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Big Center Play/Pause Button */}
          <button
            onClick={handleToggleBroadcast}
            style={{
              padding: '12px 28px',
              fontSize: '0.92rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              backgroundColor: 'var(--color-orange)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 16px var(--color-orange-glow)'
            }}
          >
            {isLivePlaying ? (
              <>
                <Pause size={18} fill="#FFF" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play size={18} fill="#FFF" style={{ marginLeft: '2px' }} />
                <span>LISTEN LIVE</span>
              </>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title="Share Broadcast Link"
          >
            <Share2 size={17} />
          </button>
        </div>
      </section>

      {/* 2-Column Schedule & Shoutouts Grid */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px'
        }}
      >
        {/* Today's Schedule Card */}
        <section 
          className="card-modern"
          style={{
            padding: '18px 20px',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Clock size={16} color="var(--color-orange)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Broadcast Schedule
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
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: item.active ? 'var(--color-orange-soft)' : 'var(--bg-card-subtle)',
                  border: item.active ? '1px solid var(--color-orange)' : '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.78rem', color: item.active ? 'var(--color-orange)' : 'var(--text-secondary)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {item.time}
                  </span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: item.active ? 'var(--color-orange)' : 'var(--text-primary)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                      {item.rj}
                    </div>
                  </div>
                </div>

                {item.active && (
                  <span 
                    style={{
                      backgroundColor: 'var(--color-orange)',
                      color: '#fff',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.64rem',
                      fontWeight: 800
                    }}
                  >
                    ON AIR
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Live Shoutouts Feed */}
        <section 
          className="card-modern"
          style={{
            padding: '18px 20px',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={16} color="var(--color-orange)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Live Studio Shoutouts
              </h3>
            </div>
            <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-forest)', backgroundColor: 'var(--color-forest-soft)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
              LIVE FEED
            </span>
          </div>

          {/* Messages */}
          <div 
            style={{
              maxHeight: '190px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '12px',
              paddingRight: '4px'
            }}
          >
            {shoutouts.map(item => (
              <div 
                key={item.id}
                style={{
                  padding: '8px 12px',
                  backgroundColor: 'var(--bg-card-subtle)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-orange)' }}>
                    {item.sender}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    {item.time}
                  </span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendShoutout} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: 'auto' }}>
            <input
              type="text"
              value={shoutoutText}
              onChange={(e) => setShoutoutText(e.target.value)}
              placeholder="Send shoutout to RJ Ananya..."
              style={{
                flex: 1,
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                padding: '9px 14px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '38px',
                height: '38px',
                minWidth: '38px',
                padding: 0,
                borderRadius: '50%',
                flexShrink: 0
              }}
              title="Send Shoutout"
              aria-label="Send Shoutout"
            >
              <Send size={15} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
