import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Compass, 
  ArrowRight, 
  Sparkles, 
  Headphones, 
  Vote, 
  ExternalLink,
  Mic2,
  Music,
  Bell,
  Play,
  Pause,
  Flame,
  Clock,
  ChevronRight
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { mockPodcasts } from '../data/podcasts';
import { mockMusic, mockLiveShow } from '../data/music';
import { mockEvents } from '../data/events';
import { mockSummaries } from '../data/summaries';
import { mockVotingData } from '../data/voting';
import { PodcastCard } from '../components/PodcastCard';
import { MusicCard } from '../components/MusicCard';
import { EventCard } from '../components/EventCard';
import { SummaryCard } from '../components/SummaryCard';
import { VinylRecord } from '../components/VinylRecord';
import { AudioWaveform } from '../components/AudioWaveform';
import { AxonCanvas } from '../components/AxonCanvas';
import { LiquidEther } from '../components/LiquidEther';
import { BrutalistSoundSlider } from '../components/BrutalistSoundSlider';
import { RetroConsoleDeck } from '../components/RetroConsoleDeck';
import { MarqueeTicker } from '../components/MarqueeTicker';

export const Landing = () => {
  const navigate = useNavigate();
  const { isPlaying, playTrack, togglePlay, currentTrack } = useAudio();
  const { votedPolls, castVote } = useAuth();
  const [activePollVote, setActivePollVote] = useState(votedPolls['dailySong'] || null);
  const [voteFeedback, setVoteFeedback] = useState(false);

  // LiquidEther Color Themes
  const etherPalettes = {
    acid: ['#e8ff00', '#F52D3A', '#00f0ff', '#123C40'],
    cherry: ['#F52D3A', '#FFB52E', '#ff007f', '#202020'],
    midnight: ['#5227FF', '#FF9FFC', '#00e5ff', '#123C40'],
    retro: ['#FFB52E', '#00f5d4', '#7b2cbf', '#f15bb5']
  };
  const [activePalette, setActivePalette] = useState('acid');
  const [heroMode, setHeroMode] = useState('console'); // 'console' | 'vinyl'

  const isLivePlaying = currentTrack?.id === mockLiveShow.id && isPlaying;

  const handleTuneInLive = () => {
    playTrack(mockLiveShow);
    navigate('/live');
  };

  const handleVote = (songId) => {
    setActivePollVote(songId);
    castVote('dailySong', songId);
    setVoteFeedback(true);
    setTimeout(() => setVoteFeedback(false), 3000);
  };

  return (
    <div className="landing-page" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* =========================================================================
          HERO SECTION — LARGE ROUNDED HERO CONTAINER WITH BENTO INSPIRATION
          ========================================================================= */}
      <section style={{ padding: 'var(--space-xl) var(--space-lg) var(--space-2xl)' }}>
        <div 
          className="hero-container"
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            borderRadius: 'var(--radius-2xl)',
            backgroundColor: 'var(--color-white)',
            border: '1.5px solid var(--color-border)',
            boxShadow: 'var(--shadow-card)',
            position: 'relative',
            overflow: 'hidden',
            padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)'
          }}
        >
          {/* Oversized Background Typography (Ghost Text) */}
          <div 
            className="ghost-typography"
            style={{
              top: '-15px',
              right: '2%',
              fontSize: 'clamp(6rem, 16vw, 15rem)',
              opacity: 0.8
            }}
          >
            WAVE
          </div>

          <div 
            className="ghost-typography"
            style={{
              bottom: '-25px',
              left: '5%',
              fontSize: 'clamp(4rem, 10vw, 8rem)',
              opacity: 0.5
            }}
          >
            90.4 FM
          </div>

          {/* Interactive LiquidEther WebGL Fluid Simulation Background */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              opacity: 0.75,
              pointerEvents: 'auto'
            }}
          >
            <LiquidEther 
              colors={etherPalettes[activePalette]}
              mouseForce={30}
              cursorSize={110}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.4}
              resolution={0.5}
              BFECC={true}
            />
          </div>

          <div 
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: 'var(--space-2xl)',
              alignItems: 'center'
            }}
            className="hero-split-grid"
          >
            {/* Left Hero Column */}
            <div>
              {/* Fluid Synth Theme Switcher Pills */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  marginBottom: '16px', 
                  flexWrap: 'wrap' 
                }}
              >
                <span 
                  style={{ 
                    fontFamily: 'var(--font-mono)', 
                    fontSize: '0.72rem', 
                    fontWeight: 800, 
                    color: '#000000', 
                    backgroundColor: 'var(--color-acid)', 
                    padding: '3px 8px', 
                    border: '2px solid #000000' 
                  }}
                >
                  ⚡ FLUID MIXER:
                </span>
                {Object.keys(etherPalettes).map((pKey) => (
                  <button
                    key={pKey}
                    onClick={() => setActivePalette(pKey)}
                    className="btn-brutal"
                    style={{
                      padding: '3px 10px',
                      fontSize: '0.7rem',
                      backgroundColor: activePalette === pKey ? '#000000' : '#FFFFFF',
                      color: activePalette === pKey ? 'var(--color-acid)' : '#000000',
                      border: '2px solid #000000',
                      boxShadow: activePalette === pKey ? '2px 2px 0 #000' : '3px 3px 0 #000'
                    }}
                  >
                    {pKey.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Editorial Pill */}
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#000000',
                  color: 'var(--color-acid)',
                  border: '2px solid #000000',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-full)',
                  marginBottom: '18px',
                  boxShadow: '3px 3px 0 #000000'
                }}
              >
                <span 
                  className="badge-live-pulse"
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-acid)',
                    display: 'inline-block'
                  }}
                />
                <span 
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    color: 'var(--color-acid)',
                    fontWeight: 800,
                    letterSpacing: '0.04em'
                  }}
                >
                  NMAMIT DIGITAL CAMPUS RADIO • 90.4 MHZ
                </span>
              </div>

              {/* Master Headline (Punchy, Crazy Student Typography) */}
              <h1 
                className="font-black editorial-title" 
                style={{ 
                  color: '#000000',
                  marginBottom: '18px',
                  lineHeight: 0.94,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em'
                }}
              >
                YOUR CAMPUS. <br />
                <span className="highlight-acid">YOUR SOUND.</span> <br />
                YOUR <span className="highlight-cyan">WAVE.</span>
              </h1>

              {/* Description */}
              <p 
                className="editorial-sub"
                style={{ 
                  marginBottom: '32px',
                  color: '#222222',
                  fontWeight: 600
                }}
              >
                Discover student talk shows, hosteller acoustic releases, hackathon live synthesis, and campus radio at NMAM Institute of Technology.
              </p>

              {/* Action Buttons */}
              <div 
                className="hero-actions-group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  flexWrap: 'wrap'
                }}
              >
                <Link 
                  to="/explore" 
                  className="btn-brutal" 
                  style={{ 
                    padding: '12px 28px', 
                    fontSize: '0.96rem',
                    backgroundColor: 'var(--color-acid)',
                    color: '#000000'
                  }}
                >
                  <Compass size={18} style={{ display: 'inline-block', marginRight: '6px' }} />
                  <span>EXPLORE CRATES</span>
                </Link>

                <button 
                  onClick={handleTuneInLive}
                  className="btn-brutal"
                  style={{ 
                    padding: '12px 24px', 
                    fontSize: '0.96rem',
                    backgroundColor: isLivePlaying ? '#000000' : '#FFFFFF',
                    color: isLivePlaying ? 'var(--color-acid)' : '#000000'
                  }}
                >
                  <Radio size={18} style={{ display: 'inline-block', marginRight: '6px' }} />
                  <span>{isLivePlaying ? 'ON AIR (TUNED IN)' : 'LISTEN LIVE 90.4'}</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div 
                className="hero-stats-row"
                style={{
                  marginTop: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '24px',
                  paddingTop: '20px',
                  borderTop: '2px solid #000000',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <div className="font-black" style={{ fontSize: '1.5rem', color: '#000000' }}>
                    340+
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: '#444444' }}>
                    HOSTEL STREAMERS
                  </div>
                </div>

                <div className="divider-line" style={{ width: '2px', height: '24px', background: '#000000' }} />

                <div>
                  <div className="font-black" style={{ fontSize: '1.5rem', color: '#000000' }}>
                    28
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: '#444444' }}>
                    STUDENT PODCASTS
                  </div>
                </div>

                <div className="divider-line" style={{ width: '2px', height: '24px', background: '#000000' }} />

                <div>
                  <div className="font-black" style={{ fontSize: '1.5rem', color: 'var(--color-coral)' }}>
                    90.4
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: '#444444' }}>
                    DIGITAL FM
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Interactive Console Deck OR 3D Turntable */}
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                zIndex: 2
              }}
            >
              {/* Dual Mode Switcher Tabs */}
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  marginBottom: '16px',
                  backgroundColor: '#FFFFFF',
                  padding: '4px',
                  border: '2px solid #000000',
                  boxShadow: '3px 3px 0 #000000'
                }}
              >
                <button
                  onClick={() => setHeroMode('console')}
                  className="btn-brutal"
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.75rem',
                    backgroundColor: heroMode === 'console' ? 'var(--color-acid)' : '#FFFFFF',
                    color: '#000000',
                    boxShadow: heroMode === 'console' ? '2px 2px 0 #000' : 'none',
                    border: '2px solid #000000'
                  }}
                >
                  🦖 RETRO CONSOLE
                </button>

                <button
                  onClick={() => setHeroMode('vinyl')}
                  className="btn-brutal"
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.75rem',
                    backgroundColor: heroMode === 'vinyl' ? '#000000' : '#FFFFFF',
                    color: heroMode === 'vinyl' ? 'var(--color-acid)' : '#000000',
                    boxShadow: heroMode === 'vinyl' ? '2px 2px 0 #000' : 'none',
                    border: '2px solid #000000'
                  }}
                >
                  💿 3D TURNTABLE
                </button>
              </div>

              {heroMode === 'console' ? (
                <RetroConsoleDeck />
              ) : (
                <div 
                  className="card-3d shadow-brutal"
                  style={{
                    background: 'linear-gradient(145deg, #123C40 0%, #0B2529 100%)',
                    padding: '34px 28px',
                    borderRadius: 'var(--radius-xl)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '400px',
                    position: 'relative',
                    border: '3px solid #000000'
                  }}
                >
                  {/* Vinyl Record */}
                  <VinylRecord 
                    isPlaying={isLivePlaying} 
                    coverImage={mockLiveShow.cover} 
                    size={240} 
                    albumTitle={mockLiveShow.title}
                    showArm={true}
                  />

                  {/* Live Card details */}
                  <div style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
                    <div 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: 'rgba(245, 45, 58, 0.2)',
                        color: 'var(--color-coral)',
                        border: '1px solid rgba(245, 45, 58, 0.4)',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 800,
                        marginBottom: '8px'
                      }}
                    >
                      <span className="badge-live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-coral)' }} />
                      LIVE ON TRANSMISSION
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                      {mockLiveShow.title}
                    </h3>

                    <p style={{ fontSize: '0.86rem', color: 'var(--color-amber)', fontWeight: 600 }}>
                      {mockLiveShow.rj} • Studio 1
                    </p>

                    <div 
                      style={{
                        marginTop: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                      }}
                    >
                      <button
                        onClick={handleTuneInLive}
                        className="btn-brutal"
                        style={{ 
                          padding: '8px 20px', 
                          fontSize: '0.84rem',
                          backgroundColor: 'var(--color-acid)',
                          color: '#000000'
                        }}
                      >
                        <Headphones size={15} style={{ display: 'inline-block', marginRight: '6px' }} />
                        <span>{isLivePlaying ? "Tuned In" : "Listen Now"}</span>
                      </button>
                      <Link 
                        to="/live" 
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF'
                        }}
                        title="Open Studio"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Ticker */}
      <MarqueeTicker />

      {/* Neo-Brutalist Sound Slider Section */}
      <BrutalistSoundSlider />

      {/* Secondary Reverse Marquee Ticker in Acid Yellow */}
      <MarqueeTicker 
        reverse={true} 
        bgColor="var(--color-acid)" 
        textColor="#000000" 
        speed="fast" 
      />

      {/* =========================================================================
          SECTION 2: BENTO GRID CATEGORY DISCOVERY (6 Distinct Cards)
          ========================================================================= */}
      <section style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="page-wrapper">
          <div className="section-header">
            <div>
              <span className="editorial-badge">AUDIO ECOSYSTEM</span>
              <h2 className="section-header-title" style={{ marginTop: '6px' }}>
                Discover By Category
              </h2>
              <p className="section-header-subtitle">
                Explore live transmissions, student voice series, original music, and campus alerts.
              </p>
            </div>
          </div>

          {/* Asymmetric Bento Grid (12 columns) */}
          <div 
            className="bento-category-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'var(--space-lg)'
            }}
          >
            {/* Bento Card 1: Live Radio (Col span 7 - Deep Teal Immersive) */}
            <Link
              to="/live"
              className="card-3d bento-card bento-card-7"
              style={{
                gridColumn: 'span 7',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-teal)',
                color: '#FFFFFF',
                padding: 'var(--space-2xl)',
                position: 'relative',
                overflow: 'hidden',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-card)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            >
              {/* Subtle background glow */}
              <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 45, 58, 0.3) 0%, transparent 70%)', filter: 'blur(35px)' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-coral)', color: '#FFF', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 800, marginBottom: '14px' }}>
                  <Radio size={12} />
                  LIVE ON AIR • 90.4 DIGITAL
                </div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '8px' }}>
                  Campus Live Radio
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.94rem', maxWidth: '440px', lineHeight: 1.5 }}>
                  Tune into resident RJ broadcasts, live hostel shoutouts, and real-time audio from Sambhram Studio.
                </p>
              </div>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-amber)', fontSize: '0.88rem', fontWeight: 700 }}>
                  <span>342 Listening Right Now</span>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#FFFFFF', fontWeight: 700, fontSize: '0.9rem' }}>
                  <span>Tune In</span>
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>

            {/* Bento Card 2: Student Podcasts (Col span 5 - Soft Cream Card) */}
            <Link
              to="/podcasts"
              className="card-3d bento-card bento-card-5"
              style={{
                gridColumn: 'span 5',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-cream)',
                color: 'var(--color-charcoal)',
                padding: 'var(--space-2xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-card)',
                border: '1.5px solid var(--color-border)',
                minHeight: '280px'
              }}
            >
              <div>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'var(--color-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', marginBottom: '16px' }}>
                  <Mic2 size={20} />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', color: 'var(--color-charcoal)' }}>
                  Student Podcasts
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.5 }}>
                  Tech chronicles, hostel debates, startup stories, and student host discussions.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-coral)', fontWeight: 700 }}>
                  28 EPISODES
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-charcoal)', fontWeight: 700, fontSize: '0.9rem' }}>
                  Browse Shows <ArrowRight size={16} />
                </span>
              </div>
            </Link>

            {/* Bento Card 3: Music Discovery (Col span 3) */}
            <Link
              to="/explore"
              className="card-3d bento-card bento-card-4"
              style={{
                gridColumn: 'span 3',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-white)',
                border: '1.5px solid var(--color-border)',
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--color-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-charcoal)', marginBottom: '14px' }}>
                  <Music size={19} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-charcoal)' }}>
                  Campus Music
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Original indie releases and coastal lo-fi beats.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>6 Tracks</span>
                <span style={{ color: 'var(--color-coral)', fontWeight: 700, fontSize: '0.88rem' }}>Listen →</span>
              </div>
            </Link>

            {/* Bento Card 4: Campus Updates (Col span 3) */}
            <Link
              to="/campus"
              className="card-3d bento-card bento-card-4"
              style={{
                gridColumn: 'span 3',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-white)',
                border: '1.5px solid var(--color-border)',
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--color-soft-grey)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-charcoal)', marginBottom: '14px' }}>
                  <Bell size={19} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-charcoal)' }}>
                  Campus Updates
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Incridea 2026 fest notices and hackathons.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-coral)', fontWeight: 600 }}>Active</span>
                <span style={{ color: 'var(--color-coral)', fontWeight: 700, fontSize: '0.88rem' }}>View →</span>
              </div>
            </Link>

            {/* Bento Card 5: AI Summaries (Col span 3) */}
            <Link
              to="/summaries"
              className="card-3d bento-card bento-card-4"
              style={{
                gridColumn: 'span 3',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-cream)',
                border: '1.5px solid var(--color-border)',
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'var(--color-coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', marginBottom: '14px' }}>
                  <Sparkles size={19} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-charcoal)' }}>
                  AI Summaries
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  3-minute digest cards of campus guest talks and labs.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Fast Digest</span>
                <span style={{ color: 'var(--color-coral)', fontWeight: 700, fontSize: '0.88rem' }}>Read →</span>
              </div>
            </Link>

            {/* Bento Card 6: Community Voting (Col span 3) */}
            <Link
              to="/community"
              className="card-3d bento-card bento-card-4"
              style={{
                gridColumn: 'span 3',
                borderRadius: 'var(--radius-xl)',
                backgroundColor: 'var(--color-white)',
                border: '1.5px solid var(--color-border)',
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '230px',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              <div>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: 'rgba(245, 45, 58, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-coral)', marginBottom: '14px' }}>
                  <Vote size={19} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '6px', color: 'var(--color-charcoal)' }}>
                  Student Voting
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Choose tonight's headline track and vote in polls.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-coral)', fontWeight: 600 }}>Daily Poll</span>
                <span style={{ color: 'var(--color-coral)', fontWeight: 700, fontSize: '0.88rem' }}>Vote →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FEATURED PODCASTS (Clean Editorial Cards)
          ========================================================================= */}
      <section style={{ padding: 'var(--space-2xl) 0', backgroundColor: 'transparent', borderTop: '2px solid #000', borderBottom: '2px solid #000' }}>
        <div className="page-wrapper">
          <div className="section-header">
            <div>
              <span className="editorial-badge">STUDENT VOICES</span>
              <h2 className="section-header-title" style={{ marginTop: '6px' }}>
                Featured Campus Podcasts
              </h2>
              <p className="section-header-subtitle">
                Original talk shows, lab discussions, and hostel stories produced by NMAMIT students.
              </p>
            </div>

            <Link to="/podcasts" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              <span>View All Episodes</span>
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
            {mockPodcasts.slice(0, 4).map(podcast => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FEATURED IMMERSIVE LIVE RADIO BANNER
          ========================================================================= */}
      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="page-wrapper">
          <div 
            className="card-3d"
            style={{
              borderRadius: 'var(--radius-2xl)',
              backgroundColor: 'var(--color-teal)',
              color: '#FFFFFF',
              padding: 'clamp(2rem, 4vw, 3.5rem)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(18, 60, 64, 0.35)',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: 'var(--space-2xl)',
              alignItems: 'center'
            }}
            className="hero-split-grid"
          >
            {/* Ambient Background Aura */}
            <div style={{ position: 'absolute', top: '-30%', right: '0%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 45, 58, 0.28) 0%, transparent 70%)', filter: 'blur(50px)' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span className="editorial-badge" style={{ backgroundColor: 'var(--color-coral)', color: '#FFFFFF', border: 'none', fontWeight: 800 }}>
                  <span className="badge-live-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />
                  {mockLiveShow.status}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                  {mockLiveShow.listenersCount} STUDENTS TUNED IN
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1.2, marginBottom: '8px' }}>
                {mockLiveShow.title}
              </h2>

              <p style={{ color: 'var(--color-amber)', fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>
                Hosted by {mockLiveShow.rj} • Studio 1
              </p>

              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.94rem', lineHeight: 1.6, maxWidth: '520px', marginBottom: '24px' }}>
                {mockLiveShow.description}
              </p>

              {/* Dynamic Waveform Visualizer */}
              <div style={{ maxWidth: '440px', marginBottom: '24px', backgroundColor: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
                <AudioWaveform height={44} barsCount={30} interactive={false} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleTuneInLive}
                  className="btn-coral"
                  style={{ padding: '12px 28px', fontSize: '0.95rem' }}
                >
                  {isLivePlaying ? <Pause size={18} fill="#FFF" /> : <Play size={18} fill="#FFF" style={{ marginLeft: '2px' }} />}
                  <span>{isLivePlaying ? "Pause Live Stream" : "Listen Now (90.4 FM)"}</span>
                </button>

                <Link
                  to="/live"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '12px 22px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700,
                    fontSize: '0.92rem'
                  }}
                >
                  <span>Open Studio Console</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right: Vinyl Record Visual */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <VinylRecord 
                isPlaying={isLivePlaying} 
                coverImage={mockLiveShow.cover} 
                size={270} 
                albumTitle={mockLiveShow.title}
                showArm={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: TRENDING CAMPUS MUSIC (Clean Modern Row Cards)
          ========================================================================= */}
      <section style={{ padding: 'var(--space-2xl) 0', backgroundColor: 'transparent', borderTop: '2px solid #000', borderBottom: '2px solid #000' }}>
        <div className="page-wrapper">
          <div className="section-header">
            <div>
              <span className="editorial-badge" style={{ backgroundColor: 'var(--color-amber-soft)', color: '#D97706', border: 'none' }}>
                <Flame size={12} />
                CAMPUS BEATS
              </span>
              <h2 className="section-header-title" style={{ marginTop: '6px' }}>
                Trending Student Music
              </h2>
              <p className="section-header-subtitle">
                Original bedroom tracks, acoustic ballads, and coastal lo-fi produced across NMAMIT.
              </p>
            </div>

            <Link to="/explore" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              <span>Explore All Tracks</span>
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
            {mockMusic.slice(0, 6).map(track => (
              <MusicCard key={track.id} track={track} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: AI SUMMARIES & DIGEST HIGHLIGHTS
          ========================================================================= */}
      <section style={{ padding: 'var(--space-3xl) 0' }}>
        <div className="page-wrapper">
          <div className="section-header">
            <div>
              <span className="editorial-badge" style={{ background: 'var(--color-coral)', color: '#FFFFFF', border: 'none' }}>
                <Sparkles size={12} />
                AI DIGESTS
              </span>
              <h2 className="section-header-title" style={{ marginTop: '6px' }}>
                Broadcast Summaries for Busy Students
              </h2>
              <p className="section-header-subtitle">
                Study for internals without missing campus discussions. Read concise 2-minute takeaways.
              </p>
            </div>

            <Link to="/summaries" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
              <span>Browse All Summaries</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {mockSummaries.slice(0, 2).map(summary => (
              <SummaryCard key={summary.id} summary={summary} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: COMMUNITY MUSIC VOTING (Interactive Poll Card)
          ========================================================================= */}
      <section style={{ padding: 'var(--space-2xl) 0 0' }}>
        <div className="page-wrapper">
          <div 
            className="card-3d"
            style={{
              padding: 'var(--space-2xl)',
              borderRadius: 'var(--radius-2xl)',
              background: 'linear-gradient(135deg, var(--color-white) 0%, var(--color-cream) 100%)',
              border: '1.5px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--space-2xl)',
                alignItems: 'center'
              }}
              className="hero-split-grid"
            >
              <div>
                <span className="editorial-badge" style={{ marginBottom: '10px' }}>
                  <Vote size={12} />
                  STUDENT CURATION
                </span>
                <h2 style={{ fontSize: '1.9rem', marginBottom: '10px', color: 'var(--color-charcoal)' }}>
                  Daily Radio Prime Hour Vote
                </h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '18px', fontSize: '0.94rem' }}>
                  {mockVotingData.dailySongPoll.question} Your votes decide what track RJ Ananya plays at tonight's 9:00 PM hostel hour!
                </p>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--color-coral)',
                    fontWeight: 700
                  }}
                >
                  <span>{mockVotingData.dailySongPoll.deadline}</span>
                  <span>•</span>
                  <span>{mockVotingData.dailySongPoll.totalVotes + (activePollVote ? 1 : 0)} votes cast</span>
                </div>

                <div style={{ marginTop: '22px' }}>
                  <Link to="/community" className="btn-secondary" style={{ padding: '9px 20px', fontSize: '0.88rem' }}>
                    <span>Open Song Request Box</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Voting Song Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {mockVotingData.dailySongPoll.songs.map(song => {
                  const isSelected = activePollVote === song.id;
                  const total = mockVotingData.dailySongPoll.totalVotes + (activePollVote ? 1 : 0);
                  const songVotes = song.votes + (isSelected ? 1 : 0);
                  const percentage = Math.round((songVotes / total) * 100);

                  return (
                    <div
                      key={song.id}
                      onClick={() => handleVote(song.id)}
                      style={{
                        padding: '13px 16px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isSelected ? 'var(--color-coral-soft)' : 'var(--color-white)',
                        border: isSelected ? '2px solid var(--color-coral)' : '1.5px solid var(--color-border)',
                        cursor: 'pointer',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all var(--transition-fast)',
                        boxShadow: 'var(--shadow-sm)'
                      }}
                    >
                      {/* Animated vote progress bar background */}
                      {isSelected && (
                        <div 
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            width: `${percentage}%`,
                            backgroundColor: 'rgba(245, 45, 58, 0.12)',
                            zIndex: 0,
                            transition: 'width 0.4s ease'
                          }}
                        />
                      )}

                      <div 
                        style={{
                          position: 'relative',
                          zIndex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <img 
                            src={song.cover} 
                            alt={song.title} 
                            style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} 
                          />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? 'var(--color-coral)' : 'var(--color-charcoal)' }}>
                              {song.title}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                              {song.artist} • {song.genre}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', fontWeight: 700, color: isSelected ? 'var(--color-coral)' : 'var(--text-muted)' }}>
                            {percentage}%
                          </span>
                          <button
                            style={{
                              padding: '5px 12px',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              backgroundColor: isSelected ? 'var(--color-coral)' : 'var(--color-soft-grey)',
                              color: isSelected ? '#FFFFFF' : 'var(--color-charcoal)',
                              cursor: 'pointer'
                            }}
                          >
                            {isSelected ? "Voted ✓" : "Vote"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {voteFeedback && (
                  <div 
                    style={{
                      backgroundColor: 'rgba(22, 163, 74, 0.12)',
                      border: '1px solid #16A34A',
                      color: '#16A34A',
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.84rem',
                      textAlign: 'center',
                      fontWeight: 600
                    }}
                  >
                    ✓ Your vote has been recorded for tonight's broadcast!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
