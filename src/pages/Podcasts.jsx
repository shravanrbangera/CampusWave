import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Search, Filter, Sparkles, ArrowRight, User, Play, Clock, Flame, Zap } from 'lucide-react';
import { mockPodcasts, podcastCategories } from '../data/podcasts';
import { mockRJs } from '../data/rjs';
import { PodcastCard } from '../components/PodcastCard';
import { useAudio } from '../context/AudioContext';

export const Podcasts = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { playTrack } = useAudio();

  const filteredPodcasts = mockPodcasts.filter(pod => {
    const matchesSearch = 
      pod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pod.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || pod.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featured = mockPodcasts[0];

  return (
    <div className="podcasts-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
      {/* Top Header */}
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
              backgroundColor: 'var(--color-acid)',
              color: '#000',
              border: '2px solid #000',
              borderRadius: '8px',
              padding: '4px 10px',
              boxShadow: '2px 2px 0 #000'
            }}
          >
            <Mic2 size={13} fill="#000" />
            VOICE CRATES // 90.4 MHZ
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: '#333' }}>
            NMAMIT STUDENT BROADCASTS
          </span>
        </div>

        <h1 
          style={{ 
            fontFamily: 'var(--font-black)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            marginTop: '8px', 
            marginBottom: '10px', 
            color: 'var(--color-ink)' 
          }}
        >
          STUDENT <span className="highlight-acid" style={{ border: '2px solid #000', borderRadius: '6px', padding: '0 8px' }}>PODCASTS</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.95rem', fontWeight: 600, maxWidth: '680px', marginBottom: '24px', lineHeight: 1.6 }}>
          Real engineering discussions, hostel chronicles, tech debates, and placement insights recorded right on campus.
        </p>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '280px', maxWidth: '520px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search episodes, topics or hosts..."
              style={{
                width: '100%',
                padding: '14px 18px 14px 48px',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid #000',
                boxShadow: '4px 4px 0 #000',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                color: '#000',
                outline: 'none'
              }}
            />
            <Search 
              size={20} 
              color="#000" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px 0' }}>
            {podcastCategories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className="btn-brutal"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'var(--color-acid)' : '#FFFFFF',
                    color: '#000000',
                    border: '2px solid #000',
                    boxShadow: isSelected ? '3px 3px 0 #000' : '2px 2px 0 #000',
                    transform: isSelected ? 'translateY(-2px)' : 'none'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Podcast Spotlight */}
      {!searchQuery && selectedCategory === 'All' && (
        <section 
          className="hero-split-grid"
          style={{
            padding: 'var(--space-2xl)',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, var(--color-teal) 0%, #000000 100%)',
            border: '3px solid #000',
            boxShadow: '6px 6px 0 #000',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 'var(--space-2xl)',
            alignItems: 'center'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--color-coral)',
                  color: '#FFFFFF',
                  border: '2px solid #000',
                  borderRadius: '8px',
                  padding: '4px 10px',
                  boxShadow: '2px 2px 0 #000'
                }}
              >
                <Flame size={13} color="#fff" />
                FEATURED SHOW SPOTLIGHT
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-acid)' }}>
                ⏱️ {featured.duration}
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '12px' }}>
              {featured.title}
            </h2>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--color-amber)', fontWeight: 700, marginBottom: '12px' }}>
              HOSTED BY {featured.host} • {featured.hostRole}
            </div>

            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {featured.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => playTrack(featured)}
                className="btn-brutal"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 26px',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  backgroundColor: 'var(--color-acid)',
                  color: '#000',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  borderRadius: '999px',
                  cursor: 'pointer'
                }}
              >
                <Play size={18} fill="#000" />
                <span>PLAY FULL EPISODE</span>
              </button>

              <Link
                to={`/podcast/${featured.id}`}
                className="btn-brutal"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 22px',
                  backgroundColor: '#FFFFFF',
                  color: '#000',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  textDecoration: 'none'
                }}
              >
                <span>READ AI BREAKDOWN</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #000', boxShadow: '5px 5px 0 #000' }}>
            <img 
              src={featured.cover} 
              alt={featured.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </section>
      )}

      {/* Popular Student Hosts & RJs */}
      <section>
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <div>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                backgroundColor: 'var(--color-acid)',
                color: '#000',
                border: '1.5px solid #000',
                padding: '3px 8px',
                borderRadius: '6px',
                boxShadow: '2px 2px 0 #000'
              }}
            >
              🎙️ VOICES OF NMAMIT
            </span>
            <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-black)', textTransform: 'uppercase' }}>
              Featured Student Hosts & RJs
            </h2>
          </div>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          {mockRJs.map(rj => (
            <div 
              key={rj.id}
              className="card-modern"
              style={{
                padding: '24px 20px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                border: '2px solid #000',
                boxShadow: '4px 4px 0 #000',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = '7px 7px 0 #000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '4px 4px 0 #000';
              }}
            >
              <img 
                src={rj.avatar} 
                alt={rj.name} 
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #000', boxShadow: '3px 3px 0 #000', marginBottom: '14px' }} 
              />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '2px', color: '#000' }}>{rj.name}</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--color-coral)', fontWeight: 800, marginBottom: '8px' }}>
                {rj.role}
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: '#333', lineHeight: 1.5, marginBottom: '14px' }}>
                {rj.show}
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 800, color: '#000', backgroundColor: 'var(--color-acid)', border: '1.5px solid #000', padding: '3px 12px', borderRadius: '999px', boxShadow: '2px 2px 0 #000' }}>
                {rj.listeners}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Episode Grid */}
      <section>
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <div>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                backgroundColor: '#FFFFFF',
                color: '#000',
                border: '1.5px solid #000',
                padding: '3px 8px',
                borderRadius: '6px',
                boxShadow: '2px 2px 0 #000'
              }}
            >
              📻 EPISODE DIRECTORY
            </span>
            <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-black)', textTransform: 'uppercase' }}>
              All Episodes ({filteredPodcasts.length})
            </h2>
          </div>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--space-lg)'
          }}
        >
          {filteredPodcasts.map(podcast => (
            <PodcastCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </section>
    </div>
  );
};
