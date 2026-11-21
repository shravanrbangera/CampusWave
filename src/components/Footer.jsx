import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, MapPin, Heart, Sparkles } from 'lucide-react';
import { MarqueeTicker } from './MarqueeTicker';

export const Footer = () => {
  return (
    <footer 
      style={{
        backgroundColor: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        marginTop: 'var(--space-3xl)',
        position: 'relative',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
      }}
    >
      {/* Top Infinite Dual Marquee Ticker */}
      <MarqueeTicker />

      <div 
        className="footer-grid-container page-wrapper"
        style={{
          padding: 'var(--space-2xl) var(--space-lg) var(--space-xl)',
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
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'var(--color-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Radio size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-radio)', fontSize: '1.35rem', letterSpacing: '0.04em', color: 'var(--text-primary)' }}>
                  CAMPUS<span style={{ color: 'var(--color-orange)' }}>WAVE</span>
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700, backgroundColor: 'var(--color-orange)', color: '#FFF', padding: '1px 6px', borderRadius: '4px' }}>
                  90.4 FM
                </span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                NMAMIT • DIGITAL FM STEREO
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '14px' }}>
            The official student digital radio and audio storytelling network of NMAM Institute of Technology (NMAMIT), Nitte.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            <MapPin size={15} color="var(--color-orange)" />
            <span>Nitte, Karkala Taluk, Udupi, Karnataka 574110</span>
          </div>

          {/* Sticky Student Tag */}
          <div style={{ marginTop: '14px' }}>
            <span className="retro-pill retro-pill-yellow">
              STUDIO 90.4 FM // LIVE FROM NITTE CAMPUS
            </span>
          </div>
        </div>

        {/* Navigation Links - 5 Main Items Only */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-radio)', fontSize: '0.92rem', marginBottom: '14px', letterSpacing: '0.04em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
            CAMPUS RADIO
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', fontWeight: 500 }}>
            <li>
              <Link to="/home" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-orange)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                Home Feed
              </Link>
            </li>
            <li>
              <Link to="/podcasts" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-orange)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                Student Podcasts
              </Link>
            </li>
            <li>
              <Link to="/live" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-orange)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                Live Broadcast (90.4 FM)
              </Link>
            </li>
            <li>
              <Link to="/vote" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-orange)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                Daily Playlist Voting
              </Link>
            </li>
            <li>
              <Link to="/saved" style={{ color: 'var(--text-secondary)', transition: 'color var(--transition-fast)' }} onMouseOver={e=>e.currentTarget.style.color='var(--color-orange)'} onMouseOut={e=>e.currentTarget.style.color='var(--text-secondary)'}>
                Saved Episodes Vault
              </Link>
            </li>
          </ul>
        </div>

        {/* Radio Broadcast Info Badge */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-radio)', fontSize: '0.92rem', marginBottom: '14px', letterSpacing: '0.04em', color: 'var(--text-primary)', textTransform: 'uppercase' }}>
            STUDIO BROADCAST
          </h4>
          <div 
            style={{
              background: 'var(--bg-secondary)',
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              fontSize: '0.84rem',
              color: 'var(--text-primary)',
              lineHeight: 1.6
            }}
          >
            <div style={{ color: 'var(--color-orange)', fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              <span className="badge-live-pulse" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-orange)' }} />
              FREQUENCY: 90.4 MHZ STEREO
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              Covering NMAMIT campus academic blocks, hostels & student dining commons.
            </div>
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-color)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              Designed by & for NMAMIT students.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div 
        style={{
          borderTop: '1px solid var(--border-color)',
          padding: '16px var(--space-lg)',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '6px',
          flexWrap: 'wrap'
        }}
      >
        <span>© {new Date().getFullYear()} CampusWave NMAMIT. Built for campus culture and student voices.</span>
      </div>
    </footer>
  );
};
