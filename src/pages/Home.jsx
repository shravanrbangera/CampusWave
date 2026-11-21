import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Play, 
  Pause, 
  ArrowRight, 
  Clock, 
  Vote, 
  Mic2, 
  Volume2,
  Search,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { mockLiveShow } from '../data/music';
import { mockPodcasts } from '../data/podcasts';
import { mockVotingData } from '../data/voting';
import { PodcastCard } from '../components/PodcastCard';
import { VinylRecord } from '../components/VinylRecord';

export const Home = () => {
  const navigate = useNavigate();
  const { user, votedPolls, castVote } = useAuth();
  const { isPlaying, playTrack, togglePlay, currentTrack } = useAudio();

  const [activeVote, setActiveVote] = useState(votedPolls['dailySong'] || null);
  const [votedToast, setVotedToast] = useState(false);
  const [homeSearch, setHomeSearch] = useState('');

  const isLiveActive = currentTrack?.id === mockLiveShow.id && isPlaying;
  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  // Dynamic contextual time greeting
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

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
        particleCount: 45,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#F15A24', '#F4C542', '#123D2C']
      });
    } catch (e) {}
    setVotedToast(true);
    setTimeout(() => setVotedToast(false), 2500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (homeSearch.trim()) {
      navigate(`/podcasts?q=${encodeURIComponent(homeSearch.trim())}`);
    }
  };

  return (
    <div 
      className="home-dashboard page-wrapper" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'clamp(24px, 4vw, 36px)',
        paddingTop: 'clamp(8px, 2vw, 16px)'
      }}
    >
      {/* 1. Welcoming Introduction to Campus Radio */}
      <section 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="editorial-badge">
            NMAMIT DIGITAL RADIO • 90.4 MHZ
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {user?.hostel || "NETRAVATI BLOCK • CAMPUS BROADCAST"}
          </span>
        </div>

        <div>
          <h1 
            style={{ 
              fontSize: 'clamp(1.85rem, 4.5vw, 2.85rem)', 
              color: 'var(--text-primary)', 
              fontWeight: 800,
              lineHeight: 1.18,
              letterSpacing: '-0.025em',
              margin: '0 0 8px'
            }}
          >
            {timeGreeting}, <span style={{ color: 'var(--color-orange)' }}>{firstName}</span>.
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.92rem, 1.6vw, 1.05rem)', fontWeight: 400, maxWidth: '640px', lineHeight: 1.6 }}>
            The official student-powered broadcast network of NMAMIT. Live radio, student-hosted podcasts, and daily hostel playlists.
          </p>
        </div>

        {/* Search & Quick CTA Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
          <form 
            onSubmit={handleSearchSubmit}
            style={{
              position: 'relative',
              flex: '1 1 280px',
              maxWidth: '480px'
            }}
          >
            <Search 
              size={16} 
              color="var(--text-muted)" 
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              value={homeSearch}
              onChange={(e) => setHomeSearch(e.target.value)}
              placeholder="Search shows, podcasts, or student RJs..."
              style={{
                width: '100%',
                padding: '10px 36px 10px 40px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: 500,
                outline: 'none',
                transition: 'border-color var(--transition-fast)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-orange)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
            />
            {homeSearch && (
              <button
                type="button"
                onClick={() => setHomeSearch('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
                title="Clear"
              >
                <X size={14} />
              </button>
            )}
          </form>

          <Link 
            to="/podcasts" 
            className="btn-secondary"
            style={{ 
              textDecoration: 'none',
              padding: '8px 18px',
              fontSize: '0.84rem',
              minHeight: '38px'
            }}
          >
            <Mic2 size={14} />
            <span>Browse Podcasts</span>
          </Link>
        </div>
      </section>

      {/* 2. Prominent Live Radio Player (Deep Forest Green Banner) */}
      <section>
        <div 
          className="card-forest home-live-banner"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(20px, 4vw, 36px)'
          }}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(18px, 3.5vw, 32px)',
              alignItems: 'center'
            }}
          >
            <div>
              {/* Live Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <span 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    backgroundColor: 'var(--color-orange)', 
                    color: '#FFF', 
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    letterSpacing: '0.04em'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFF', animation: 'pulse 1.2s infinite' }} />
                  {isLiveActive ? "LIVE ON AIR" : "CURRENT BROADCAST"}
                </span>

                <span style={{ fontSize: '0.78rem', color: 'rgba(255, 248, 233, 0.8)', letterSpacing: '0.04em', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                  90.4 MHZ STEREO
                </span>
              </div>

              {/* Show Title */}
              <h2 
                style={{ 
                  fontSize: 'clamp(1.45rem, 3.2vw, 2.1rem)', 
                  color: '#FFF8E9', 
                  fontWeight: 800,
                  marginBottom: '8px', 
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em'
                }}
              >
                {mockLiveShow.title}
              </h2>

              {/* Host & Studio Info */}
              <p style={{ color: 'var(--color-yellow)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
                Hosted by {mockLiveShow.rj} • {mockLiveShow.rjLabel}
              </p>

              <p style={{ color: 'rgba(255, 248, 233, 0.82)', fontSize: '0.88rem', lineHeight: 1.55, maxWidth: '520px', marginBottom: '18px' }}>
                {mockLiveShow.description}
              </p>

              {/* Audio Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <button
                  onClick={handleLivePlay}
                  className="btn-primary"
                  style={{
                    padding: '11px 24px',
                    fontSize: '0.88rem',
                    minHeight: '42px'
                  }}
                >
                  {isLiveActive ? <Pause size={17} fill="#FFF" /> : <Play size={17} fill="#FFF" style={{ marginLeft: '2px' }} />}
                  <span>{isLiveActive ? "PAUSE STREAM" : "LISTEN LIVE NOW"}</span>
                </button>

                <Link 
                  to="/live" 
                  style={{ 
                    padding: '10px 18px', 
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    backgroundColor: 'rgba(255, 248, 233, 0.12)',
                    color: '#FFF8E9',
                    border: '1px solid rgba(255, 248, 233, 0.22)',
                    borderRadius: 'var(--radius-full)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    minHeight: '42px'
                  }}
                >
                  <span>Studio Console</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div style={{ fontSize: '0.74rem', color: 'rgba(255, 248, 233, 0.65)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={13} color="var(--color-orange)" />
                <span>Simulated campus radio stream • 320kbps HD studio master</span>
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
                size={190} 
                albumTitle={mockLiveShow.title}
                showArm={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Upcoming Broadcast Information */}
      <section 
        className="card-modern"
        style={{
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div 
            style={{ 
              width: '38px', 
              height: '38px', 
              borderRadius: 'var(--radius-md)', 
              backgroundColor: 'var(--color-forest-soft)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--color-forest)', 
              flexShrink: 0 
            }}
          >
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              NEXT BROADCAST TONIGHT AT {upcomingShow.time}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {upcomingShow.title} • Hosted by {upcomingShow.rj}
            </div>
          </div>
        </div>

        <Link
          to="/live"
          style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            color: 'var(--color-orange)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>Full Schedule</span>
          <ArrowRight size={13} />
        </Link>
      </section>

      {/* 4. Featured Student Podcasts */}
      <section>
        <div className="section-header">
          <div>
            <span className="editorial-badge" style={{ marginBottom: '6px' }}>
              CAMPUS AUDIO
            </span>
            <h2 className="section-header-title">
              Featured Student Podcasts
            </h2>
            <div className="section-header-subtitle">
              Discussions, tech chronicles, and stories hosted by NMAMIT students.
            </div>
          </div>
          <Link 
            to="/podcasts" 
            className="btn-secondary"
            style={{ 
              padding: '7px 16px',
              fontSize: '0.82rem',
              minHeight: '36px'
            }}
          >
            <span>View All Podcasts</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px'
          }}
        >
          {mockPodcasts.slice(0, 3).map(podcast => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>

      {/* 5. Daily Playlist Voting Preview */}
      <section 
        className="card-modern"
        style={{
          padding: 'clamp(18px, 3.5vw, 28px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Vote size={13} /> DAILY PLAYLIST VOTING
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, margin: '3px 0 0', color: 'var(--text-primary)' }}>
              {mockVotingData.dailySongPoll.question}
            </h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Winning track plays live during tonight's 9:00 PM Hostel Prime Hour broadcast.
            </div>
          </div>

          <Link
            to="/vote"
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--color-orange)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>All Nominees</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {votedToast && (
          <div style={{ padding: '8px 14px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-forest-soft)', color: 'var(--color-forest)', fontSize: '0.82rem', fontWeight: 700, marginBottom: '12px' }}>
            Vote recorded! Check back at 9:00 PM to hear the winner on 90.4 FM.
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {mockVotingData.dailySongPoll.songs.slice(0, 3).map((song) => {
            const isVoted = activeVote === song.id;

            return (
              <div
                key={song.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isVoted ? 'var(--color-orange-soft)' : 'var(--bg-card-subtle)',
                  border: isVoted ? '1px solid var(--color-orange)' : '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <img src={song.cover} alt={song.title} style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>
                      {song.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                      {song.artist}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickVote(song.id)}
                  className={isVoted ? "btn-primary" : "btn-secondary"}
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.76rem',
                    minHeight: '34px',
                    flexShrink: 0
                  }}
                >
                  {isVoted ? 'Voted' : 'Vote'}
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
