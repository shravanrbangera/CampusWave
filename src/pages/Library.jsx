import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Sparkles,
  Clock,
  Heart,
  Mic2,
  Play,
  Trash2,
  ArrowRight,
  Compass,
  FolderOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';
import { mockPodcasts } from '../data/podcasts';
import { mockSummaries } from '../data/summaries';
import { mockMusic } from '../data/music';
import { PodcastCard } from '../components/PodcastCard';
import { SummaryCard } from '../components/SummaryCard';
import { MusicCard } from '../components/MusicCard';

export const Library = () => {
  const [activeTab, setActiveTab] = useState('podcasts'); // 'podcasts' | 'summaries' | 'liked' | 'history'
  const { savedPodcasts, savedSummaries, likedTracks, listeningHistory } = useAuth();
  const { playTrack } = useAudio();

  // Saved items data
  const bookmarkedPodcasts = mockPodcasts.filter(p => savedPodcasts.includes(p.id));
  const bookmarkedSummaries = mockSummaries.filter(s => savedSummaries.includes(s.id));
  const favoriteMusic = mockMusic.filter(m => likedTracks.includes(m.id));

  return (
    <div className="library-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Header */}
      <div>
        <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
          YOUR PERSONAL COLLECTION
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginTop: '8px', marginBottom: '12px', color: 'var(--color-charcoal)' }}>
          Student Audio Library
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px' }}>
          Quick access to your saved podcast episodes, bookmarked AI summaries, liked tracks, and listening history.
        </p>
      </div>

      {/* Segmented Controls / Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <button
          onClick={() => setActiveTab('podcasts')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.9rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            backgroundColor: activeTab === 'podcasts' ? 'var(--color-coral)' : 'var(--color-white)',
            color: activeTab === 'podcasts' ? '#FFFFFF' : 'var(--text-secondary)',
            border: activeTab === 'podcasts' ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
            boxShadow: activeTab === 'podcasts' ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
          }}
        >
          <Mic2 size={16} />
          <span>Saved Podcasts ({bookmarkedPodcasts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('summaries')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.9rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            backgroundColor: activeTab === 'summaries' ? 'var(--color-coral)' : 'var(--color-white)',
            color: activeTab === 'summaries' ? '#FFFFFF' : 'var(--text-secondary)',
            border: activeTab === 'summaries' ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
            boxShadow: activeTab === 'summaries' ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
          }}
        >
          <Sparkles size={16} />
          <span>AI Summaries ({bookmarkedSummaries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.9rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            backgroundColor: activeTab === 'liked' ? 'var(--color-coral)' : 'var(--color-white)',
            color: activeTab === 'liked' ? '#FFFFFF' : 'var(--text-secondary)',
            border: activeTab === 'liked' ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
            boxShadow: activeTab === 'liked' ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
          }}
        >
          <Heart size={16} />
          <span>Liked Songs ({favoriteMusic.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.9rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            backgroundColor: activeTab === 'history' ? 'var(--color-coral)' : 'var(--color-white)',
            color: activeTab === 'history' ? '#FFFFFF' : 'var(--text-secondary)',
            border: activeTab === 'history' ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
            boxShadow: activeTab === 'history' ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
          }}
        >
          <Clock size={16} />
          <span>Listening History</span>
        </button>
      </div>

      {/* Tab 1: Saved Podcasts */}
      {activeTab === 'podcasts' && (
        <section>
          {bookmarkedPodcasts.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: 'var(--space-lg)'
              }}
            >
              {bookmarkedPodcasts.map(pod => (
                <PodcastCard key={pod.id} podcast={pod} />
              ))}
            </div>
          ) : (
            <div
              className="card-modern"
              style={{
                padding: 'var(--space-3xl)',
                textAlign: 'center',
                borderRadius: 'var(--radius-2xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: 'var(--color-white)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 45, 58, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-coral)'
                }}
              >
                <Bookmark size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-charcoal)' }}>No saved podcasts yet</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', fontSize: '0.95rem' }}>
                Bookmark episodes while exploring so you can listen during hostel study hours or daily bus commutes.
              </p>
              <Link to="/podcasts" className="btn-primary" style={{ marginTop: '8px' }}>
                <Compass size={16} />
                <span>Browse Student Podcasts</span>
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Tab 2: Saved Summaries */}
      {activeTab === 'summaries' && (
        <section>
          {bookmarkedSummaries.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                gap: 'var(--space-lg)'
              }}
            >
              {bookmarkedSummaries.map(sum => (
                <SummaryCard key={sum.id} summary={sum} />
              ))}
            </div>
          ) : (
            <div
              className="card-modern"
              style={{
                padding: 'var(--space-3xl)',
                textAlign: 'center',
                borderRadius: 'var(--radius-2xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: 'var(--color-white)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 181, 46, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-coral)'
                }}
              >
                <Sparkles size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-charcoal)' }}>No AI summaries bookmarked</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', fontSize: '0.95rem' }}>
                Save key takeaways from robotics lectures and cultural fest meetings to revise them anytime.
              </p>
              <Link to="/summaries" className="btn-primary" style={{ marginTop: '8px' }}>
                <Sparkles size={16} />
                <span>Browse AI Summaries</span>
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Tab 3: Liked Songs */}
      {activeTab === 'liked' && (
        <section>
          {favoriteMusic.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: 'var(--space-md)'
              }}
            >
              {favoriteMusic.map(m => (
                <MusicCard key={m.id} track={m} />
              ))}
            </div>
          ) : (
            <div
              className="card-modern"
              style={{
                padding: 'var(--space-3xl)',
                textAlign: 'center',
                borderRadius: 'var(--radius-2xl)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: 'var(--color-white)'
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(245, 45, 58, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-coral)'
                }}
              >
                <Heart size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--color-charcoal)' }}>Your liked tracks will appear here</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', fontSize: '0.95rem' }}>
                Hit the heart icon on any campus song in the player or explore tab to build your hostel playlist.
              </p>
              <Link to="/explore" className="btn-primary" style={{ marginTop: '8px' }}>
                <span>Discover Campus Music</span>
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Tab 4: Listening History */}
      {activeTab === 'history' && (
        <section>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {listeningHistory.map((item, idx) => (
              <div
                key={idx}
                className="card-modern"
                style={{
                  padding: '16px 22px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Clock size={18} color="var(--color-coral)" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Listened {item.time}</div>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    color: 'var(--color-coral)',
                    backgroundColor: 'rgba(245, 45, 58, 0.08)',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700
                  }}
                >
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};