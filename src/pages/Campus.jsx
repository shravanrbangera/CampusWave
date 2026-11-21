import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  Search, 
  Filter, 
  Pin, 
  MapPin, 
  Clock, 
  Users, 
  CheckCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { mockAnnouncements } from '../data/announcements';
import { mockEvents } from '../data/events';
import { EventCard } from '../components/EventCard';
import { useAuth } from '../context/AuthContext';

export const Campus = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'announcements' | 'events'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('ALL');

  const filteredAnnouncements = mockAnnouncements.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'ALL' || item.category.toLowerCase().includes(selectedTag.toLowerCase());
    return matchesSearch && matchesTag;
  });

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="campus-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3xl)' }}>
      {/* Top Header */}
      <div>
        <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
          NMAMIT COMMUNITY BULLETIN
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginTop: '8px', marginBottom: '12px', color: 'var(--color-charcoal)' }}>
          Campus Updates & Events
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '640px', marginBottom: '24px' }}>
          Official academic circulars, hostel notices, Incridea 2026 developments, and technical club hackathons.
        </p>

        {/* Tab switcher & Search */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                backgroundColor: activeTab === 'all' ? 'var(--color-coral)' : 'var(--color-white)',
                color: activeTab === 'all' ? '#FFFFFF' : 'var(--text-secondary)',
                border: activeTab === 'all' ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
                boxShadow: activeTab === 'all' ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
              }}
            >
              All Updates
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                backgroundColor: activeTab === 'announcements' ? 'var(--color-coral)' : 'var(--color-white)',
                color: activeTab === 'announcements' ? '#FFFFFF' : 'var(--text-secondary)',
                border: activeTab === 'announcements' ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
                boxShadow: activeTab === 'announcements' ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
              }}
            >
              Bulletins ({mockAnnouncements.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              style={{
                padding: '8px 20px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                backgroundColor: activeTab === 'events' ? 'var(--color-coral)' : 'var(--color-white)',
                color: activeTab === 'events' ? '#FFFFFF' : 'var(--text-secondary)',
                border: activeTab === 'events' ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
                boxShadow: activeTab === 'events' ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
              }}
            >
              Events Calendar ({mockEvents.length})
            </button>
          </div>

          <div style={{ position: 'relative', width: '280px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements..."
              className="form-input"
              style={{
                padding: '8px 14px 8px 38px',
                fontSize: '0.88rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--border-color)'
              }}
            />
            <Search size={16} color="var(--color-coral)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      {/* Announcements List */}
      {(activeTab === 'all' || activeTab === 'announcements') && (
        <section>
          <div className="section-header">
            <div>
              <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
                CIRCULARS & NOTICES
              </span>
              <h2 className="section-header-title" style={{ marginTop: '6px' }}>
                Important Campus Announcements
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="card-modern"
                style={{
                  padding: '22px 26px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  backgroundColor: 'var(--color-white)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {ann.pinned && (
                      <span 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--color-coral)',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700
                        }}
                      >
                        <Pin size={12} />
                        PINNED
                      </span>
                    )}
                    <span 
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: ann.tag === 'NEW' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(245, 45, 58, 0.1)',
                        color: ann.tag === 'NEW' ? '#16a34a' : 'var(--color-coral)'
                      }}
                    >
                      {ann.tag}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {ann.category}
                    </span>
                  </div>

                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {ann.date}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-charcoal)', lineHeight: 1.3 }}>
                  {ann.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', lineHeight: 1.6 }}>
                  {ann.content}
                </p>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)'
                  }}
                >
                  <span>Issued by: <strong style={{ color: 'var(--color-charcoal)' }}>{ann.author}</strong></span>
                  <span style={{ color: 'var(--color-coral)', cursor: 'pointer', fontWeight: 600 }}>Read Official PDF →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Events Calendar */}
      {(activeTab === 'all' || activeTab === 'events') && (
        <section>
          <div className="section-header">
            <div>
              <span className="editorial-badge" style={{ backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
                SCHEDULE & RSVP
              </span>
              <h2 className="section-header-title" style={{ marginTop: '6px' }}>
                Campus Events & Hackathons
              </h2>
            </div>
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 'var(--space-lg)'
            }}
          >
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

