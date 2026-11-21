import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal,
  Flame,
  Sparkles,
  Compass,
  Play,
  Zap
} from 'lucide-react';
import { mockPodcasts, podcastCategories } from '../data/podcasts';
import { mockMusic } from '../data/music';
import { PodcastCard } from '../components/PodcastCard';
import { MusicCard } from '../components/MusicCard';
import { useAudio } from '../context/AudioContext';
import { MarqueeTicker } from '../components/MarqueeTicker';

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
      {/* Header & Search Bar with Brutalist Styling */}
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
            <Zap size={13} fill="#000" />
            CRATE ARCHIVE // 90.4 MHZ
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: '#333' }}>
            NMAMIT AUDIO VAULT
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
          EXPLORE <span className="highlight-acid" style={{ border: '2px solid #000', borderRadius: '6px', padding: '0 8px' }}>STUDENT SOUNDS</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.95rem', fontWeight: 600, maxWidth: '680px', marginBottom: '24px', lineHeight: 1.6 }}>
          Dig through 30+ NMAMIT student podcasts, independent hostel bedroom releases, lab debates, and campus stories.
        </p>

        {/* Big Search Input - Tactile Brutalist */}
        <div 
          style={{
            position: 'relative',
            maxWidth: '680px',
            width: '100%'
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, host, keyword or hostel..."
            style={{
              width: '100%',
              padding: '16px 20px 16px 52px',
              fontSize: '1rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              borderRadius: '16px',
              backgroundColor: '#FFFFFF',
              border: '2.5px solid #000',
              boxShadow: '4px 4px 0 #000',
              color: '#000',
              outline: 'none'
            }}
          />
          <Search 
            size={22} 
            color="#000" 
            style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} 
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="btn-brutal"
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '4px 10px',
                backgroundColor: 'var(--color-acid)',
                color: '#000',
                border: '1.5px solid #000',
                borderRadius: '6px',
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              CLEAR [X]
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills (Tactile Brutalist Buttons) */}
      <div 
        className="category-pills-row scroll-touch-pills"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}
      >
        {podcastCategories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
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

      {/* Content Type Selector & Sort Bar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '2px solid #000',
          boxShadow: '3px 3px 0 #000'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setContentType('all')}
            className="btn-brutal"
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: '#000',
              backgroundColor: contentType === 'all' ? 'var(--color-acid)' : '#fff',
              border: '1.5px solid #000',
              boxShadow: contentType === 'all' ? '2px 2px 0 #000' : 'none'
            }}
          >
            All Results ({filteredPodcasts.length + filteredMusic.length})
          </button>
          <button
            onClick={() => setContentType('podcasts')}
            className="btn-brutal"
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: '#000',
              backgroundColor: contentType === 'podcasts' ? 'var(--color-acid)' : '#fff',
              border: '1.5px solid #000',
              boxShadow: contentType === 'podcasts' ? '2px 2px 0 #000' : 'none'
            }}
          >
            Podcasts ({filteredPodcasts.length})
          </button>
          <button
            onClick={() => setContentType('music')}
            className="btn-brutal"
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: '#000',
              backgroundColor: contentType === 'music' ? 'var(--color-acid)' : '#fff',
              border: '1.5px solid #000',
              boxShadow: contentType === 'music' ? '2px 2px 0 #000' : 'none'
            }}
          >
            Music Releases ({filteredMusic.length})
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#000' }}>
          <SlidersHorizontal size={14} />
          <span>SORT:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--color-acid)',
              color: '#000',
              border: '1.5px solid #000',
              borderRadius: '6px',
              padding: '3px 8px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
          >
            <option value="popular">MOST STREAMED</option>
            <option value="newest">NEWEST UPLOADS</option>
          </select>
        </div>
      </div>

      {/* Featured Spotlight Card */}
      {!searchQuery && selectedCategory === 'All' && (
        <section 
          className="hero-split-grid explore-spotlight-card"
          style={{
            padding: 'var(--space-2xl)',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, var(--color-teal) 0%, #000000 100%)',
            border: '3px solid #000',
            boxShadow: '6px 6px 0 #000',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 'var(--space-xl)',
            alignItems: 'center'
          }}
        >
          <div>
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
                boxShadow: '2px 2px 0 #000',
                marginBottom: '12px'
              }}
            >
              <Flame size={13} color="#fff" />
              SPOTLIGHT OF THE WEEK
            </span>
            <h2 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '8px' }}>
              {mockPodcasts[0].title}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {mockPodcasts[0].description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => playTrack(mockPodcasts[0])}
                className="btn-brutal"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  fontSize: '0.88rem',
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
                <Play size={16} fill="#000" />
                <span>PLAY SPOTLIGHT EPISODE</span>
              </button>
            </div>
          </div>

          <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: '18px', overflow: 'hidden', border: '2px solid #000', boxShadow: '4px 4px 0 #000' }}>
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
                STUDENT PODCASTS
              </span>
              <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-black)', textTransform: 'uppercase' }}>
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
            <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              No podcasts match your search query. Try searching for "Robotics" or "Hostel".
            </div>
          )}
        </section>
      )}

      {/* Music Grid */}
      {(contentType === 'all' || contentType === 'music') && (
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
                ORIGINAL SOUNDS
              </span>
              <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-black)', textTransform: 'uppercase' }}>
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
            <div style={{ textAlign: 'center', padding: '40px', color: '#555', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              No music tracks found in this category.
            </div>
          )}
        </section>
      )}
    </div>
  );
};
