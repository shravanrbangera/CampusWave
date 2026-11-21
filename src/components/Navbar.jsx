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
  X,
  Sparkles
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

  // The 5 primary sections requested
  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { 
      to: '/live', 
      label: 'Live Radio', 
      icon: Radio, 
      isLive: true 
    },
    { to: '/podcasts', label: 'Podcasts', icon: Mic2 },
    { to: '/vote', label: 'Vote', icon: Vote },
    { to: '/saved', label: 'Saved', icon: Bookmark, badge: totalSavedCount }
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '2.5px solid #000000',
        boxShadow: '0 4px 0 rgba(0, 0, 0, 0.05)',
        height: 'var(--navbar-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div 
        style={{
          maxWidth: '1360px',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--space-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-md)'
        }}
      >
        {/* Brand Logo with Tactile Brutalist Badge */}
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
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--color-coral)',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '3px 3px 0 #000',
              position: 'relative',
              flexShrink: 0
            }}
          >
            <Radio size={22} color="#FFFFFF" />
            {isPlaying && (
              <span 
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: 'var(--color-acid)',
                  border: '2px solid #000',
                  boxShadow: '1px 1px 0 #000'
                }}
              />
            )}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span 
                style={{
                  fontFamily: 'var(--font-black)',
                  fontSize: '1.35rem',
                  letterSpacing: '-0.04em',
                  color: '#000000'
                }}
              >
                CAMPUS<span style={{ color: 'var(--color-coral)' }}>WAVE</span>
              </span>
              <span 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  fontWeight: 900,
                  backgroundColor: 'var(--color-acid)',
                  color: '#000',
                  border: '1.5px solid #000',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  boxShadow: '1px 1px 0 #000'
                }}
              >
                90.4
              </span>
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: '#333333',
                letterSpacing: '0.06em',
                lineHeight: 1,
                fontWeight: 700
              }}
            >
              NMAMIT • DIGITAL FM
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links with Brutalist Tactile States */}
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
                  padding: '6px 13px',
                  borderRadius: '999px',
                  fontSize: '0.84rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: isActive ? '#000000' : '#222222',
                  backgroundColor: isActive ? 'var(--color-acid)' : 'transparent',
                  border: isActive ? '2px solid #000' : '2px solid transparent',
                  boxShadow: isActive ? '2px 2px 0 #000' : 'none',
                  position: 'relative',
                  transition: 'all 0.15s ease'
                })}
              >
                <Icon size={14} />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span 
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      backgroundColor: 'var(--color-orange)',
                      color: '#FFF',
                      padding: '1px 6px',
                      borderRadius: '999px',
                      border: '1px solid #000'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
                {item.isLive && (
                  <span 
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-coral)',
                      border: '1px solid #000',
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
          {/* Search Trigger */}
          {searchOpen ? (
            <form 
              onSubmit={handleSearchSubmit} 
              className="navbar-search-form"
              style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: 'clamp(120px, 28vw, 210px)',
                  padding: '7px 14px',
                  borderRadius: '999px',
                  background: '#FFFFFF',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0 #000',
                  color: '#000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '16px',
                  fontWeight: 600
                }}
              />
              <button 
                type="button" 
                onClick={() => setSearchOpen(false)}
                style={{ color: '#000', cursor: 'pointer', background: 'none', border: 'none', padding: '6px', display: 'flex', alignItems: 'center' }}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="btn-brutal"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Search CampusWave"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          )}

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="btn-brutal"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '2px solid #000',
              boxShadow: '2px 2px 0 #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Profile / Auth Button */}
          {isAuthenticated ? (
            <Link 
              to="/profile"
              className="btn-brutal"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px 4px 4px',
                borderRadius: '999px',
                backgroundColor: 'var(--color-acid)',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                textDecoration: 'none'
              }}
              title="Open Student Profile"
            >
              <img 
                src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"} 
                alt={user?.name || "Student"}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid #000'
                }}
              />
              <span 
                className="desktop-only"
                style={{
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  color: '#000',
                  maxWidth: '90px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {user?.name?.split(' ')[0] || "Student"}
              </span>
            </Link>
          ) : (
            <Link 
              to="/login"
              className="btn-brutal"
              style={{
                padding: '8px 18px',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                backgroundColor: 'var(--color-coral)',
                color: '#fff',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                borderRadius: '999px'
              }}
            >
              LOGIN
            </Link>
          )}

          {/* Mobile hamburger menu toggle */}
          <button 
            className="btn-brutal"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            style={{
              display: 'none',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: '#fff',
              border: '2px solid #000',
              boxShadow: '2px 2px 0 #000',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            id="mobile-nav-toggle"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: 'absolute',
            top: 'var(--navbar-height)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--color-white)',
            borderBottom: '3px solid #000',
            padding: 'var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxShadow: '0 8px 0 rgba(0,0,0,0.1)'
          }}
        >
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
                  padding: '11px 16px',
                  borderRadius: '12px',
                  border: '2px solid #000',
                  boxShadow: isActive ? '3px 3px 0 #000' : 'none',
                  color: '#000',
                  backgroundColor: isActive ? 'var(--color-acid)' : '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  fontSize: '0.88rem'
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
                      backgroundColor: 'var(--color-coral)',
                      border: '1px solid #000',
                      marginLeft: 'auto'
                    }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};
