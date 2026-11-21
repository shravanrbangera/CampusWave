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
      className="card-modern shadow-brutal-sm"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        backgroundColor: '#FFFFFF',
        border: '2px solid #000000',
        borderRadius: '16px'
      }}
    >
      {/* Artwork with Play Overlay */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: compact ? '160px' : '185px',
          overflow: 'hidden',
          backgroundColor: '#000000'
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
              backgroundColor: 'var(--color-acid)',
              color: '#000000',
              border: '2px solid #000000',
              boxShadow: '2px 2px 0 #000000',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800
            }}
          >
            {podcast.category}
          </span>
        </div>

        {/* Bookmark button */}
        <button
          onClick={handleSaveClick}
          className="btn-brutal"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isSaved ? 'var(--color-coral)' : '#000000',
            border: '2px solid #000000',
            boxShadow: '2px 2px 0 #000',
            zIndex: 2
          }}
          title={isSaved ? "Remove from bookmarks" : "Save podcast"}
        >
          <Bookmark size={15} fill={isSaved ? "var(--color-coral)" : "none"} strokeWidth={2.5} />
        </button>

        {/* Play Button Overlay */}
        <button
          onClick={handlePlayClick}
          className="btn-brutal"
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-acid)',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #000000',
            boxShadow: '3px 3px 0 #000000',
            zIndex: 2
          }}
          title={isCurrent && isPlaying ? "Pause" : "Play Episode"}
        >
          {isCurrent && isPlaying ? (
            <Pause size={20} fill="#000000" />
          ) : (
            <Play size={20} fill="#000000" style={{ marginLeft: '2px' }} />
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
              letterSpacing: '0.06em',
              fontWeight: 700
            }}
          >
            {podcast.showName}
          </div>

          <Link 
            to={`/podcast/${podcast.id}`}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.08rem',
              fontWeight: 800,
              color: '#000000',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em',
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
