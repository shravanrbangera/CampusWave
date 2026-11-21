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
  Moon, 
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';

export const Navbar = () => {
  const { user, isAuthenticated, theme, toggleTheme, savedPodcasts, downloadedPodcasts } = useAuth();
  const { isPlaying } = useAudio();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalSavedCount = (savedPodcasts?.length || 0) + (downloadedPodcasts?.length || 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/podcasts?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Exact 5 primary sections requested
  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/podcasts', label: 'Podcasts', icon: Mic2 },
    { 
      to: '/live', 
      label: 'Live Radio', 
      icon: Radio, 
      isLive: true 
    },
    { to: '/vote', label: 'Vote', icon: Vote },
    { to: '/saved', label: 'Saved', icon: Bookmark, badge: totalSavedCount }
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-navbar)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
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
          padding: '0 var(--space-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-md)'
        }}
      >
        {/* Brand Logo */}
        <Link 
          to="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'var(--color-orange)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px var(--color-orange-glow)',
              position: 'relative',
              flexShrink: 0
            }}
          >
            <Radio size={20} color="#FFFFFF" />
            {isPlaying && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  border: '2px solid var(--bg-navbar)'
                }}
              />
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)'
                }}
              >
                CAMPUS<span style={{ color: 'var(--color-orange)' }}>WAVE</span>
              </span>
              <span 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  backgroundColor: 'var(--color-orange-soft)',
                  color: 'var(--color-orange)',
                  border: '1px solid var(--color-orange)',
                  padding: '1px 5px',
                  borderRadius: '4px'
                }}
              >
                90.4
              </span>
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.04em',
                lineHeight: 1,
                fontWeight: 600
              }}
            >
              NMAMIT DIGITAL RADIO
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav 
          className="nav-desktop-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--color-orange)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--color-orange-soft)' : 'transparent',
                  border: isActive ? '1px solid var(--color-orange)' : '1px solid transparent',
                  position: 'relative',
                  transition: 'all var(--transition-fast)'
                })}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span 
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      backgroundColor: 'var(--color-orange)',
                      color: '#FFF',
                      padding: '1px 6px',
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
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-orange)',
                      display: 'inline-block',
                      animation: 'pulse 1.2s infinite'
                    }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right Action Icons & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Desktop Search Trigger / Input */}
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
              placeholder="Search shows, podcasts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: 'clamp(150px, 18vw, 220px)',
                padding: '8px 12px 8px 34px',
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
              size={15} 
              color="var(--text-muted)" 
              style={{ position: 'absolute', left: '11px', pointerEvents: 'none' }} 
            />
          </form>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="btn-icon"
            style={{
              width: '40px',
              height: '40px',
              minWidth: '40px',
              minHeight: '40px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} color="var(--color-amber)" /> : <Moon size={17} color="var(--text-primary)" />}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(prev => !prev)}
            style={{
              display: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              backgroundColor: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            id="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'absolute',
            top: 'var(--navbar-height)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            padding: 'var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          {/* Mobile Search input inside drawer */}
          <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '8px' }}>
            <input
              type="text"
              placeholder="Search shows, podcasts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px 12px 38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '16px'
              }}
            />
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          </form>

          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: isActive ? '1px solid var(--color-orange)' : '1px solid transparent',
                  color: isActive ? 'var(--color-orange)' : 'var(--text-primary)',
                  backgroundColor: isActive ? 'var(--color-orange-soft)' : 'transparent',
                  fontFamily: 'var(--font-body)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.94rem'
                })}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.isLive && (
                  <span 
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-orange)',
                      marginLeft: 'auto'
                    }}
                  />
                )}
                {item.badge > 0 && !item.isLive && (
                  <span 
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      backgroundColor: 'var(--color-orange)',
                      color: '#FFF',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      marginLeft: 'auto'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};
