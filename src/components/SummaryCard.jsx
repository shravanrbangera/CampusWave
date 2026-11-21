import React, { useState } from 'react';
import { Sparkles, Bookmark, Play, Clock, ArrowRight } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { mockPodcasts } from '../data/podcasts';

export const SummaryCard = ({ summary }) => {
  const { playTrack } = useAudio();
  const { savedSummaries, toggleSaveSummary } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const isSaved = savedSummaries.includes(summary.id);

  const handleListenClick = () => {
    const parentPod = mockPodcasts.find(p => p.id === summary.podcastId);
    if (parentPod) {
      playTrack({
        id: parentPod.id,
        title: parentPod.title,
        artist: parentPod.host,
        showName: parentPod.showName,
        cover: parentPod.cover,
        duration: parentPod.duration,
        durationSeconds: parentPod.durationSeconds,
        type: 'podcast',
        badge: parentPod.badge,
        category: parentPod.category,
        description: parentPod.description
      });
    }
  };

  return (
    <article 
      className="card-3d glass-panel"
      style={{
        padding: '22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 'var(--radius-lg)',
        height: '100%',
        position: 'relative'
      }}
    >
      <div>
        {/* Top Badges */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="editorial-badge" style={{ background: 'var(--color-orange)', color: '#0E1315', border: 'none' }}>
              <Sparkles size={12} />
              AI SUMMARY
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              {summary.readTime}
            </span>
          </div>

          <button
            onClick={() => toggleSaveSummary(summary.id)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              color: isSaved ? 'var(--color-orange)' : 'var(--text-muted)',
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast)'
            }}
            title={isSaved ? "Saved to Library" : "Save summary to library"}
          >
            <Bookmark size={15} fill={isSaved ? "var(--color-orange)" : "none"} />
          </button>
        </div>

        <h3 
          style={{
            fontSize: '1.2rem',
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: '8px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.7em'
          }}
        >
          {summary.title}
        </h3>

        <div 
          style={{
            fontSize: '0.82rem',
            color: 'var(--color-orange)',
            fontWeight: 600,
            marginBottom: '12px'
          }}
        >
          {summary.showName} • {summary.host}
        </div>

        <p 
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '16px',
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? 'none' : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {summary.overview}
        </p>

        {/* Expandable Key Takeaways */}
        {expanded && (
          <div 
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '16px',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Key Takeaways:
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {summary.keyTakeaways.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
            {summary.highlightQuote && (
              <blockquote 
                style={{
                  marginTop: '12px',
                  paddingLeft: '12px',
                  borderLeft: '2px solid var(--color-orange)',
                  fontStyle: 'italic',
                  fontSize: '0.82rem',
                  color: 'var(--text-primary)'
                }}
              >
                {summary.highlightQuote}
              </blockquote>
            )}
          </div>
        )}

        {/* Topic Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
          {summary.topics.map((t, idx) => (
            <span 
              key={idx}
              style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--text-muted)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '14px',
          marginTop: 'auto',
          borderTop: '1px solid var(--border-color)'
        }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            fontSize: '0.82rem',
            fontWeight: 600,
            color: 'var(--color-orange)',
            cursor: 'pointer'
          }}
        >
          {expanded ? "Show Less" : "Read Full AI Analysis"}
        </button>

        <button
          onClick={handleListenClick}
          className="btn-secondary"
          style={{
            padding: '6px 14px',
            fontSize: '0.8rem',
            gap: '6px'
          }}
          title="Play Original Episode"
        >
          <Play size={12} fill="currentColor" />
          <span>Listen ({summary.originalEpisodeDuration})</span>
        </button>
      </div>
    </article>
  );
};
