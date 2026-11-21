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
  Mic2, 
  Music
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { mockPodcasts } from '../data/podcasts';
import { mockMusic } from '../data/music';

export const Saved = () => {
  const [activeTab, setActiveTab] = useState('podcasts'); // 'podcasts' | 'downloads' | 'liked'
  const [toastMsg, setToastMsg] = useState('');

  const { 
    savedPodcasts, 
    downloadedPodcasts, 
    likedTracks, 
    removeSavedPodcast, 
    removeDownloadedPodcast, 
    toggleLikeTrack 
  } = useAuth();

  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

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
        showName: item.showName || item.album || "CampusWave",
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
    setToastMsg(`Removed from bookmarks.`);
    setTimeout(() => setToastMsg(''), 2200);
  };

  const handleRemoveDownload = (id, title) => {
    removeDownloadedPodcast(id);
    setToastMsg(`Removed offline download.`);
    setTimeout(() => setToastMsg(''), 2200);
  };

  const handleRemoveLiked = (id) => {
    toggleLikeTrack(id);
    setToastMsg(`Removed from liked.`);
    setTimeout(() => setToastMsg(''), 2200);
  };

  return (
    <div 
      className="saved-page page-wrapper" 
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
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="editorial-badge">
            STUDENT AUDIO VAULT
          </span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 3.8vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Your Library
        </h1>
      </div>

      {/* Segmented Tab Controls (Matches Image 1 & 3: Clean, pill controls) */}
      <div 
        className="category-pills-row scroll-touch-pills"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}
      >
        <button
          onClick={() => setActiveTab('podcasts')}
          className={activeTab === 'podcasts' ? "btn-primary" : "btn-secondary"}
          style={{
            padding: '8px 16px',
            fontSize: '0.8rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            minHeight: '36px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Mic2 size={14} />
          <span>Bookmarked ({bookmarkedEpisodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={activeTab === 'downloads' ? "btn-primary" : "btn-secondary"}
          style={{
            padding: '8px 16px',
            fontSize: '0.8rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            minHeight: '36px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Download size={14} />
          <span>Offline ({downloadedEpisodes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className={activeTab === 'liked' ? "btn-primary" : "btn-secondary"}
          style={{
            padding: '8px 16px',
            fontSize: '0.8rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
            minHeight: '36px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Heart size={14} />
          <span>Liked Songs ({favoriteTracks.length})</span>
        </button>
      </div>

      {/* Content List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {/* Bookmarked Podcasts */}
        {activeTab === 'podcasts' && (
          <>
            {bookmarkedEpisodes.length === 0 ? (
              <div className="card-modern" style={{ padding: '36px 20px', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '6px' }}>
                  No bookmarks yet
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', margin: '0 0 14px' }}>
                  Bookmark interesting podcast episodes to listen to later.
                </p>
                <Link to="/podcasts" className="btn-primary" style={{ textDecoration: 'none', padding: '8px 18px', fontSize: '0.82rem' }}>
                  Browse Podcasts
                </Link>
              </div>
            ) : (
              bookmarkedEpisodes.map(podcast => {
                const isCurrent = currentTrack?.id === podcast.id && isPlaying;
                return (
                  <div 
                    key={podcast.id}
                    className="card-modern"
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                      <img src={podcast.cover} alt={podcast.title} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>
                          {podcast.title}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {podcast.host} • {podcast.duration}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => handlePlayToggle(podcast, 'podcast')}
                        className="btn-primary"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          padding: 0,
                          minWidth: '36px'
                        }}
                        title={isCurrent ? "Pause" : "Play"}
                      >
                        {isCurrent ? <Pause size={16} fill="#FFF" /> : <Play size={16} fill="#FFF" style={{ marginLeft: '1px' }} />}
                      </button>

                      <button
                        onClick={() => handleRemoveBookmark(podcast.id, podcast.title)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          padding: '6px',
                          cursor: 'pointer'
                        }}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {/* Offline Downloads */}
        {activeTab === 'downloads' && (
          <>
            {downloadedEpisodes.length === 0 ? (
              <div className="card-modern" style={{ padding: '36px 20px', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '6px' }}>
                  No offline downloads
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', margin: '0 0 14px' }}>
                  Download episodes on Wi-Fi to listen without data.
                </p>
                <Link to="/podcasts" className="btn-primary" style={{ textDecoration: 'none', padding: '8px 18px', fontSize: '0.82rem' }}>
                  Browse Podcasts
                </Link>
              </div>
            ) : (
              downloadedEpisodes.map(podcast => {
                const isCurrent = currentTrack?.id === podcast.id && isPlaying;
                return (
                  <div 
                    key={podcast.id}
                    className="card-modern"
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                      <img src={podcast.cover} alt={podcast.title} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>
                          {podcast.title}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {podcast.host} • Stored Offline
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => handlePlayToggle(podcast, 'podcast')}
                        className="btn-primary"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          padding: 0,
                          minWidth: '36px'
                        }}
                      >
                        {isCurrent ? <Pause size={16} fill="#FFF" /> : <Play size={16} fill="#FFF" style={{ marginLeft: '1px' }} />}
                      </button>

                      <button
                        onClick={() => handleRemoveDownload(podcast.id, podcast.title)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          padding: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}

        {/* Liked Songs */}
        {activeTab === 'liked' && (
          <>
            {favoriteTracks.length === 0 ? (
              <div className="card-modern" style={{ padding: '36px 20px', textAlign: 'center', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 800, marginBottom: '6px' }}>
                  No liked music yet
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', margin: '0 0 14px' }}>
                  Tap the heart icon on any playing track to save it here.
                </p>
                <Link to="/vote" className="btn-primary" style={{ textDecoration: 'none', padding: '8px 18px', fontSize: '0.82rem' }}>
                  Listen & Vote Music
                </Link>
              </div>
            ) : (
              favoriteTracks.map(song => {
                const isCurrent = currentTrack?.id === song.id && isPlaying;
                return (
                  <div 
                    key={song.id}
                    className="card-modern"
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-lg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                      <img src={song.cover} alt={song.title} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.92rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-primary)' }}>
                          {song.title}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {song.artist} • {song.genre}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                      <button
                        onClick={() => handlePlayToggle(song, 'music')}
                        className="btn-primary"
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          padding: 0,
                          minWidth: '36px'
                        }}
                      >
                        {isCurrent ? <Pause size={16} fill="#FFF" /> : <Play size={16} fill="#FFF" style={{ marginLeft: '1px' }} />}
                      </button>

                      <button
                        onClick={() => handleRemoveLiked(song.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--color-orange)',
                          padding: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <Heart size={16} fill="var(--color-orange)" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        )}
      </div>
    </div>
  );
};
