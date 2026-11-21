import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Bookmark, 
  Share2, 
  Clock, 
  User, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Calendar,
  Volume2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { mockPodcasts } from '../data/podcasts';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { PodcastCard } from '../components/PodcastCard';
import { AudioWaveform } from '../components/AudioWaveform';

export const PodcastDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, togglePlay, seekTo, currentTime, duration, formatTime } = useAudio();
  const { savedPodcasts, toggleSavePodcast } = useAuth();

  const [aiSummaryOpen, setAiSummaryOpen] = useState(true);
  const [copyNotice, setCopyNotice] = useState(false);

  const podcast = mockPodcasts.find(p => p.id === id) || mockPodcasts[0];
  const isCurrent = currentTrack?.id === podcast.id;
  const isSaved = savedPodcasts.includes(podcast.id);

  const handlePlayToggle = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(podcast);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopyNotice(true);
    setTimeout(() => setCopyNotice(false), 2500);
  };

  const handleTimestampJump = (timeStr) => {
    // "07:40" -> 7 * 60 + 40 = 460 seconds
    const parts = timeStr.split(':').map(Number);
    const secs = parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
    if (!isCurrent) {
      playTrack(podcast);
    }
    setTimeout(() => {
      seekTo(secs);
    }, 150);
  };

  // Related episodes
  const relatedEpisodes = mockPodcasts.filter(p => p.id !== podcast.id).slice(0, 3);

  return (
    <div className="podcast-details-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '0.88rem',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Podcasts</span>
        </button>
      </div>

      {/* Main Episode Banner */}
      <div 
        className="card-modern"
        style={{
          padding: 'var(--space-2xl)',
          borderRadius: 'var(--radius-2xl)',
          background: 'linear-gradient(135deg, var(--color-teal) 0%, var(--color-charcoal) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 340px) 1fr',
          gap: 'var(--space-2xl)',
          alignItems: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}
        className="hero-split-grid"
      >
        {/* Artwork */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '320px',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <img 
            src={podcast.cover} 
            alt={podcast.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div 
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px'
            }}
          >
            <span className="editorial-badge" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: 'var(--color-amber)', border: 'none' }}>
              {podcast.category}
            </span>
          </div>
        </div>

        {/* Details & Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--color-amber)',
                fontWeight: 600,
                marginBottom: '6px'
              }}
            >
              {podcast.showName} • EPISODE DISPATCH
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', lineHeight: 1.2, marginBottom: '8px', color: '#FFFFFF' }}>
              {podcast.title}
            </h1>
            <div style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} color="var(--color-coral)" />
              <span style={{ fontWeight: 600, color: '#FFFFFF' }}>{podcast.host}</span>
              <span>— {podcast.hostRole}</span>
            </div>
          </div>

          <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '0.98rem', lineHeight: 1.6 }}>
            {podcast.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.65)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} />
              <span>{podcast.duration}</span>
            </div>
            <div>•</div>
            <div>{podcast.plays} student plays</div>
            <div>•</div>
            <div>Released {podcast.publishedAt}</div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', paddingTop: '8px' }}>
            <button
              onClick={handlePlayToggle}
              className="btn-primary"
              style={{ padding: '12px 30px', fontSize: '1rem' }}
            >
              {isCurrent && isPlaying ? (
                <>
                  <Pause size={18} fill="#FFFFFF" />
                  <span>Pause Episode</span>
                </>
              ) : (
                <>
                  <Play size={18} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                  <span>Play Episode ({podcast.duration})</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleSavePodcast(podcast.id)}
              className="btn-secondary"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: isSaved ? 'var(--color-coral)' : '#FFFFFF',
                borderColor: isSaved ? 'var(--color-coral)' : 'rgba(255, 255, 255, 0.2)'
              }}
              title={isSaved ? "Saved" : "Save to bookmarks"}
            >
              <Bookmark size={16} fill={isSaved ? "var(--color-coral)" : "none"} />
              <span>{isSaved ? "Bookmarked" : "Save Episode"}</span>
            </button>

            <button
              onClick={handleShare}
              className="btn-icon"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              title="Share episode link"
            >
              <Share2 size={16} />
            </button>
          </div>

          {copyNotice && (
            <div style={{ fontSize: '0.85rem', color: '#4ade80' }}>
              ✓ Episode URL copied to clipboard!
            </div>
          )}
        </div>
      </div>

      {/* AI Summary & Key Takeaways Module (Progressive Disclosure) */}
      <section 
        className="card-modern"
        style={{
          borderRadius: 'var(--radius-2xl)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-white)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div 
          onClick={() => setAiSummaryOpen(!aiSummaryOpen)}
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            borderBottom: aiSummaryOpen ? '1px solid var(--border-color)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-coral)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-charcoal)' }}>CampusWave AI Broadcast Synthesis</h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Automated highlights, takeaways, and chapter bookmarks</div>
            </div>
          </div>

          <button style={{ color: 'var(--text-muted)' }}>
            {aiSummaryOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {aiSummaryOpen && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Overview */}
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--color-coral)', marginBottom: '8px' }}>
                Executive Overview
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {podcast.aiSummary.overview}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                Discussion Highlights
              </h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {podcast.aiSummary.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Key Takeaways */}
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                Actionable Key Takeaways for Students
              </h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {podcast.aiSummary.keyTakeaways.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>

            {/* Clickable Timestamps Chapters */}
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--color-charcoal)', marginBottom: '10px' }}>
                Chapter Bookmarks (Click to jump audio)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                {podcast.aiSummary.timestamps.map((ts, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTimestampJump(ts.time)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      backgroundColor: 'var(--color-soft-grey)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <span 
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--color-coral)',
                        backgroundColor: 'rgba(245, 45, 58, 0.1)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)'
                      }}
                    >
                      {ts.time}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal)', fontWeight: 600 }}>
                      {ts.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Related Episodes */}
      <section>
        <div className="section-header">
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
              MORE IN THIS CATEGORY
            </span>
            <h2 className="section-header-title" style={{ marginTop: '6px' }}>
              Related Student Shows
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
          {relatedEpisodes.map(ep => (
            <PodcastCard key={ep.id} podcast={ep} />
          ))}
        </div>
      </section>
    </div>
  );
};

