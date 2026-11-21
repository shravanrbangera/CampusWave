import React, { useState, useRef } from 'react';
import { 
  Radio, 
  Volume2, 
  Zap, 
  Sparkles, 
  Disc, 
  Flame, 
  Smile, 
  RotateCw,
  Sliders,
  Send
} from 'lucide-react';

export const RetroConsoleDeck = ({ onSoundTrigger }) => {
  const [activeEffect, setActiveEffect] = useState(null);
  const [dialRotation, setDialRotation] = useState(45);
  const [receiptCount, setReceiptCount] = useState(1);
  const audioCtxRef = useRef(null);

  // Initialize Web Audio API on first user gesture
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  // Sound Synthesizers for DJ soundboard
  const playSound = (type) => {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      if (type === 'airhorn') {
        // Reggae/DJ Airhorn multi-tone
        const freqs = [466.16, 466.16, 466.16, 523.25, 466.16];
        const times = [0, 0.12, 0.24, 0.38, 0.52];
        freqs.forEach((f, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(f, now + times[i]);
          gain.gain.setValueAtTime(0.25, now + times[i]);
          gain.gain.exponentialRampToValueAtTime(0.01, now + times[i] + 0.11);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + times[i]);
          osc.stop(now + times[i] + 0.12);
        });
      } else if (type === 'bassdrop') {
        // Deep 808 Sub-Bass Drop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 0.85);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.95);
      } else if (type === 'scratch') {
        // Vinyl Scratch Chirp
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(1400, now + 0.08);
        osc.frequency.linearRampToValueAtTime(450, now + 0.18);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'chiptune') {
        // 8-bit Arcade Jump Arpeggio
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.15, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.01, now + (idx + 1) * 0.06);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + (idx + 1) * 0.06);
        });
      }

      setActiveEffect(type);
      if (onSoundTrigger) onSoundTrigger(type);
      setTimeout(() => setActiveEffect(null), 400);
    } catch (e) {
      console.warn("Audio Context init pending user gesture", e);
    }
  };

  const handleDialClick = () => {
    setDialRotation(prev => prev + 45);
    playSound('scratch');
  };

  const printReceipt = () => {
    setReceiptCount(prev => prev + 1);
    playSound('chiptune');
  };

  return (
    <div 
      className="retro-handheld-console shadow-brutal-acid"
      style={{
        backgroundColor: '#FFFFFF',
        border: '3px solid #000000',
        borderRadius: '24px',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '480px',
        width: '100%',
        margin: '0 auto'
      }}
    >
      {/* Top Console Speaker Slits & Power LED */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: '14px', height: '4px', backgroundColor: '#000000', borderRadius: '2px' }} />
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span 
            className="neon-glow"
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-acid)',
              border: '2px solid #000000',
              display: 'inline-block'
            }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 800, color: '#000000' }}>
            BATTERY 94%
          </span>
        </div>
      </div>

      {/* Main Console LCD Display Screen (Game Boy / Synth Style) */}
      <div 
        style={{
          backgroundColor: '#0F2624',
          border: '3px solid #000000',
          borderRadius: '16px',
          padding: '16px',
          boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.6)',
          color: 'var(--color-acid)',
          position: 'relative',
          marginBottom: '20px'
        }}
      >
        {/* Screen Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(232, 255, 0, 0.3)', paddingBottom: '6px', marginBottom: '10px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 700 }}>
            CAMPUS.WAVE // 90.4 FM
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--color-cyan)', fontWeight: 800 }}>
            MOD: STEREO
          </span>
        </div>

        {/* Mascot & Live Wave Meter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <div 
              className="arcade-bounce font-black"
              style={{ 
                fontSize: '2rem', 
                lineHeight: 1, 
                color: '#FFFFFF',
                letterSpacing: '-0.03em'
              }}
            >
              90.4 FM
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-acid)', marginTop: '4px' }}>
              CURRENT: HOSTELLER RADIO
            </div>
          </div>

          {/* Equalizer Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '42px' }}>
            {[65, 90, 40, 100, 80, 50, 95, 70].map((h, i) => (
              <div 
                key={i} 
                style={{
                  width: '6px',
                  height: `${h}%`,
                  backgroundColor: i % 2 === 0 ? 'var(--color-acid)' : 'var(--color-cyan)',
                  borderRadius: '1px'
                }}
              />
            ))}
          </div>
        </div>

        {/* Notification Ticker inside Screen */}
        <div 
          style={{
            marginTop: '10px',
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: '4px 8px',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {activeEffect ? `>>> FX TRIGGERED: ${activeEffect.toUpperCase()}! <<<` : '>>> TOUCH ANY BUTTON FOR SOUND FX <<<'}
        </div>
      </div>

      {/* Tactile Controls: 3 Colored Buttons + Rotary Smiley Knob + D-Pad */}
      <div className="retro-controls-deck" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', marginBottom: '18px', flexWrap: 'wrap' }}>
        
        {/* Retro 3 Colored Action Buttons (Blue, Yellow, Red from Image 2!) */}
        <div className="retro-sound-btns" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => playSound('airhorn')}
            className="btn-brutal retro-fx-btn"
            title="Airhorn Blast"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#00F0FF',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '3px 3px 0 #000'
            }}
          >
            <Zap size={20} strokeWidth={3} />
          </button>

          <button
            onClick={() => playSound('bassdrop')}
            className="btn-brutal retro-fx-btn"
            title="808 Bass Drop"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#E8FF00',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '3px 3px 0 #000'
            }}
          >
            <Flame size={20} strokeWidth={3} />
          </button>

          <button
            onClick={() => playSound('chiptune')}
            className="btn-brutal retro-fx-btn"
            title="8-Bit Arcade Arpeggio"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: '#F52D3A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '3px 3px 0 #000'
            }}
          >
            <Sparkles size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Rotary Smiley Knob (From Image 2!) */}
        <div className="retro-dial-wrapper" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={handleDialClick}
            className="btn-brutal retro-dial-btn"
            title="Click to Scratch Dial"
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '3px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${dialRotation}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: '4px 4px 0 #000000'
            }}
          >
            <Smile size={28} color="#000000" strokeWidth={2.5} />
          </button>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', fontWeight: 800 }}>
            SCRATCH DIAL
          </span>
        </div>
      </div>

      {/* Yellow Sticky Post-It Note with Red Pushpin (From Image 1!) */}
      <div 
        className="sticker-wobble retro-pushpin-note"
        style={{
          backgroundColor: '#FFF875',
          border: '2px solid #000000',
          boxShadow: '3px 3px 0 #000000',
          padding: '8px 12px',
          position: 'relative',
          marginTop: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '2px'
        }}
      >
        {/* Red Pushpin */}
        <div 
          style={{
            position: 'absolute',
            top: '-7px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: '#F52D3A',
            border: '2px solid #000000',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        />

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 800, color: '#000000' }}>
          PASS: 4NM22-WAVE • ALL HOSTELS ON AIR
        </div>

        <button 
          onClick={printReceipt}
          className="btn-brutal"
          style={{
            padding: '3px 8px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            fontSize: '0.68rem',
            boxShadow: '2px 2px 0 #000'
          }}
        >
          TICKET #{receiptCount}
        </button>
      </div>
    </div>
  );
};

export default RetroConsoleDeck;

