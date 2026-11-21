import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Radio, 
  Play, 
  Pause, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Compass, 
  Vote, 
  Flame,
  CheckCircle2,
  Calendar,
  Volume2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { mockLiveShow, mockMusic } from '../data/music';
import { mockPodcasts } from '../data/podcasts';
import { mockEvents } from '../data/events';
import { mockAnnouncements } from '../data/announcements';
import { mockVotingData } from '../data/voting';
import { PodcastCard } from '../components/PodcastCard';
import { MusicCard } from '../components/MusicCard';
import { EventCard } from '../components/EventCard';
import { VinylRecord } from '../components/VinylRecord';

export const Home = () => {
  const { user, votedPolls, castVote } = useAuth();
  const { isPlaying, playTrack, togglePlay, currentTrack } = useAudio();
  const [activeVote, setActiveVote] = useState(votedPolls['dailySong'] || null);
  const [votedToast, setVotedToast] = useState(false);

  const isLiveActive = currentTrack?.id === mockLiveShow.id && isPlaying;
  const firstName = user?.name ? user.name.split(' ')[0] : 'Student';

  // Dynamic contextual time greeting
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const handleLivePlay = () => {
    if (isLiveActive) {
      togglePlay();
    } else {
      playTrack(mockLiveShow);
    }
  };

  const handleVote = (songId) => {
    setActiveVote(songId);
    castVote('dailySong', songId);
    setVotedToast(true);
    setTimeout(() => setVotedToast(false), 2500);
  };

  return (
    <div className="home-dashboard page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
      {/* Greeting Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)', borderColor: 'var(--border-color)' }}>
              {user?.hostel ? `${user.hostel} • LIVE FEED` : "NMAMIT CAMPUS STREAM"}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.6rem)', color: 'var(--color-charcoal)' }}>
            {timeGreeting}, {firstName}! Ready to tune in?
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', marginTop: '4px' }}>
            {user?.role || "Student Listener"} • {user?.branch || "NMAMIT Nitte"}
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to="/explore" className="btn-secondary" style={{ padding: '9px 18px', fontSize: '0.86rem' }}>
            <Compass size={15} />
            <span>Discover Content</span>
          </Link>
          <Link to="/live" className="btn-primary" style={{ padding: '9px 18px', fontSize: '0.86rem' }}>
            <Radio size={15} />
            <span>Studio 90.4 FM</span>
          </Link>
        </div>
      </section>

      {/* Featured Live Broadcast Banner (Cinematic Deep Teal & Charcoal) */}
      <section>
        <div 
          className="card-modern"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'var(--radius-2xl)',
            background: 'linear-gradient(135deg, var(--color-teal) 0%, var(--color-charcoal) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: 'var(--space-2xl)',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Subtle Ambient Backlight */}
          <div 
            style={{
              position: 'absolute',
              top: '-20%',
              right: '5%',
              width: '380px',
              height: '380px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245, 45, 58, 0.28) 0%, transparent 70%)',
              filter: 'blur(50px)',
              pointerEvents: 'none'
            }}
          />

          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: 'var(--space-xl)',
              alignItems: 'center'
            }}
            className="hero-split-grid"
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span 
                  className="editorial-badge" 
                  style={{ backgroundColor: 'var(--color-coral)', color: '#fff', border: 'none' }}
                >
                  <span className="badge-live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                  {mockLiveShow.status}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.04em' }}>
                  {mockLiveShow.listenersCount} STUDENTS TUNED IN • 90.4 FM
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.3rem)', color: '#FFFFFF', marginBottom: '8px', lineHeight: 1.2 }}>
                {mockLiveShow.title}
              </h2>

              <p style={{ color: 'var(--color-amber)', fontSize: '0.98rem', fontWeight: 600, marginBottom: '12px' }}>
                Hosted by {mockLiveShow.rj} • {mockLiveShow.rjLabel}
              </p>

              <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '540px', marginBottom: '22px' }}>
                {mockLiveShow.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleLivePlay}
                  className="btn-primary"
                  style={{ padding: '11px 26px', fontSize: '0.92rem' }}
                >
                  {isLiveActive ? <Pause size={17} fill="#fff" /> : <Play size={17} fill="#fff" style={{ marginLeft: '2px' }} />}
                  <span>{isLiveActive ? "Pause Stream" : "Tune In Live (90.4 FM)"}</span>
                </button>

                <Link 
                  to="/live" 
                  className="btn-secondary"
                  style={{ 
                    padding: '11px 22px', 
                    fontSize: '0.92rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <span>Open Live Studio</span>
                  <ArrowRight size={15} />
                </Link>
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
                size={230} 
                albumTitle={mockLiveShow.title}
                showArm={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Continue Listening Bar */}
      {currentTrack && (
        <section>
          <div 
            className="card-modern"
            style={{
              padding: '14px 20px',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
              <img 
                src={currentTrack.cover} 
                alt={currentTrack.title}
                style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-coral)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                  CURRENT ACTIVE AUDIO
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-charcoal)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {currentTrack.title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {currentTrack.artist || currentTrack.host} • {currentTrack.duration}
                </div>
              </div>
            </div>

            <button
              onClick={togglePlay}
              className="btn-coral"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
              title={isPlaying ? "Pause" : "Resume"}
            >
              {isPlaying ? <Pause size={18} fill="#fff" /> : <Play size={18} fill="#fff" style={{ marginLeft: '2px' }} />}
            </button>
          </div>
        </section>
      )}

      {/* Recommended Podcasts Section */}
      <section>
        <div className="section-header">
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
              TAILORED FOR YOU
            </span>
            <h2 className="section-header-title" style={{ marginTop: '6px' }}>
              Recommended Podcasts
            </h2>
            <p className="section-header-subtitle">
              Based on your interests in Engineering, Robotics, and Campus Culture.
            </p>
          </div>
          <Link to="/podcasts" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
            <span>Explore All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-lg)'
          }}
        >
          {mockPodcasts.slice(0, 3).map(podcast => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>

      {/* Trending Student Music Tracks */}
      <section>
        <div className="section-header">
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'rgba(255, 181, 46, 0.15)', color: 'var(--color-charcoal)' }}>
              <Flame size={12} color="var(--color-coral)" />
              HOSTEL FAVORITES
            </span>
            <h2 className="section-header-title" style={{ marginTop: '6px' }}>
              Trending Campus Tracks
            </h2>
            <p className="section-header-subtitle">
              Most streamed original tracks across NMAMIT this week.
            </p>
          </div>
          <Link to="/explore" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
            <span>All Music</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          {mockMusic.slice(0, 4).map(track => (
            <MusicCard key={track.id} track={track} />
          ))}
        </div>
      </section>

      {/* Two Column Grid: Quick Campus Updates & Daily Music Vote */}
      <section 
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 'var(--space-xl)'
        }}
        className="hero-split-grid"
      >
        {/* Quick Campus Updates */}
        <div className="card-modern" style={{ padding: 'var(--space-xl)', borderRadius: 'var(--radius-2xl)', backgroundColor: 'var(--color-white)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div>
              <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>BULLETIN</span>
              <h3 style={{ fontSize: '1.3rem', marginTop: '6px', color: 'var(--color-charcoal)' }}>Campus Bulletins</h3>
            </div>
            <Link to="/campus" style={{ color: 'var(--color-coral)', fontSize: '0.84rem', fontWeight: 600 }}>
              View All →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockAnnouncements.slice(0, 3).map(ann => (
              <div 
                key={ann.id}
                style={{
                  padding: '16px',
                  backgroundColor: 'var(--color-soft-grey)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: ann.tag === 'NEW' ? '#16a34a' : 'var(--color-coral)',
                      backgroundColor: 'var(--color-white)',
                      border: '1px solid var(--border-color)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {ann.tag}
                  </span>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {ann.date}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.96rem', fontWeight: 700, marginBottom: '5px', lineHeight: 1.35, color: 'var(--color-charcoal)' }}>
                  {ann.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {ann.content.slice(0, 110)}...
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Music Vote Card (Bento Style with Warm Accents) */}
        <div 
          className="card-modern" 
          style={{ 
            padding: 'var(--space-xl)', 
            borderRadius: 'var(--radius-2xl)',
            backgroundColor: 'var(--color-white)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="editorial-badge" style={{ backgroundColor: 'rgba(245, 45, 58, 0.1)', color: 'var(--color-coral)' }}>
              <Vote size={12} />
              DAILY POLL
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              AIRS AT 9:00 PM
            </span>
          </div>

          <h3 style={{ fontSize: '1.3rem', marginBottom: '6px', color: 'var(--color-charcoal)' }}>
            Tonight's Setlist Choice
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            {mockVotingData.dailySongPoll.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mockVotingData.dailySongPoll.songs.map(song => {
              const isSelected = activeVote === song.id;
              const total = mockVotingData.dailySongPoll.totalVotes + (activeVote ? 1 : 0);
              const songVotes = song.votes + (isSelected ? 1 : 0);
              const pct = Math.round((songVotes / total) * 100);

              return (
                <div
                  key={song.id}
                  onClick={() => handleVote(song.id)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: isSelected ? 'rgba(245, 45, 58, 0.08)' : 'var(--color-soft-grey)',
                    border: isSelected ? '2px solid var(--color-coral)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${pct}%`,
                      backgroundColor: isSelected ? 'rgba(245, 45, 58, 0.12)' : 'rgba(0,0,0,0.03)',
                      zIndex: 0,
                      transition: 'width 0.4s ease'
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={song.cover} alt={song.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: isSelected ? 'var(--color-coral)' : 'var(--color-charcoal)' }}>
                        {song.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {song.artist}
                      </div>
                    </div>
                  </div>
                  <span style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: isSelected ? 'var(--color-coral)' : 'var(--text-secondary)' }}>
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>

          {votedToast && (
            <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#16a34a', textAlign: 'center', fontWeight: 600 }}>
              ✓ Vote submitted for tonight's radio broadcast!
            </div>
          )}

          <div style={{ marginTop: '18px', textAlign: 'center' }}>
            <Link to="/community" style={{ color: 'var(--color-coral)', fontSize: '0.84rem', fontWeight: 600 }}>
              Go to Community Voting Hub →
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Campus Events Row */}
      <section>
        <div className="section-header">
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
              CAMPUS CALENDAR
            </span>
            <h2 className="section-header-title" style={{ marginTop: '6px' }}>
              Upcoming NMAMIT Events
            </h2>
            <p className="section-header-subtitle">
              Don't miss cultural nights, coding hackathons, and guest lectures.
            </p>
          </div>
          <Link to="/campus" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.84rem' }}>
            <span>Full Calendar</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: 'var(--space-lg)'
          }}
        >
          {mockEvents.slice(0, 3).map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};
