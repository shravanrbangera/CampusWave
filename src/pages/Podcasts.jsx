import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mic2, Search, Filter, Sparkles, ArrowRight, User, Play, Clock, Flame } from 'lucide-react';
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
        <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
          STUDENT AUDIO NETWORK
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginTop: '8px', marginBottom: '12px', color: 'var(--color-charcoal)' }}>
          NMAMIT Student Podcasts
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', marginBottom: '24px' }}>
          Real engineering discussions, hostel chronicles, tech debates, and placement insights from student creators.
        </p>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '280px', maxWidth: '500px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search episodes, topics or hosts..."
              className="form-input"
              style={{
                padding: '12px 18px 12px 46px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            <Search 
              size={18} 
              color="var(--color-coral)" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0' }}>
            {podcastCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  backgroundColor: selectedCategory === cat ? 'var(--color-coral)' : 'var(--color-white)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  border: selectedCategory === cat ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
                  boxShadow: selectedCategory === cat ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Podcast Spotlight (Editorial Card) */}
      {!searchQuery && selectedCategory === 'All' && (
        <section 
          className="card-modern"
          style={{
            padding: 'var(--space-2xl)',
            borderRadius: 'var(--radius-2xl)',
            background: 'linear-gradient(135deg, var(--color-teal) 0%, var(--color-charcoal) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 'var(--space-2xl)',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}
          className="hero-split-grid"
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span className="editorial-badge" style={{ backgroundColor: 'var(--color-coral)', color: '#FFFFFF', border: 'none' }}>
                <Flame size={12} color="#fff" />
                FEATURED SHOW SPOTLIGHT
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                {featured.duration}
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', color: '#FFFFFF', lineHeight: 1.2, marginBottom: '12px' }}>
              {featured.title}
            </h2>

            <div style={{ fontSize: '0.95rem', color: 'var(--color-amber)', fontWeight: 600, marginBottom: '12px' }}>
              Hosted by {featured.host} • {featured.hostRole}
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {featured.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => playTrack(featured)}
                className="btn-primary"
                style={{ padding: '12px 26px' }}
              >
                <Play size={18} fill="#fff" />
                <span>Play Full Episode</span>
              </button>

              <Link
                to={`/podcast/${featured.id}`}
                className="btn-secondary"
                style={{ 
                  padding: '12px 22px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <span>Read AI Breakdown</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
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
        <div className="section-header">
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
              VOICES OF NMAMIT
            </span>
            <h2 className="section-header-title" style={{ marginTop: '6px' }}>
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
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <img 
                src={rj.avatar} 
                alt={rj.name} 
                style={{ width: '74px', height: '74px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-coral)', marginBottom: '14px' }} 
              />
              <h3 style={{ fontSize: '1.1rem', marginBottom: '2px', color: 'var(--color-charcoal)' }}>{rj.name}</h3>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-coral)', fontWeight: 600, marginBottom: '8px' }}>
                {rj.role}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
                {rj.show}
              </p>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'var(--color-soft-grey)', padding: '3px 10px', borderRadius: 'var(--radius-full)' }}>
                {rj.listeners}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Episode Grid */}
      <section>
        <div className="section-header">
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
              EPISODE DIRECTORY
            </span>
            <h2 className="section-header-title" style={{ marginTop: '6px' }}>
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

