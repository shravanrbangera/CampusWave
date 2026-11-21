import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Bookmark, 
  Download,
  Share2, 
  Clock, 
  User, 
  Sparkles, 
  ArrowLeft, 
  Check, 
  Calendar,
  Volume2,
  ChevronDown,
  ChevronUp,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { mockPodcasts } from '../data/podcasts';
import { useAudio } from '../context/AudioContext';
import { useAuth } from '../context/AuthContext';
import { PodcastCard } from '../components/PodcastCard';
import { AudioWaveform } from '../components/AudioWaveform';

export const PodcastDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentTrack, isPlaying, playTrack, togglePlay, seekTo, currentTime, duration, formatTime } = useAudio();
  const { savedPodcasts, toggleSavePodcast, downloadedPodcasts, toggleDownloadPodcast } = useAuth();

  const [aiSummaryOpen, setAiSummaryOpen] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const podcast = mockPodcasts.find(p => p.id === id) || mockPodcasts[0];
  const isCurrent = currentTrack?.id === podcast.id;
  const isSaved = savedPodcasts?.includes(podcast.id);
  const isDownloaded = downloadedPodcasts?.includes(podcast.id);

  const handlePlayToggle = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(podcast);
    }
  };

  const handleDownloadToggle = () => {
    const isNowDownloaded = toggleDownloadPodcast(podcast.id);
    setToastMsg(isNowDownloaded ? "Episode stored for offline listening in your Saved vault!" : "Offline download removed from vault.");
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleBookmarkToggle = () => {
    const isNowSaved = toggleSavePodcast(podcast.id);
    setToastMsg(isNowSaved ? "Episode bookmarked in your Saved vault!" : "Episode removed from bookmarks.");
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setToastMsg("Episode URL copied to clipboard!");
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleTimestampJump = (timeStr) => {
    const parts = timeStr.split(':').map(Number);
    const secs = parts.length === 2 ? parts[0] * 60 + parts[1] : 0;
    if (!isCurrent) {
      playTrack(podcast);
    }
    setTimeout(() => {
      seekTo(secs);
    }, 150);
  };

  // Related episodes
  const relatedEpisodes = mockPodcasts.filter(p => p.id !== podcast.id).slice(0, 3);

  return (
    <div className="podcast-details-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate(-1)}
          className="btn-secondary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            fontSize: '0.82rem',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          <span>BACK TO CRATE</span>
        </button>
      </div>

      {/* Main Episode Banner */}
      <div 
        className="hero-split-grid podcast-details-banner card-forest"
        style={{
          padding: 'var(--space-2xl)',
          borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--color-forest)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: 'var(--shadow-md)',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 340px) 1fr',
          gap: 'var(--space-2xl)',
          alignItems: 'center',
          color: '#FFFFFF'
        }}
      >
        {/* Artwork */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '300px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <img 
            src={podcast.cover} 
            alt={podcast.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div 
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px'
            }}
          >
            <span 
              className="editorial-badge"
              style={{ fontSize: '0.74rem' }}
            >
              {podcast.category}
            </span>
          </div>
        </div>

        {/* Details & Action Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--color-yellow)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '6px'
              }}
            >
              {podcast.showName.toUpperCase()} • 90.4 MHZ
            </div>
            <h1 
              style={{ 
                fontFamily: 'var(--font-heading)', 
                fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)', 
                lineHeight: 1.2, 
                marginBottom: '10px', 
                color: '#FFFFFF',
                fontWeight: 800
              }}
            >
              {podcast.title}
            </h1>
            <div style={{ fontSize: '0.92rem', color: 'rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              <User size={16} color="var(--color-orange)" />
              <span style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-yellow)', letterSpacing: '0.02em', fontSize: '1.02rem', fontWeight: 700 }}>{podcast.host}</span>
              <span>— {podcast.hostRole}</span>
            </div>
          </div>

          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.94rem', lineHeight: 1.6 }}>
            {podcast.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.82rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.8)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} />
              <span>{podcast.duration}</span>
            </div>
            <div>•</div>
            <div>{podcast.plays} PLAYS</div>
            <div>•</div>
            <div>RELEASED {podcast.publishedAt}</div>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingTop: '8px' }}>
            <button
              onClick={handlePlayToggle}
              className="btn-primary"
              style={{
                backgroundColor: 'var(--color-orange)',
                padding: '12px 24px',
                fontSize: '0.9rem'
              }}
            >
              {isCurrent && isPlaying ? (
                <>
                  <Pause size={18} fill="#FFF" />
                  <span>PAUSE EPISODE</span>
                </>
              ) : (
                <>
                  <Play size={18} fill="#FFF" style={{ marginLeft: '2px' }} />
                  <span>PLAY EPISODE ({podcast.duration})</span>
                </>
              )}
            </button>

            <button
              onClick={handleBookmarkToggle}
              className={isSaved ? "btn-primary" : "btn-secondary"}
              style={{
                padding: '10px 18px',
                fontSize: '0.82rem',
                backgroundColor: isSaved ? 'var(--color-orange)' : 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.25)'
              }}
              title={isSaved ? "Saved" : "Save to bookmarks"}
            >
              <Bookmark size={15} fill={isSaved ? "#fff" : "none"} />
              <span>{isSaved ? "BOOKMARKED" : "BOOKMARK"}</span>
            </button>

            <button
              onClick={handleDownloadToggle}
              className="btn-secondary"
              style={{
                padding: '10px 18px',
                fontSize: '0.82rem',
                backgroundColor: isDownloaded ? 'var(--color-success)' : 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.25)'
              }}
              title={isDownloaded ? "Stored for offline listening" : "Simulate download for offline"}
            >
              <Download size={15} />
              <span>{isDownloaded ? "STORED OFFLINE" : "DOWNLOAD OFFLINE"}</span>
            </button>

            <button
              onClick={handleShare}
              className="btn-icon"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.25)'
              }}
              title="Share episode link"
            >
              <Share2 size={16} />
            </button>
          </div>

          {toastMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-orange)' }}>
              <CheckCircle2 size={16} />
              <span>{toastMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* AI Summary & Key Takeaways Module */}
      <section 
        className="card-modern"
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-card)'
        }}
      >
        <div 
          onClick={() => setAiSummaryOpen(!aiSummaryOpen)}
          style={{
            padding: '18px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            backgroundColor: 'var(--bg-card-subtle)',
            borderBottom: aiSummaryOpen ? '1px solid var(--border-color)' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-orange-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-orange)'
              }}
            >
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-radio)', fontSize: '1.15rem', margin: 0, color: 'var(--text-primary)', letterSpacing: '0.03em' }}>
                CAMPUSWAVE AI BROADCAST SYNTHESIS
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Automated highlights, takeaways, and chapter bookmarks
              </div>
            </div>
          </div>

          <button style={{ color: 'var(--text-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>
            {aiSummaryOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {aiSummaryOpen && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Overview */}
            <div>
              <h3 style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--color-orange)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-radio)' }}>
                EXECUTIVE OVERVIEW
              </h3>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                {podcast.aiSummary.overview}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h3 style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-radio)' }}>
                DISCUSSION HIGHLIGHTS
              </h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
                {podcast.aiSummary.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Key Takeaways */}
            <div>
              <h3 style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-radio)' }}>
                ACTIONABLE KEY TAKEAWAYS FOR STUDENTS
              </h3>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
                {podcast.aiSummary.keyTakeaways.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>

            {/* Clickable Timestamps Chapters */}
            <div>
              <h3 style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-radio)' }}>
                CHAPTER BOOKMARKS (CLICK TO JUMP AUDIO)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                {podcast.aiSummary.timestamps.map((ts, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTimestampJump(ts.time)}
                    className="card-modern"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-card-subtle)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      style={{
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        color: 'var(--color-orange)',
                        backgroundColor: 'var(--color-orange-soft)',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {ts.time}
                    </span>
                    <span style={{ fontSize: '0.84rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {ts.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Related Episodes */}
      <section>
        <div className="section-header" style={{ marginBottom: '16px' }}>
          <div>
            <span className="retro-pill retro-pill-yellow" style={{ marginBottom: '6px' }}>
              MORE IN THIS CRATE
            </span>
            <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-radio)', letterSpacing: '0.03em' }}>
              RELATED STUDENT SHOWS
            </h2>
          </div>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: 'var(--space-lg)'
          }}
        >
          {relatedEpisodes.map(ep => (
            <PodcastCard key={ep.id} podcast={ep} />
          ))}
        </div>
      </section>
    </div>
  );
};
