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
      className="card-modern shadow-brutal-sm"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        gap: '14px',
        borderRadius: '14px',
        backgroundColor: '#FFFFFF',
        border: '2px solid #000000',
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
          backgroundColor: '#000000',
          border: '2px solid #000000'
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
            backgroundColor: isCurrent ? 'rgba(232, 255, 0, 0.65)' : 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color var(--transition-fast)'
          }}
        >
          {isCurrent && isPlaying ? (
            <Pause size={18} color="#000000" fill="#000000" />
          ) : (
            <Play size={18} color={isCurrent ? "#000000" : "#FFFFFF"} fill={isCurrent ? "#000000" : "#FFFFFF"} style={{ marginLeft: '2px' }} />
          )}
        </div>
      </div>

      {/* Track Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div 
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: '0.98rem',
            color: isCurrent ? 'var(--color-coral)' : '#000000',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {track.title}
        </div>
        <div 
          style={{
            fontSize: '0.82rem',
            color: '#444444',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginTop: '2px'
          }}
        >
          {track.artist} • <span style={{ backgroundColor: 'var(--color-acid)', color: '#000', padding: '1px 6px', border: '1px solid #000', borderRadius: '3px', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{track.genre}</span>
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
