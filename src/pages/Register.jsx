import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Radio, Lock, Mail, User, BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
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
        backgroundColor: 'var(--color-soft-grey)'
      }}
      className="split-login-container"
    >
      {/* Left Branding Panel */}
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
        <div 
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '10%',
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
            Join your student audio community.
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.05rem', maxWidth: '480px', lineHeight: 1.6 }}>
            Set up your listener profile to vote for evening tracks, bookmark AI broadcast summaries, and submit song requests to student RJs.
          </p>
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
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            padding: '18px 24px',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-amber)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>
            <CheckCircle2 size={16} />
            Instant Access
          </div>
          <p style={{ fontSize: '0.85rem', color: '#FFFFFF' }}>
            No complicated forms. Create your demo student credentials in seconds.
          </p>
        </div>
      </div>

      {/* Right Registration Form */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-2xl) var(--space-xl)',
          overflowY: 'auto',
          backgroundColor: 'var(--color-white)'
        }}
      >
        <div style={{ maxWidth: '460px', width: '100%' }}>
          <div style={{ marginBottom: '24px' }}>
            <span className="editorial-badge" style={{ marginBottom: '10px', backgroundColor: 'var(--color-cream)', color: 'var(--color-charcoal)' }}>
              CREATE ACCOUNT
            </span>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: 'var(--color-charcoal)' }}>
              Student Registration
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Join fellow engineers, hostellers, and creators on CampusWave.
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

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aarav Hegde"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
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
            <div className="form-group">
              <label className="form-label">NMAMIT Email Address</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@nitte.edu.in"
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

            {/* Department / Branch */}
            <div className="form-group">
              <label className="form-label">Department / Branch</label>
              <div style={{ position: 'relative' }}>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  className="form-input"
                  style={{ paddingLeft: '44px', cursor: 'pointer', appearance: 'none' }}
                >
                  {branches.map((b, idx) => (
                    <option key={idx} value={b} style={{ background: '#fff', color: '#202020' }}>
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
            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
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
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-type your password"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
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
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '10px', marginBottom: '20px' }}
            >
              <span>{loading ? "Creating Account..." : "Create Account & Enter"}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Switch to Login */}
          <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-coral)', fontWeight: 600 }}>
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};