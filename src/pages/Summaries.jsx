import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Search, Bookmark, Play, Clock, ArrowRight, BookOpen, Quote } from 'lucide-react';
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="editorial-badge" style={{ backgroundColor: 'var(--color-coral)', color: '#FFFFFF', border: 'none' }}>
            <Sparkles size={13} color="#fff" />
            AI BROADCAST SYNTHESIS
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            NMAMIT STUDY DIGEST
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '12px', color: 'var(--color-charcoal)' }}>
          AI Broadcast Summaries
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', marginBottom: '24px' }}>
          Designed for busy engineering students. Quick 2-to-4 minute executive breakdowns of live broadcasts, technical lab discussions, and hostel committee meetings.
        </p>

        {/* Search & Category Filter */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '260px', maxWidth: '480px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search summaries by topic, lab, or keyword..."
              className="form-input"
              style={{
                padding: '12px 18px 12px 46px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            />
            <Search size={18} color="var(--color-coral)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0' }}>
            {categories.map(cat => (
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

      {/* Featured Editorial Magazine Card (Reference A) */}
      {!searchQuery && selectedCategory === 'All' && (
        <section 
          className="card-modern hero-split-grid"
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
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span className="editorial-badge" style={{ backgroundColor: 'var(--color-coral)', color: '#FFFFFF', border: 'none' }}>
                FEATURED AI SUMMARY
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)' }}>
                {featured.readTime}
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)', color: '#FFFFFF', lineHeight: 1.25, marginBottom: '12px' }}>
              {featured.title}
            </h2>

            <div style={{ fontSize: '0.9rem', color: 'var(--color-amber)', fontWeight: 600, marginBottom: '14px' }}>
              {featured.showName} • {featured.host}
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {featured.overview}
            </p>

            {featured.highlightQuote && (
              <div 
                style={{
                  padding: '14px 18px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderLeft: '3px solid var(--color-coral)',
                  borderRadius: '0 10px 10px 0',
                  fontStyle: 'italic',
                  fontSize: '0.88rem',
                  color: '#FFFFFF',
                  marginBottom: '24px'
                }}
              >
                {featured.highlightQuote}
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={handleListenFeatured}
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.9rem' }}
              >
                <Play size={16} fill="#fff" />
                <span>Listen to Broadcast ({featured.originalEpisodeDuration})</span>
              </button>

              <button
                onClick={() => toggleSaveSummary(featured.id)}
                className="btn-secondary"
                style={{ 
                  padding: '10px 20px', 
                  fontSize: '0.9rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: isFeaturedSaved ? 'var(--color-coral)' : '#fff',
                  borderColor: isFeaturedSaved ? 'var(--color-coral)' : 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <Bookmark size={15} fill={isFeaturedSaved ? "var(--color-coral)" : "none"} />
                <span>{isFeaturedSaved ? "Saved in Library" : "Save Summary"}</span>
              </button>
            </div>
          </div>

          {/* Visual Artwork */}
          <div style={{ position: 'relative', width: '100%', height: '320px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
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
        <div className="section-header">
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
              ALL DIGESTS
            </span>
            <h2 className="section-header-title" style={{ marginTop: '6px' }}>
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

