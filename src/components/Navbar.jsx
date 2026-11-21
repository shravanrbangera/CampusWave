import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Radio, 
  Compass, 
  Home, 
  Mic2, 
  Bell, 
  Users, 
  Bookmark, 
  Search, 
  Sun, 
  Moon, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext';

export const Navbar = () => {
  const { user, isAuthenticated, theme, toggleTheme } = useAuth();
  const { isPlaying } = useAudio();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { 
      to: '/live', 
      label: 'Live Radio', 
      icon: Radio, 
      isLive: true 
    },
    { to: '/podcasts', label: 'Podcasts', icon: Mic2 },
    { to: '/campus', label: 'Campus Updates', icon: Bell },
    { to: '/summaries', label: 'AI Summaries', icon: Sparkles },
    { to: '/community', label: 'Community', icon: Users },
    { to: '/library', label: 'Library', icon: Bookmark }
  ];

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-color)',
        height: 'var(--navbar-height)',
        display: 'flex',
        alignItems: 'center',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div 
        style={{
          maxWidth: '1320px',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--space-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-md)'
        }}
      >
        {/* Brand Logo with Coral Icon */}
        <Link 
          to="/" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '11px',
            textDecoration: 'none'
          }}
        >
          <div 
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--color-coral) 0%, #D41724 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-coral)',
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
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: '2px solid var(--color-white)'
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
                  color: 'var(--color-charcoal)'
                }}
              >
                CAMPUS<span style={{ color: 'var(--color-coral)' }}>WAVE</span>
              </span>
            </div>
            <div 
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.64rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                lineHeight: 1,
                fontWeight: 600
              }}
            >
              NMAMIT • 90.4 DIGITAL
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav 
          className="nav-desktop-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
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
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? 'var(--color-coral)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--color-coral-soft)' : 'transparent',
                  border: isActive ? '1px solid rgba(245, 45, 58, 0.22)' : '1px solid transparent',
                  position: 'relative',
                  transition: 'all var(--transition-fast)'
                })}
              >
                <Icon size={15} />
                <span>{item.label}</span>
                {item.isLive && (
                  <span 
                    className="badge-live-pulse"
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-coral)',
                      display: 'inline-block'
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
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                autoFocus
                placeholder="Search CampusWave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '200px',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-secondary)',
                  border: '1.5px solid var(--color-coral)',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem'
                }}
              />
              <button 
                type="button" 
                onClick={() => setSearchOpen(false)}
                style={{ marginLeft: '6px', color: 'var(--text-muted)' }}
              >
                <X size={18} />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="btn-icon"
              title="Search CampusWave"
              aria-label="Search"
            >
              <Search size={17} />
            </button>
          )}

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            className="btn-icon"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Profile / Auth Button */}
          {isAuthenticated ? (
            <Link 
              to="/profile"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px 4px 4px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-white)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
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
                  objectFit: 'cover'
                }}
              />
              <span 
                className="desktop-only"
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
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
              className="btn-coral"
              style={{
                padding: '8px 18px',
                fontSize: '0.84rem'
              }}
            >
              Login
            </Link>
          )}

          {/* Mobile hamburger menu toggle */}
          <button 
            className="btn-icon"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            style={{ display: 'none' }}
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
            borderBottom: '1px solid var(--border-color)',
            padding: 'var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            boxShadow: 'var(--shadow-lg)'
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
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? 'var(--color-coral)' : 'var(--text-primary)',
                  backgroundColor: isActive ? 'var(--color-coral-soft)' : 'transparent',
                  fontWeight: 700,
                  fontSize: '0.92rem'
                })}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.isLive && (
                  <span 
                    className="badge-live-pulse"
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-coral)',
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
