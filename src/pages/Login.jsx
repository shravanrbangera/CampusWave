import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { VinylRecord } from '../components/VinylRecord';

export const Login = () => {
  const navigate = useNavigate();
  const { login, loginAsGuest } = useAuth();

  const [email, setEmail] = useState('aarav.hegde@nitte.edu.in');
  const [password, setPassword] = useState('campuswave2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid NMAMIT student email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      login(email, password, rememberMe);
      setLoading(false);
      navigate('/home');
    }, 600);
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    navigate('/home');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setToastMsg('Password reset link sent to your registered NMAMIT email.');
    setTimeout(() => setToastMsg(''), 4000);
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--navbar-height))',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        backgroundColor: '#F4F1EA'
      }}
      className="split-login-container"
    >
      {/* Left Branding & Visual Showcase Panel */}
      <div
        className="login-visual-panel"
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, var(--color-teal) 0%, #000000 100%)',
          borderRight: '3px solid #000',
          padding: 'var(--space-3xl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: 'var(--color-coral)',
                border: '2px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '3px 3px 0 #000'
              }}
            >
              <Radio size={24} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-black)', fontSize: '1.45rem', letterSpacing: '-0.03em', color: '#fff' }}>
                CAMPUS<span style={{ color: 'var(--color-coral)' }}>WAVE</span>
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-acid)' }}>
                NMAMIT • 90.4 DIGITAL FM
              </div>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(2rem, 3.8vw, 2.9rem)', color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1.15, marginBottom: '16px' }}>
            Tune into the <span style={{ color: 'var(--color-acid)' }}>heartbeat</span> of your campus.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.9)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.6 }}>
            Access exclusive hosteller playlists, real-time radio shoutouts, AI episode digests, and community song voting.
          </p>

          {/* Sticky badge */}
          <div 
            style={{
              marginTop: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-acid)',
              color: '#000',
              border: '2px solid #000',
              padding: '6px 14px',
              borderRadius: '8px',
              boxShadow: '3px 3px 0 #000',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 900
            }}
          >
            <span>90.4 MHZ // BROADCAST ACCESS PORTAL</span>
          </div>
        </div>

        {/* Center Vinyl Artwork */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            margin: 'var(--space-2xl) 0',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <VinylRecord
            isPlaying={true}
            size={240}
            showArm={false}
            albumTitle="CampusWave Student FM"
          />
        </div>

        {/* Bottom Student Testimonial Quote */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            backgroundColor: '#FFFFFF',
            color: '#000',
            padding: '16px 22px',
            borderRadius: '16px',
            border: '2px solid #000',
            boxShadow: '4px 4px 0 #000'
          }}
        >
          <p style={{ fontStyle: 'italic', fontSize: '0.88rem', fontFamily: 'var(--font-body)', color: '#111', marginBottom: '6px', fontWeight: 600 }}>
            “Whether studying in Netravati hostel or commuting on the Karkala bus, CampusWave keeps us connected to every beat.”
          </p>
          <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--color-coral)', fontWeight: 800 }}>
            — Ananya Hegde (CSE '25, Resident RJ)
          </div>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div
        className="login-form-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-2xl) var(--space-xl)',
          position: 'relative',
          backgroundColor: '#F4F1EA'
        }}
      >
        <div 
          className="card-modern auth-form-card"
          style={{ 
            maxWidth: '460px', 
            width: '100%',
            padding: '36px',
            borderRadius: '24px',
            backgroundColor: '#FFFFFF',
            border: '2.5px solid #000',
            boxShadow: '6px 6px 0 #000'
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                backgroundColor: 'var(--color-acid)',
                color: '#000',
                border: '1.5px solid #000',
                padding: '3px 8px',
                borderRadius: '6px',
                boxShadow: '2px 2px 0 #000',
                marginBottom: '10px'
              }}
            >
              STUDENT AUTHENTICATION
            </span>
            <h1 style={{ fontFamily: 'var(--font-black)', fontSize: '2.2rem', marginBottom: '8px', color: '#000', textTransform: 'uppercase' }}>
              Welcome back
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#444', fontSize: '0.88rem', fontWeight: 600 }}>
              Sign in with your NMAMIT student credentials or test drive as a guest listener.
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: 'var(--color-acid)',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                color: '#000',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                marginBottom: '18px'
              }}
            >
              {error}
            </div>
          )}

          {toastMsg && (
            <div
              style={{
                backgroundColor: 'var(--color-acid)',
                border: '2px solid #000',
                boxShadow: '2px 2px 0 #000',
                color: '#000',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                marginBottom: '18px'
              }}
            >
              {toastMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>NMAMIT Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@nitte.edu.in"
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0 #000',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                  required
                />
                <Mail
                  size={18}
                  color="#000"
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0, fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-coral)', cursor: 'pointer', fontWeight: 800, background: 'none', border: 'none' }}
                >
                  Forgot password?
                </button>
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 44px',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0 #000',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    outline: 'none'
                  }}
                  required
                />
                <Lock
                  size={18}
                  color="#000"
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#000',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-coral)', cursor: 'pointer' }}
              />
              <label htmlFor="remember" style={{ fontSize: '0.84rem', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#222', cursor: 'pointer' }}>
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-brutal"
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                fontSize: '0.92rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                backgroundColor: 'var(--color-coral)',
                color: '#FFFFFF',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                borderRadius: '12px',
                marginBottom: '14px',
                cursor: 'pointer'
              }}
            >
              <span>{loading ? "AUTHENTICATING..." : "SIGN IN TO CAMPUSWAVE"}</span>
              <ArrowRight size={18} />
            </button>

            {/* Guest Login Bypass */}
            <button
              type="button"
              onClick={handleGuestLogin}
              className="btn-brutal"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.88rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                backgroundColor: 'var(--color-acid)',
                color: '#000',
                border: '2px solid #000',
                boxShadow: '3px 3px 0 #000',
                borderRadius: '12px',
                marginBottom: '20px',
                cursor: 'pointer'
              }}
            >
              <span>CONTINUE AS GUEST STUDENT</span>
            </button>
          </form>

          {/* Switch to Register */}
          <div style={{ textAlign: 'center', fontSize: '0.86rem', fontFamily: 'var(--font-mono)', color: '#333' }}>
            New to NMAMIT CampusWave?{' '}
            <Link to="/register" style={{ color: 'var(--color-coral)', fontWeight: 800 }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
