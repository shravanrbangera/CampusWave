import React from 'react';
import { Calendar, MapPin, Users, CheckCircle, Clock, Zap, Ticket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const EventCard = ({ event }) => {
  const { rsvpEvents, toggleRSVP } = useAuth();
  const isRSVPed = rsvpEvents.includes(event.id);

  return (
    <div 
      className="card-modern"
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        borderRadius: '20px',
        border: '2px solid #000',
        boxShadow: '4px 4px 0 #000',
        backgroundColor: '#FFFFFF',
        transition: 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.15s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-3px, -3px)';
        e.currentTarget.style.boxShadow = '7px 7px 0 #000';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translate(0, 0)';
        e.currentTarget.style.boxShadow = '4px 4px 0 #000';
      }}
    >
      {/* Event Image Banner with Date Tag & Ticket Perforation */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '185px',
          overflow: 'hidden',
          backgroundColor: '#000',
          borderBottom: '2px solid #000'
        }}
      >
        <img 
          src={event.image} 
          alt={event.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* Date Slab - Comic Brutalist */}
        <div 
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'var(--color-acid)',
            color: '#000',
            border: '2px solid #000',
            borderRadius: '12px',
            padding: '6px 12px',
            textAlign: 'center',
            boxShadow: '3px 3px 0 #000',
            lineHeight: 1
          }}
        >
          <div style={{ fontFamily: 'var(--font-black)', fontSize: '1.4rem' }}>
            {event.date.day}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase' }}>
            {event.date.month}
          </div>
        </div>

        {/* Category Pill */}
        <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
          <span 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              backgroundColor: '#000',
              color: '#fff',
              border: '1.5px solid #fff',
              borderRadius: '999px',
              padding: '4px 10px',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.5)'
            }}
          >
            <Zap size={11} color="var(--color-acid)" fill="var(--color-acid)" />
            {event.category}
          </span>
        </div>

        {/* Ticket Perforation Notch at bottom right */}
        <div 
          style={{
            position: 'absolute',
            bottom: '-8px',
            right: '24px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '2px solid #000'
          }}
        />
      </div>

      {/* Body Details */}
      <div 
        style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          gap: '14px'
        }}
      >
        <div>
          <h3 
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.2rem',
              fontWeight: 800,
              lineHeight: 1.3,
              marginBottom: '8px',
              color: 'var(--color-ink)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em'
            }}
          >
            {event.title}
          </h3>

          <p 
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.86rem',
              color: '#333333',
              marginBottom: '14px',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '2.6em'
            }}
          >
            {event.description}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111', fontWeight: 600 }}>
              <Clock size={15} color="var(--color-coral)" />
              <span>{event.time}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111', fontWeight: 600 }}>
              <MapPin size={15} color="var(--color-coral)" />
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
            borderTop: '2px dashed #000',
            marginTop: 'auto'
          }}
        >
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#222'
            }}
          >
            <Users size={14} color="#000" />
            <span>{event.attendees + (isRSVPed ? 1 : 0)} GOING</span>
          </div>

          <button
            onClick={() => toggleRSVP(event.id)}
            className="btn-brutal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '999px',
              fontSize: '0.82rem',
              fontWeight: 800,
              cursor: 'pointer',
              backgroundColor: isRSVPed ? 'var(--color-acid)' : 'var(--color-coral)',
              color: isRSVPed ? '#000' : '#FFFFFF',
              border: '2px solid #000',
              boxShadow: '2px 2px 0 #000'
            }}
          >
            {isRSVPed ? (
              <>
                <CheckCircle size={15} />
                <span>RSVP'D // ADMIT 1</span>
              </>
            ) : (
              <>
                <Ticket size={15} />
                <span>RSVP PASS</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
