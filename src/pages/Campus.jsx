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
  ArrowRight,
  Zap,
  Ticket
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
            COMMUNITY BULLETIN // 90.4 MHZ
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, color: '#333' }}>
            NMAMIT CAMPUS DISPATCH
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
          CAMPUS <span className="highlight-acid" style={{ border: '2px solid #000', borderRadius: '6px', padding: '0 8px' }}>UPDATES & EVENTS</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.95rem', fontWeight: 600, maxWidth: '680px', marginBottom: '24px', lineHeight: 1.6 }}>
          Official academic circulars, hostel notices, Incridea 2026 developments, and technical club hackathons.
        </p>

        {/* Tab switcher & Search */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('all')}
              className="btn-brutal"
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '0.84rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                textTransform: 'uppercase',
                cursor: 'pointer',
                backgroundColor: activeTab === 'all' ? 'var(--color-acid)' : '#FFFFFF',
                color: '#000000',
                border: '2px solid #000',
                boxShadow: activeTab === 'all' ? '3px 3px 0 #000' : '2px 2px 0 #000',
                transform: activeTab === 'all' ? 'translateY(-2px)' : 'none'
              }}
            >
              ALL UPDATES
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className="btn-brutal"
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '0.84rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                textTransform: 'uppercase',
                cursor: 'pointer',
                backgroundColor: activeTab === 'announcements' ? 'var(--color-acid)' : '#FFFFFF',
                color: '#000000',
                border: '2px solid #000',
                boxShadow: activeTab === 'announcements' ? '3px 3px 0 #000' : '2px 2px 0 #000',
                transform: activeTab === 'announcements' ? 'translateY(-2px)' : 'none'
              }}
            >
              BULLETINS ({mockAnnouncements.length})
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className="btn-brutal"
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                fontSize: '0.84rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                textTransform: 'uppercase',
                cursor: 'pointer',
                backgroundColor: activeTab === 'events' ? 'var(--color-acid)' : '#FFFFFF',
                color: '#000000',
                border: '2px solid #000',
                boxShadow: activeTab === 'events' ? '3px 3px 0 #000' : '2px 2px 0 #000',
                transform: activeTab === 'events' ? 'translateY(-2px)' : 'none'
              }}
            >
              EVENTS CALENDAR ({mockEvents.length})
            </button>
          </div>

          <div style={{ position: 'relative', width: '290px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search announcements..."
              style={{
                width: '100%',
                padding: '10px 16px 10px 42px',
                fontSize: '0.88rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                borderRadius: '999px',
                backgroundColor: '#FFFFFF',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                color: '#000',
                outline: 'none'
              }}
            />
            <Search size={18} color="#000" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          </div>
        </div>
      </div>

      {/* Announcements List */}
      {(activeTab === 'all' || activeTab === 'announcements') && (
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
                📢 CIRCULARS & NOTICES
              </span>
              <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-black)', textTransform: 'uppercase' }}>
                Important Campus Announcements
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredAnnouncements.map((ann) => (
              <div
                key={ann.id}
                className="card-modern"
                style={{
                  padding: '24px 28px',
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #000',
                  boxShadow: '4px 4px 0 #000',
                  position: 'relative'
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
                          color: '#000',
                          backgroundColor: 'var(--color-acid)',
                          border: '1.5px solid #000',
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          boxShadow: '1.5px 1.5px 0 #000'
                        }}
                      >
                        <Pin size={12} fill="#000" />
                        PINNED NOTICE
                      </span>
                    )}
                    <span 
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        padding: '3px 10px',
                        borderRadius: '999px',
                        border: '1.5px solid #000',
                        backgroundColor: ann.tag === 'NEW' ? 'var(--color-acid)' : 'var(--color-coral)',
                        color: ann.tag === 'NEW' ? '#000' : '#fff'
                      }}
                    >
                      {ann.tag}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: '#333' }}>
                      {ann.category}
                    </span>
                  </div>

                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 700, color: '#555' }}>
                    {ann.date}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: '#000', lineHeight: 1.3 }}>
                  {ann.title}
                </h3>

                <p style={{ fontFamily: 'var(--font-body)', color: '#333', fontSize: '0.94rem', lineHeight: 1.6 }}>
                  {ann.content}
                </p>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '2px dashed #000',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    color: '#333',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}
                >
                  <span>Issued by: <strong style={{ color: '#000' }}>{ann.author}</strong></span>
                  <button 
                    className="btn-brutal"
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      backgroundColor: 'var(--color-acid)',
                      color: '#000',
                      border: '1.5px solid #000',
                      boxShadow: '2px 2px 0 #000',
                      fontSize: '0.76rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    READ OFFICIAL PDF →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Events Calendar */}
      {(activeTab === 'all' || activeTab === 'events') && (
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
                🎟️ SCHEDULE & RSVP
              </span>
              <h2 className="section-header-title" style={{ marginTop: '8px', fontFamily: 'var(--font-black)', textTransform: 'uppercase' }}>
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
