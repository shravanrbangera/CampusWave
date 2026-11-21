import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const DEFAULT_USER = {
  name: "Aarav Hegde",
  email: "aarav.hegde@nitte.edu.in",
  usn: "4NM22CS042",
  branch: "Computer Science & Engineering",
  semester: "6th Semester",
  hostel: "Netravati Block B - 304",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
  role: "Student RJ & Music Curator",
  preferences: ["Tech & Coding", "Hostel Stories", "Indie Music"],
  stats: {
    hoursListened: 48,
    podcastsCompleted: 14,
    songsRequested: 6,
    liveShoutouts: 9
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('campuswave_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('campuswave_is_auth') !== 'false';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('campuswave_theme') || 'light';
  });

  const [savedPodcasts, setSavedPodcasts] = useState(() => {
    try {
      const saved = localStorage.getItem('campuswave_saved_podcasts');
      return saved ? JSON.parse(saved) : ['pod-1', 'pod-3'];
    } catch {
      return ['pod-1', 'pod-3'];
    }
  });

  const [savedSummaries, setSavedSummaries] = useState(() => {
    try {
      const saved = localStorage.getItem('campuswave_saved_summaries');
      return saved ? JSON.parse(saved) : ['sum-1'];
    } catch {
      return ['sum-1'];
    }
  });

  const [likedTracks, setLikedTracks] = useState(() => {
    try {
      const saved = localStorage.getItem('campuswave_liked_tracks');
      return saved ? JSON.parse(saved) : ['mus-1', 'mus-4'];
    } catch {
      return ['mus-1', 'mus-4'];
    }
  });

  const [votedPolls, setVotedPolls] = useState(() => {
    try {
      const saved = localStorage.getItem('campuswave_voted_polls');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [rsvpEvents, setRsvpEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('campuswave_rsvp_events');
      return saved ? JSON.parse(saved) : ['evt-2'];
    } catch {
      return ['evt-2'];
    }
  });

  const [listeningHistory, setListeningHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('campuswave_history');
      return saved ? JSON.parse(saved) : [
        { id: 'pod-1', title: 'Nitte Tech Chronicles: Inside the Robotics & AI Lab', time: '18 mins ago', type: 'podcast' },
        { id: 'mus-1', title: 'Karkala Monsoon Breeze', time: '1 hour ago', type: 'music' },
        { id: 'live-main', title: 'The Twilight Frequency with RJ Ananya', time: 'Yesterday', type: 'live' }
      ];
    } catch {
      return [];
    }
  });

  // Theme synchronization
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('campuswave_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Login handler
  const login = (email, password, rememberMe = true) => {
    const studentUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) || DEFAULT_USER.name
    };
    setUser(studentUser);
    setIsAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem('campuswave_user', JSON.stringify(studentUser));
      localStorage.setItem('campuswave_is_auth', 'true');
    }
    return { success: true, message: `Welcome back, ${studentUser.name}!` };
  };

  // Register handler
  const register = (userData) => {
    const newUser = {
      ...DEFAULT_USER,
      name: userData.name || "Student Listener",
      email: userData.email,
      branch: userData.branch || "Engineering",
      usn: userData.usn || "4NM23CS" + Math.floor(100 + Math.random() * 900)
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('campuswave_user', JSON.stringify(newUser));
    localStorage.setItem('campuswave_is_auth', 'true');
    return { success: true, message: "Account created successfully! Welcome to CampusWave." };
  };

  // Guest handler
  const loginAsGuest = () => {
    const guestUser = {
      name: "NMAMIT Guest Student",
      email: "guest@nitte.edu.in",
      usn: "GUEST-LISTENER",
      branch: "Campus Visitor",
      semester: "General",
      hostel: "Day Scholar / Visitor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
      role: "Guest Listener",
      preferences: ["Campus News", "Indie Music"],
      stats: {
        hoursListened: 2,
        podcastsCompleted: 1,
        songsRequested: 0,
        liveShoutouts: 1
      }
    };
    setUser(guestUser);
    setIsAuthenticated(true);
    localStorage.setItem('campuswave_user', JSON.stringify(guestUser));
    localStorage.setItem('campuswave_is_auth', 'true');
    return { success: true, message: "Connected as Guest Student" };
  };

  // Logout handler
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('campuswave_is_auth');
  };

  // Bookmark togglers
  const toggleSavePodcast = (id) => {
    setSavedPodcasts(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('campuswave_saved_podcasts', JSON.stringify(updated));
      return updated;
    });
    return !savedPodcasts.includes(id);
  };

  const toggleSaveSummary = (id) => {
    setSavedSummaries(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('campuswave_saved_summaries', JSON.stringify(updated));
      return updated;
    });
    return !savedSummaries.includes(id);
  };

  const toggleLikeTrack = (id) => {
    setLikedTracks(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('campuswave_liked_tracks', JSON.stringify(updated));
      return updated;
    });
    return !likedTracks.includes(id);
  };

  const toggleRSVP = (eventId) => {
    setRsvpEvents(prev => {
      const updated = prev.includes(eventId) ? prev.filter(item => item !== eventId) : [...prev, eventId];
      localStorage.setItem('campuswave_rsvp_events', JSON.stringify(updated));
      return updated;
    });
    return !rsvpEvents.includes(eventId);
  };

  const castVote = (pollKey, songId) => {
    const updated = { ...votedPolls, [pollKey]: songId };
    setVotedPolls(updated);
    localStorage.setItem('campuswave_voted_polls', JSON.stringify(updated));
  };

  const addListeningHistory = (track) => {
    const item = {
      id: track.id,
      title: track.title,
      time: "Just now",
      type: track.type || 'audio'
    };
    setListeningHistory(prev => {
      const filtered = prev.filter(p => p.id !== track.id);
      const updated = [item, ...filtered].slice(0, 20);
      localStorage.setItem('campuswave_history', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUserPreferences = (newPrefs) => {
    const updatedUser = { ...user, preferences: newPrefs };
    setUser(updatedUser);
    localStorage.setItem('campuswave_user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    theme,
    toggleTheme,
    login,
    register,
    loginAsGuest,
    logout,
    savedPodcasts,
    savedSummaries,
    likedTracks,
    votedPolls,
    rsvpEvents,
    listeningHistory,
    toggleSavePodcast,
    toggleSaveSummary,
    toggleLikeTrack,
    toggleRSVP,
    castVote,
    addListeningHistory,
    updateUserPreferences
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

