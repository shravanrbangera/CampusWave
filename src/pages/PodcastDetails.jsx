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
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '999px',
            backgroundColor: '#FFFFFF',
            color: '#000',
            border: '2px solid #000',
            boxShadow: '2px 2px 0 #000',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          <span>BACK TO CRATE</span>
        </button>
      </div>

      {/* Main Episode Banner */}
      <div 
        className="hero-split-grid podcast-details-banner"
        style={{
          padding: 'var(--space-2xl)',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--color-teal) 0%, #000000 100%)',
          border: '3px solid #000',
          boxShadow: '6px 6px 0 #000',
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 340px) 1fr',
          gap: 'var(--space-2xl)',
          alignItems: 'center'
        }}
      >
        {/* Artwork */}
        <div 
          style={{
            position: 'relative',
            width: '100%',
            height: '320px',
            borderRadius: '20px',
            overflow: 'hidden',
            border: '3px solid #000',
            boxShadow: '5px 5px 0 #000'
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
              style={{ 
                backgroundColor: 'var(--color-acid)', 
                color: '#000', 
                border: '2px solid #000',
                borderRadius: '8px',
                padding: '4px 10px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                fontSize: '0.74rem',
                boxShadow: '2px 2px 0 #000'
              }}
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
                fontSize: '0.82rem',
                color: 'var(--color-acid)',
                fontWeight: 800,
                marginBottom: '6px'
              }}
            >
              ⚡ {podcast.showName} • EPISODE DISPATCH // 90.4 MHZ
            </div>
            <h1 
              style={{ 
                fontFamily: 'var(--font-black)', 
                fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', 
                lineHeight: 1.2, 
                marginBottom: '10px', 
                color: '#FFFFFF',
                textTransform: 'uppercase'
              }}
            >
              {podcast.title}
            </h1>
            <div style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.9)', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              <User size={16} color="var(--color-coral)" />
              <span style={{ color: 'var(--color-acid)' }}>{podcast.host}</span>
              <span>— {podcast.hostRole}</span>
            </div>
          </div>

          <p style={{ color: 'rgba(255, 255, 255, 0.92)', fontSize: '0.98rem', lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
            {podcast.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--color-acid)' }}>
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
            {/* Play Button in Primary Vibrant Orange */}
            <button
              onClick={handlePlayToggle}
              className="btn-brutal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 26px',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 900,
                backgroundColor: 'var(--color-orange)',
                color: '#FFFFFF',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                borderRadius: '999px',
                cursor: 'pointer'
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

            {/* Bookmark to Vault */}
            <button
              onClick={handleBookmarkToggle}
              className="btn-brutal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '999px',
                backgroundColor: isSaved ? 'var(--color-orange)' : '#FFFFFF',
                color: isSaved ? '#FFFFFF' : '#000',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                cursor: 'pointer'
              }}
              title={isSaved ? "Saved" : "Save to bookmarks"}
            >
              <Bookmark size={16} fill={isSaved ? "#fff" : "none"} />
              <span>{isSaved ? "BOOKMARKED" : "BOOKMARK"}</span>
            </button>

            {/* Download for Offline Simulation */}
            <button
              onClick={handleDownloadToggle}
              className="btn-brutal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 18px',
                borderRadius: '999px',
                backgroundColor: isDownloaded ? '#10B981' : '#FFFFFF',
                color: isDownloaded ? '#FFFFFF' : '#000',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                cursor: 'pointer'
              }}
              title={isDownloaded ? "Stored for offline listening" : "Simulate download for offline"}
            >
              <Download size={16} />
              <span>{isDownloaded ? "DOWNLOADED ✓" : "DOWNLOAD OFFLINE"}</span>
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="btn-brutal"
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                color: '#000',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Share episode link"
            >
              <Share2 size={18} />
            </button>
          </div>

          {toastMsg && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--color-orange)' }}>
              <CheckCircle2 size={16} />
              <span>{toastMsg}</span>
            </div>
          )}
        </div>
      </div>

      {/* AI Summary & Key Takeaways Module (Progressive Disclosure) */}
      <section 
        className="card-modern"
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          border: '2.5px solid #000',
          boxShadow: '5px 5px 0 #000'
        }}
      >
        <div 
          onClick={() => setAiSummaryOpen(!aiSummaryOpen)}
          style={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            backgroundColor: '#F8F8F8',
            borderBottom: aiSummaryOpen ? '2px solid #000' : 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div 
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-acid)',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000'
              }}
            >
              <Sparkles size={20} fill="#000" />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, margin: 0, color: '#000' }}>
                CAMPUSWAVE AI BROADCAST SYNTHESIS
              </h2>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#444', fontWeight: 600 }}>
                Automated highlights, takeaways, and chapter bookmarks
              </div>
            </div>
          </div>

          <button style={{ color: '#000', background: 'none', border: 'none', cursor: 'pointer' }}>
            {aiSummaryOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
          </button>
        </div>

        {aiSummaryOpen && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Overview */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-coral)', marginBottom: '8px', textTransform: 'uppercase' }}>
                ⚡ EXECUTIVE OVERVIEW
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', color: '#222', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {podcast.aiSummary.overview}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, color: '#000', marginBottom: '8px', textTransform: 'uppercase' }}>
                📌 DISCUSSION HIGHLIGHTS
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#333', display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-body)' }}>
                {podcast.aiSummary.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Key Takeaways */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, color: '#000', marginBottom: '8px', textTransform: 'uppercase' }}>
                💡 ACTIONABLE KEY TAKEAWAYS FOR STUDENTS
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#333', display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'var(--font-body)' }}>
                {podcast.aiSummary.keyTakeaways.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </div>

            {/* Clickable Timestamps Chapters */}
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 800, color: '#000', marginBottom: '10px', textTransform: 'uppercase' }}>
                ⏱️ CHAPTER BOOKMARKS (CLICK TO JUMP AUDIO)
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '10px' }}>
                {podcast.aiSummary.timestamps.map((ts, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleTimestampJump(ts.time)}
                    className="btn-brutal"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '2px solid #000',
                      boxShadow: '2px 2px 0 #000',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <span 
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 900,
                        color: '#000',
                        backgroundColor: 'var(--color-acid)',
                        border: '1.5px solid #000',
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {ts.time}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)', color: '#000', fontWeight: 700 }}>
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
              🎙️ MORE IN THIS CRATE
            </span>
            <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-black)', textTransform: 'uppercase' }}>
              Related Student Shows
            </h2>
          </div>
        </div>

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
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
