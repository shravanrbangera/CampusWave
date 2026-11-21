import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mic2, Search, Filter, Sparkles, ArrowRight, User, Play, Clock, Flame, Zap, X } from 'lucide-react';
import { mockPodcasts, podcastCategories } from '../data/podcasts';
import { mockRJs } from '../data/rjs';
import { PodcastCard } from '../components/PodcastCard';
import { useAudio } from '../context/AudioContext';

export const Podcasts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const { playTrack } = useAudio();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const filteredPodcasts = mockPodcasts.filter(pod => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      pod.title.toLowerCase().includes(q) ||
      pod.host.toLowerCase().includes(q) ||
      pod.description.toLowerCase().includes(q) ||
      pod.category.toLowerCase().includes(q);
    const matchesCat = selectedCategory === 'All' || pod.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featured = mockPodcasts[0];

  return (
    <div className="podcasts-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Top Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span className="retro-pill retro-pill-orange">
            VOICE CRATES // 90.4 MHZ
          </span>
          <span className="retro-pill retro-pill-yellow">
            STUDENT VOICES
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            NMAMIT STUDENT BROADCASTS
          </span>
        </div>

        <h1 
          style={{ 
            fontFamily: 'var(--font-retro)',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            letterSpacing: '0.02em',
            marginTop: '8px', 
            marginBottom: '10px', 
            color: 'var(--text-primary)',
            textShadow: '2px 2px 0 var(--color-retro-shadow, rgba(201, 42, 42, 0.25))'
          }}
        >
          STUDENT <span style={{ color: 'var(--color-orange)' }}>PODCASTS</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', fontWeight: 500, maxWidth: '680px', marginBottom: '20px', lineHeight: 1.6 }}>
          Real engineering discussions, hostel chronicles, tech debates, and placement insights recorded right on campus.
        </p>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '280px', maxWidth: '520px' }}>
            <Search 
              size={18} 
              color="var(--text-muted)" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search episodes, topics or hosts..."
              style={{
                width: '100%',
                padding: '12px 42px 12px 46px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--text-primary)',
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
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
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
          </div>

          {/* Results count badge */}
          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {filteredPodcasts.length} {filteredPodcasts.length === 1 ? 'episode' : 'episodes'}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div 
          className="category-pills-row scroll-touch-pills"
          style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0' }}
        >
          {podcastCategories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={isSelected ? "btn-primary" : "btn-secondary"}
                style={{
                  padding: '7px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  minHeight: '36px'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Podcast Spotlight (Only when not searching) */}
      {!searchQuery && selectedCategory === 'All' && (
        <section 
          className="hero-split-grid podcast-spotlight-card card-modern"
          style={{
            padding: 'var(--space-2xl)',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, var(--color-teal) 0%, #0F1216 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: 'var(--shadow-md)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 'var(--space-2xl)',
            alignItems: 'center',
            color: '#FFFFFF'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--color-orange)',
                  color: '#FFFFFF',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 12px'
                }}
              >
                <Flame size={13} color="#fff" />
                FEATURED SPOTLIGHT
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-amber)' }}>
                ⏱️ {featured.duration}
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-retro)', fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--color-retro-yellow)', letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: '10px', textShadow: '1px 1px 0 rgba(0,0,0,0.6)' }}>
              {featured.title}
            </h2>

            <div style={{ fontSize: '0.9rem', color: '#FFB52E', fontWeight: 700, marginBottom: '12px' }}>
              HOSTED BY {featured.host} • {featured.hostRole}
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '22px', maxWidth: '520px' }}>
              {featured.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => playTrack(featured)}
                className="btn-primary"
                style={{
                  backgroundColor: 'var(--color-orange)',
                  padding: '12px 24px',
                  fontSize: '0.88rem'
                }}
              >
                <Play size={17} fill="#FFF" />
                <span>PLAY EPISODE</span>
              </button>

              <Link
                to={`/podcast/${featured.id}`}
                className="btn-secondary"
                style={{ 
                  padding: '12px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  borderColor: 'rgba(255, 255, 255, 0.25)',
                  fontSize: '0.86rem',
                  textDecoration: 'none'
                }}
              >
                <span>AI BREAKDOWN</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '18px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.18)' }}>
            <img 
              src={featured.cover} 
              alt={featured.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </section>
      )}

      {/* Episodes Grid or No Results */}
      {filteredPodcasts.length > 0 ? (
        <section>
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {filteredPodcasts.map(podcast => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </section>
      ) : (
        <div 
          className="card-modern"
          style={{
            padding: 'var(--space-3xl) var(--space-xl)',
            textAlign: 'center',
            borderRadius: '24px',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-orange-soft)', color: 'var(--color-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Search size={28} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
            No episodes found matching "{searchQuery}"
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', maxWidth: '440px', margin: '0 auto 20px' }}>
            Try searching with a different topic, host name, or select "All" categories to browse the complete catalogue.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSearchParams({});
            }}
            className="btn-primary"
          >
            Clear Search & Filters
          </button>
        </div>
      )}

      {/* Student Hosts & RJs Carousel Strip */}
      <section>
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <div>
            <span className="retro-pill retro-pill-blue" style={{ marginBottom: '6px' }}>
              VOICES OF NMAMIT
            </span>
            <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-retro)', letterSpacing: '0.02em' }}>
              Featured Student Hosts & RJs
            </h2>
          </div>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          {mockRJs.slice(0, 4).map(rj => (
            <div
              key={rj.id}
              className="card-modern"
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <img 
                src={rj.avatar} 
                alt={rj.name}
                style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-orange)', flexShrink: 0 }}
              />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {rj.name}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--color-orange)', fontWeight: 600 }}>
                  {rj.role}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {rj.showsCount} episodes
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
