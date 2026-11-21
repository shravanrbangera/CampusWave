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
        display: 'none', // Managed via responsive.css
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'calc(var(--bottom-nav-height) + env(safe-area-inset-bottom, 0px))',
        backgroundColor: 'var(--bg-bottom-nav)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-color)',
        zIndex: 100,
        overflow: 'visible',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px env(safe-area-inset-bottom, 0px)',
        boxShadow: 'var(--shadow-md)',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
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
                padding: '2px 6px',
                minWidth: '56px',
                height: '100%',
                position: 'relative'
              }}
            >
              <div 
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-orange)',
                  boxShadow: '0 2px 10px var(--color-orange-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  position: 'relative',
                  flexShrink: 0
                }}
              >
                <Icon size={19} color="#FFFFFF" strokeWidth={2.4} />
                {isPlaying && (
                  <span 
                    style={{
                      position: 'absolute',
                      top: '0px',
                      right: '0px',
                      width: '9px',
                      height: '9px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      border: '1.5px solid #FFFFFF'
                    }}
                  />
                )}
              </div>
              <span 
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  color: 'var(--color-orange)',
                  marginTop: '3px',
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  lineHeight: 1
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
              gap: '4px',
              textDecoration: 'none',
              color: isActive ? 'var(--color-orange)' : 'var(--text-secondary)',
              padding: '6px 10px',
              minWidth: '50px',
              minHeight: '44px',
              borderRadius: 'var(--radius-sm)',
              transition: 'all var(--transition-fast)'
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={19} strokeWidth={isActive ? 2.4 : 1.8} color={isActive ? 'var(--color-orange)' : 'var(--text-secondary)'} />
                <span 
                  style={{ 
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.68rem', 
                    fontWeight: 700,
                    letterSpacing: '0.02em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-orange)' : 'var(--text-secondary)'
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
