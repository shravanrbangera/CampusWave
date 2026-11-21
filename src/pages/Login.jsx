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
        backgroundColor: 'var(--bg-primary)'
      }}
      className="split-login-container"
    >
      {/* Left Branding & Visual Showcase Panel */}
      <div
        className="login-visual-panel"
        style={{
          position: 'relative',
          backgroundColor: 'var(--color-forest)',
          borderRight: '1px solid var(--border-color)',
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
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: 'var(--color-orange)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 2px 8px var(--color-orange-glow)'
              }}
            >
              <Radio size={22} />
            </div>
            <div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                CAMPUS<span style={{ color: 'var(--color-orange)' }}>WAVE</span>
              </span>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-yellow)' }}>
                NMAMIT • 90.4 DIGITAL FM
              </div>
            </div>
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.8vw, 2.8rem)', color: '#FFFFFF', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}>
            Tune into the <span style={{ color: 'var(--color-yellow)' }}>heartbeat</span> of your campus.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.6 }}>
            Access student playlists, real-time live radio, on-demand podcast episodes, and daily hostel music voting.
          </p>

          {/* Badge */}
          <div style={{ marginTop: '20px' }}>
            <span className="editorial-badge editorial-badge-forest">
              90.4 MHZ • STUDENT ACCESS PORTAL
            </span>
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
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#FFFFFF',
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <p style={{ fontStyle: 'italic', fontSize: '0.88rem', fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '6px' }}>
            “Whether studying in Netravati hostel or commuting on the Karkala bus, CampusWave keeps us connected to every beat.”
          </p>
          <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--color-yellow)', fontWeight: 700 }}>
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
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        <div 
          className="card-modern auth-form-card"
          style={{ 
            maxWidth: '460px', 
            width: '100%',
            padding: '36px',
            borderRadius: 'var(--radius-xl)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <span className="editorial-badge" style={{ marginBottom: '10px' }}>
              STUDENT AUTHENTICATION
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Welcome back
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Sign in with your NMAMIT credentials or test drive as a guest listener.
            </p>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#EF4444',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '18px'
              }}
            >
              {error}
            </div>
          )}

          {toastMsg && (
            <div
              style={{
                backgroundColor: 'var(--color-orange-soft)',
                border: '1px solid var(--color-orange)',
                color: 'var(--color-orange)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: 600,
                marginBottom: '18px'
              }}
            >
              {toastMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                NMAMIT Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. student@nitte.edu.in"
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    outline: 'none'
                  }}
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
            <div className="form-group" style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="form-label" style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={{ fontSize: '0.78rem', color: 'var(--color-orange)', cursor: 'pointer', fontWeight: 600, background: 'none', border: 'none' }}
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
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    outline: 'none'
                  }}
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
                style={{ width: '16px', height: '16px', accentColor: 'var(--color-orange)', cursor: 'pointer' }}
              />
              <label htmlFor="remember" style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '14px',
                fontSize: '0.92rem',
                marginBottom: '12px',
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
              className="btn-secondary"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '0.88rem',
                marginBottom: '20px',
                cursor: 'pointer'
              }}
            >
              <span>CONTINUE AS GUEST STUDENT</span>
            </button>
          </form>

          {/* Switch to Register */}
          <div style={{ textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            New to NMAMIT CampusWave?{' '}
            <Link to="/register" style={{ color: 'var(--color-orange)', fontWeight: 700 }}>
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
