import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, Lock, Mail, User, BookOpen, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { VinylRecord } from '../components/VinylRecord';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: 'Computer Science & Engineering',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const branches = [
    "Computer Science & Engineering",
    "Information Science & Engineering",
    "Electronics & Communication Engineering",
    "Artificial Intelligence & Data Science",
    "Mechanical Engineering",
    "Civil Engineering",
    "Biotechnology Engineering",
    "Robotics & Automation"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please provide your full student name.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid NMAMIT institutional email.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      register(formData);
      setLoading(false);
      navigate('/home');
    }, 600);
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
      {/* Left Branding Panel */}
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
            Join your student audio <span style={{ color: 'var(--color-yellow)' }}>community</span>.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.85)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.6 }}>
            Set up your listener profile to vote for evening tracks, bookmark broadcast episodes, and submit shoutouts to student RJs.
          </p>

          {/* Badge */}
          <div style={{ marginTop: '20px' }}>
            <span className="editorial-badge editorial-badge-forest">
              NMAMIT AUDIO COMMUNITY • LISTENER PASS
            </span>
          </div>
        </div>

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
            albumTitle="NMAMIT Student Hub"
          />
        </div>

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-yellow)', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: '4px' }}>
            <CheckCircle2 size={16} color="var(--color-orange)" />
            INSTANT PASS ACTIVATION
          </div>
          <p style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.5 }}>
            No complicated paperwork. Create your student credentials in seconds.
          </p>
        </div>
      </div>

      {/* Right Registration Form */}
      <div 
        className="login-form-wrapper"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-2xl) var(--space-xl)',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-primary)'
        }}
      >
        <div 
          className="card-modern auth-form-card"
          style={{ 
            maxWidth: '480px', 
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
              NEW STUDENT ENROLLMENT
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, marginBottom: '8px', color: 'var(--text-primary)' }}>
              Student Registration
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Join fellow engineers, hostellers, and creators on CampusWave.
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

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Full Student Name
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Hegde"
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
                <User 
                  size={18} 
                  color="var(--text-muted)" 
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                NMAMIT Institutional Email
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@nitte.edu.in"
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

            {/* Department / Branch */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Department / Branch
              </label>
              <div style={{ position: 'relative' }}>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card-subtle)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '15px',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {branches.map((b, idx) => (
                    <option key={idx} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <BookOpen 
                  size={18} 
                  color="var(--text-muted)" 
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
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
                <Lock 
                  size={18} 
                  color="var(--text-muted)" 
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.8rem', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-type your password"
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
                <Lock 
                  size={18} 
                  color="var(--text-muted)" 
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
                />
              </div>
            </div>

            {/* Submit */}
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
                marginBottom: '16px',
                cursor: 'pointer'
              }}
            >
              <span>{loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT & ENTER"}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Switch to Login */}
          <div style={{ textAlign: 'center', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-orange)', fontWeight: 700 }}>
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
