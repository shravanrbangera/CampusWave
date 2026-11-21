import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  Play, 
  Pause, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Vote, 
  Flame, 
  Bookmark, 
  Mic2, 
  CheckCircle2, 
  Calendar,
  Volume2,
  Headphones,
  Music
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { mockLiveShow, mockMusic } from '../data/music';
import { mockPodcasts } from '../data/podcasts';
import { mockVotingData } from '../data/voting';
import { PodcastCard } from '../components/PodcastCard';
import { VinylRecord } from '../components/VinylRecord';
import { AudioWaveform } from '../components/AudioWaveform';

export const Home = () => {
  const { user, votedPolls, castVote, savedPodcasts, downloadedPodcasts } = useAuth();
  const { isPlaying, playTrack, togglePlay, currentTrack } = useAudio();

  const [activeVote, setActiveVote] = useState(votedPolls['dailySong'] || null);
  const [votedToast, setVotedToast] = useState(false);

  const isLiveActive = currentTrack?.id === mockLiveShow.id && isPlaying;
  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  // Dynamic contextual time greeting
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  // Filter saved episodes for quick access shelf
  const savedItems = mockPodcasts.filter(p => savedPodcasts?.includes(p.id) || downloadedPodcasts?.includes(p.id));

  // Upcoming radio show
  const upcomingShow = mockLiveShow.schedule?.find(s => !s.active) || {
    time: "08:30 PM",
    title: "Hostel Acoustic Jam Sessions",
    rj: "RJ Vicky & Band"
  };

  const handleLivePlay = () => {
    if (isLiveActive) {
      togglePlay();
    } else {
      playTrack(mockLiveShow);
    }
  };

  const handleQuickVote = (songId) => {
    setActiveVote(songId);
    castVote('dailySong', songId);
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#FF5500', '#FFB52E', '#000000']
      });
    } catch (e) {}
    setVotedToast(true);
    setTimeout(() => setVotedToast(false), 2500);
  };

  return (
    <div className="home-dashboard page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* 1. Header & Welcome Message */}
      <section 
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
          paddingBottom: 'var(--space-md)',
          borderBottom: '2.5px solid #000'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                backgroundColor: 'var(--color-orange)',
                color: '#FFFFFF',
                border: '2px solid #000',
                borderRadius: '8px',
                padding: '4px 10px',
                boxShadow: '2px 2px 0 #000'
              }}
            >
              ⚡ NMAMIT 90.4 DIGITAL FM
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              {user?.hostel || "NETRAVATI BLOCK B • CAMPUS STREAM"}
            </span>
          </div>

          <h1 
            style={{ 
              fontFamily: 'var(--font-black)', 
              fontSize: 'var(--font-size-hero)', 
              color: 'var(--text-primary)', 
              textTransform: 'uppercase', 
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              margin: '6px 0 8px'
            }}
          >
            {timeGreeting}, <span style={{ color: 'var(--color-orange)' }}>{firstName}</span>!
          </h1>
          <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 600, maxWidth: '640px', lineHeight: 1.5 }}>
            Live student radio broadcasts, engineering chronicles, and daily hostel playlists. Less clutter, more listening.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Link 
            to="/live" 
            className="btn-brutal" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px', 
              fontSize: '0.84rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 900,
              backgroundColor: 'var(--color-orange)',
              color: '#FFFFFF',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              borderRadius: '999px',
              textDecoration: 'none'
            }}
          >
            <Radio size={16} />
            <span>TUNE IN (90.4 FM)</span>
          </Link>
          <Link 
            to="/podcasts" 
            className="btn-brutal" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 18px', 
              fontSize: '0.84rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              borderRadius: '999px',
              textDecoration: 'none'
            }}
          >
            <Mic2 size={16} />
            <span>PODCASTS</span>
          </Link>
        </div>
      </section>

      {/* 2. Prominent Live Radio Section */}
      <section>
        <div 
          className="card-modern home-live-banner"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #123C40 0%, #0F1216 100%)',
            border: '2.5px solid #000000',
            boxShadow: '6px 6px 0 #000000',
            padding: 'var(--space-2xl)',
            color: '#FFFFFF'
          }}
        >
          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: '1.25fr 0.75fr',
              gap: 'var(--space-xl)',
              alignItems: 'center'
            }}
            className="hero-split-grid"
          >
            <div>
              {/* Live Badge & Listener Count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <span 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    backgroundColor: 'var(--color-orange)', 
                    color: '#FFF', 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    fontWeight: 900,
                    padding: '4px 10px',
                    borderRadius: '999px',
                    border: '1.5px solid #000'
                  }}
                >
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFF', animation: 'pulse 1.2s infinite' }} />
                  {mockLiveShow.status}
                </span>

                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.04em', fontWeight: 600 }}>
                  {mockLiveShow.listenersCount} STUDENTS TUNED IN • {mockLiveShow.frequency}
                </span>
              </div>

              {/* Show Title */}
              <h2 style={{ fontSize: 'var(--font-size-section-heading)', color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.2, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                {mockLiveShow.title}
              </h2>

              {/* Host & Studio Info */}
              <p style={{ color: '#FFB52E', fontSize: '0.94rem', fontWeight: 700, marginBottom: '10px', fontFamily: 'var(--font-mono)' }}>
                Hosted by {mockLiveShow.rj} • {mockLiveShow.rjLabel}
              </p>

              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: 1.55, maxWidth: '520px', marginBottom: '20px' }}>
                {mockLiveShow.description}
              </p>

              {/* Audio Controls & Clarity Notice */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '14px' }}>
                <button
                  onClick={handleLivePlay}
                  className="btn-brutal"
                  style={{
                    padding: '12px 24px',
                    fontSize: '0.9rem',
                    backgroundColor: 'var(--color-orange)',
                    color: '#FFFFFF',
                    border: '2px solid #000',
                    boxShadow: '3px 3px 0 #000',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  {isLiveActive ? <Pause size={18} fill="#FFF" /> : <Play size={18} fill="#FFF" style={{ marginLeft: '2px' }} />}
                  <span>{isLiveActive ? "PAUSE STREAM" : "TUNE IN LIVE (90.4 FM)"}</span>
                </button>

                <Link 
                  to="/live" 
                  className="btn-brutal"
                  style={{ 
                    padding: '12px 20px', 
                    fontSize: '0.88rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '999px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    textDecoration: 'none'
                  }}
                >
                  <span>STUDIO DASHBOARD</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Demo Mode Clarity Notice */}
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={13} color="var(--color-orange)" />
                <span>Demo Broadcast Mode • High-fidelity synthesized campus audio stream</span>
              </div>
            </div>

            {/* Right: Vinyl Visual */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <VinylRecord 
                isPlaying={isLiveActive} 
                coverImage={mockLiveShow.cover} 
                size={220} 
                albumTitle={mockLiveShow.title}
                showArm={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Upcoming Radio Show Strip */}
      <section 
        className="card-modern"
        style={{
          borderRadius: '16px',
          backgroundColor: 'var(--bg-tertiary)',
          border: '2px solid #000',
          boxShadow: '3px 3px 0 #000',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--bg-primary)', border: '1.5px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-orange)' }}>
            <Clock size={20} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase' }}>
              NEXT BROADCAST AT {upcomingShow.time}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {upcomingShow.title} • Hosted by {upcomingShow.rj}
            </div>
          </div>
        </div>

        <Link
          to="/live"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: 'var(--color-orange)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          VIEW FULL SCHEDULE →
        </Link>
      </section>

      {/* 4. Quick Access to Saved Episodes */}
      {savedItems.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bookmark size={18} color="var(--color-orange)" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                QUICK ACCESS: SAVED EPISODES
              </h2>
            </div>
            <Link to="/saved" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-orange)', textDecoration: 'none' }}>
              Open Vault ({savedItems.length}) →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
            {savedItems.slice(0, 3).map(ep => (
              <div
                key={ep.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <img src={ep.cover} alt={ep.title} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', border: '1.5px solid #000', flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {ep.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {ep.host} • {ep.duration}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => playTrack(ep)}
                  className="btn-brutal"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-orange)',
                    color: '#FFF',
                    border: '1.5px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                  title="Play episode"
                >
                  <Play size={14} fill="#FFF" style={{ marginLeft: '2px' }} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Featured Podcasts & Latest Episodes */}
      <section>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase' }}>
              CAMPUS DISCUSSIONS // PODCASTS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-section-heading)', fontWeight: 800, margin: '4px 0 0' }}>
              FEATURED EPISODES
            </h2>
          </div>
          <Link 
            to="/podcasts" 
            className="btn-brutal"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: '2px solid #000',
              boxShadow: '2px 2px 0 #000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 800,
              textDecoration: 'none'
            }}
          >
            <span>VIEW ALL PODCASTS</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 'var(--space-lg)'
          }}
        >
          {mockPodcasts.slice(0, 3).map(podcast => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>

      {/* 6. Daily Playlist Voting Preview */}
      <section 
        className="card-modern"
        style={{
          borderRadius: '24px',
          backgroundColor: 'var(--bg-tertiary)',
          border: '2.5px solid #000',
          boxShadow: '5px 5px 0 #000',
          padding: 'var(--space-xl)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase' }}>
              <Vote size={14} /> PLAYLIST VOTING PREVIEW
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0' }}>
              Tonight's Prime Hour Track Vote
            </h3>
          </div>

          <Link
            to="/vote"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--color-orange)',
              textDecoration: 'none'
            }}
          >
            FULL VOTING & SONG DEDICATIONS →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {mockVotingData.dailySongPoll.songs.map((song) => {
            const isVoted = activeVote === song.id;

            return (
              <div
                key={song.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: '16px',
                  backgroundColor: isVoted ? 'rgba(255, 85, 0, 0.08)' : 'var(--bg-primary)',
                  border: isVoted ? '2px solid var(--color-orange)' : '1.5px solid #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <img src={song.cover} alt={song.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', border: '1.5px solid #000', flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {song.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {song.artist}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickVote(song.id)}
                  className="btn-brutal"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '999px',
                    backgroundColor: isVoted ? 'var(--color-orange)' : '#FFFFFF',
                    color: isVoted ? '#FFFFFF' : '#000000',
                    border: '1.5px solid #000',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  {isVoted ? 'VOTED ✓' : 'VOTE'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
