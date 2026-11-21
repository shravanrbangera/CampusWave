import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, MapPin, ExternalLink, Heart, Zap, Sparkles } from 'lucide-react';
import { MarqueeTicker } from './MarqueeTicker';

export const Footer = () => {
  return (
    <footer 
      style={{
        backgroundColor: 'transparent',
        borderTop: '3px solid #000000',
        marginTop: 'var(--space-3xl)',
        position: 'relative'
      }}
    >
      {/* Top Infinite Dual Marquee Ticker */}
      <MarqueeTicker />

      <div 
        className="footer-grid-container"
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: 'var(--space-3xl) var(--space-lg) var(--space-xl)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-2xl)'
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div 
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'var(--color-coral)',
                border: '2px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '3px 3px 0 #000'
              }}
            >
              <Radio size={22} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-black)', fontSize: '1.35rem', letterSpacing: '-0.03em', color: '#000' }}>
                CAMPUS<span style={{ color: 'var(--color-coral)' }}>WAVE</span>
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 800, color: '#333' }}>
                NMAMIT • 90.4 MHZ DIGITAL
              </div>
            </div>
          </div>

          <p style={{ color: '#222', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px', fontFamily: 'var(--font-body)' }}>
            The official student digital radio and audio storytelling network of NMAM Institute of Technology (NMAMIT), Nitte.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#111', fontWeight: 600 }}>
            <MapPin size={15} color="var(--color-coral)" />
            <span>Nitte, Karkala Taluk, Udupi, Karnataka 574110</span>
          </div>

          {/* Sticky Note Badge */}
          <div 
            style={{
              marginTop: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              backgroundColor: 'var(--color-acid)',
              border: '2px solid #000',
              borderRadius: '8px',
              boxShadow: '2px 2px 0 #000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#000'
            }}
          >
            <span>🦖 90.4 FM // LIVE FROM NITTE CAMPUS</span>
          </div>
        </div>

        {/* Discovery Links */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.98rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '0.04em', color: '#000' }}>
            AUDIO DISCOVERY
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            <li><Link to="/live" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>⚡ Live Broadcast (90.4 FM)</Link></li>
            <li><Link to="/podcasts" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>🎙️ Student Podcasts Hub</Link></li>
            <li><Link to="/explore" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>💿 Campus Indie Music</Link></li>
            <li><Link to="/summaries" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>📌 AI Broadcast Summaries</Link></li>
            <li><Link to="/community" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>🔥 Hostel Song Voting</Link></li>
          </ul>
        </div>

        {/* Campus Network */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.98rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '0.04em', color: '#000' }}>
            CAMPUS ECOSYSTEM
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            <li><Link to="/campus" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>📢 Announcements & Circulars</Link></li>
            <li><Link to="/campus" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>🎪 Incridea 2026 Portal</Link></li>
            <li><Link to="/community" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>🎵 Song Request Box</Link></li>
            <li><Link to="/library" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>📼 Your Cassette Library</Link></li>
            <li><Link to="/profile" style={{ color: '#222', transition: 'color 0.15s ease' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='#222'}>🪪 Student Listener ID</Link></li>
          </ul>
        </div>

        {/* Radio Specs Stamp Box */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.98rem', fontWeight: 900, marginBottom: '16px', letterSpacing: '0.04em', color: '#000' }}>
            TRANSMISSION SPECS
          </h4>
          <div 
            style={{
              background: '#F5F5F5',
              padding: '16px',
              borderRadius: '16px',
              border: '2px solid #000',
              boxShadow: '3px 3px 0 #000',
              fontSize: '0.82rem',
              color: '#111',
              lineHeight: 1.6,
              fontFamily: 'var(--font-mono)'
            }}
          >
            <div style={{ color: 'var(--color-coral)', fontWeight: 800, marginBottom: '4px' }}>
              FREQUENCY: 90.4 MHZ DIGITAL
            </div>
            <div><strong>Studio Bitrate:</strong> 320kbps HD Master</div>
            <div><strong>Coverage:</strong> NMAMIT Campus, Hostels & Netravati</div>
            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed #000', fontSize: '0.72rem', color: '#555' }}>
              ⚡ Prototype simulated student audio streaming network.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div 
        style={{
          borderTop: '2px solid #000',
          backgroundColor: '#000',
          color: '#fff',
          padding: '16px var(--space-lg)'
        }}
      >
        <div 
          className="footer-bottom-bar"
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-mono)'
          }}
        >
          <div>
            © 2026 CAMPUSWAVE // CRAZY AUDIO NETWORK FOR NMAMIT STUDENTS.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--color-acid)', fontWeight: 700 }}>TUNE IN • STAY CONNECTED</span>
            <span>•</span>
            <Link to="/home" style={{ color: 'var(--color-acid)', fontWeight: 800 }}>DASHBOARD</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
