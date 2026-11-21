import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bookmark, 
  Download, 
  Clock, 
  Heart, 
  Play, 
  Pause, 
  Trash2, 
  ArrowRight, 
  Mic2, 
  Radio, 
  Music,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { mockPodcasts } from '../data/podcasts';
import { mockMusic } from '../data/music';

export const Saved = () => {
  const [activeTab, setActiveTab] = useState('podcasts'); // 'podcasts' | 'downloads' | 'history' | 'liked'
  const [toastMsg, setToastMsg] = useState('');

  const { 
    savedPodcasts, 
    downloadedPodcasts, 
    listeningHistory, 
    likedTracks, 
    removeSavedPodcast, 
    removeDownloadedPodcast,
    toggleLikeTrack 
  } = useAuth();

  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  // Filter saved & downloaded podcasts from mock data
  const bookmarkedEpisodes = mockPodcasts.filter(p => savedPodcasts?.includes(p.id));
  const downloadedEpisodes = mockPodcasts.filter(p => downloadedPodcasts?.includes(p.id));
  const favoriteTracks = mockMusic.filter(m => likedTracks?.includes(m.id));

  const handlePlayToggle = (item, type = 'podcast') => {
    const isCurrent = currentTrack?.id === item.id;
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack({
        id: item.id,
        title: item.title,
        artist: item.host || item.artist,
        showName: item.showName || item.album || "Campus Wave",
        cover: item.cover,
        duration: item.duration,
        durationSeconds: item.durationSeconds || 1200,
        type: type,
        badge: item.badge || "Saved",
        category: item.category || item.genre || "Audio"
      });
    }
  };

  const handleRemoveBookmark = (id, title) => {
    removeSavedPodcast(id);
    setToastMsg(`Removed "${title}" from bookmarked episodes.`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleRemoveDownload = (id, title) => {
    removeDownloadedPodcast(id);
    setToastMsg(`Deleted offline download for "${title}".`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleRemoveLiked = (id, title) => {
    toggleLikeTrack(id);
    setToastMsg(`Removed "${title}" from liked music.`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="saved-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Toast Alert */}
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

      {/* Header */}
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
            <Bookmark size={13} fill="#FFF" />
            STUDENT AUDIO VAULT // 90.4 FM
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            OFFLINE & SAVED EPISODES
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
          SAVED <span style={{ color: 'var(--color-orange)', textDecoration: 'underline wavy var(--color-orange)' }}>LIBRARY</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 600, maxWidth: '680px', lineHeight: 1.6 }}>
          Your bookmarked episodes, offline downloaded audio, listening history, and liked student tracks in one convenient vault.
        </p>
      </div>

      {/* Segmented Tab Controls */}
      <div 
        className="category-pills-row scroll-touch-pills"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '6px'
        }}
      >
        <button
          onClick={() => setActiveTab('podcasts')}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            textTransform: 'uppercase',
            backgroundColor: activeTab === 'podcasts' ? 'var(--color-orange)' : 'var(--bg-tertiary)',
            color: activeTab === 'podcasts' ? '#FFFFFF' : 'var(--text-primary)',
            border: '2px solid #000',
            boxShadow: activeTab === 'podcasts' ? '3px 3px 0 #000' : '2px 2px 0 #000',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          <Mic2 size={16} />
          <span>Bookmarked ({bookmarkedEpisodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            textTransform: 'uppercase',
            backgroundColor: activeTab === 'downloads' ? 'var(--color-orange)' : 'var(--bg-tertiary)',
            color: activeTab === 'downloads' ? '#FFFFFF' : 'var(--text-primary)',
            border: '2px solid #000',
            boxShadow: activeTab === 'downloads' ? '3px 3px 0 #000' : '2px 2px 0 #000',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          <Download size={16} />
          <span>Downloaded ({downloadedEpisodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            textTransform: 'uppercase',
            backgroundColor: activeTab === 'history' ? 'var(--color-orange)' : 'var(--bg-tertiary)',
            color: activeTab === 'history' ? '#FFFFFF' : 'var(--text-primary)',
            border: '2px solid #000',
            boxShadow: activeTab === 'history' ? '3px 3px 0 #000' : '2px 2px 0 #000',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          <Clock size={16} />
          <span>Recently Played ({listeningHistory?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 18px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            textTransform: 'uppercase',
            backgroundColor: activeTab === 'liked' ? 'var(--color-orange)' : 'var(--bg-tertiary)',
            color: activeTab === 'liked' ? '#FFFFFF' : 'var(--text-primary)',
            border: '2px solid #000',
            boxShadow: activeTab === 'liked' ? '3px 3px 0 #000' : '2px 2px 0 #000',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}
        >
          <Heart size={16} />
          <span>Liked Music ({favoriteTracks.length})</span>
        </button>
      </div>

      {/* Tab 1: Bookmarked Podcast Episodes */}
      {activeTab === 'podcasts' && (
        <div>
          {bookmarkedEpisodes.length === 0 ? (
            <div 
              className="card-modern"
              style={{
                borderRadius: '24px',
                backgroundColor: 'var(--bg-tertiary)',
                border: '2.5px solid #000',
                padding: 'var(--space-3xl) var(--space-xl)',
                textAlign: 'center',
                boxShadow: '4px 4px 0 #000',
                maxWidth: '640px',
                margin: '0 auto'
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255, 85, 0, 0.1)', border: '2px solid var(--color-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-orange)' }}>
                <Bookmark size={28} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
                No Bookmarked Episodes Yet
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                Save interesting podcast episodes while browsing so you never forget what to listen to between college lectures!
              </p>
              <Link
                to="/podcasts"
                className="btn-brutal"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--color-orange)',
                  color: '#FFFFFF',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  fontWeight: 900
                }}
              >
                <span>EXPLORE PODCASTS</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 'var(--space-lg)' }}>
              {bookmarkedEpisodes.map(ep => {
                const isCurrent = currentTrack?.id === ep.id && isPlaying;

                return (
                  <div
                    key={ep.id}
                    className="card-modern"
                    style={{
                      borderRadius: '20px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '2.5px solid #000',
                      boxShadow: '4px 4px 0 #000',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <img 
                        src={ep.cover} 
                        alt={ep.title} 
                        style={{ width: '80px', height: '80px', borderRadius: '14px', objectFit: 'cover', border: '2px solid #000', flexShrink: 0 }} 
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase' }}>
                          {ep.category} • {ep.duration}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0', lineHeight: 1.3 }}>
                          {ep.title}
                        </h3>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          Hosted by {ep.host}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1.5px dashed var(--border-color)', paddingTop: '12px' }}>
                      <button
                        onClick={() => handlePlayToggle(ep, 'podcast')}
                        className="btn-brutal"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          borderRadius: '999px',
                          backgroundColor: isCurrent ? 'var(--color-orange)' : '#000000',
                          color: '#FFFFFF',
                          border: '2px solid #000',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 900,
                          cursor: 'pointer'
                        }}
                      >
                        {isCurrent ? <Pause size={14} fill="#FFF" /> : <Play size={14} fill="#FFF" />}
                        <span>{isCurrent ? 'PAUSE' : 'PLAY EPISODE'}</span>
                      </button>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link
                          to={`/podcast/${ep.id}`}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '8px',
                            backgroundColor: 'var(--bg-primary)',
                            border: '1.5px solid #000',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.74rem',
                            fontWeight: 800,
                            color: 'var(--text-primary)'
                          }}
                        >
                          DETAILS
                        </Link>
                        <button
                          onClick={() => handleRemoveBookmark(ep.id, ep.title)}
                          aria-label="Remove bookmark"
                          title="Remove bookmark"
                          style={{
                            padding: '8px',
                            borderRadius: '8px',
                            backgroundColor: '#FFFFFF',
                            border: '1.5px solid #000',
                            cursor: 'pointer',
                            color: '#E11D48'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Downloaded Offline Episodes */}
      {activeTab === 'downloads' && (
        <div>
          {downloadedEpisodes.length === 0 ? (
            <div 
              className="card-modern"
              style={{
                borderRadius: '24px',
                backgroundColor: 'var(--bg-tertiary)',
                border: '2.5px solid #000',
                padding: 'var(--space-3xl) var(--space-xl)',
                textAlign: 'center',
                boxShadow: '4px 4px 0 #000',
                maxWidth: '640px',
                margin: '0 auto'
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255, 85, 0, 0.1)', border: '2px solid var(--color-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-orange)' }}>
                <Download size={28} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
                No Offline Downloads
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                Download episodes while connected to campus Wi-Fi so you can listen during hostel study hours or daily bus commutes without using data!
              </p>
              <Link
                to="/podcasts"
                className="btn-brutal"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--color-orange)',
                  color: '#FFFFFF',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  fontWeight: 900
                }}
              >
                <span>BROWSE TO DOWNLOAD</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 'var(--space-lg)' }}>
              {downloadedEpisodes.map(ep => {
                const isCurrent = currentTrack?.id === ep.id && isPlaying;

                return (
                  <div
                    key={ep.id}
                    className="card-modern"
                    style={{
                      borderRadius: '20px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '2.5px solid #000',
                      boxShadow: '4px 4px 0 #000',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <img 
                        src={ep.cover} 
                        alt={ep.title} 
                        style={{ width: '80px', height: '80px', borderRadius: '14px', objectFit: 'cover', border: '2px solid #000', flexShrink: 0 }} 
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} /> STORED FOR OFFLINE • {ep.duration}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0', lineHeight: 1.3 }}>
                          {ep.title}
                        </h3>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {ep.host}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1.5px dashed var(--border-color)', paddingTop: '12px' }}>
                      <button
                        onClick={() => handlePlayToggle(ep, 'podcast')}
                        className="btn-brutal"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          borderRadius: '999px',
                          backgroundColor: isCurrent ? 'var(--color-orange)' : '#10B981',
                          color: '#FFFFFF',
                          border: '2px solid #000',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 900,
                          cursor: 'pointer'
                        }}
                      >
                        {isCurrent ? <Pause size={14} fill="#FFF" /> : <Play size={14} fill="#FFF" />}
                        <span>{isCurrent ? 'PAUSE' : 'PLAY OFFLINE'}</span>
                      </button>

                      <button
                        onClick={() => handleRemoveDownload(ep.id, ep.title)}
                        aria-label="Delete offline download"
                        title="Delete offline file"
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid #000',
                          cursor: 'pointer',
                          color: '#E11D48'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Recently Played */}
      {activeTab === 'history' && (
        <div 
          className="card-modern"
          style={{
            borderRadius: '24px',
            backgroundColor: 'var(--bg-tertiary)',
            border: '2.5px solid #000',
            boxShadow: '4px 4px 0 #000',
            padding: 'var(--space-xl)'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>
            YOUR RECENT AUDIO SESSIONS
          </h3>

          {listeningHistory && listeningHistory.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {listeningHistory.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1.5px solid #000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--color-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                      {item.type === 'live' ? <Radio size={18} /> : item.type === 'music' ? <Music size={18} /> : <Mic2 size={18} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 800 }}>
                        {item.title}
                      </div>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {item.type?.toUpperCase()} • {item.time}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={item.type === 'live' ? '/live' : '/podcasts'}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      color: 'var(--color-orange)',
                      textDecoration: 'none'
                    }}
                  >
                    PLAY AGAIN →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              No history recorded yet. Tune in to a broadcast or podcast to get started!
            </p>
          )}
        </div>
      )}

      {/* Tab 4: Liked Music */}
      {activeTab === 'liked' && (
        <div>
          {favoriteTracks.length === 0 ? (
            <div 
              className="card-modern"
              style={{
                borderRadius: '24px',
                backgroundColor: 'var(--bg-tertiary)',
                border: '2.5px solid #000',
                padding: 'var(--space-3xl) var(--space-xl)',
                textAlign: 'center',
                boxShadow: '4px 4px 0 #000',
                maxWidth: '640px',
                margin: '0 auto'
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(255, 85, 0, 0.1)', border: '2px solid var(--color-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-orange)' }}>
                <Heart size={28} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px' }}>
                No Liked Tracks Yet
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                Tap the heart on any campus track or indie song in the audio player to save it here!
              </p>
              <Link
                to="/vote"
                className="btn-brutal"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 24px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--color-orange)',
                  color: '#FFFFFF',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.84rem',
                  fontWeight: 900
                }}
              >
                <span>VOTE & DISCOVER MUSIC</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 'var(--space-lg)' }}>
              {favoriteTracks.map(m => {
                const isCurrent = currentTrack?.id === m.id && isPlaying;

                return (
                  <div
                    key={m.id}
                    className="card-modern"
                    style={{
                      borderRadius: '20px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '2.5px solid #000',
                      boxShadow: '4px 4px 0 #000',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '14px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '14px' }}>
                      <img 
                        src={m.cover} 
                        alt={m.title} 
                        style={{ width: '80px', height: '80px', borderRadius: '14px', objectFit: 'cover', border: '2px solid #000', flexShrink: 0 }} 
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: 'var(--color-orange)', textTransform: 'uppercase' }}>
                          {m.genre} • {m.duration}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0', lineHeight: 1.3 }}>
                          {m.title}
                        </h3>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {m.artist}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1.5px dashed var(--border-color)', paddingTop: '12px' }}>
                      <button
                        onClick={() => handlePlayToggle(m, 'music')}
                        className="btn-brutal"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          borderRadius: '999px',
                          backgroundColor: isCurrent ? 'var(--color-orange)' : '#000000',
                          color: '#FFFFFF',
                          border: '2px solid #000',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 900,
                          cursor: 'pointer'
                        }}
                      >
                        {isCurrent ? <Pause size={14} fill="#FFF" /> : <Play size={14} fill="#FFF" />}
                        <span>{isCurrent ? 'PAUSE' : 'PLAY'}</span>
                      </button>

                      <button
                        onClick={() => handleRemoveLiked(m.id, m.title)}
                        aria-label="Unlike track"
                        title="Remove from liked"
                        style={{
                          padding: '8px',
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                          border: '1.5px solid #000',
                          cursor: 'pointer',
                          color: '#E11D48'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
