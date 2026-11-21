import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, Bookmark, Play, Clock, ArrowRight, BookOpen, Quote, Zap } from 'lucide-react';
import { mockSummaries } from '../data/summaries';
import { SummaryCard } from '../components/SummaryCard';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { mockPodcasts } from '../data/podcasts';

export const Summaries = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { playTrack } = useAudio();
  const { savedSummaries, toggleSaveSummary } = useAuth();

  const categories = ["All", "Tech & Coding", "Hostel Stories", "Campus News", "Career & Alumni"];

  const filteredSummaries = mockSummaries.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.overview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const featured = mockSummaries[0];
  const isFeaturedSaved = savedSummaries.includes(featured.id);

  const handleListenFeatured = () => {
    const parentPod = mockPodcasts.find(p => p.id === featured.podcastId);
    if (parentPod) {
      playTrack(parentPod);
    }
  };

  return (
    <div className="summaries-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
      {/* Editorial Header */}
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
            <Sparkles size={13} fill="#000" />
            AI BROADCAST SYNTHESIS
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: '#333' }}>
            NMAMIT STUDY DIGEST // 4NM22
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
          AI BROADCAST <span className="highlight-acid" style={{ border: '2px solid #000', borderRadius: '6px', padding: '0 8px' }}>SUMMARIES</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.95rem', fontWeight: 600, maxWidth: '680px', marginBottom: '24px', lineHeight: 1.6 }}>
          Designed for busy engineering students. Quick 2-to-4 minute executive breakdowns of live broadcasts, technical lab discussions, and hostel committee meetings.
        </p>

        {/* Search & Category Filter */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px', maxWidth: '520px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search summaries by topic, lab, or keyword..."
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
            <Search size={20} color="#000" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px 0' }}>
            {categories.map(cat => {
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

      {/* Featured Editorial Magazine Card */}
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
                <Zap size={13} color="#fff" />
                FEATURED AI SUMMARY
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-acid)' }}>
                ⏱️ {featured.readTime}
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1.25, marginBottom: '12px' }}>
              {featured.title}
            </h2>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', color: 'var(--color-amber)', fontWeight: 700, marginBottom: '14px' }}>
              {featured.showName} • {featured.host}
            </div>

            <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {featured.overview}
            </p>

            {featured.highlightQuote && (
              <div 
                style={{
                  padding: '12px 18px',
                  backgroundColor: 'var(--color-acid)',
                  color: '#000',
                  border: '2px solid #000',
                  borderRadius: '10px',
                  boxShadow: '3px 3px 0 #000',
                  fontStyle: 'italic',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '24px'
                }}
              >
                "{featured.highlightQuote}"
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={handleListenFeatured}
                className="btn-brutal"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 26px',
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
                <span>LISTEN TO BROADCAST ({featured.originalEpisodeDuration})</span>
              </button>

              <button
                onClick={() => toggleSaveSummary(featured.id)}
                className="btn-brutal"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 22px', 
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  backgroundColor: isFeaturedSaved ? 'var(--color-coral)' : '#FFFFFF',
                  color: isFeaturedSaved ? '#FFFFFF' : '#000',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  borderRadius: '999px',
                  cursor: 'pointer'
                }}
              >
                <Bookmark size={15} fill={isFeaturedSaved ? "#fff" : "none"} />
                <span>{isFeaturedSaved ? "SAVED IN LIBRARY" : "SAVE SUMMARY"}</span>
              </button>
            </div>
          </div>

          {/* Visual Artwork */}
          <div style={{ position: 'relative', width: '100%', height: '320px', borderRadius: '20px', overflow: 'hidden', border: '3px solid #000', boxShadow: '5px 5px 0 #000' }}>
            <img 
              src={featured.cover} 
              alt={featured.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </section>
      )}

      {/* Summaries Grid */}
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
              📚 ALL DIGESTS
            </span>
            <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-black)', textTransform: 'uppercase' }}>
              Broadcast Reading Cards ({filteredSummaries.length})
            </h2>
          </div>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 'var(--space-xl)'
          }}
        >
          {filteredSummaries.map(summary => (
            <SummaryCard key={summary.id} summary={summary} />
          ))}
        </div>
      </section>
    </div>
  );
};
