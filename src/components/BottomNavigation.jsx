import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Radio, Mic2, Vote, Bookmark } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const BottomNavigation = () => {
  const { isPlaying } = useAudio();

  // Mobile navigation items: Home, Podcasts, Live (Center), Vote, Saved
  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/podcasts', label: 'Podcasts', icon: Mic2 },
    { 
      to: '/live', 
      label: 'Live', 
      icon: Radio, 
      isLive: true 
    },
    { to: '/vote', label: 'Vote', icon: Vote },
    { to: '/saved', label: 'Saved', icon: Bookmark }
  ];

  return (
    <nav 
      className="nav-mobile-bottom"
      aria-label="Mobile Bottom Navigation"
      style={{
        display: 'none', // Shown via responsive.css on mobile
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'calc(var(--bottom-nav-height) + env(safe-area-inset-bottom, 0px))',
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '2.5px solid #000000',
        zIndex: 90,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 4px env(safe-area-inset-bottom, 0px)',
        boxShadow: '0 -4px 0 rgba(0, 0, 0, 0.05)'
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        if (item.isLive) {
          return (
            <NavLink
              key={item.to}
              to={item.to}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                position: 'relative',
                top: '-10px',
                padding: '0 4px',
                minWidth: '56px'
              }}
            >
              <div 
                className="btn-brutal"
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--color-coral)',
                  border: '2px solid #000000',
                  boxShadow: '2px 2px 0 #000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  position: 'relative'
                }}
              >
                <Icon size={22} color="#FFFFFF" />
                {isPlaying && (
                  <span 
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      right: '-2px',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: 'var(--color-acid)',
                      border: '1.5px solid #000'
                    }}
                  />
                )}
              </div>
              <span 
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  fontWeight: 900,
                  color: '#000000',
                  marginTop: '3px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}
              >
                LIVE
              </span>
            </NavLink>
          );
        }

        return (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              textDecoration: 'none',
              color: isActive ? '#000000' : '#444444',
              padding: '6px 8px',
              minWidth: '52px',
              minHeight: '48px',
              borderRadius: '8px',
              backgroundColor: isActive ? 'var(--color-acid)' : 'transparent',
              border: isActive ? '1.5px solid #000' : '1.5px solid transparent',
              boxShadow: isActive ? '1.5px 1.5px 0 #000' : 'none',
              transition: 'all 0.15s ease'
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={19} strokeWidth={isActive ? 2.5 : 1.8} color="#000" />
                <span 
                  style={{ 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem', 
                    fontWeight: isActive ? 900 : 700,
                    textTransform: 'uppercase',
                    color: '#000'
                  }}
                >
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
};
