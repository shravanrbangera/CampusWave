import React, { useState } from 'react';
import { 
  Vote, 
  Music, 
  Play, 
  Pause, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Sparkles, 
  Radio, 
  ArrowRight,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockVotingData } from '../data/voting';
import { mockMusic } from '../data/music';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';

export const PlaylistVoting = () => {
  const { user, votedPolls, castVote } = useAuth();
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

  // Calculate dynamic total votes
  const totalVotes = pollSongs.reduce((sum, s) => sum + s.votes, 0);

  // Cast vote simulation
  const handleVote = (songId) => {
    if (activeSongVote === songId) return;

    setActiveSongVote(songId);
    castVote('dailySong', songId);

    // Update vote count locally
    setPollSongs(prev => prev.map(s => {
      if (s.id === songId) {
        return { ...s, votes: s.votes + 1 };
      }
      if (s.id === activeSongVote) {
        return { ...s, votes: Math.max(0, s.votes - 1) };
      }
      return s;
    }));

    // Festive confetti animation
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF5500', '#FFB52E', '#10B981']
      });
    } catch (e) {}

    setToastMsg("VOTE RECORDED! RJ Ananya will broadcast the winning track at 9:00 PM tonight.");
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Preview track audio
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
    <div className="playlist-voting-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Toast Alert */}
      {toastMsg && (
        <div 
          style={{
            position: 'fixed',
            top: '84px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '2px solid var(--color-orange)',
            borderRadius: 'var(--radius-lg)',
            padding: '12px 20px',
            fontSize: '0.86rem',
            fontWeight: 700,
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '380px'
          }}
        >
          <CheckCircle2 size={18} color="var(--color-orange)" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span className="editorial-badge">
            CAMPUS DEMOCRACY • 90.4 MHZ
          </span>
          <span className="editorial-badge editorial-badge-forest">
            STUDENT PICKS
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            HOSTEL PRIME HOUR CURATION
          </span>
        </div>

        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginTop: '8px', 
            marginBottom: '10px', 
            color: 'var(--text-primary)',
            lineHeight: 1.15
          }}
        >
          Daily Playlist <span style={{ color: 'var(--color-orange)' }}>Voting</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', fontWeight: 500, maxWidth: '680px', lineHeight: 1.6 }}>
          Vote for the tracks you want to hear during tonight's 9:00 PM Hostel Prime Hour. One vote per student per day.
        </p>
      </div>

      {/* Main Voting Card */}
      <section>
        <div 
          className="card-modern"
          style={{
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-2xl)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-radio)' }}>
                TONIGHT'S PRIME POLL
              </div>
            <h2 style={{ fontFamily: 'var(--font-radio)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', color: 'var(--text-primary)', marginTop: '4px', letterSpacing: '0.02em' }}>
              {mockVotingData.dailySongPoll.question}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--color-orange-soft)', color: 'var(--color-orange)', border: '1px solid rgba(255, 85, 0, 0.25)', padding: '6px 12px', borderRadius: 'var(--radius-full)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={13} /> {mockVotingData.dailySongPoll.deadline}
            </span>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: 'var(--radius-full)' }}>
              {totalVotes} TOTAL VOTES
            </span>
          </div>
        </div>

        {/* Voting Songs List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {pollSongs.map((song) => {
            const isVoted = activeSongVote === song.id;
            const percentage = totalVotes > 0 ? Math.round((song.votes / totalVotes) * 100) : 0;
            const isCurrentlyPlaying = currentTrack?.id === song.id && isPlaying;

            return (
              <div
                key={song.id}
                className="card-modern"
                style={{
                  borderRadius: '18px',
                  backgroundColor: isVoted ? 'var(--color-orange-soft)' : 'var(--bg-card-subtle)',
                  borderColor: isVoted ? 'var(--color-orange)' : 'var(--border-color)',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  {/* Song Info & Preview */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px', flex: '1 1 auto' }}>
                    <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
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
                          backgroundColor: 'rgba(0, 0, 0, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF'
                        }}
                      >
                        {isCurrentlyPlaying ? <Pause size={20} fill="#FFF" /> : <Play size={20} fill="#FFF" style={{ marginLeft: '2px' }} />}
                      </button>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontFamily: 'var(--font-radio)', fontSize: '1.08rem', color: 'var(--text-primary)', margin: 0, letterSpacing: '0.02em' }}>
                          {song.title}
                        </h3>
                        {isVoted && (
                          <span style={{ fontSize: '0.68rem', fontWeight: 800, backgroundColor: 'var(--color-orange)', color: '#FFF', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>
                            YOUR VOTE
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                        <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          {song.artist}
                        </span>
                        <span style={{ fontSize: '0.72rem', backgroundColor: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                          {song.genre}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vote Action & Stats */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: isVoted ? 'var(--color-orange)' : 'var(--text-primary)' }}>
                        {percentage}%
                      </span>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {song.votes} votes
                      </div>
                    </div>

                    <button
                      onClick={() => handleVote(song.id)}
                      className={isVoted ? "btn-primary" : "btn-secondary"}
                      style={{
                        padding: '10px 20px',
                        fontSize: '0.84rem'
                      }}
                    >
                      {isVoted ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>VOTED</span>
                        </>
                      ) : (
                        <>
                          <Vote size={16} />
                          <span>VOTE</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '7px', backgroundColor: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${percentage}%`, 
                      height: '100%', 
                      backgroundColor: isVoted ? 'var(--color-orange)' : 'var(--text-muted)',
                      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: '999px'
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Broadcast info notice */}
        <div 
          style={{
            marginTop: '24px',
            padding: '14px 18px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.84rem',
            color: 'var(--text-secondary)'
          }}
        >
          <Radio size={18} color="var(--color-orange)" style={{ flexShrink: 0 }} />
          <span>
            The winning track will be announced live on <strong>90.4 MHz Digital FM</strong> at 9:00 PM during RJ Ananya's Hostel Prime Hour.
          </span>
        </div>
        </div>
      </section>
    </div>
  );
};
