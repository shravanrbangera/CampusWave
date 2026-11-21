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
  Send, 
  Radio, 
  ArrowRight,
  TrendingUp,
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

  // Song Request Form state
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [hostelBlock, setHostelBlock] = useState(user?.hostel || 'Netravati Block B - 304');
  const [dedication, setDedication] = useState('');
  const [requests, setRequests] = useState(mockVotingData.recentSongRequests || []);

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
        colors: ['#FF5500', '#FFB52E', '#000000', '#10B981']
      });
    } catch (e) {}

    setToastMsg("VOTE RECORDED! RJ Ananya will play the winning track at 9:00 PM tonight.");
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Preview track audio
  const handlePreviewTrack = (song) => {
    const isCurrent = currentTrack?.id === song.id;
    if (isCurrent) {
      togglePlay();
    } else {
      // Find matching mock music or build track object
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

  // Submit song request
  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!songTitle.trim() || !artistName.trim()) return;

    const newReq = {
      id: `req-${Date.now()}`,
      songTitle: songTitle.trim(),
      artist: artistName.trim(),
      requestedBy: user?.name || "Student Listener",
      hostelBlock: hostelBlock,
      dedication: dedication.trim() || "Dedicated to all hostel mates grinding assignments!",
      timeAgo: "Just now",
      upvotes: 1
    };

    setRequests([newReq, ...requests]);
    setSongTitle('');
    setArtistName('');
    setDedication('');
    setToastMsg("Track request transmitted to the Campus Radio RJ queue!");
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Upvote request
  const handleUpvote = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, upvotes: r.upvotes + 1 } : r));
  };

  return (
    <div className="playlist-voting-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            top: '84px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: 'var(--color-ink)',
            color: '#FFFFFF',
            border: '2px solid var(--color-orange)',
            borderRadius: '12px',
            padding: '12px 18px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            fontWeight: 800,
            boxShadow: '4px 4px 0 #000',
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

      {/* Page Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              backgroundColor: 'var(--color-orange)',
              color: '#FFFFFF',
              border: '2px solid #000',
              borderRadius: '8px',
              padding: '4px 10px',
              boxShadow: '2px 2px 0 #000'
            }}
          >
            <Vote size={13} fill="#FFF" />
            CAMPUS SOUND CLASH // 90.4 FM
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            STUDENT PLAYLIST VOTING
          </span>
        </div>

        <h1 
          style={{ 
            fontFamily: 'var(--font-black)',
            fontSize: 'var(--font-size-page-heading)',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            margin: '8px 0 10px',
            color: 'var(--text-primary)' 
          }}
        >
          DAILY PLAYLIST <span style={{ color: 'var(--color-orange)', textDecoration: 'underline wavy var(--color-orange)' }}>VOTING</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600, maxWidth: '680px', lineHeight: 1.6 }}>
          Vote for the tracks you want to hear during tonight's 9:00 PM Hostel Prime Hour. One vote per student per day.
        </p>
      </div>

      {/* Main Voting Card */}
      <section 
        className="card-modern community-poll-banner"
        style={{
          borderRadius: '24px',
          backgroundColor: 'var(--bg-tertiary)',
          border: '2.5px solid #000',
          boxShadow: '6px 6px 0 #000',
          padding: 'var(--space-2xl)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', borderBottom: '2px dashed var(--border-color)', paddingBottom: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase' }}>
              <Flame size={14} /> TONIGHT'S PRIME POLL
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
              {mockVotingData.dailySongPoll.question}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, backgroundColor: 'rgba(255, 85, 0, 0.1)', color: 'var(--color-orange)', border: '1.5px solid var(--color-orange)', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={13} /> {mockVotingData.dailySongPoll.deadline}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 800, backgroundColor: '#000', color: '#FFF', padding: '6px 12px', borderRadius: '8px' }}>
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
                style={{
                  borderRadius: '18px',
                  backgroundColor: isVoted ? 'rgba(255, 85, 0, 0.05)' : 'var(--bg-primary)',
                  border: isVoted ? '2.5px solid var(--color-orange)' : '2px solid #000',
                  boxShadow: isVoted ? '4px 4px 0 var(--color-orange)' : '3px 3px 0 #000',
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  {/* Song Info & Preview */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '240px', flex: '1 1 auto' }}>
                    <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '12px', overflow: 'hidden', border: '2px solid #000', flexShrink: 0 }}>
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
                          backgroundColor: 'rgba(0, 0, 0, 0.45)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF'
                        }}
                      >
                        {isCurrentlyPlaying ? <Pause size={22} fill="#FFF" /> : <Play size={22} fill="#FFF" style={{ marginLeft: '2px' }} />}
                      </button>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                          {song.title}
                        </h3>
                        {isVoted && (
                          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 900, backgroundColor: 'var(--color-orange)', color: '#FFF', padding: '2px 6px', borderRadius: '4px' }}>
                            YOUR VOTE
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          {song.artist}
                        </span>
                        <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', backgroundColor: 'var(--border-color)', color: 'var(--text-secondary)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                          {song.genre}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Vote Action & Stats */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: 'var(--font-black)', fontSize: '1.25rem', color: isVoted ? 'var(--color-orange)' : 'var(--text-primary)' }}>
                        {percentage}%
                      </span>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                        {song.votes} votes
                      </div>
                    </div>

                    <button
                      onClick={() => handleVote(song.id)}
                      className="btn-brutal"
                      style={{
                        padding: '10px 18px',
                        borderRadius: '999px',
                        backgroundColor: isVoted ? 'var(--color-orange)' : '#FFFFFF',
                        color: isVoted ? '#FFFFFF' : '#000000',
                        border: '2px solid #000',
                        boxShadow: '2px 2px 0 #000',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        fontWeight: 900,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
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
                <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${percentage}%`, 
                      height: '100%', 
                      backgroundColor: isVoted ? 'var(--color-orange)' : '#000000',
                      transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      borderRadius: '999px'
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Song Dedications & Requests Section */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-xl)' }}>
        {/* Request Form */}
        <div 
          className="card-modern community-form-card"
          style={{
            borderRadius: '24px',
            backgroundColor: 'var(--bg-tertiary)',
            border: '2.5px solid #000',
            boxShadow: '4px 4px 0 #000',
            padding: 'var(--space-xl)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Radio size={18} color="var(--color-orange)" />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
              DEDICATE A TRACK
            </h3>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '18px' }}>
            Request a song for tonight's hostel acoustic hour. RJs pick the top 5 student dedications!
          </p>

          <form onSubmit={handleRequestSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, marginBottom: '6px' }}>
                TRACK TITLE *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dil Chahta Hai or Sunflower"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '2px solid #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '16px',
                  backgroundColor: 'var(--bg-primary)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, marginBottom: '6px' }}>
                ARTIST / BAND *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. The Nitte Collective / Shankar Mahadevan"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '2px solid #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '16px',
                  backgroundColor: 'var(--bg-primary)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, marginBottom: '6px' }}>
                HOSTEL / BLOCK
              </label>
              <input
                type="text"
                placeholder="e.g. Kaveri Block A or Netravati 304"
                value={hostelBlock}
                onChange={(e) => setHostelBlock(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '2px solid #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '16px',
                  backgroundColor: 'var(--bg-primary)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, marginBottom: '6px' }}>
                DEDICATION MESSAGE
              </label>
              <textarea
                rows={2}
                placeholder="e.g. For room 204 who coded all night for the hackathon!"
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '2px solid #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '16px',
                  backgroundColor: 'var(--bg-primary)',
                  resize: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-brutal"
              style={{
                marginTop: '6px',
                padding: '12px 20px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-orange)',
                color: '#FFFFFF',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
              <span>SEND DEDICATION</span>
            </button>
          </form>
        </div>

        {/* Live Requests Feed */}
        <div 
          className="card-modern"
          style={{
            borderRadius: '24px',
            backgroundColor: 'var(--bg-tertiary)',
            border: '2.5px solid #000',
            boxShadow: '4px 4px 0 #000',
            padding: 'var(--space-xl)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="var(--color-orange)" />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                RECENT STUDENT REQUESTS
              </h3>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: 'var(--text-muted)' }}>
              LIVE FEED
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
            {requests.map((req) => (
              <div
                key={req.id}
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  backgroundColor: 'var(--bg-primary)',
                  border: '1.5px solid #000',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '10px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 800 }}>
                      {req.songTitle}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      • {req.artist}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '4px 0' }}>
                    "{req.dedication}"
                  </p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-orange)', fontWeight: 700 }}>
                    {req.requestedBy} • {req.hostelBlock} • {req.timeAgo}
                  </div>
                </div>

                <button
                  onClick={() => handleUpvote(req.id)}
                  aria-label="Upvote track request"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1.5px solid #000',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>▲</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 900 }}>{req.upvotes}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
