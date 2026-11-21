import React from 'react';
import { Calendar, MapPin, Users, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const EventCard = ({ event }) => {
  const { rsvpEvents, toggleRSVP } = useAuth();
  const isRSVPed = rsvpEvents.includes(event.id);

  return (
    <div 
      className="card-3d glass-panel"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      {/* Event Image Banner with Date Tag */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '175px',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-tertiary)'
        }}
      >
        <img 
          src={event.image} 
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Date Badge */}
        <div 
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'var(--color-orange)',
            color: '#0E1315',
            borderRadius: '12px',
            padding: '5px 11px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            lineHeight: 1.1
          }}
        >
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800 }}>
            {event.date.day}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700 }}>
            {event.date.month}
          </div>
        </div>

        {/* Category Pill */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span 
            className="editorial-badge"
            style={{
              backgroundColor: 'rgba(12, 16, 18, 0.88)',
              color: 'var(--color-cream)'
            }}
          >
            {event.category}
          </span>
        </div>
      </div>

      {/* Body Details */}
      <div 
        style={{
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <div>
          <h3 
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              lineHeight: 1.35,
              marginBottom: '8px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.7em'
            }}
          >
            {event.title}
          </h3>

          <p 
            style={{
              fontSize: '0.86rem',
              color: 'var(--text-secondary)',
              marginBottom: '14px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em'
            }}
          >
            {event.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={14} color="var(--color-orange)" />
              <span>{event.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={14} color="var(--color-orange)" />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Footer with RSVP button */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            marginTop: 'auto',
            borderTop: '1px solid var(--border-color)'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)'
            }}
          >
            <Users size={14} />
            <span>{event.attendees + (isRSVPed ? 1 : 0)} attending</span>
          </div>

          <button
            onClick={() => toggleRSVP(event.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 15px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.84rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
              backgroundColor: isRSVPed ? 'rgba(34, 197, 94, 0.16)' : 'var(--color-orange)',
              color: isRSVPed ? '#22c55e' : '#0E1315',
              border: isRSVPed ? '1px solid #22c55e' : 'none'
            }}
          >
            {isRSVPed ? (
              <>
                <CheckCircle size={14} />
                <span>RSVPed</span>
              </>
            ) : (
              <span>Register / RSVP</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
