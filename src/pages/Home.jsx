import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Music,
  Search,
  X
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
    <div className="home-dashboard page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* 1. Header & Welcome Message with Funky Student Sticker */}
      <section 
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
          paddingBottom: 'var(--space-md)',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="sticker-tag sticker-tag-orange">
              ⚡ 90.4 DIGITAL FM
            </span>
            <span className="sticker-tag" style={{ transform: 'rotate(1deg)' }}>
              HELLO! 👋
            </span>
            <span style={{ fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {user?.hostel || "NETRAVATI BLOCK • CAMPUS STREAM"}
            </span>
          </div>

          <h1 
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: 'var(--font-size-hero)', 
              color: 'var(--text-primary)', 
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              margin: '6px 0 8px'
            }}
          >
            {timeGreeting}, <span style={{ color: 'var(--color-orange)' }}>{firstName}</span>!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', fontWeight: 500, maxWidth: '640px', lineHeight: 1.5 }}>
            Live student radio broadcasts, engineering chronicles, and daily hostel playlists. Less clutter, more listening.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <Link 
            to="/live" 
            className="btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <Radio size={16} />
            <span>TUNE IN (90.4 FM)</span>
          </Link>
          <Link 
            to="/podcasts" 
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            <Mic2 size={16} />
            <span>PODCASTS</span>
          </Link>
        </div>
      </section>

      {/* 2. Compact Search Bar (Requested for easy discovery on mobile & desktop) */}
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
            size={18} 
            color="var(--text-muted)" 
            style={{
              position: 'absolute',
              left: '16px',
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
              padding: '12px 44px 12px 46px',
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
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Clear search"
            >
              <X size={16} />
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
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #123C40 0%, #0F1216 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: 'var(--shadow-md)',
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
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#FFF', animation: 'pulse 1.2s infinite' }} />
                  {mockLiveShow.status}
                </span>

                <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.9)', letterSpacing: '0.04em', fontWeight: 600 }}>
                  {mockLiveShow.listenersCount} STUDENTS TUNED IN • {mockLiveShow.frequency}
                </span>
              </div>

              {/* Show Title */}
              <h2 style={{ fontSize: 'var(--font-size-section-heading)', color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.2, fontFamily: 'var(--font-heading)', fontWeight: 800 }}>
                {mockLiveShow.title}
              </h2>

              {/* Host & Studio Info */}
              <p style={{ color: '#FFB52E', fontSize: '0.92rem', fontWeight: 700, marginBottom: '10px' }}>
                Hosted by {mockLiveShow.rj} • {mockLiveShow.rjLabel}
              </p>

              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.9rem', lineHeight: 1.55, maxWidth: '520px', marginBottom: '20px' }}>
                {mockLiveShow.description}
              </p>

              {/* Audio Controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '14px' }}>
                <button
                  onClick={handleLivePlay}
                  className="btn-primary"
                  style={{
                    backgroundColor: 'var(--color-orange)',
                    padding: '12px 24px',
                    fontSize: '0.9rem'
                  }}
                >
                  {isLiveActive ? <Pause size={18} fill="#FFF" /> : <Play size={18} fill="#FFF" style={{ marginLeft: '2px' }} />}
                  <span>{isLiveActive ? "PAUSE STREAM" : "TUNE IN LIVE (90.4 FM)"}</span>
                </button>

                <Link 
                  to="/live" 
                  className="btn-secondary"
                  style={{ 
                    padding: '12px 20px', 
                    fontSize: '0.88rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                    textDecoration: 'none'
                  }}
                >
                  <span>STUDIO DASHBOARD</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              {/* Clarity Notice */}
              <div style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.65)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Volume2 size={13} color="var(--color-orange)" />
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
                size={220} 
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
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--color-orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-orange)' }}>
            <Clock size={19} />
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              NEXT BROADCAST AT {upcomingShow.time}
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
          VIEW FULL SCHEDULE →
        </Link>
      </section>

      {/* 5. Quick Access to Saved Episodes (Only rendered when student has saved episodes) */}
      {savedItems.length > 0 && (
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bookmark size={18} color="var(--color-orange)" />
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                QUICK ACCESS: SAVED EPISODES
              </h2>
            </div>
            <Link to="/saved" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-orange)', textDecoration: 'none' }}>
              Open Vault ({savedItems.length}) →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
            {savedItems.slice(0, 3).map(ep => (
              <div
                key={ep.id}
                className="card-modern"
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <img src={ep.cover} alt={ep.title} style={{ width: '44px', height: '44px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>
                      {ep.title}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                      {ep.host} • {ep.duration}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => playTrack(ep)}
                  className="btn-icon"
                  style={{
                    width: '36px',
                    height: '36px',
                    minWidth: '36px',
                    minHeight: '36px',
                    backgroundColor: 'var(--color-orange)',
                    color: '#FFF',
                    border: 'none',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                  title="Play episode"
                >
                  <Play size={15} fill="#FFF" style={{ marginLeft: '2px' }} />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Featured Podcasts & Latest Episodes */}
      <section>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              CAMPUS DISCUSSIONS // PODCASTS
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-section-heading)', fontWeight: 800, margin: '4px 0 0', color: 'var(--text-primary)' }}>
              FEATURED EPISODES
            </h2>
          </div>
          <Link 
            to="/podcasts" 
            className="btn-secondary"
            style={{ 
              padding: '8px 16px',
              fontSize: '0.82rem',
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

      {/* 7. Daily Playlist Voting Preview */}
      <section 
        className="card-modern"
        style={{
          borderRadius: '24px',
          padding: 'var(--space-xl)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Vote size={14} /> PLAYLIST VOTING PREVIEW
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 0', color: 'var(--text-primary)' }}>
              Tonight's Prime Hour Track Vote
            </h3>
          </div>

          <Link
            to="/vote"
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
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
                className="card-modern"
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: isVoted ? 'var(--color-orange-soft)' : 'var(--bg-card-subtle)',
                  borderColor: isVoted ? 'var(--color-orange)' : 'var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <img src={song.cover} alt={song.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
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
