import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Home, 
  Mic2, 
  Vote, 
  Bookmark, 
  Search, 
  Sun, 
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';

export const Navbar = () => {
  const { theme, toggleTheme, savedPodcasts, downloadedPodcasts } = useAuth();
  const { isPlaying } = useAudio();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const totalSavedCount = (savedPodcasts?.length || 0) + (downloadedPodcasts?.length || 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/podcasts?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  // The 5 core sections with clean retro editorial dots (inspired by user portfolio reference)
  const navLinks = [
    { to: '/', label: 'Home', dotColor: '#E8590C' },
    { to: '/podcasts', label: 'Podcasts', dotColor: '#0CA678' },
    { 
      to: '/live', 
      label: 'Live Radio', 
      dotColor: '#E8590C',
      isLive: true 
    },
    { to: '/vote', label: 'Vote', dotColor: '#FAB005' },
    { to: '/saved', label: 'Saved', dotColor: '#2563EB', badge: totalSavedCount }
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-navbar)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)',
        height: 'var(--navbar-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
      }}
    >
      <div 
        style={{
          maxWidth: '1240px',
          width: '100%',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}
      >
        {/* Brand Logo */}
        <Link 
          to="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flexShrink: 0
          }}
        >
          <div 
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: 'var(--color-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px var(--color-orange-glow)',
              position: 'relative',
              flexShrink: 0
            }}
          >
            <Radio size={18} color="#FFFFFF" />
            {isPlaying && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  border: '1.5px solid var(--bg-navbar)'
                }}
              />
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  lineHeight: 1
                }}
              >
                CAMPUS<span style={{ color: 'var(--color-orange)' }}>WAVE</span>
              </span>
              <span 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  backgroundColor: 'var(--color-orange-soft)',
                  color: 'var(--color-orange)',
                  border: '1px solid var(--color-orange)',
                  padding: '2px 5px',
                  borderRadius: '4px',
                  lineHeight: 1
                }}
              >
                90.4 FM
              </span>
            </div>
            <div 
              className="desktop-only"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.66rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.06em',
                lineHeight: 1.2,
                fontWeight: 700,
                marginTop: '2px',
                textTransform: 'uppercase'
              }}
            >
              NMAMIT STEREO BROADCAST
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links (5 Items) */}
        <nav 
          className="nav-desktop-links desktop-only"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.84rem',
                fontFamily: 'var(--font-heading)',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-orange)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--bg-card-subtle)' : 'transparent',
                border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
                position: 'relative',
                transition: 'all var(--transition-fast)'
              })}
            >
              <span 
                style={{ 
                  width: '6px', 
                  height: '6px', 
                  borderRadius: '50%', 
                  backgroundColor: item.dotColor, 
                  display: 'inline-block' 
                }} 
              />
              <span>{item.label.toUpperCase()}</span>
              {item.badge > 0 && (
                <span 
                  style={{
                    fontSize: '0.62rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    backgroundColor: 'var(--color-orange)',
                    color: '#FFF',
                    padding: '1px 5px',
                    borderRadius: '999px',
                    marginLeft: '2px'
                  }}
                >
                  {item.badge}
                </span>
              )}
              {item.isLive && (
                <span 
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-orange)',
                    display: 'inline-block',
                    animation: 'pulse 1.2s infinite'
                  }}
                />
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Controls: Desktop Search & Universal Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          {/* Desktop Search Input (Hidden on mobile) */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="desktop-only"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Search podcasts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '180px',
                padding: '7px 12px 7px 32px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 500
              }}
            />
            <Search 
              size={14} 
              color="var(--text-muted)" 
              style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }} 
            />
          </form>

          {/* Quick Search Shortcut Button for Mobile */}
          <button 
            onClick={() => navigate('/podcasts')}
            className="mobile-only"
            style={{
              width: '38px',
              height: '38px',
              minWidth: '38px',
              minHeight: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card)',
              border: '1.5px solid var(--border-color)',
              color: 'var(--text-primary)',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
            title="Search podcasts"
            aria-label="Search"
          >
            <Search size={17} color="var(--text-primary)" strokeWidth={2.2} />
          </button>

          {/* Theme Toggle Button - ALWAYS PROMINENT ON MOBILE AND DESKTOP */}
          <button 
            onClick={toggleTheme}
            className="theme-toggle-btn"
            style={{
              width: '38px',
              height: '38px',
              minWidth: '38px',
              minHeight: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-card)',
              border: '1.5px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: 'var(--shadow-sm)'
            }}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} color="#F4C542" strokeWidth={2.4} />
            ) : (
              <Moon size={18} color="var(--text-primary)" strokeWidth={2.4} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
