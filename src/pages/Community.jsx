import React, { useState } from 'react';
import { 
  Vote, 
  Send, 
  Music, 
  Heart, 
  ThumbsUp, 
  Radio, 
  Sparkles, 
  MessageSquare,
  CheckCircle2,
  Clock,
  Flame,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockVotingData } from '../data/voting';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';

export const Community = () => {
  const { user, votedPolls, castVote } = useAuth();
  const { playTrack } = useAudio();

  const [activeSongVote, setActiveSongVote] = useState(votedPolls['dailySong'] || null);
  const [campusPollVote, setCampusPollVote] = useState(votedPolls['campusStudySpot'] || null);
  
  // Song Request Form state
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [hostelBlock, setHostelBlock] = useState(user?.hostel || 'Netravati Block B');
  const [dedication, setDedication] = useState('');
  
  // Song requests list
  const [requests, setRequests] = useState(mockVotingData.recentSongRequests);
  const [toastMsg, setToastMsg] = useState('');

  // Handle Daily Song Vote
  const handleVoteSong = (songId) => {
    setActiveSongVote(songId);
    castVote('dailySong', songId);
    
    // Trigger festive confetti burst
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E8FF00', '#F52D3A', '#000000', '#00F0FF']
      });
    } catch (e) {}

    setToastMsg("VOTE RECORDED! RJ Ananya will announce the winner at 9:00 PM.");
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Handle Campus Poll
  const handleVoteCampusPoll = (optId) => {
    setCampusPollVote(optId);
    castVote('campusStudySpot', optId);
    setToastMsg("Campus poll response counted!");
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Handle New Song Request
  const handleSongRequestSubmit = (e) => {
    e.preventDefault();
    if (!songTitle.trim() || !artistName.trim()) return;

    const newReq = {
      id: `req-${Date.now()}`,
      songTitle: songTitle.trim(),
      artist: artistName.trim(),
      requestedBy: user?.name || "Student",
      hostelBlock: hostelBlock,
      dedication: dedication.trim() || "Dedicated to all hostel peers!",
      timeAgo: "Just now",
      upvotes: 1
    };

    setRequests([newReq, ...requests]);
    setSongTitle('');
    setArtistName('');
    setDedication('');
    setToastMsg("Song request queued for review by the station RJ!");
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Upvote a request
  const handleUpvoteRequest = (reqId) => {
    setRequests(requests.map(r => {
      if (r.id === reqId) {
        return { ...r, upvotes: r.upvotes + 1 };
      }
      return r;
    }));
  };

  return (
    <div className="community-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
      {/* Top Header */}
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
              backgroundColor: 'var(--color-acid)',
              color: '#000',
              border: '2px solid #000',
              borderRadius: '8px',
              padding: '4px 10px',
              boxShadow: '2px 2px 0 #000'
            }}
          >
            <Zap size={13} fill="#000" />
            CAMPUS JUKEBOX // 90.4 MHZ LIVE
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: '#333' }}>
            COMMUNITY SOUNDBATTLE
          </span>
        </div>

        <h1 
          style={{ 
            fontFamily: 'var(--font-black)',
            fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            marginTop: '8px', 
            marginBottom: '10px', 
            color: 'var(--color-ink)' 
          }}
        >
          COMMUNITY & <span className="highlight-acid" style={{ border: '2px solid #000', borderRadius: '6px', padding: '0 8px' }}>MUSIC VOTING</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.95rem', fontWeight: 600, maxWidth: '680px', lineHeight: 1.6 }}>
          Have your say on what airs across the campus radio. Vote for tonight's headline track, submit song dedications, and participate in campus polls.
        </p>
      </div>

      {toastMsg && (
        <div 
          style={{
            backgroundColor: 'var(--color-acid)',
            border: '2px solid #000',
            boxShadow: '4px 4px 0 #000',
            color: '#000',
            padding: '12px 20px',
            borderRadius: '12px',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            textAlign: 'center'
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* Main Daily Song Poll */}
      <section 
        className="community-poll-banner"
        style={{
          padding: 'var(--space-2xl)',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--color-teal) 0%, #000000 100%)',
          border: '3px solid #000',
          boxShadow: '6px 6px 0 #000'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '22px' }}>
          <div>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                backgroundColor: 'var(--color-coral)',
                color: '#FFFFFF',
                border: '2px solid #000',
                borderRadius: '8px',
                padding: '4px 10px',
                boxShadow: '2px 2px 0 #000',
                marginBottom: '10px'
              }}
            >
              <Vote size={13} color="#fff" />
              DAILY LIVE TRANSMISSION POLL
            </span>
            <h2 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#FFFFFF', textTransform: 'uppercase' }}>
              {mockVotingData.dailySongPoll.question}
            </h2>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-acid)', textAlign: 'right' }}>
            <div style={{ fontWeight: 800 }}>DEADLINE: {mockVotingData.dailySongPoll.deadline}</div>
            <div style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 700 }}>
              {mockVotingData.dailySongPoll.totalVotes + (activeSongVote ? 1 : 0)} votes registered
            </div>
          </div>
        </div>

        {/* Voting Song Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
          {mockVotingData.dailySongPoll.songs.map(song => {
            const isSelected = activeSongVote === song.id;
            const total = mockVotingData.dailySongPoll.totalVotes + (activeSongVote ? 1 : 0);
            const votes = song.votes + (isSelected ? 1 : 0);
            const pct = Math.round((votes / total) * 100);

            return (
              <div
                key={song.id}
                onClick={() => handleVoteSong(song.id)}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  padding: '20px',
                  borderRadius: '20px',
                  backgroundColor: isSelected ? '#FFFFFF' : 'rgba(0, 0, 0, 0.45)',
                  border: isSelected ? '3px solid var(--color-acid)' : '2px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: isSelected ? '4px 4px 0 var(--color-acid)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'all 0.15s ease'
                }}
              >
                {/* Visual Progress Fill */}
                <div 
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${pct}%`,
                    backgroundColor: isSelected ? 'rgba(232, 255, 0, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    zIndex: 0,
                    transition: 'width 0.5s ease'
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img 
                    src={song.cover} 
                    alt={song.title} 
                    style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover', border: '2px solid #000' }} 
                  />
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, color: isSelected ? '#000' : '#FFFFFF', marginBottom: '4px' }}>
                      {song.title}
                    </h3>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: isSelected ? '#333' : 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      {song.artist} • {song.genre}
                    </div>
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: 'var(--font-black)', fontSize: '1.6rem', color: isSelected ? '#000' : 'var(--color-acid)' }}>
                    {pct}%
                  </div>

                  <button
                    className="btn-brutal"
                    style={{
                      padding: '8px 20px',
                      borderRadius: '999px',
                      fontSize: '0.82rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      backgroundColor: isSelected ? 'var(--color-acid)' : '#FFFFFF',
                      color: '#000000',
                      border: '2px solid #000',
                      boxShadow: '2px 2px 0 #000',
                      cursor: 'pointer'
                    }}
                  >
                    {isSelected ? "VOTED" : "VOTE THIS"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two Column Grid: Song Request Box & Campus Poll */}
      <section 
        style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: 'var(--space-2xl)'
        }}
        className="hero-split-grid"
      >
        {/* Song Request Box */}
        <div className="card-modern community-form-card" style={{ padding: 'var(--space-2xl)', borderRadius: '24px', backgroundColor: '#FFFFFF', border: '2.5px solid #000', boxShadow: '5px 5px 0 #000' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Music size={24} color="var(--color-coral)" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', fontWeight: 800, margin: 0, color: '#000', textTransform: 'uppercase' }}>
              Request a Song for Tonight
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.88rem', fontWeight: 600, marginBottom: '22px' }}>
            Want to dedicate a track to your hostel mates or project team? Drop your request directly into the RJ cue.
          </p>

          <form onSubmit={handleSongRequestSubmit}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>Song Title</label>
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="e.g. Kasoor, Dil Chahta Hai, Starboy..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0 #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>Artist / Band</label>
              <input
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="e.g. Prateek Kuhad, A.R. Rahman..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0 #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>Your Hostel / Wing</label>
              <select
                value={hostelBlock}
                onChange={(e) => setHostelBlock(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0 #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  cursor: 'pointer',
                  backgroundColor: '#fff'
                }}
              >
                <option value="Netravati Block A">Netravati Block A</option>
                <option value="Netravati Block B">Netravati Block B</option>
                <option value="Shambhavi Block A">Shambhavi Block A</option>
                <option value="Shambhavi Block B">Shambhavi Block B</option>
                <option value="Shambhavi Block C">Shambhavi Block C</option>
                <option value="Kaveri Girls Hostel">Kaveri Girls Hostel</option>
                <option value="Day Scholar (Commuter)">Day Scholar (Commuter)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>Dedication / Message</label>
              <textarea
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                placeholder="Shoutout to Room 304 or the midnight HackNight coders..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0 #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-brutal"
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                backgroundColor: 'var(--color-coral)',
                color: '#fff',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
              <span>SUBMIT SONG REQUEST TO RJ</span>
            </button>
          </form>
        </div>

        {/* Campus Poll Card */}
        <div className="card-modern" style={{ padding: 'var(--space-2xl)', borderRadius: '24px', backgroundColor: '#FFFFFF', border: '2.5px solid #000', boxShadow: '5px 5px 0 #000' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={22} color="var(--color-coral)" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, margin: 0, color: '#000', textTransform: 'uppercase' }}>
              Campus Life Poll
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.92rem', fontWeight: 600, marginBottom: '20px' }}>
            {mockVotingData.campusPoll.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockVotingData.campusPoll.options.map(opt => {
              const isSelected = campusPollVote === opt.id;
              const total = mockVotingData.campusPoll.totalVotes + (campusPollVote ? 1 : 0);
              const votes = opt.votes + (isSelected ? 1 : 0);
              const pct = Math.round((votes / total) * 100);

              return (
                <div
                  key={opt.id}
                  onClick={() => handleVoteCampusPoll(opt.id)}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '16px 18px',
                    borderRadius: '14px',
                    backgroundColor: isSelected ? 'var(--color-acid)' : '#F5F5F5',
                    border: '2px solid #000',
                    boxShadow: isSelected ? '3px 3px 0 #000' : '2px 2px 0 #000',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${pct}%`,
                      backgroundColor: 'rgba(0, 0, 0, 0.08)',
                      zIndex: 0,
                      transition: 'width 0.4s ease'
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1, fontSize: '0.9rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#000' }}>
                    {opt.text}
                  </span>
                  <span style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 900, color: '#000' }}>
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '22px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#444', textAlign: 'center', fontWeight: 600 }}>
            Poll results refreshed live from NMAMIT student listener sessions.
          </div>
        </div>
      </section>

      {/* Recent Community Song Requests Stream */}
      <section>
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <div>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                backgroundColor: 'var(--color-acid)',
                color: '#000',
                border: '1.5px solid #000',
                padding: '3px 8px',
                borderRadius: '6px',
                boxShadow: '2px 2px 0 #000'
              }}
            >
              REQUEST BOARD
            </span>
            <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-black)', textTransform: 'uppercase' }}>
              Recent Student Requests & Dedications
            </h2>
          </div>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-md)'
          }}
        >
          {requests.map(req => (
            <div
              key={req.id}
              className="card-modern"
              style={{
                padding: '22px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#000', backgroundColor: 'var(--color-acid)', border: '1.5px solid #000', padding: '2px 8px', borderRadius: '6px', fontWeight: 800 }}>
                    {req.hostelBlock}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#555', fontWeight: 700 }}>
                    {req.timeAgo}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '2px', color: '#000' }}>
                  {req.songTitle}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: 'var(--color-coral)', fontWeight: 700, marginBottom: '12px' }}>
                  by {req.artist}
                </div>

                <p style={{ fontStyle: 'italic', fontSize: '0.86rem', color: '#333', borderLeft: '3px solid #000', paddingLeft: '10px', fontFamily: 'var(--font-body)' }}>
                  “{req.dedication}”
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '2px dashed #000' }}>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#444' }}>
                  Req by: <strong style={{ color: '#000' }}>{req.requestedBy}</strong>
                </span>

                <button
                  onClick={() => handleUpvoteRequest(req.id)}
                  className="btn-brutal"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    color: '#000',
                    backgroundColor: 'var(--color-acid)',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    border: '1.5px solid #000',
                    boxShadow: '1.5px 1.5px 0 #000'
                  }}
                  title="Upvote this song"
                >
                  <ThumbsUp size={13} />
                  <span>{req.upvotes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
