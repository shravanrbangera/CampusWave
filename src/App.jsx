import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';

// Navigation & Global Components
import { Navbar } from './components/Navbar';
import { BottomNavigation } from './components/BottomNavigation';
import { MiniPlayer } from './components/MiniPlayer';
import { FullAudioPlayer } from './components/FullAudioPlayer';
import { Footer } from './components/Footer';

// Pages
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { LiveRadio } from './pages/LiveRadio';
import { Podcasts } from './pages/Podcasts';
import { PodcastDetails } from './pages/PodcastDetails';
import { Summaries } from './pages/Summaries';
import { Campus } from './pages/Campus';
import { Community } from './pages/Community';
import { Library } from './pages/Library';
import { Profile } from './pages/Profile';

// Styles
import './styles/variables.css';
import './styles/animations.css';
import './styles/global.css';
import './styles/responsive.css';

// Auto scroll to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main App Router Layout
function AppContent() {
  const location = useLocation();
  const hideFooter = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="app-container">
      <ScrollToTop />
      
      {/* Global Desktop Navigation */}
      <Navbar />

      {/* Main Page Routes */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/live" element={<LiveRadio />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcast/:id" element={<PodcastDetails />} />
          <Route path="/summaries" element={<Summaries />} />
          <Route path="/campus" element={<Campus />} />
          <Route path="/community" element={<Community />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          {/* Catch-all redirect to Home/Landing */}
          <Route path="*" element={<Landing />} />
        </Routes>
      </main>

      {/* Persistent Global Mini Player */}
      <MiniPlayer />

      {/* Expanded Fullscreen/Modal Audio Player */}
      <FullAudioPlayer />

      {/* Mobile Bottom Navigation */}
      <BottomNavigation />

      {/* Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <Router>
          <AppContent />
        </Router>
      </AudioProvider>
    </AuthProvider>
  );
}
