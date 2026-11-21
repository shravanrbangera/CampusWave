import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal,
  Flame,
  Sparkles,
  Compass
} from 'lucide-react';
import { mockPodcasts, podcastCategories } from '../data/podcasts';
import { mockMusic } from '../data/music';
import { PodcastCard } from '../components/PodcastCard';
import { MusicCard } from '../components/MusicCard';
import { useAudio } from '../context/AudioContext';

export const Explore = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [contentType, setContentType] = useState('all'); // 'all' | 'podcasts' | 'music'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'newest'

  const { playTrack } = useAudio();

  // Filtered Podcasts
  const filteredPodcasts = useMemo(() => {
    return mockPodcasts.filter(pod => {
      const matchesSearch = 
        pod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pod.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pod.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || pod.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Filtered Music
  const filteredMusic = useMemo(() => {
    return mockMusic.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || item.genre.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="explore-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Header & Search Bar */}
      <div>
        <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
          CONTENT DISCOVERY
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.6rem)', marginTop: '8px', marginBottom: '10px', color: 'var(--color-charcoal)' }}>
          Explore Student Audio
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', marginBottom: '22px' }}>
          Search across 30+ NMAMIT student podcasts, independent music releases, tech debates, and campus stories.
        </p>

        {/* Big Search Input */}
        <div 
          style={{
            position: 'relative',
            maxWidth: '640px',
            width: '100%'
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, host, keyword or hostel..."
            className="form-input"
            style={{
              padding: '14px 20px 14px 48px',
              fontSize: '1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-white)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}
          />
          <Search 
            size={20} 
            color="var(--color-coral)" 
            style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills (Horizontal Scrollable) */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '6px'
        }}
      >
        {podcastCategories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              style={{
                padding: '7px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.84rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                backgroundColor: isSelected ? 'var(--color-coral)' : 'var(--color-white)',
                color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                border: isSelected ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
                boxShadow: isSelected ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Content Type Selector & Sort Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setContentType('all')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: contentType === 'all' ? 'var(--color-coral)' : 'var(--text-secondary)',
              backgroundColor: contentType === 'all' ? 'rgba(245, 45, 58, 0.08)' : 'transparent'
            }}
          >
            All Results ({filteredPodcasts.length + filteredMusic.length})
          </button>
          <button
            onClick={() => setContentType('podcasts')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: contentType === 'podcasts' ? 'var(--color-coral)' : 'var(--text-secondary)',
              backgroundColor: contentType === 'podcasts' ? 'rgba(245, 45, 58, 0.08)' : 'transparent'
            }}
          >
            Podcasts ({filteredPodcasts.length})
          </button>
          <button
            onClick={() => setContentType('music')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: contentType === 'music' ? 'var(--color-coral)' : 'var(--text-secondary)',
              backgroundColor: contentType === 'music' ? 'rgba(245, 45, 58, 0.08)' : 'transparent'
            }}
          >
            Music Releases ({filteredMusic.length})
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
          <SlidersHorizontal size={14} />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'transparent',
              color: 'var(--color-coral)',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <option value="popular">Most Streamed</option>
            <option value="newest">Newest Uploads</option>
          </select>
        </div>
      </div>

      {/* Featured Spotlight Card */}
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
            gap: 'var(--space-xl)',
            alignItems: 'center',
            boxShadow: 'var(--shadow-lg)'
          }}
          className="hero-split-grid"
        >
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-coral)', color: '#FFFFFF', border: 'none', marginBottom: '12px' }}>
              <Flame size={12} color="#fff" />
              SPOTLIGHT OF THE WEEK
            </span>
            <h2 style={{ fontSize: 'clamp(1.7rem, 3vw, 2.2rem)', color: '#FFFFFF', marginBottom: '8px' }}>
              {mockPodcasts[0].title}
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {mockPodcasts[0].description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => playTrack(mockPodcasts[0])}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.9rem' }}
              >
                <span>Play Spotlight Episode</span>
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '230px', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <img 
              src={mockPodcasts[0].cover} 
              alt={mockPodcasts[0].title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </section>
      )}

      {/* Podcasts Grid */}
      {(contentType === 'all' || contentType === 'podcasts') && (
        <section>
          <div className="section-header">
            <div>
              <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
                STUDENT PODCASTS
              </span>
              <h2 className="section-header-title" style={{ marginTop: '6px' }}>
                Podcasts & Voice Notes ({filteredPodcasts.length})
              </h2>
            </div>
          </div>

          {filteredPodcasts.length > 0 ? (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 'var(--space-lg)'
              }}
            >
              {filteredPodcasts.map(podcast => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No podcasts match your search query. Try searching for "Robotics" or "Hostel".
            </div>
          )}
        </section>
      )}

      {/* Music Grid */}
      {(contentType === 'all' || contentType === 'music') && (
        <section>
          <div className="section-header">
            <div>
              <span className="editorial-badge" style={{ backgroundColor: 'rgba(255, 181, 46, 0.15)', color: 'var(--color-charcoal)' }}>
                ORIGINAL SOUNDS
              </span>
              <h2 className="section-header-title" style={{ marginTop: '6px' }}>
                Campus Music Tracks ({filteredMusic.length})
              </h2>
            </div>
          </div>

          {filteredMusic.length > 0 ? (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 'var(--space-md)'
              }}
            >
              {filteredMusic.map(track => (
                <MusicCard key={track.id} track={track} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No music tracks found in this category.
            </div>
          )}
        </section>
      )}
    </div>
  );
};
