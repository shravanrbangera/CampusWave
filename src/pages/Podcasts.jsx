import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { mockPodcasts, podcastCategories } from '../data/podcasts';
import { PodcastCard } from '../components/PodcastCard';

export const Podcasts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState(initialQuery);

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

  return (
    <div 
      className="podcasts-page page-wrapper" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'clamp(18px, 3vw, 24px)',
        paddingTop: 'clamp(6px, 1.5vw, 12px)'
      }}
    >
      {/* Top Header */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="editorial-badge">
              NMAMIT AUDIO ARCHIVE
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {filteredPodcasts.length} {filteredPodcasts.length === 1 ? 'Show' : 'Shows'}
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3.8vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Student Podcasts
          </h1>
        </div>
      </div>

      {/* Search Input Bar (Matches Image 1 & 3) */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '680px', margin: '0 auto' }}>
        <Search 
          size={18} 
          color="var(--text-muted)" 
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search shows, topics, or student hosts..."
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
            transition: 'border-color var(--transition-fast)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--color-orange)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
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
              background: 'none',
              border: 'none',
              padding: 0
            }}
            title="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Category Pills Row (Matches Image 3) */}
      <div 
        className="category-pills-row scroll-touch-pills"
        style={{ 
          display: 'flex', 
          gap: '8px', 
          overflowX: 'auto', 
          padding: '2px 0 6px' 
        }}
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
                fontSize: '0.8rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                minHeight: '36px',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Podcasts Grid (Matches Image 1 & 3: Clean, visual, organized) */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '16px'
        }}
      >
        {filteredPodcasts.map(podcast => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>

      {filteredPodcasts.length === 0 && (
        <div 
          className="card-modern"
          style={{
            padding: '36px 20px',
            textAlign: 'center',
            borderRadius: 'var(--radius-xl)'
          }}
        >
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px' }}>
            No episodes found
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: 0 }}>
            Try searching for a different keyword or select another category.
          </p>
        </div>
      )}
    </div>
  );
};
