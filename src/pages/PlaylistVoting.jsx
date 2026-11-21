import React, { useState } from 'react';
import { 
  Vote, 
  Play, 
  Pause, 
  Clock, 
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockVotingData } from '../data/voting';
import { mockMusic } from '../data/music';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';

export const PlaylistVoting = () => {
  const { votedPolls, castVote } = useAuth();
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  const [activeSongVote, setActiveSongVote] = useState(votedPolls['dailySong'] || null);
  const [toastMsg, setToastMsg] = useState('');
  
  // Voting songs state with local increment
  const [pollSongs, setPollSongs] = useState(() => {
    return mockVotingData.dailySongPoll.songs.map(song => ({
      ...song,
      votes: song.id === votedPolls['dailySong'] ? song.votes + 1 : song.votes
    }));
  });

  const totalVotes = pollSongs.reduce((sum, s) => sum + s.votes, 0);

  const handleVote = (songId) => {
    if (activeSongVote === songId) return;

    setActiveSongVote(songId);
    castVote('dailySong', songId);

    setPollSongs(prev => prev.map(s => {
      if (s.id === songId) {
        return { ...s, votes: s.votes + 1 };
      }
      if (s.id === activeSongVote) {
        return { ...s, votes: Math.max(0, s.votes - 1) };
      }
      return s;
    }));

    try {
      confetti({
        particleCount: 50,
        spread: 55,
        origin: { y: 0.75 },
        colors: ['#F15A24', '#F4C542', '#123D2C']
      });
    } catch (e) {}

    setToastMsg("Vote recorded! Airing tonight at 9:00 PM on 90.4 FM.");
    setTimeout(() => setToastMsg(''), 2600);
  };

  const handlePreviewTrack = (song) => {
    const isCurrent = currentTrack?.id === song.id;
    if (isCurrent) {
      togglePlay();
    } else {
      const matched = mockMusic.find(m => m.title.toLowerCase().includes(song.title.toLowerCase())) || {
        id: song.id,
        title: song.title,
        artist: song.artist,
        showName: "Hostel Prime Hour Nominee",
        cover: song.cover,
        duration: "03:45",
        durationSeconds: 225,
        type: "music",
        badge: "Voting Nominee",
        category: song.genre
      };
      playTrack(matched);
    }
  };

  return (
    <div 
      className="playlist-voting-page page-wrapper" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'clamp(18px, 3vw, 24px)',
        paddingTop: 'clamp(6px, 1.5vw, 12px)'
      }}
    >
      {/* Toast Alert */}
      {toastMsg && (
        <div 
          style={{
            position: 'fixed',
            top: '74px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '2px solid var(--color-orange)',
            borderRadius: 'var(--radius-lg)',
            padding: '10px 18px',
            fontSize: '0.84rem',
            fontWeight: 700,
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            maxWidth: '360px'
          }}
        >
          <CheckCircle2 size={16} color="var(--color-orange)" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="editorial-badge">
              DAILY STUDENT POLL
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Tonight at 9:00 PM
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3.8vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Daily Playlist Voting
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--color-orange-soft)', color: 'var(--color-orange)', padding: '5px 12px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={13} /> {mockVotingData.dailySongPoll.deadline}
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '5px 12px', borderRadius: 'var(--radius-full)' }}>
            {totalVotes} Votes
          </span>
        </div>
      </div>

      {/* Voting Nominees List (Matches Image 2 & 3: Clean, organized playlist card) */}
      <section 
        className="card-modern"
        style={{
          borderRadius: 'var(--radius-xl)',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}
      >
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          {mockVotingData.dailySongPoll.question}
        </div>

        {pollSongs.map((song, idx) => {
          const isVoted = activeSongVote === song.id;
          const percentage = totalVotes > 0 ? Math.round((song.votes / totalVotes) * 100) : 0;
          const isCurrentlyPlaying = currentTrack?.id === song.id && isPlaying;

          return (
            <div
              key={song.id}
              style={{
                borderRadius: 'var(--radius-lg)',
                backgroundColor: isVoted ? 'var(--color-orange-soft)' : 'var(--bg-card-subtle)',
                border: isVoted ? '1px solid var(--color-orange)' : '1px solid var(--border-color)',
                padding: '12px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                {/* Ranking, Thumbnail & Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: isVoted ? 'var(--color-orange)' : 'var(--text-muted)', width: '22px' }}>
                    0{idx + 1}
                  </span>

                  <div style={{ position: 'relative', width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                    <img 
                      src={song.cover} 
                      alt={song.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <button
                      onClick={() => handlePreviewTrack(song)}
                      aria-label={`Preview ${song.title}`}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.35)',
                        border: 'none',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      {isCurrentlyPlaying ? <Pause size={16} fill="#fff" /> : <Play size={16} fill="#fff" style={{ marginLeft: '1px' }} />}
                    </button>
                  </div>

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {song.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                      {song.artist} • <span style={{ color: 'var(--text-muted)' }}>{song.genre}</span>
                    </div>
                  </div>
                </div>

                {/* Vote CTA & Stats */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <div style={{ textAlign: 'right', display: 'none' }} className="mobile-only">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 800, color: isVoted ? 'var(--color-orange)' : 'var(--text-primary)' }}>
                      {percentage}%
                    </span>
                  </div>

                  <button
                    onClick={() => handleVote(song.id)}
                    className={isVoted ? "btn-primary" : "btn-secondary"}
                    style={{
                      padding: '8px 18px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      minHeight: '36px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {isVoted ? 'Voted' : 'Vote'}
                  </button>
                </div>
              </div>

              {/* Vote Percentage Progress Bar */}
              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div 
                  style={{
                    flex: 1,
                    height: '6px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--border-color)',
                    overflow: 'hidden'
                  }}
                >
                  <div 
                    style={{
                      width: `${percentage}%`,
                      height: '100%',
                      backgroundColor: isVoted ? 'var(--color-orange)' : 'var(--color-forest)',
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.3s ease'
                    }}
                  />
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', minWidth: '34px', textAlign: 'right' }}>
                  {percentage}%
                </span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};
