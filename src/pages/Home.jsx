import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Play, 
  Pause, 
  ArrowRight, 
  Clock, 
  Vote, 
  Bookmark, 
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
  const { user, votedPolls, castVote, savedPodcasts, downloadedPodcasts } = useAuth();
  const { isPlaying, playTrack, togglePlay, currentTrack } = useAudio();

  const [activeVote, setActiveVote] = useState(votedPolls['dailySong'] || null);
  const [votedToast, setVotedToast] = useState(false);
  const [homeSearch, setHomeSearch] = useState('');

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
        colors: ['#FF5500', '#FFB52E', '#10B981']
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
        gap: 'clamp(18px, 4vw, 30px)',
        paddingTop: 'clamp(10px, 2.5vw, 20px)'
      }}
    >
      {/* 1. Header & Welcome Message */}
      <section 
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          paddingBottom: '14px',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        {/* Top Funky Badges Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="sticker-tag sticker-tag-orange" style={{ fontSize: '0.74rem' }}>
            ⚡ 90.4 DIGITAL FM
          </span>
          <span className="sticker-tag" style={{ transform: 'rotate(1deg)', fontSize: '0.74rem' }}>
            HELLO! 👋
          </span>
          <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            {user?.hostel || "NETRAVATI BLOCK • CAMPUS STREAM"}
          </span>
        </div>

        {/* Dynamic Contextual Greeting */}
        <div>
          <h1 
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', 
              color: 'var(--text-primary)', 
              fontWeight: 800,
              letterSpacing: '-0.025em',
              lineHeight: 1.2,
              margin: '2px 0 6px'
            }}
          >
            {timeGreeting}, <span style={{ color: 'var(--color-orange)' }}>{firstName}</span>!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', fontWeight: 500, maxWidth: '640px', lineHeight: 1.5 }}>
            Live student radio broadcasts, engineering chronicles, and daily hostel playlists. Less clutter, more listening.
          </p>
        </div>

        {/* Quick Action Navigation Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '2px' }}>
          <Link 
            to="/live" 
            className="btn-primary"
            style={{ 
              textDecoration: 'none',
              padding: '9px 18px',
              fontSize: '0.84rem',
              minHeight: '40px'
            }}
          >
            <Radio size={15} />
            <span>TUNE IN (90.4 FM)</span>
          </Link>
          <Link 
            to="/podcasts" 
            className="btn-secondary"
            style={{ 
              textDecoration: 'none',
              padding: '9px 18px',
              fontSize: '0.84rem',
              minHeight: '40px'
            }}
          >
            <Mic2 size={15} />
            <span>PODCASTS</span>
          </Link>
        </div>
      </section>

      {/* 2. Compact Search Bar */}
      <section>
        <form 
          onSubmit={handleSearchSubmit}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '640px'
          }}
        >
          <Search 
            size={17} 
            color="var(--text-muted)" 
            style={{
              position: 'absolute',
              left: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}
          />
          <input
            type="text"
            value={homeSearch}
            onChange={(e) => setHomeSearch(e.target.value)}
            placeholder="Search shows, podcasts, or RJs..."
            style={{
              width: '100%',
              padding: '11px 40px 11px 44px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontWeight: 500,
              boxShadow: 'var(--shadow-sm)',
              outline: 'none',
              transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--color-orange)';
              e.target.style.boxShadow = '0 0 0 3px var(--color-orange-soft)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.boxShadow = 'var(--shadow-sm)';
            }}
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
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}
              title="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </form>
      </section>

      {/* 3. Prominent Live Radio Section */}
      <section>
        <div 
          className="card-modern home-live-banner"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #123C40 0%, #0F1216 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: 'var(--shadow-md)',
            padding: 'clamp(16px, 3.5vw, 28px)',
            color: '#FFFFFF'
          }}
        >
          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(16px, 3vw, 28px)',
              alignItems: 'center'
            }}
          >
            <div>
              {/* Live Badge & Listener Count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
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
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFF', animation: 'pulse 1.2s infinite' }} />
                  {mockLiveShow.status}
                </span>

                <span style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.04em', fontWeight: 600 }}>
                  {mockLiveShow.listenersCount} LISTENING • {mockLiveShow.frequency}
                </span>
              </div>

              {/* Show Title */}
              <h2 style={{ fontSize: 'clamp(1.25rem, 3.2vw, 1.65rem)', color: '#FFFFFF', marginBottom: '6px', lineHeight: 1.2, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                {mockLiveShow.title}
              </h2>

              {/* Host & Studio Info */}
              <p style={{ color: '#FFB52E', fontSize: '0.88rem', fontWeight: 700, marginBottom: '8px' }}>
                Hosted by {mockLiveShow.rj} • {mockLiveShow.rjLabel}
              </p>

              <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.86rem', lineHeight: 1.5, maxWidth: '520px', marginBottom: '16px' }}>
                {mockLiveShow.description}
              </p>

              {/* Audio Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                <button
                  onClick={handleLivePlay}
                  className="btn-primary"
                  style={{
                    backgroundColor: 'var(--color-orange)',
                    padding: '10px 20px',
                    fontSize: '0.86rem',
                    minHeight: '40px'
                  }}
                >
                  {isLiveActive ? <Pause size={17} fill="#FFF" /> : <Play size={17} fill="#FFF" style={{ marginLeft: '2px' }} />}
                  <span>{isLiveActive ? "PAUSE STREAM" : "TUNE IN (90.4 FM)"}</span>
                </button>

                <Link 
                  to="/live" 
                  className="btn-secondary"
                  style={{ 
                    padding: '10px 16px', 
                    fontSize: '0.82rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    textDecoration: 'none',
                    minHeight: '40px'
                  }}
                >
                  <span>STUDIO DASHBOARD</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Clarity Notice */}
              <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Volume2 size={12} color="var(--color-orange)" />
                <span>Simulated campus radio stream • High-fidelity audio broadcast</span>
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
                size={180} 
                albumTitle={mockLiveShow.title}
                showArm={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Upcoming Radio Show Strip */}
      <section 
        className="card-modern"
        style={{
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-card)',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'var(--color-orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-orange)', flexShrink: 0 }}>
            <Clock size={18} />
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              NEXT BROADCAST AT {upcomingShow.time}
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {upcomingShow.title} • Hosted by {upcomingShow.rj}
            </div>
          </div>
        </div>

        <Link
          to="/live"
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--color-orange)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '3px'
          }}
        >
          VIEW SCHEDULE →
        </Link>
      </section>

      {/* 5. Quick Access to Saved Episodes (Only rendered when student has saved episodes) */}
      {savedItems.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Bookmark size={16} color="var(--color-orange)" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                QUICK ACCESS: SAVED EPISODES
              </h2>
            </div>
            <Link to="/saved" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-orange)', textDecoration: 'none' }}>
              Open Vault ({savedItems.length}) →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
            {savedItems.slice(0, 3).map(ep => (
              <div
                key={ep.id}
                className="card-modern"
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <img src={ep.cover} alt={ep.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.86rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>
                      {ep.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {ep.host} • {ep.duration}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => playTrack(ep)}
                  className="btn-icon"
                  style={{
                    width: '34px',
                    height: '34px',
                    minWidth: '34px',
                    minHeight: '34px',
                    backgroundColor: 'var(--color-orange)',
                    color: '#FFF',
                    border: 'none',
                    boxShadow: 'var(--shadow-sm)',
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

      {/* 6. Featured Podcasts & Latest Episodes */}
      <section>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              CAMPUS DISCUSSIONS // PODCASTS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.45rem)', fontWeight: 800, margin: '2px 0 0', color: 'var(--text-primary)' }}>
              FEATURED EPISODES
            </h2>
          </div>
          <Link 
            to="/podcasts" 
            className="btn-secondary"
            style={{ 
              padding: '6px 14px',
              fontSize: '0.8rem',
              textDecoration: 'none',
              minHeight: '34px'
            }}
          >
            <span>VIEW ALL PODCASTS</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '14px'
          }}
        >
          {mockPodcasts.slice(0, 3).map(podcast => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>

      {/* 7. Daily Playlist Voting Preview */}
      <section 
        className="card-modern"
        style={{
          borderRadius: '20px',
          padding: 'clamp(16px, 3vw, 24px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Vote size={13} /> PLAYLIST VOTING PREVIEW
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, margin: '2px 0 0', color: 'var(--text-primary)' }}>
              Tonight's Prime Hour Track Vote
            </h3>
          </div>

          <Link
            to="/vote"
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--color-orange)',
              textDecoration: 'none'
            }}
          >
            FULL VOTING →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
          {mockVotingData.dailySongPoll.songs.map((song) => {
            const isVoted = activeVote === song.id;

            return (
              <div
                key={song.id}
                className="card-modern"
                style={{
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isVoted ? 'var(--color-orange-soft)' : 'var(--bg-card-subtle)',
                  borderColor: isVoted ? 'var(--color-orange)' : 'var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <img src={song.cover} alt={song.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.86rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>
                      {song.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {song.artist}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleQuickVote(song.id)}
                  className={isVoted ? "btn-primary" : "btn-secondary"}
                  style={{
                    padding: '5px 12px',
                    fontSize: '0.74rem',
                    minHeight: '32px',
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
