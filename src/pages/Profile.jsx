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
  Volume2,
  Zap,
  QrCode
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
      {/* Top Banner / Student ID Card (Editorial Brutalist Identity) */}
      <section 
        className="hero-split-grid"
        style={{
          padding: 'var(--space-2xl)',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--color-teal) 0%, #000000 100%)',
          border: '3px solid #000',
          boxShadow: '6px 6px 0 #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-xl)',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80"} 
              alt={user?.name || "Student"}
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid var(--color-acid)',
                boxShadow: '4px 4px 0 #000'
              }}
            />
            <span 
              style={{
                position: 'absolute',
                bottom: '4px',
                right: '4px',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-acid)',
                border: '2px solid #000'
              }}
              title="Active on Campus Network"
            />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', flexWrap: 'wrap' }}>
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
                  border: '2px solid #000',
                  borderRadius: '6px',
                  padding: '3px 8px',
                  boxShadow: '2px 2px 0 #000'
                }}
              >
                ⚡ VERIFIED STUDENT LISTENER
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-acid)' }}>
                USN: {user?.usn || "4NM22CS042"}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-black)', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '4px' }}>
              {user?.name || "Aarav Hegde"}
            </h1>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
              {user?.branch || "Computer Science & Engineering"} • {user?.semester || "6th Semester"}
            </div>

            <div style={{ fontSize: '0.84rem', color: 'var(--color-amber)', marginTop: '4px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              📍 {user?.hostel || "Netravati Block B - Room 304"} • {user?.email}
            </div>
          </div>
        </div>

        <button
          onClick={() => setLogoutConfirm(true)}
          className="btn-brutal"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '999px',
            backgroundColor: 'var(--color-coral)',
            color: '#FFFFFF',
            border: '2px solid #000',
            boxShadow: '3px 3px 0 #000',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          <LogOut size={16} />
          <span>SIGN OUT</span>
        </button>
      </section>

      {/* Confirmation Modal for Logout */}
      {logoutConfirm && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 400,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
              borderRadius: '24px',
              textAlign: 'center',
              backgroundColor: '#FFFFFF',
              border: '3px solid #000',
              boxShadow: '6px 6px 0 #000'
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-black)', fontSize: '1.45rem', marginBottom: '10px', color: '#000', textTransform: 'uppercase' }}>
              Sign out of CampusWave?
            </h3>
            <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.88rem', marginBottom: '24px', lineHeight: 1.5 }}>
              You will need your student email to sign back into your bookmarks and hosteller poll state.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => setLogoutConfirm(false)}
                className="btn-brutal"
                style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  backgroundColor: '#FFFFFF',
                  color: '#000',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0 #000',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                CANCEL
              </button>
              <button 
                onClick={handleLogout}
                className="btn-brutal"
                style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  backgroundColor: 'var(--color-coral)',
                  color: '#FFFFFF',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0 #000',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                YES, SIGN OUT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Listening Stats Row */}
      <section 
        className="profile-stats-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-md)'
        }}
      >
        <div className="card-modern" style={{ padding: '24px', borderRadius: '20px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '2.5px solid #000', boxShadow: '4px 4px 0 #000' }}>
          <Headphones size={28} color="var(--color-coral)" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontFamily: 'var(--font-black)', fontSize: '2rem', color: '#000' }}>
            {user?.stats?.hoursListened || 48} HRS
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: '#444' }}>TOTAL STREAMED</div>
        </div>

        <div className="card-modern" style={{ padding: '24px', borderRadius: '20px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '2.5px solid #000', boxShadow: '4px 4px 0 #000' }}>
          <Sparkles size={28} color="#000" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontFamily: 'var(--font-black)', fontSize: '2rem', color: '#000' }}>
            {user?.stats?.podcastsCompleted || 14}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: '#444' }}>PODCASTS COMPLETED</div>
        </div>

        <div className="card-modern" style={{ padding: '24px', borderRadius: '20px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '2.5px solid #000', boxShadow: '4px 4px 0 #000' }}>
          <Radio size={28} color="var(--color-coral)" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontFamily: 'var(--font-black)', fontSize: '2rem', color: '#000' }}>
            {user?.stats?.songsRequested || 6}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: '#444' }}>SONGS REQUESTED</div>
        </div>

        <div className="card-modern" style={{ padding: '24px', borderRadius: '20px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '2.5px solid #000', boxShadow: '4px 4px 0 #000' }}>
          <Bell size={28} color="#000" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontFamily: 'var(--font-black)', fontSize: '2rem', color: '#000' }}>
            {user?.stats?.liveShoutouts || 9}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: '#444' }}>LIVE SHOUTOUTS</div>
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
        <div className="card-modern" style={{ padding: 'var(--space-2xl)', borderRadius: '24px', backgroundColor: '#FFFFFF', border: '2.5px solid #000', boxShadow: '5px 5px 0 #000' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '8px', color: '#000', textTransform: 'uppercase' }}>
            Favorite Content Categories
          </h2>
          <p style={{ fontFamily: 'var(--font-mono)', color: '#333', fontSize: '0.88rem', fontWeight: 600, marginBottom: '20px' }}>
            Choose what you enjoy hearing. Your feed and recommendations dynamically adjust.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {podcastCategories.filter(c => c !== 'All').map(cat => {
              const active = selectedInterests.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleInterest(cat)}
                  className="btn-brutal"
                  style={{
                    padding: '8px 18px',
                    borderRadius: '999px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 800,
                    cursor: 'pointer',
                    backgroundColor: active ? 'var(--color-acid)' : '#FFFFFF',
                    color: '#000',
                    border: '2px solid #000',
                    boxShadow: active ? '3px 3px 0 #000' : '2px 2px 0 #000',
                    transform: active ? 'translateY(-2px)' : 'none'
                  }}
                >
                  {active ? `✓ ${cat}` : `+ ${cat}`}
                </button>
              );
            })}
          </div>

          {savedToast && (
            <div style={{ marginTop: '14px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#16a34a', fontWeight: 800 }}>
              ✓ Category preferences saved to your profile!
            </div>
          )}

          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '2px dashed #000' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '12px', color: '#000', textTransform: 'uppercase' }}>
              Library Shortcuts
            </h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/library" className="btn-brutal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 800, backgroundColor: '#FFFFFF', color: '#000', border: '2px solid #000', boxShadow: '2px 2px 0 #000', borderRadius: '999px', textDecoration: 'none' }}>
                <Bookmark size={15} />
                <span>SAVED PODCASTS</span>
              </Link>
              <Link to="/library" className="btn-brutal" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 800, backgroundColor: '#FFFFFF', color: '#000', border: '2px solid #000', boxShadow: '2px 2px 0 #000', borderRadius: '999px', textDecoration: 'none' }}>
                <Heart size={15} />
                <span>LIKED TRACKS</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Audio Playback & Display Settings */}
        <div className="card-modern" style={{ padding: 'var(--space-2xl)', borderRadius: '24px', backgroundColor: '#FFFFFF', border: '2.5px solid #000', boxShadow: '5px 5px 0 #000' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px', color: '#000', textTransform: 'uppercase' }}>
            Playback & Experience Settings
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Theme Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.92rem', color: '#000' }}>VISUAL ENVIRONMENT</div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)', color: '#444' }}>
                  {theme === 'dark' ? 'Night Owl Dark (Teal & Ink)' : 'Editorial Brutalist (Cream & Acid Yellow)'}
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className="btn-brutal"
                style={{ padding: '8px 16px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 800, backgroundColor: 'var(--color-acid)', color: '#000', border: '2px solid #000', boxShadow: '2px 2px 0 #000', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
              >
                {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
                <span>{theme === 'dark' ? 'NIGHT' : 'LIGHT'}</span>
              </button>
            </div>

            {/* Audio Quality */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '2px dashed #000' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.92rem', color: '#000' }}>AUDIO STREAM QUALITY</div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)', color: '#444' }}>
                  Lossless 320kbps for campus Wi-Fi, 128kbps for mobile data
                </div>
              </div>
              <select
                value={audioQuality}
                onChange={(e) => setAudioQuality(e.target.value)}
                style={{
                  backgroundColor: 'var(--color-acid)',
                  color: '#000',
                  border: '2px solid #000',
                  boxShadow: '2px 2px 0 #000',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                <option value="320k">320kbps HD Studio</option>
                <option value="128k">128kbps Data Saver</option>
              </select>
            </div>

            {/* Autoplay Next */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '2px dashed #000' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.92rem', color: '#000' }}>AUTOPLAY NEXT EPISODE</div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)', color: '#444' }}>
                  Seamlessly proceed to the next student track in queue
                </div>
              </div>
              <input 
                type="checkbox"
                checked={autoplayNext}
                onChange={(e) => setAutoplayNext(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--color-coral)', cursor: 'pointer' }}
              />
            </div>

            {/* Live Show Reminders */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '2px dashed #000' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '0.92rem', color: '#000' }}>LIVE RADIO PUSH ALERTS</div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)', color: '#444' }}>
                  Notify when RJ Ananya or DJ Shutter go on air at 9:00 PM
                </div>
              </div>
              <input 
                type="checkbox"
                checked={liveAlerts}
                onChange={(e) => setLiveAlerts(e.target.checked)}
                style={{ width: '20px', height: '20px', accentColor: 'var(--color-coral)', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
