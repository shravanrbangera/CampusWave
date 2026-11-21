import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  LogOut, 
  Sparkles, 
  Headphones, 
  Radio, 
  Bell, 
  Moon, 
  Sun, 
  Bookmark, 
  ShieldCheck, 
  Heart,
  CheckCircle2,
  Sliders,
  Volume2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { podcastCategories } from '../data/podcasts';

export const Profile = () => {
  const { user, logout, theme, toggleTheme, updateUserPreferences } = useAuth();
  const navigate = useNavigate();

  const [audioQuality, setAudioQuality] = useState('320k');
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [liveAlerts, setLiveAlerts] = useState(true);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  const [selectedInterests, setSelectedInterests] = useState(user?.preferences || ["Tech & Coding", "Hostel Stories", "Indie Music"]);

  const toggleInterest = (category) => {
    let updated;
    if (selectedInterests.includes(category)) {
      updated = selectedInterests.filter(c => c !== category);
    } else {
      updated = [...selectedInterests, category];
    }
    setSelectedInterests(updated);
    updateUserPreferences(updated);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-page page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
      {/* Top Banner / Student ID Card (Editorial Identity) */}
      <section 
        className="card-modern"
        style={{
          padding: 'var(--space-2xl)',
          borderRadius: 'var(--radius-2xl)',
          background: 'linear-gradient(135deg, var(--color-teal) 0%, var(--color-charcoal) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 'var(--space-xl)',
          alignItems: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}
        className="hero-split-grid"
      >
        <div style={{ position: 'relative' }}>
          <img 
            src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"} 
            alt={user?.name || "Student"}
            style={{
              width: '92px',
              height: '92px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--color-coral)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
            }}
          />
          <span 
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: '#16a34a',
              border: '3px solid #123C40'
            }}
            title="Active on Campus Wi-Fi"
          />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span className="editorial-badge" style={{ backgroundColor: 'var(--color-coral)', color: '#FFFFFF', border: 'none' }}>
              VERIFIED STUDENT LISTENER
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)' }}>
              {user?.usn || "4NM22CS042"}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', color: '#FFFFFF', marginBottom: '4px' }}>
            {user?.name || "Aarav Hegde"}
          </h1>

          <div style={{ fontSize: '0.94rem', color: 'rgba(255, 255, 255, 0.82)' }}>
            {user?.branch || "Computer Science & Engineering"} • {user?.semester || "6th Semester"}
          </div>

          <div style={{ fontSize: '0.84rem', color: 'var(--color-amber)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
            {user?.hostel || "Netravati Block B - Room 304"} • {user?.email}
          </div>
        </div>

        <button
          onClick={() => setLogoutConfirm(true)}
          className="btn-secondary"
          style={{
            borderColor: 'rgba(245, 45, 58, 0.4)',
            color: 'var(--color-coral)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </section>

      {/* Confirmation Modal for Logout */}
      {logoutConfirm && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 400,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            className="card-modern"
            style={{
              maxWidth: '420px',
              width: '100%',
              padding: '30px',
              borderRadius: 'var(--radius-2xl)',
              textAlign: 'center',
              backgroundColor: 'var(--color-white)',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <h3 style={{ fontSize: '1.35rem', marginBottom: '10px', color: 'var(--color-charcoal)' }}>Sign out of CampusWave?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '24px' }}>
              You will need your student email to sign back into your bookmarks and hosteller poll state.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => setLogoutConfirm(false)}
                className="btn-secondary"
                style={{ padding: '10px 22px' }}
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="btn-coral"
                style={{ padding: '10px 22px' }}
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Listening Stats Row */}
      <section 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-md)'
        }}
      >
        <div className="card-modern" style={{ padding: '22px', borderRadius: 'var(--radius-xl)', textAlign: 'center', backgroundColor: 'var(--color-white)' }}>
          <Headphones size={24} color="var(--color-coral)" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-charcoal)' }}>
            {user?.stats?.hoursListened || 48} hrs
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Total Streamed</div>
        </div>

        <div className="card-modern" style={{ padding: '22px', borderRadius: 'var(--radius-xl)', textAlign: 'center', backgroundColor: 'var(--color-white)' }}>
          <Sparkles size={24} color="var(--color-amber)" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-charcoal)' }}>
            {user?.stats?.podcastsCompleted || 14}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Podcasts Completed</div>
        </div>

        <div className="card-modern" style={{ padding: '22px', borderRadius: 'var(--radius-xl)', textAlign: 'center', backgroundColor: 'var(--color-white)' }}>
          <Radio size={24} color="var(--color-coral)" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-charcoal)' }}>
            {user?.stats?.songsRequested || 6}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Songs Requested</div>
        </div>

        <div className="card-modern" style={{ padding: '22px', borderRadius: 'var(--radius-xl)', textAlign: 'center', backgroundColor: 'var(--color-white)' }}>
          <Bell size={24} color="var(--color-amber)" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 800, color: 'var(--color-charcoal)' }}>
            {user?.stats?.liveShoutouts || 9}
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Live Shoutouts Sent</div>
        </div>
      </section>

      {/* Two Column Settings Grid */}
      <section 
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-xl)'
        }}
        className="hero-split-grid"
      >
        {/* Left: Preferences & Favorite Categories */}
        <div className="card-modern" style={{ padding: 'var(--space-2xl)', borderRadius: 'var(--radius-2xl)', backgroundColor: 'var(--color-white)' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '8px', color: 'var(--color-charcoal)' }}>
            Favorite Content Categories
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '20px' }}>
            Choose what you enjoy hearing. Your feed and recommendations dynamically adjust.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {podcastCategories.filter(c => c !== 'All').map(cat => {
              const active = selectedInterests.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleInterest(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    backgroundColor: active ? 'var(--color-coral)' : 'var(--color-white)',
                    color: active ? '#FFFFFF' : 'var(--text-secondary)',
                    border: active ? '1px solid var(--color-coral)' : '1px solid var(--border-color)',
                    boxShadow: active ? '0 4px 12px rgba(245, 45, 58, 0.25)' : 'none'
                  }}
                >
                  {active ? `✓ ${cat}` : `+ ${cat}`}
                </button>
              );
            })}
          </div>

          {savedToast && (
            <div style={{ marginTop: '14px', fontSize: '0.82rem', color: '#16a34a', fontWeight: 600 }}>
              ✓ Category preferences saved to your profile!
            </div>
          )}

          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-charcoal)' }}>Library Shortcuts</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link to="/library" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                <Bookmark size={15} />
                <span>Saved Podcasts</span>
              </Link>
              <Link to="/library" className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                <Heart size={15} />
                <span>Liked Tracks</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Audio Playback & Display Settings */}
        <div className="card-modern" style={{ padding: 'var(--space-2xl)', borderRadius: 'var(--radius-2xl)', backgroundColor: 'var(--color-white)' }}>
          <h2 style={{ fontSize: '1.35rem', marginBottom: '20px', color: 'var(--color-charcoal)' }}>
            Playback & Experience Settings
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Theme Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>Visual Environment</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {theme === 'dark' ? 'Night Owl Dark (Teal & Charcoal)' : 'Editorial Light (Cream & Crisp White)'}
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.82rem', gap: '6px' }}
              >
                {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
                <span>{theme === 'dark' ? 'Night Mode' : 'Light Mode'}</span>
              </button>
            </div>

            {/* Audio Quality */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>Audio Streaming Quality</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Lossless 320kbps for campus Wi-Fi, 128kbps for mobile data
                </div>
              </div>
              <select
                value={audioQuality}
                onChange={(e) => setAudioQuality(e.target.value)}
                style={{
                  backgroundColor: 'var(--color-soft-grey)',
                  color: 'var(--color-coral)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '6px 12px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <option value="320k">320kbps HD Studio</option>
                <option value="128k">128kbps Data Saver</option>
              </select>
            </div>

            {/* Autoplay Next */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>Autoplay Next Episode</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Seamlessly proceed to the next student track in queue
                </div>
              </div>
              <input 
                type="checkbox"
                checked={autoplayNext}
                onChange={(e) => setAutoplayNext(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-coral)', cursor: 'pointer' }}
              />
            </div>

            {/* Live Show Reminders */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>Live Radio Push Alerts</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Notify when RJ Ananya or DJ Shutter go on air at 9:00 PM
                </div>
              </div>
              <input 
                type="checkbox"
                checked={liveAlerts}
                onChange={(e) => setLiveAlerts(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-coral)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};