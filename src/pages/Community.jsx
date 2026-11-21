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
  Flame
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
        colors: ['#F52D3A', '#FFB52E', '#123C40', '#202020']
      });
    } catch (e) {}

    setToastMsg("Vote counted! RJ Ananya will announce the winner at 9:00 PM.");
    setTimeout(() => setToastMsg(''), 3500);
  };

  // Handle Campus Poll
  const handleVoteCampusPoll = (optId) => {
    setCampusPollVote(optId);
    castVote('campusStudySpot', optId);
    setToastMsg("Poll response recorded!");
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
        <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
          STUDENT ENGAGEMENT
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginTop: '8px', marginBottom: '12px', color: 'var(--color-charcoal)' }}>
          Community & Music Voting
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px' }}>
          Have your say on what airs across the campus radio. Vote for tonight's headline track, submit song dedications, and participate in campus polls.
        </p>
      </div>

      {toastMsg && (
        <div 
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid #16a34a',
            color: '#16a34a',
            padding: '12px 20px',
            borderRadius: 'var(--radius-lg)',
            fontWeight: 600,
            textAlign: 'center'
          }}
        >
          ✓ {toastMsg}
        </div>
      )}

      {/* Main Daily Song Poll (Big Featured Interactive Section) */}
      <section 
        className="card-modern"
        style={{
          padding: 'var(--space-2xl)',
          borderRadius: 'var(--radius-2xl)',
          background: 'linear-gradient(135deg, var(--color-teal) 0%, var(--color-charcoal) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '22px' }}>
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-coral)', color: '#FFFFFF', border: 'none', marginBottom: '10px' }}>
              <Vote size={13} color="#fff" />
              DAILY LIVE TRANSMISSION POLL
            </span>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#FFFFFF' }}>
              {mockVotingData.dailySongPoll.question}
            </h2>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-amber)', textAlign: 'right' }}>
            <div style={{ fontWeight: 700 }}>{mockVotingData.dailySongPoll.deadline}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.78rem' }}>
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
                  borderRadius: 'var(--radius-xl)',
                  backgroundColor: isSelected ? 'rgba(245, 45, 58, 0.25)' : 'rgba(0, 0, 0, 0.35)',
                  border: isSelected ? '2px solid var(--color-coral)' : '1px solid rgba(255, 255, 255, 0.12)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                  transition: 'all var(--transition-fast)'
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
                    backgroundColor: isSelected ? 'rgba(245, 45, 58, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    zIndex: 0,
                    transition: 'width 0.5s ease'
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <img 
                    src={song.cover} 
                    alt={song.title} 
                    style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} 
                  />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: isSelected ? 'var(--color-coral)' : '#FFFFFF', marginBottom: '4px' }}>
                      {song.title}
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)' }}>
                      {song.artist} • {song.genre}
                    </div>
                  </div>
                </div>

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: isSelected ? 'var(--color-coral)' : '#FFFFFF' }}>
                    {pct}%
                  </div>

                  <button
                    style={{
                      padding: '8px 20px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      backgroundColor: isSelected ? 'var(--color-coral)' : 'rgba(255, 255, 255, 0.15)',
                      color: '#FFFFFF',
                      cursor: 'pointer'
                    }}
                  >
                    {isSelected ? "Selected ✓" : "Vote This"}
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
        <div className="card-modern" style={{ padding: 'var(--space-2xl)', borderRadius: 'var(--radius-2xl)', backgroundColor: 'var(--color-white)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <Music size={22} color="var(--color-coral)" />
            <h2 style={{ fontSize: '1.45rem', margin: 0, color: 'var(--color-charcoal)' }}>Request a Song for Tonight</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '22px' }}>
            Want to dedicate a track to your hostel mates or project team? Drop your request directly to the studio queue.
          </p>

          <form onSubmit={handleSongRequestSubmit}>
            <div className="form-group">
              <label className="form-label">Song Title</label>
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                placeholder="e.g. Kasoor, Dil Chahta Hai, Starboy..."
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Artist / Band</label>
              <input
                type="text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="e.g. Prateek Kuhad, A.R. Rahman..."
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Hostel / Wing</label>
              <select
                value={hostelBlock}
                onChange={(e) => setHostelBlock(e.target.value)}
                className="form-input"
                style={{ cursor: 'pointer' }}
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

            <div className="form-group">
              <label className="form-label">Dedication / Message</label>
              <textarea
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                placeholder="Shoutout to Room 304 or the midnight HackNight coders..."
                className="form-input"
                rows={3}
                style={{ resize: 'none' }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '13px', fontSize: '0.95rem' }}
            >
              <Send size={16} />
              <span>Submit Song Request to RJ</span>
            </button>
          </form>
        </div>

        {/* Campus Poll Card */}
        <div className="card-modern" style={{ padding: 'var(--space-2xl)', borderRadius: 'var(--radius-2xl)', backgroundColor: 'var(--color-white)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={20} color="var(--color-coral)" />
            <h2 style={{ fontSize: '1.4rem', margin: 0, color: 'var(--color-charcoal)' }}>Campus Life Poll</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '20px' }}>
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
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: isSelected ? 'rgba(245, 45, 58, 0.08)' : 'var(--color-soft-grey)',
                    border: isSelected ? '2px solid var(--color-coral)' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${pct}%`,
                      backgroundColor: isSelected ? 'rgba(245, 45, 58, 0.12)' : 'rgba(0,0,0,0.03)',
                      zIndex: 0,
                      transition: 'width 0.4s ease'
                    }}
                  />
                  <span style={{ position: 'relative', zIndex: 1, fontSize: '0.9rem', fontWeight: 600, color: isSelected ? 'var(--color-coral)' : 'var(--color-charcoal)' }}>
                    {opt.text}
                  </span>
                  <span style={{ position: 'relative', zIndex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 700, color: isSelected ? 'var(--color-coral)' : 'var(--text-muted)' }}>
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '22px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Poll results refreshed live from NMAMIT student activity sessions.
          </div>
        </div>
      </section>

      {/* Recent Community Song Requests Stream */}
      <section>
        <div className="section-header">
          <div>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
              REQUEST BOARD
            </span>
            <h2 className="section-header-title" style={{ marginTop: '6px' }}>
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
                padding: '20px 22px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--color-coral)', fontWeight: 700 }}>
                    {req.hostelBlock}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {req.timeAgo}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.08rem', fontWeight: 700, marginBottom: '2px', color: 'var(--color-charcoal)' }}>
                  {req.songTitle}
                </h3>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                  by {req.artist}
                </div>

                <p style={{ fontStyle: 'italic', fontSize: '0.86rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--color-amber)', paddingLeft: '10px' }}>
                  “{req.dedication}”
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Requested by <strong style={{ color: 'var(--color-charcoal)' }}>{req.requestedBy}</strong>
                </span>

                <button
                  onClick={() => handleUpvoteRequest(req.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.82rem',
                    color: 'var(--color-coral)',
                    backgroundColor: 'rgba(245, 45, 58, 0.08)',
                    padding: '5px 12px',
                    borderRadius: 'var(--radius-full)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    border: '1px solid rgba(245, 45, 58, 0.2)'
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