import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';

export const MusicCard = ({ track }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const { likedTracks, toggleLikeTrack } = useAuth();

  const isCurrent = currentTrack?.id === track.id;
  const isLiked = likedTracks.includes(track.id);

  const handlePlayClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack({
        id: track.id,
        title: track.title,
        artist: track.artist,
        showName: track.album,
        cover: track.cover,
        duration: track.duration,
        durationSeconds: track.durationSeconds,
        type: 'music',
        badge: track.badge,
        category: track.genre,
        description: track.description
      });
    }
  };

  return (
    <div 
      className="card-3d glass-panel"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        gap: '14px',
        borderRadius: 'var(--radius-md)',
        height: '76px'
      }}
    >
      {/* Artwork with hover play */}
      <div 
        onClick={handlePlayClick}
        style={{
          position: 'relative',
          width: '52px',
          height: '52px',
          borderRadius: '10px',
          overflow: 'hidden',
          flexShrink: 0,
          cursor: 'pointer',
          backgroundColor: 'var(--bg-tertiary)'
        }}
      >
        <img 
          src={track.cover} 
          alt={track.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: isCurrent ? 'rgba(255, 148, 26, 0.45)' : 'rgba(0, 0, 0, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color var(--transition-fast)'
          }}
        >
          {isCurrent && isPlaying ? (
            <Pause size={18} color="#FFFFFF" fill="#FFFFFF" />
          ) : (
            <Play size={18} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '2px' }} />
          )}
        </div>
      </div>

      {/* Track Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div 
          style={{
            fontWeight: 700,
            fontSize: '0.94rem',
            color: isCurrent ? 'var(--color-orange)' : 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {track.title}
        </div>
        <div 
          style={{
            fontSize: '0.8rem',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '2px'
          }}
        >
          {track.artist} • <span style={{ color: 'var(--text-muted)' }}>{track.genre}</span>
        </div>
      </div>

      {/* Right details: duration & like button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <span 
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}
        >
          {track.duration}
        </span>

        <button
          onClick={() => toggleLikeTrack(track.id)}
          style={{
            padding: '6px',
            color: isLiked ? '#ef4444' : 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center'
          }}
          title={isLiked ? "Saved to Liked Songs" : "Like Track"}
        >
          <Heart size={17} fill={isLiked ? "#ef4444" : "none"} />
        </button>
      </div>
    </div>
  );
};
