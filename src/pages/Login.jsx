import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
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
        backgroundColor: 'var(--color-soft-grey)'
      }}
      className="split-login-container"
    >
      {/* Left Branding & Visual Showcase Panel */}
      <div
        className="login-visual-panel"
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, var(--color-teal) 0%, var(--color-charcoal) 100%)',
          padding: 'var(--space-3xl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden'
        }}
      >
        {/* Ambient atmospheric glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245, 45, 58, 0.35) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--color-coral)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <Radio size={24} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                CAMPUS<span style={{ color: 'var(--color-coral)' }}>WAVE</span>
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>
                NMAMIT • 90.4 DIGITAL
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '16px' }}>
            Tune into the heartbeat of your campus.
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.05rem', maxWidth: '480px', lineHeight: 1.6 }}>
            Access exclusive hosteller playlists, real-time radio shoutouts, AI episode digests, and community song voting.
          </p>
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
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            padding: '18px 24px',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <p style={{ fontStyle: 'italic', fontSize: '0.92rem', color: '#FFFFFF', marginBottom: '8px' }}>
            “Whether studying in Netravati hostel or commuting on the Karkala bus, CampusWave keeps us connected to every beat.”
          </p>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-amber)', fontWeight: 600 }}>
            — Ananya Hegde (CSE '25, Resident RJ)
          </div>
        </div>
      </div>

      {/* Right Login Form Panel */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-2xl) var(--space-xl)',
          position: 'relative',
          backgroundColor: 'var(--color-white)'
        }}
      >
        <div style={{ maxWidth: '440px', width: '100%' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="editorial-badge" style={{ marginBottom: '10px', backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
              STUDENT AUTHENTICATION
            </span>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: 'var(--color-charcoal)' }}>
              Welcome back
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Sign in with your NMAMIT student credentials or test drive as a guest listener.
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: 'rgba(245, 45, 58, 0.1)',
                border: '1px solid var(--color-coral)',
                color: 'var(--color-coral)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                marginBottom: '20px'
              }}
            >
              {error}
            </div>
          )}

          {toastMsg && (
            <div
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid #16a34a',
                color: '#16a34a',
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                marginBottom: '20px'
              }}
            >
              {toastMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">NMAMIT Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@nitte.edu.in"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                  required
                />
                <Mail
                  size={18}
                  color="var(--text-muted)"
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={{ fontSize: '0.8rem', color: 'var(--color-coral)', cursor: 'pointer', fontWeight: 600 }}
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
                  className="form-input"
                  style={{ paddingLeft: '44px', paddingRight: '44px' }}
                  required
                />
                <Lock
                  size={18}
                  color="var(--text-muted)"
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
                    color: 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: 'var(--color-coral)', cursor: 'pointer' }}
              />
              <label htmlFor="remember" style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginBottom: '16px' }}
            >
              <span>{loading ? "Authenticating..." : "Sign In to CampusWave"}</span>
              <ArrowRight size={18} />
            </button>

            {/* Guest Login Bypass */}
            <button
              type="button"
              onClick={handleGuestLogin}
              className="btn-secondary"
              style={{ width: '100%', padding: '12px', fontSize: '0.92rem', marginBottom: '24px' }}
            >
              <span>Continue as Guest Student</span>
            </button>
          </form>

          {/* Switch to Register */}
          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            New to NMAMIT CampusWave?{' '}
            <Link to="/register" style={{ color: 'var(--color-coral)', fontWeight: 600 }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};