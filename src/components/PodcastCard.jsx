import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Pause, Bookmark, Clock, User } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';

export const PodcastCard = ({ podcast, compact = false }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const { savedPodcasts, toggleSavePodcast } = useAuth();

  const isCurrent = currentTrack?.id === podcast.id;
  const isSaved = savedPodcasts.includes(podcast.id);

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
      className="card-3d glass-panel"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      {/* Artwork with Play Overlay */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: compact ? '160px' : '185px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-tertiary)'
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
            objectFit: 'cover',
            transition: 'transform var(--transition-normal)'
          }}
        />

        {/* Category badge */}
        <div 
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 2
          }}
        >
          <span 
            className="editorial-badge"
            style={{
              backgroundColor: 'rgba(12, 16, 18, 0.88)',
              color: 'var(--color-amber)',
              border: '1px solid rgba(255, 181, 46, 0.3)'
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
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(12, 16, 18, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSaved ? 'var(--color-coral)' : 'var(--text-secondary)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            zIndex: 2,
            transition: 'all var(--transition-fast)'
          }}
          title={isSaved ? "Remove from bookmarks" : "Save podcast"}
        >
          <Bookmark size={15} fill={isSaved ? "var(--color-coral)" : "none"} />
        </button>

        {/* Play Button Overlay */}
        <button
          onClick={handlePlayClick}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-coral)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-coral)',
            zIndex: 2,
            transition: 'transform var(--transition-fast)'
          }}
          title={isCurrent && isPlaying ? "Pause" : "Play Episode"}
        >
          {isCurrent && isPlaying ? (
            <Pause size={19} fill="#FFFFFF" />
          ) : (
            <Play size={19} fill="#FFFFFF" style={{ marginLeft: '2px' }} />
          )}
        </button>
      </div>

      {/* Content Details */}
      <div 
        style={{
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div 
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            {podcast.showName}
          </div>

          <Link 
            to={`/podcast/${podcast.id}`}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.02rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.7em',
              marginBottom: '8px'
            }}
          >
            {podcast.title}
          </Link>

          <div 
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '12px'
            }}
          >
            <User size={13} color="var(--color-coral)" />
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
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-color)',
            marginTop: 'auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} />
            <span>{podcast.duration}</span>
          </div>
          <span>{podcast.plays} plays</span>
        </div>
      </div>
    </div>
  );
};
