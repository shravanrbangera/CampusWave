import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  ArrowLeft, 
  ArrowRight, 
  Radio, 
  Zap, 
  Flame, 
  Music, 
  Sparkles,
  Volume2
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { mockPodcasts } from '../data/podcasts';
import { mockMusic } from '../data/music';

export const BrutalistSoundSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  const slides = [
    {
      id: '01',
      tag: 'LAYOUT 01 // HOSTELLER DROPS',
      title: 'MIDNIGHT LOFI & CHILL SESSIONS',
      subtitle: 'Recorded live at Netravati Block B • Student acoustic jams & chill beats',
      category: 'HOSTEL INDIE',
      bg: 'var(--color-acid)',
      textColor: '#000000',
      tagBg: '#000000',
      tagColor: 'var(--color-acid)',
      track: mockMusic[0], // Midnight Chai & Code
      badge: '90.4 EXCLUSIVE',
      meta: 'BPM 84 • 320 KBPS • NMAMIT RESIDENT PRODUCER'
    },
    {
      id: '02',
      tag: 'LAYOUT 02 // LAB VOICES',
      title: 'THE CODE LAB CHRONICLES',
      subtitle: 'Deep tech, open source debates & campus hackathon survivors',
      category: 'DEV TALK',
      bg: 'var(--color-paper)',
      textColor: '#000000',
      tagBg: 'var(--color-coral)',
      tagColor: '#FFFFFF',
      track: mockPodcasts[0], // The Campus Byte
      badge: 'EPISODE 42 ON AIR',
      meta: 'HOSTED BY AARAV • 28 MINS • AUDIO DIGEST READY'
    },
    {
      id: '03',
      tag: 'LAYOUT 03 // PEAK TRANSMISSION',
      title: 'INCRIEDA HIGH VOLTAGE BEATS',
      subtitle: 'Official festival anthem drops, EDM drops & campus stage mixes',
      category: 'ELECTRONIC',
      bg: '#000000',
      textColor: '#FFFFFF',
      tagBg: 'var(--color-cyan)',
      tagColor: '#000000',
      track: mockMusic[2], // Karkala Rain Loop
      badge: 'CROWD FAVORITE',
      meta: 'SYNTH & PERCUSSION • BASS DROP READY • ZERO FADE'
    }
  ];

  const current = slides[activeSlide];

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const isCurrentPlaying = currentTrack?.id === current.track.id && isPlaying;

  const handleTogglePlay = () => {
    if (currentTrack?.id === current.track.id) {
      togglePlay();
    } else {
      playTrack(current.track);
    }
  };

  return (
    <section 
      style={{ 
        padding: 'var(--space-2xl) 0', 
        borderBottom: '3px solid #000000',
        backgroundColor: 'var(--color-paper)',
        position: 'relative'
      }}
      className="grid-bg"
    >
      <div className="page-wrapper">
        {/* Section Header */}
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px', 
            marginBottom: 'var(--space-xl)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span 
              className="highlight-acid"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.08em'
              }}
            >
              01 // NEO-BRUTALIST AUDIO DECK
            </span>
            <span 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                color: 'var(--text-muted)',
                fontWeight: 600
              }}
            >
              SNAP CAROUSEL • NO-DELAY
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
            <h2 
              className="font-black"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                textTransform: 'uppercase',
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: '#000000',
                margin: 0
              }}
            >
              BRUTALIST <span className="highlight-acid">SLIDER</span>
            </h2>
            <p 
              style={{ 
                maxWidth: '460px', 
                fontSize: '0.94rem', 
                color: '#333333', 
                fontWeight: 600,
                lineHeight: 1.45,
                margin: 0
              }}
            >
              High-contrast student audio cards that snap instantly with tactile physical feedback. Zero latency, all pulse.
            </p>
          </div>
        </div>

        {/* Carousel Container Rig */}
        <div 
          className="brutalist-slider-rig"
          style={{
            position: 'relative',
            backgroundColor: '#FFFFFF',
            border: '3px solid #000000',
            boxShadow: '8px 8px 0 #000000',
            padding: 'var(--space-xl) var(--space-lg)'
          }}
        >
          <div 
            className="slider-flex-wrapper"
            style={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            {/* Square PREV Arrow Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="btn-brutal slider-arrow-btn slider-arrow-prev"
              style={{
                width: '60px',
                height: '60px',
                minWidth: '60px',
                backgroundColor: '#FFFFFF',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
              }}
            >
              <ArrowLeft size={28} strokeWidth={3} />
            </button>

            {/* Central Brutalist Slide Panel */}
            <div 
              className="shadow-panel slider-content-panel"
              style={{
                flex: '1 1 600px',
                maxWidth: '820px',
                backgroundColor: current.bg,
                color: current.textColor,
                border: '3px solid #000000',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) auto',
                alignItems: 'stretch',
                minHeight: '340px'
              }}
            >
              {/* Copy & Playback Content Cell */}
              <div 
                className="slider-content-body"
                style={{
                  padding: 'var(--space-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    <span 
                      style={{
                        backgroundColor: current.tagBg,
                        color: current.tagColor,
                        padding: '4px 10px',
                        border: '2px solid #000000',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        letterSpacing: '0.06em'
                      }}
                    >
                      {current.tag}
                    </span>

                    <span 
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: '#000000',
                        padding: '3px 8px',
                        border: '2px solid #000000',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 700
                      }}
                    >
                      {current.badge}
                    </span>
                  </div>

                  <h3 
                    className="font-black"
                    style={{
                      fontSize: 'clamp(1.75rem, 3.8vw, 2.6rem)',
                      lineHeight: 1.05,
                      textTransform: 'uppercase',
                      marginBottom: '10px',
                      color: current.textColor
                    }}
                  >
                    {current.title}
                  </h3>

                  <p 
                    style={{
                      fontSize: '0.96rem',
                      lineHeight: 1.5,
                      fontWeight: 600,
                      opacity: 0.9,
                      maxWidth: '520px'
                    }}
                  >
                    {current.subtitle}
                  </p>
                </div>

                {/* Audio Action Deck */}
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '14px',
                    paddingTop: '16px',
                    borderTop: `2px dashed ${current.textColor === '#FFFFFF' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)'}`
                  }}
                >
                  <button
                    onClick={handleTogglePlay}
                    className="btn-brutal"
                    style={{
                      padding: '10px 22px',
                      backgroundColor: current.textColor === '#FFFFFF' ? 'var(--color-acid)' : '#000000',
                      color: current.textColor === '#FFFFFF' ? '#000000' : '#FFFFFF',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.9rem'
                    }}
                  >
                    {isCurrentPlaying ? (
                      <>
                        <Pause size={17} fill="currentColor" />
                        <span>PAUSE TRACK</span>
                      </>
                    ) : (
                      <>
                        <Play size={17} fill="currentColor" />
                        <span>PREVIEW DROP</span>
                      </>
                    )}
                  </button>

                  <span 
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      opacity: 0.85
                    }}
                  >
                    {current.meta}
                  </span>
                </div>
              </div>

              {/* Inverted Giant Numeral Index Block */}
              <div 
                className="slider-numeral-block"
                style={{
                  width: '130px',
                  backgroundColor: '#000000',
                  color: 'var(--color-acid)',
                  borderLeft: '3px solid #000000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  position: 'relative'
                }}
              >
                <div 
                  className="font-black"
                  style={{
                    fontSize: 'clamp(4rem, 8vw, 6rem)',
                    lineHeight: 0.85,
                    letterSpacing: '-0.04em',
                    userSelect: 'none'
                  }}
                >
                  {current.id}
                </div>
                <div 
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    color: '#FFFFFF',
                    marginTop: '8px',
                    textAlign: 'center'
                  }}
                >
                  SLOT / 03
                </div>
              </div>
            </div>

            {/* Square NEXT Arrow Button */}
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="btn-brutal slider-arrow-btn slider-arrow-next"
              style={{
                width: '60px',
                height: '60px',
                minWidth: '60px',
                backgroundColor: '#000000',
                color: 'var(--color-acid)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center'
              }}
            >
              <ArrowRight size={28} strokeWidth={3} />
            </button>
          </div>

          {/* Row of Square Index Buttons */}
          <div 
            className="slider-index-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: 'var(--space-xl)'
            }}
          >
            {slides.map((s, idx) => {
              const isSelected = activeSlide === idx;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSlide(idx)}
                  className="btn-brutal"
                  style={{
                    width: '44px',
                    height: '44px',
                    backgroundColor: isSelected ? '#000000' : '#FFFFFF',
                    color: isSelected ? 'var(--color-acid)' : '#000000',
                    fontSize: '1rem',
                    boxShadow: isSelected ? '2px 2px 0 #000' : '4px 4px 0 #000',
                    transform: isSelected ? 'translate(2px, 2px)' : 'none'
                  }}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrutalistSoundSlider;

