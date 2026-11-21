import React, { useState } from 'react';
import { Sparkles, Bookmark, Play, Clock, ArrowRight, Check, Pin } from 'lucide-react';
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
      className="card-modern"
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '20px',
        height: '100%',
        position: 'relative',
        backgroundColor: '#FFFFFF',
        border: '2px solid #000',
        boxShadow: '4px 4px 0 #000',
        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease'
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
      <div>
        {/* Top Badges & Sticky Note Pushpin */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                backgroundColor: 'var(--color-acid)',
                color: '#000',
                border: '1.5px solid #000',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                boxShadow: '2px 2px 0 #000'
              }}
            >
              <Sparkles size={12} fill="#000" />
              AI DIGEST // 4NM22
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#333', fontWeight: 700 }}>
              {summary.readTime}
            </span>
          </div>

          <button
            onClick={() => toggleSaveSummary(summary.id)}
            className="btn-brutal"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: isSaved ? 'var(--color-acid)' : '#FFFFFF',
              color: '#000',
              cursor: 'pointer',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '2px 2px 0 #000'
            }}
            title={isSaved ? "Saved to Library" : "Save summary to library"}
          >
            <Bookmark size={15} fill={isSaved ? "#000" : "none"} />
          </button>
        </div>

        <h3 
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.25rem',
            fontWeight: 800,
            lineHeight: 1.3,
            marginBottom: '8px',
            color: 'var(--color-ink)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.6em'
          }}
        >
          {summary.title}
        </h3>

        <div 
          style={{
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-coral)',
            fontWeight: 700,
            marginBottom: '12px'
          }}
        >
          {summary.showName} • {summary.host}
        </div>

        <p 
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            color: '#333',
            lineHeight: 1.55,
            marginBottom: '16px',
            display: expanded ? 'block' : '-webkit-box',
            WebkitLineClamp: expanded ? 'none' : 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {summary.overview}
        </p>

        {/* Expandable Key Takeaways - Styled as Code Slab */}
        {expanded && (
          <div 
            style={{
              backgroundColor: '#F8F8F8',
              borderRadius: '12px',
              padding: '14px 16px',
              marginBottom: '16px',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000'
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.82rem', color: '#000', marginBottom: '8px', textTransform: 'uppercase' }}>
              KEY TAKEAWAYS:
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '0.84rem', color: '#222', display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-body)' }}>
              {summary.keyTakeaways.map((point, idx) => (
                <li key={idx} style={{ lineHeight: 1.45 }}>{point}</li>
              ))}
            </ul>
            {summary.highlightQuote && (
              <blockquote 
                style={{
                  marginTop: '12px',
                  padding: '8px 12px',
                  backgroundColor: 'var(--color-acid)',
                  border: '1.5px solid #000',
                  borderRadius: '6px',
                  fontStyle: 'italic',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#000'
                }}
              >
                "{summary.highlightQuote}"
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
                fontWeight: 700,
                backgroundColor: '#000',
                color: '#fff',
                padding: '3px 9px',
                borderRadius: '999px',
                border: '1px solid #000'
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
          borderTop: '2px dashed #000'
        }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: 'var(--color-coral)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            textDecoration: 'underline'
          }}
        >
          {expanded ? "[- LESS]" : "[+ FULL DIGEST]"}
        </button>

        <button
          onClick={handleListenClick}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            fontSize: '0.78rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            borderRadius: '999px',
            backgroundColor: '#000',
            color: '#FFFFFF',
            border: '2px solid #000',
            boxShadow: '2px 2px 0 #000',
            cursor: 'pointer'
          }}
          title="Play Original Episode"
        >
          <Play size={12} fill="#FFFFFF" />
          <span>LISTEN ({summary.originalEpisodeDuration})</span>
        </button>
      </div>
    </article>
  );
};
