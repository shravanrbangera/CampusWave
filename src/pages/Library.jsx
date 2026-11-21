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
  FolderOpen,
  Zap
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
            STUDENT VAULT // 90.4 MHZ
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: '#333' }}>
            PERSONAL AUDIO ARCHIVE
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
          STUDENT AUDIO <span className="highlight-acid" style={{ border: '2px solid #000', borderRadius: '6px', padding: '0 8px' }}>LIBRARY</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.95rem', fontWeight: 600, maxWidth: '680px', lineHeight: 1.6 }}>
          Quick access to your saved podcast episodes, bookmarked AI summaries, liked tracks, and listening history.
        </p>
      </div>

      {/* Segmented Controls / Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}
      >
        <button
          onClick={() => setActiveTab('podcasts')}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            backgroundColor: activeTab === 'podcasts' ? 'var(--color-acid)' : '#FFFFFF',
            color: '#000000',
            border: '2px solid #000',
            boxShadow: activeTab === 'podcasts' ? '3px 3px 0 #000' : '2px 2px 0 #000',
            transform: activeTab === 'podcasts' ? 'translateY(-2px)' : 'none'
          }}
        >
          <Mic2 size={16} />
          <span>Saved Podcasts ({bookmarkedPodcasts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('summaries')}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            backgroundColor: activeTab === 'summaries' ? 'var(--color-acid)' : '#FFFFFF',
            color: '#000000',
            border: '2px solid #000',
            boxShadow: activeTab === 'summaries' ? '3px 3px 0 #000' : '2px 2px 0 #000',
            transform: activeTab === 'summaries' ? 'translateY(-2px)' : 'none'
          }}
        >
          <Sparkles size={16} />
          <span>AI Summaries ({bookmarkedSummaries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('liked')}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            backgroundColor: activeTab === 'liked' ? 'var(--color-acid)' : '#FFFFFF',
            color: '#000000',
            border: '2px solid #000',
            boxShadow: activeTab === 'liked' ? '3px 3px 0 #000' : '2px 2px 0 #000',
            transform: activeTab === 'liked' ? 'translateY(-2px)' : 'none'
          }}
        >
          <Heart size={16} />
          <span>Liked Songs ({favoriteMusic.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '999px',
            fontSize: '0.84rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            cursor: 'pointer',
            backgroundColor: activeTab === 'history' ? 'var(--color-acid)' : '#FFFFFF',
            color: '#000000',
            border: '2px solid #000',
            boxShadow: activeTab === 'history' ? '3px 3px 0 #000' : '2px 2px 0 #000',
            transform: activeTab === 'history' ? 'translateY(-2px)' : 'none'
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
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid #000',
                boxShadow: '5px 5px 0 #000'
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-acid)',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000'
                }}
              >
                <Bookmark size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-black)', fontSize: '1.45rem', textTransform: 'uppercase', color: '#000' }}>No saved podcasts yet</h3>
              <p style={{ fontFamily: 'var(--font-mono)', color: '#333', maxWidth: '440px', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Bookmark episodes while exploring so you can listen during hostel study hours or daily bus commutes.
              </p>
              <Link to="/podcasts" className="btn-brutal" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', backgroundColor: 'var(--color-coral)', color: '#fff', border: '2px solid #000', boxShadow: '3px 3px 0 #000', borderRadius: '999px', fontFamily: 'var(--font-mono)', fontWeight: 800, textDecoration: 'none' }}>
                <Compass size={16} />
                <span>BROWSE STUDENT PODCASTS</span>
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
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid #000',
                boxShadow: '5px 5px 0 #000'
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-acid)',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000'
                }}
              >
                <Sparkles size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-black)', fontSize: '1.45rem', textTransform: 'uppercase', color: '#000' }}>No AI summaries bookmarked</h3>
              <p style={{ fontFamily: 'var(--font-mono)', color: '#333', maxWidth: '440px', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Save key takeaways from robotics lectures and cultural fest meetings to revise them anytime.
              </p>
              <Link to="/summaries" className="btn-brutal" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', backgroundColor: 'var(--color-coral)', color: '#fff', border: '2px solid #000', boxShadow: '3px 3px 0 #000', borderRadius: '999px', fontFamily: 'var(--font-mono)', fontWeight: 800, textDecoration: 'none' }}>
                <Sparkles size={16} />
                <span>BROWSE AI SUMMARIES</span>
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
                borderRadius: '24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                backgroundColor: '#FFFFFF',
                border: '2.5px solid #000',
                boxShadow: '5px 5px 0 #000'
              }}
            >
              <div
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '16px',
                  backgroundColor: 'var(--color-acid)',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000'
                }}
              >
                <Heart size={32} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-black)', fontSize: '1.45rem', textTransform: 'uppercase', color: '#000' }}>Your liked tracks will appear here</h3>
              <p style={{ fontFamily: 'var(--font-mono)', color: '#333', maxWidth: '440px', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Hit the heart icon on any campus song in the player or explore tab to build your hostel playlist.
              </p>
              <Link to="/explore" className="btn-brutal" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', backgroundColor: 'var(--color-coral)', color: '#fff', border: '2px solid #000', boxShadow: '3px 3px 0 #000', borderRadius: '999px', fontFamily: 'var(--font-mono)', fontWeight: 800, textDecoration: 'none' }}>
                <span>DISCOVER CAMPUS MUSIC</span>
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Tab 4: Listening History */}
      {activeTab === 'history' && (
        <section>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {listeningHistory.map((item, idx) => (
              <div
                key={idx}
                className="card-modern"
                style={{
                  padding: '18px 24px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #000',
                  boxShadow: '3px 3px 0 #000'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <Clock size={18} color="var(--color-coral)" />
                  <div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: '#000' }}>{item.title}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#444' }}>Listened {item.time}</div>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.74rem',
                    textTransform: 'uppercase',
                    color: '#000',
                    backgroundColor: 'var(--color-acid)',
                    border: '1.5px solid #000',
                    padding: '3px 10px',
                    borderRadius: '6px',
                    fontWeight: 800,
                    boxShadow: '1.5px 1.5px 0 #000'
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
