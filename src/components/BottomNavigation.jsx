import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Radio, Bell, Bookmark } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

export const BottomNavigation = () => {
  const { isPlaying } = useAudio();

  const navItems = [
    { to: '/home', label: 'Home', icon: Home },
    { to: '/explore', label: 'Explore', icon: Compass },
    { 
      to: '/live', 
      label: 'Live', 
      icon: Radio, 
      isLive: true 
    },
    { to: '/campus', label: 'Campus', icon: Bell },
    { to: '/library', label: 'Library', icon: Bookmark }
  ];

  return (
    <nav 
      className="nav-mobile-bottom"
      style={{
        display: 'none', // Shown via media query in responsive.css
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 'var(--bottom-nav-height)',
        backgroundColor: 'var(--bg-glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-color)',
        zIndex: 90,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px',
        boxShadow: '0 -4px 16px rgba(0, 0, 0, 0.05)'
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
                top: '-12px'
              }}
            >
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-coral) 0%, #D41724 100%)',
                  boxShadow: 'var(--shadow-coral)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  border: '3px solid var(--color-white)'
                }}
              >
                <Icon size={22} />
              </div>
              <span 
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: 'var(--color-coral)',
                  marginTop: '2px',
                  letterSpacing: '0.05em'
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
              gap: '2px',
              textDecoration: 'none',
              color: isActive ? 'var(--color-coral)' : 'var(--text-muted)',
              padding: '6px 12px',
              transition: 'color var(--transition-fast)'
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span style={{ fontSize: '0.68rem', fontWeight: isActive ? 700 : 500 }}>
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
