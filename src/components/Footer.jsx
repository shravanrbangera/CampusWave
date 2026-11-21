import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, MapPin, ExternalLink, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer 
      style={{
        backgroundColor: 'var(--color-white)',
        borderTop: '1px solid var(--border-color)',
        marginTop: 'var(--space-3xl)',
        padding: 'var(--space-3xl) var(--space-lg) var(--space-xl)',
        transition: 'background-color var(--transition-normal)'
      }}
    >
      <div 
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-2xl)',
          marginBottom: 'var(--space-2xl)'
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '11px',
                background: 'linear-gradient(135deg, var(--color-coral) 0%, #D41724 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: 'var(--shadow-coral)'
              }}
            >
              <Radio size={18} />
            </div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-charcoal)' }}>
              CAMPUS<span style={{ color: 'var(--color-coral)' }}>WAVE</span>
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
            The official student digital radio and audio storytelling network of NMAM Institute of Technology (NMAMIT), Nitte.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <MapPin size={14} color="var(--color-coral)" />
            <span>Nitte, Karkala Taluk, Udupi, Karnataka 574110</span>
          </div>
        </div>

        {/* Discovery Links */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '0.04em', color: 'var(--color-charcoal)' }}>
            AUDIO DISCOVERY
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <li><Link to="/live" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>Live Broadcast (90.4 FM)</Link></li>
            <li><Link to="/podcasts" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>Student Podcasts Hub</Link></li>
            <li><Link to="/explore" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>Campus Indie Music</Link></li>
            <li><Link to="/summaries" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>AI Broadcast Summaries</Link></li>
            <li><Link to="/community" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>Hostel Song Voting</Link></li>
          </ul>
        </div>

        {/* Campus Network */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '0.04em', color: 'var(--color-charcoal)' }}>
            CAMPUS ECOSYSTEM
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <li><Link to="/campus" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>Announcements & Circulars</Link></li>
            <li><Link to="/campus" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>Incridea 2026 Portal</Link></li>
            <li><Link to="/community" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>Song Request Box</Link></li>
            <li><Link to="/library" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>Your Personal Library</Link></li>
            <li><Link to="/profile" style={{ transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-coral)'} onMouseOut={e=>e.currentTarget.style.color='inherit'}>Student Listener ID</Link></li>
          </ul>
        </div>

        {/* Radio Specs & Disclaimer */}
        <div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, marginBottom: '16px', letterSpacing: '0.04em', color: 'var(--color-charcoal)' }}>
            TRANSMISSION SPECS
          </h4>
          <div 
            style={{
              background: 'var(--bg-secondary)',
              padding: '14px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-coral)', fontWeight: 700, marginBottom: '4px' }}>
              FREQUENCY: 90.4 MHZ DIGITAL
            </div>
            <div>Studio Bitrate: 320kbps HD Master</div>
            <div>Coverage: NMAMIT Campus, Hostels & Netravati</div>
            <div style={{ marginTop: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              * Prototype simulated demo. Non-official student conceptual project.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright */}
      <div 
        style={{
          maxWidth: '1320px',
          margin: '0 auto',
          paddingTop: 'var(--space-lg)',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
          fontSize: '0.82rem',
          color: 'var(--text-muted)'
        }}
      >
        <div>
          © 2026 CampusWave • Designed with passion for NMAMIT students.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Tune In. Stay Connected.</span>
          <span>•</span>
          <Link to="/home" style={{ color: 'var(--color-coral)', fontWeight: 600 }}>Student Dashboard</Link>
        </div>
      </div>
    </footer>
  );
};
