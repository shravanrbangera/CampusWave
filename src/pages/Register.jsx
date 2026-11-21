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
        backgroundColor: '#F4F1EA'
      }}
      className="split-login-container"
    >
      {/* Left Branding Panel */}
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
            Join your student audio <span style={{ color: 'var(--color-acid)' }}>community</span>.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: 'rgba(255, 255, 255, 0.9)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.6 }}>
            Set up your listener profile to vote for evening tracks, bookmark AI broadcast summaries, and submit song requests to student RJs.
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
            <span>⚡ NMAMIT AUDIO COMMUNITY // PASS ID</span>
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
            backgroundColor: '#FFFFFF',
            color: '#000',
            padding: '16px 22px',
            borderRadius: '16px',
            border: '2px solid #000',
            boxShadow: '4px 4px 0 #000'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#000', fontWeight: 800, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '4px' }}>
            <CheckCircle2 size={16} color="var(--color-coral)" />
            INSTANT PASS ACTIVATION
          </div>
          <p style={{ fontSize: '0.85rem', fontFamily: 'var(--font-body)', color: '#222', lineHeight: 1.5 }}>
            No complicated paperwork. Create your verified student credentials in seconds.
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
          backgroundColor: '#F4F1EA'
        }}
      >
        <div 
          className="card-modern"
          style={{ 
            maxWidth: '480px', 
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
              ⚡ NEW STUDENT ENROLLMENT
            </span>
            <h1 style={{ fontFamily: 'var(--font-black)', fontSize: '2.2rem', marginBottom: '8px', color: '#000', textTransform: 'uppercase' }}>
              Student Registration
            </h1>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#444', fontSize: '0.88rem', fontWeight: 600 }}>
              Join fellow engineers, hostellers, and creators on CampusWave.
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
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>Full Student Name</label>
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
                <User 
                  size={18} 
                  color="#000" 
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>NMAMIT Institutional Email</label>
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

            {/* Department / Branch */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>Department / Branch</label>
              <div style={{ position: 'relative' }}>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    borderRadius: '12px',
                    border: '2px solid #000',
                    boxShadow: '2px 2px 0 #000',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                    backgroundColor: '#fff'
                  }}
                >
                  {branches.map((b, idx) => (
                    <option key={idx} value={b} style={{ background: '#fff', color: '#000' }}>
                      {b}
                    </option>
                  ))}
                </select>
                <BookOpen 
                  size={18} 
                  color="#000" 
                  style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>Password</label>
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
              </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label className="form-label" style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.78rem', textTransform: 'uppercase' }}>Confirm Password</label>
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
              </div>
            </div>

            {/* Submit */}
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
                marginBottom: '16px',
                cursor: 'pointer'
              }}
            >
              <span>{loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT & ENTER"}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Switch to Login */}
          <div style={{ textAlign: 'center', fontSize: '0.86rem', fontFamily: 'var(--font-mono)', color: '#333' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--color-coral)', fontWeight: 800 }}>
              Sign in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
