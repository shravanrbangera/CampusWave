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
            STUDENT AUDIO VAULT • 90.4 FM
          </span>
          <span className="editorial-badge editorial-badge-forest">
            STORED BROADCASTS
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            OFFLINE RECORDINGS
          </span>
        </div>

        <h1 
          style={{ 
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4.5vw, 2.6rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '8px 0 10px',
            color: 'var(--text-primary)',
            lineHeight: 1.15
          }}
        >
          Saved <span style={{ color: 'var(--color-orange)' }}>Library</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', fontWeight: 500, maxWidth: '680px', lineHeight: 1.6 }}>
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
          className={activeTab === 'podcasts' ? "btn-primary" : "btn-secondary"}
          style={{
            padding: '8px 18px',
            fontSize: '0.82rem',
            whiteSpace: 'nowrap',
            minHeight: '38px',
            fontFamily: 'var(--font-radio)',
            letterSpacing: '0.03em'
          }}
        >
          <Mic2 size={15} />
          <span>BOOKMARKED ({bookmarkedEpisodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={activeTab === 'downloads' ? "btn-primary" : "btn-secondary"}
          style={{
            padding: '8px 18px',
            fontSize: '0.82rem',
            whiteSpace: 'nowrap',
            minHeight: '38px',
            fontFamily: 'var(--font-radio)',
            letterSpacing: '0.03em'
          }}
        >
          <Download size={15} />
          <span>DOWNLOADED ({downloadedEpisodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={activeTab === 'history' ? "btn-primary" : "btn-secondary"}
          style={{
            padding: '8px 18px',
            fontSize: '0.82rem',
            whiteSpace: 'nowrap',
            minHeight: '38px',
            fontFamily: 'var(--font-radio)',
            letterSpacing: '0.03em'
          }}
        >
          <Clock size={15} />
          <span>RECENT ({listeningHistory?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className={activeTab === 'liked' ? "btn-primary" : "btn-secondary"}
          style={{
            padding: '8px 18px',
            fontSize: '0.82rem',
            whiteSpace: 'nowrap',
            minHeight: '38px',
            fontFamily: 'var(--font-radio)',
            letterSpacing: '0.03em'
          }}
        >
          <Heart size={15} />
          <span>LIKED MUSIC ({favoriteTracks.length})</span>
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
                padding: 'var(--space-3xl) var(--space-xl)',
                textAlign: 'center',
                maxWidth: '640px',
                margin: '0 auto'
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-orange)' }}>
                <Bookmark size={28} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                No Bookmarked Episodes Yet
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                Save interesting podcast episodes while browsing so you never forget what to listen to between college lectures!
              </p>
              <Link
                to="/podcasts"
                className="btn-primary"
                style={{ textDecoration: 'none' }}
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
                        style={{ width: '74px', height: '74px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} 
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-orange)', textTransform: 'uppercase' }}>
                          {ep.category} • {ep.duration}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {ep.title}
                        </h3>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          Hosted by {ep.host}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <button
                        onClick={() => handlePlayToggle(ep, 'podcast')}
                        className="btn-primary"
                        style={{
                          padding: '6px 16px',
                          fontSize: '0.78rem',
                          minHeight: '34px'
                        }}
                      >
                        {isCurrent ? <Pause size={14} fill="#FFF" /> : <Play size={14} fill="#FFF" />}
                        <span>{isCurrent ? 'PAUSE' : 'PLAY EPISODE'}</span>
                      </button>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link
                          to={`/podcast/${ep.id}`}
                          className="btn-secondary"
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.76rem',
                            minHeight: '34px',
                            textDecoration: 'none'
                          }}
                        >
                          DETAILS
                        </Link>
                        <button
                          onClick={() => handleRemoveBookmark(ep.id, ep.title)}
                          aria-label="Remove bookmark"
                          title="Remove bookmark"
                          className="btn-icon"
                          style={{
                            width: '34px',
                            height: '34px',
                            minWidth: '34px',
                            minHeight: '34px',
                            color: '#E11D48'
                          }}
                        >
                          <Trash2 size={15} />
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
                padding: 'var(--space-3xl) var(--space-xl)',
                textAlign: 'center',
                maxWidth: '640px',
                margin: '0 auto'
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-orange)' }}>
                <Download size={28} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                No Offline Downloads
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                Download episodes while connected to campus Wi-Fi so you can listen during hostel study hours or daily bus commutes without using data!
              </p>
              <Link
                to="/podcasts"
                className="btn-primary"
                style={{ textDecoration: 'none' }}
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
                        style={{ width: '74px', height: '74px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }} 
                      />
                      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} /> STORED FOR OFFLINE • {ep.duration}
                        </span>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)', margin: '4px 0', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {ep.title}
                        </h3>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {ep.host}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                      <button
                        onClick={() => handlePlayToggle(ep, 'podcast')}
                        className="btn-primary"
                        style={{
                          padding: '6px 16px',
                          fontSize: '0.78rem',
                          backgroundColor: 'var(--color-success)',
                          minHeight: '34px'
                        }}
                      >
                        {isCurrent ? <Pause size={14} fill="#FFF" /> : <Play size={14} fill="#FFF" />}
                        <span>{isCurrent ? 'PAUSE' : 'PLAY OFFLINE'}</span>
                      </button>

                      <button
                        onClick={() => handleRemoveDownload(ep.id, ep.title)}
                        aria-label="Delete offline download"
                        title="Delete offline file"
                        className="btn-icon"
                        style={{
                          width: '34px',
                          height: '34px',
                          minWidth: '34px',
                          minHeight: '34px',
                          color: '#E11D48'
                        }}
                      >
                        <Trash2 size={15} />
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
            padding: 'var(--space-xl)'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>
            YOUR RECENT AUDIO SESSIONS
          </h3>

          {listeningHistory && listeningHistory.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {listeningHistory.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--color-orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-orange)' }}>
                      {item.type === 'live' ? <Radio size={18} /> : item.type === 'music' ? <Music size={18} /> : <Mic2 size={18} />}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {item.title}
                      </div>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {item.type?.toUpperCase()} • {item.time}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlayToggle(item, item.type || 'podcast')}
                    className="btn-icon"
                    style={{ width: '34px', height: '34px', minWidth: '34px', minHeight: '34px' }}
                    title="Play again"
                  >
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0', color: 'var(--text-muted)' }}>
              No recent listening history found. Start tuning into live radio or podcasts!
            </div>
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
                padding: 'var(--space-3xl) var(--space-xl)',
                textAlign: 'center',
                maxWidth: '640px',
                margin: '0 auto'
              }}
            >
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-orange-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: 'var(--color-orange)' }}>
                <Heart size={28} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
                No Liked Tracks Yet
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                Tap the heart button on the mini player or live broadcasts to save your favorite campus jams and hostel soundtracks!
              </p>
              <Link
                to="/vote"
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                <span>EXPLORE DAILY PLAYLISTS</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
              {favoriteTracks.map(track => {
                const isCurrent = currentTrack?.id === track.id && isPlaying;

                return (
                  <div
                    key={track.id}
                    className="card-modern"
                    style={{
                      borderRadius: '16px',
                      padding: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                      <img src={track.cover} alt={track.title} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {track.title}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                          {track.artist}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => handlePlayToggle(track, 'music')}
                        className="btn-icon"
                        style={{
                          width: '36px',
                          height: '36px',
                          minWidth: '36px',
                          minHeight: '36px',
                          backgroundColor: 'var(--color-orange)',
                          color: '#FFFFFF'
                        }}
                      >
                        {isCurrent ? <Pause size={15} fill="#FFF" /> : <Play size={15} fill="#FFF" style={{ marginLeft: '2px' }} />}
                      </button>
                      <button
                        onClick={() => handleRemoveLiked(track.id, track.title)}
                        className="btn-icon"
                        style={{
                          width: '36px',
                          height: '36px',
                          minWidth: '36px',
                          minHeight: '36px',
                          color: '#E11D48'
                        }}
                        title="Unlike track"
                      >
                        <Trash2 size={15} />
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
