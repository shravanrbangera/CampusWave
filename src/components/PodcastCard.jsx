import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Bookmark, Clock, User } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';

export const PodcastCard = ({ podcast, compact = false }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const { savedPodcasts, toggleSavePodcast } = useAuth();

  const isCurrent = currentTrack?.id === podcast.id;
  const isSaved = savedPodcasts?.includes(podcast.id);

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack({
        id: podcast.id,
        title: podcast.title,
        artist: podcast.host,
        host: podcast.host,
        showName: podcast.showName,
        cover: podcast.cover,
        duration: podcast.duration,
        durationSeconds: podcast.durationSeconds,
        type: 'podcast',
        badge: podcast.badge,
        category: podcast.category,
        description: podcast.description
      });
    }
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavePodcast(podcast.id);
  };

  return (
    <div 
      className="card-modern"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)'
      }}
    >
      {/* Artwork with Play Overlay */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: compact ? '150px' : '180px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-card-subtle)'
        }}
      >
        <img 
          src={podcast.cover} 
          alt={podcast.title}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Category badge */}
        <div 
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            zIndex: 2
          }}
        >
          <span 
            style={{
              backgroundColor: 'var(--color-orange)',
              color: '#FFFFFF',
              borderRadius: '6px',
              padding: '3px 8px',
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.02em',
              display: 'inline-block'
            }}
          >
            {podcast.category}
          </span>
        </div>

        {/* Bookmark button */}
        <button
          onClick={handleSaveClick}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSaved ? 'var(--color-orange)' : 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            zIndex: 2,
            cursor: 'pointer'
          }}
          title={isSaved ? "Remove from bookmarks" : "Save podcast"}
        >
          <Bookmark size={15} fill={isSaved ? "var(--color-orange)" : "none"} />
        </button>

        {/* Play Button Overlay */}
        <button
          onClick={handlePlayClick}
          style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-orange)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            boxShadow: '0 4px 12px var(--color-orange-glow)',
            zIndex: 2,
            cursor: 'pointer'
          }}
          title={isCurrent && isPlaying ? "Pause" : "Play Episode"}
        >
          {isCurrent && isPlaying ? (
            <Pause size={18} fill="#FFFFFF" />
          ) : (
            <Play size={18} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
          )}
        </button>
      </div>

      {/* Content Details */}
      <div 
        style={{
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div 
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              fontWeight: 700
            }}
          >
            {podcast.showName}
          </div>

          <Link 
            to={`/podcast/${podcast.id}`}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.98rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
              marginBottom: '6px'
            }}
          >
            {podcast.title}
          </Link>

          <div 
            style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '10px'
            }}
          >
            <User size={13} color="var(--color-orange)" />
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {podcast.host}
            </span>
          </div>
        </div>

        {/* Footer info: duration & play count */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-body)',
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
            paddingTop: '8px',
            borderTop: '1px solid var(--border-color)',
            marginTop: 'auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} />
            <span>{podcast.duration}</span>
          </div>
          <span>{podcast.plays} plays</span>
        </div>
      </div>
    </div>
  );
};
