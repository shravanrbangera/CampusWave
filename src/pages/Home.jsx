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
  Bookmark,
  Search, 
  X,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { mockLiveShow } from '../data/music';
import { mockPodcasts } from '../data/podcasts';
import { mockVotingData } from '../data/voting';
import { mockRJs } from '../data/rjs';
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
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';

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
        particleCount: 40,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#F15A24', '#F4C542', '#123D2C']
      });
    } catch (e) {}
    setVotedToast(true);
    setTimeout(() => setVotedToast(false), 2200);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (homeSearch.trim()) {
      navigate(`/podcasts?q=${encodeURIComponent(homeSearch.trim())}`);
    }
  };

  // Quick Action circle items (matching user reference Image 1)
  const quickActions = [
    { label: 'Live Radio', to: '/live', icon: Radio, bg: '#E8F3FF', color: '#1971C2' },
    { label: 'Podcasts', to: '/podcasts', icon: Mic2, bg: '#FFF0E6', color: '#F15A24' },
    { label: 'Vote Song', to: '/vote', icon: Vote, bg: '#F3E8FF', color: '#7950F2' },
    { label: 'Saved Vault', to: '/saved', icon: Bookmark, bg: '#E6FCF5', color: '#0CA678' }
  ];

  return (
    <div 
      className="home-dashboard page-wrapper" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'clamp(20px, 3.5vw, 28px)',
        paddingTop: 'clamp(6px, 1.5vw, 12px)'
      }}
    >
      {/* 1. Top Clean Search Bar (Matches Image 1) */}
      <form 
        onSubmit={handleSearchSubmit}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '680px',
          margin: '0 auto'
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
          placeholder="Search shows, podcasts, student RJs..."
          style={{
            width: '100%',
            padding: '12px 42px 12px 46px',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-primary)',
            fontSize: '15px',
            fontWeight: 500,
            outline: 'none',
            boxShadow: 'var(--shadow-sm)',
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
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0
            }}
            title="Clear"
          >
            <X size={15} />
          </button>
        )}
      </form>

      {/* 2. User Greeting Row (Matches Image 1 "Welcome, User") */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
            alt="Profile"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--border-color)'
            }}
          />
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Welcome,
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {firstName}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="editorial-badge">
            NMAMIT • 90.4 MHZ
          </span>
          <span 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '5px', 
              padding: '3px 9px', 
              borderRadius: 'var(--radius-full)', 
              backgroundColor: isLiveActive ? 'var(--color-orange)' : 'var(--color-forest)', 
              color: '#FFF', 
              fontSize: '0.7rem', 
              fontWeight: 800 
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#FFF', animation: 'pulse 1.2s infinite' }} />
            {isLiveActive ? "PLAYING" : "ON AIR"}
          </span>
        </div>
      </div>

      {/* 3. Quick Action Circles (Matches Image 1: History, Last added, Most played, Shuffle) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          margin: '2px 0 6px'
        }}
      >
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <Link
              key={idx}
              to={action.to}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                gap: '8px'
              }}
            >
              <div 
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: action.bg,
                  color: action.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'transform var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <Icon size={22} strokeWidth={2.2} />
              </div>
              <span 
                style={{ 
                  fontFamily: 'var(--font-heading)', 
                  fontSize: '0.74rem', 
                  fontWeight: 700, 
                  color: 'var(--text-primary)',
                  textAlign: 'center'
                }}
              >
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* 4. Live Broadcast Flagship Deck (Compact, music-first, Image 1 & 3) */}
      <section 
        className="card-forest"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
          {/* Vinyl / Cover */}
          <div 
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '12px',
              overflow: 'hidden',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            <img 
              src={mockLiveShow.cover} 
              alt={mockLiveShow.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {isLiveActive && (
              <span 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span className="sound-equalizer">
                  <span className="sound-bar" style={{ backgroundColor: '#FFF' }} />
                  <span className="sound-bar" style={{ backgroundColor: '#FFF' }} />
                  <span className="sound-bar" style={{ backgroundColor: '#FFF' }} />
                </span>
              </span>
            )}
          </div>

          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-yellow)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                90.4 FM • LIVE BROADCAST
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {mockLiveShow.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 248, 233, 0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Hosted by {mockLiveShow.rj}
            </div>
          </div>
        </div>

        {/* Play Button & Details Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={handleLivePlay}
            style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-orange)',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 14px var(--color-orange-glow)',
              transition: 'transform var(--transition-fast)'
            }}
            title={isLiveActive ? "Pause" : "Listen Live"}
          >
            {isLiveActive ? <Pause size={20} fill="#FFF" /> : <Play size={20} fill="#FFF" style={{ marginLeft: '2px' }} />}
          </button>

          <Link
            to="/live"
            style={{
              padding: '8px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-full)',
              textDecoration: 'none',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            Studio
          </Link>
        </div>
      </section>

      {/* 5. Top Student RJs (Matches Image 1 "Top artists") */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.08rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Student RJs
          </h2>
          <Link 
            to="/live" 
            style={{ fontSize: '0.8rem', color: 'var(--color-orange)', textDecoration: 'none', fontWeight: 700 }}
          >
            Studio Crew
          </Link>
        </div>

        {/* Circular Avatars Row */}
        <div 
          className="scroll-touch-pills"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          {mockRJs.map((rj) => (
            <Link
              key={rj.id}
              to="/live"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                minWidth: '78px'
              }}
            >
              <div 
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid var(--border-color)',
                  marginBottom: '6px',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'transform var(--transition-fast)'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img 
                  src={rj.avatar} 
                  alt={rj.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <span 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '78px'
                }}
              >
                {rj.name.replace('RJ ', '')}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. Top Shows & Podcasts (Matches Image 1 "Top albums" & Image 3) */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.08rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Featured Podcasts
          </h2>
          <Link 
            to="/podcasts" 
            style={{ fontSize: '0.8rem', color: 'var(--color-orange)', textDecoration: 'none', fontWeight: 700 }}
          >
            See All
          </Link>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '14px'
          }}
        >
          {mockPodcasts.slice(0, 3).map(podcast => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>

      {/* 7. Daily Song Voting (Matches Image 2 & 3 Playlist Card) */}
      <section 
        className="card-modern"
        style={{
          padding: '16px 18px',
          borderRadius: 'var(--radius-xl)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              DAILY SONG VOTING
            </div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, margin: '2px 0 0', color: 'var(--text-primary)' }}>
              Tonight's 9:00 PM Hostel Airplay
            </h3>
          </div>

          <Link
            to="/vote"
            style={{ fontSize: '0.78rem', color: 'var(--color-orange)', textDecoration: 'none', fontWeight: 700 }}
          >
            Vote Page
          </Link>
        </div>

        {votedToast && (
          <div style={{ padding: '8px 12px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-forest-soft)', color: 'var(--color-forest)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '10px' }}>
            Vote recorded! Airing tonight on 90.4 FM.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {mockVotingData.dailySongPoll.songs.slice(0, 3).map((song, idx) => {
            const isVoted = activeVote === song.id;

            return (
              <div
                key={song.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isVoted ? 'var(--color-orange-soft)' : 'var(--bg-card-subtle)',
                  border: isVoted ? '1px solid var(--color-orange)' : '1px solid var(--border-color)',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0, flex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: isVoted ? 'var(--color-orange)' : 'var(--text-muted)', width: '20px' }}>
                    0{idx + 1}
                  </span>
                  <img 
                    src={song.cover} 
                    alt={song.title} 
                    style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} 
                  />
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
                    minHeight: '32px',
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
