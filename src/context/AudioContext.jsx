import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { mockPodcasts } from '../data/podcasts';
import { mockMusic, mockLiveShow } from '../data/music';

const AudioContext = createContext(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

// Initial default track
const defaultTrack = {
  id: mockLiveShow.id,
  title: mockLiveShow.title,
  artist: mockLiveShow.rj,
  host: mockLiveShow.rj,
  showName: mockLiveShow.showName,
  cover: mockLiveShow.cover,
  duration: "LIVE",
  durationSeconds: 1800,
  type: "live",
  badge: "Studio 1 • Live",
  category: "Campus Radio",
  description: mockLiveShow.description
};

export const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(defaultTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1800);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullPlayerOpen, setIsFullPlayerOpen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [audioData, setAudioData] = useState(new Array(24).fill(15));
  
  // Track Queue
  const [queue, setQueue] = useState([
    defaultTrack,
    ...mockMusic.map(m => ({
      id: m.id,
      title: m.title,
      artist: m.artist,
      showName: m.album,
      cover: m.cover,
      duration: m.duration,
      durationSeconds: m.durationSeconds,
      type: "music",
      badge: m.badge,
      category: m.genre
    })),
    ...mockPodcasts.map(p => ({
      id: p.id,
      title: p.title,
      artist: p.host,
      showName: p.showName,
      cover: p.cover,
      duration: p.duration,
      durationSeconds: p.durationSeconds,
      type: "podcast",
      badge: p.badge,
      category: p.category
    }))
  ]);

  // Audio nodes refs for Web Audio API synthesis
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const analyserRef = useRef(null);
  const synthNodesRef = useRef([]);
  const animFrameRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize Web Audio API for lo-fi synthesis
  const initWebAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const masterGain = ctx.createGain();
          const analyser = ctx.createAnalyser();
          analyser.fftSize = 64;
          
          masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.15, ctx.currentTime);
          masterGain.connect(analyser);
          analyser.connect(ctx.destination);
          
          audioCtxRef.current = ctx;
          masterGainRef.current = masterGain;
          analyserRef.current = analyser;
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    } catch (e) {
      console.warn('Web Audio API not supported or restricted:', e);
    }
  };

  // Start sound synthesis chord progression (warm campus lo-fi vibes)
  const startSynthSound = () => {
    initWebAudio();
    stopSynthSound();

    if (!audioCtxRef.current || !masterGainRef.current) return;
    const ctx = audioCtxRef.current;

    // Pleasant pentatonic chord notes (C, E, G, A, B)
    const baseFreqs = [130.81, 164.81, 196.00, 220.00, 246.94];
    const nodes = [];

    baseFreqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq * (1 + (idx * 0.005)), ctx.currentTime);

      // Low pass filter for warm analog feel
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450 + (idx * 80), ctx.currentTime);

      // Soft envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06 / (idx + 1), ctx.currentTime + 1.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGainRef.current);
      osc.start();

      nodes.push({ osc, gain });
    });

    synthNodesRef.current = nodes;
  };

  // Stop sound synthesis
  const stopSynthSound = () => {
    if (synthNodesRef.current && synthNodesRef.current.length > 0) {
      synthNodesRef.current.forEach(({ osc, gain }) => {
        try {
          if (audioCtxRef.current) {
            gain.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.3);
            setTimeout(() => {
              try { osc.stop(); osc.disconnect(); } catch (err) {}
            }, 350);
          } else {
            osc.stop();
          }
        } catch (e) {}
      });
      synthNodesRef.current = [];
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSynthSound();
    } else {
      setIsPlaying(true);
      startSynthSound();
    }
  };

  const play = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      startSynthSound();
    }
  };

  const pause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSynthSound();
    }
  };

  // Play a specific track
  const playTrack = (track) => {
    setCurrentTrack({
      id: track.id,
      title: track.title,
      artist: track.artist || track.host || "Campus Creator",
      host: track.host || track.artist || "Campus Creator",
      showName: track.showName || track.album || "CampusWave Audio",
      cover: track.cover,
      duration: track.duration || "03:45",
      durationSeconds: track.durationSeconds || 225,
      type: track.type || (track.id.startsWith("pod") ? "podcast" : track.id.startsWith("live") ? "live" : "music"),
      badge: track.badge || "Now Playing",
      category: track.category || track.genre || "Campus Audio",
      description: track.description || ""
    });
    setDuration(track.durationSeconds || 225);
    setCurrentTime(0);
    setIsPlaying(true);
    startSynthSound();
  };

  // Handle Seek
  const seekTo = (seconds) => {
    const clamped = Math.max(0, Math.min(seconds, duration));
    setCurrentTime(clamped);
  };

  // Next Track
  const nextTrack = () => {
    const currentIndex = queue.findIndex(item => item.id === currentTrack.id);
    let nextIndex = 0;
    if (isShuffling) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (currentIndex !== -1 && currentIndex < queue.length - 1) {
      nextIndex = currentIndex + 1;
    }
    playTrack(queue[nextIndex]);
  };

  // Prev Track
  const prevTrack = () => {
    const currentIndex = queue.findIndex(item => item.id === currentTrack.id);
    let prevIndex = queue.length - 1;
    if (currentIndex > 0) {
      prevIndex = currentIndex - 1;
    }
    playTrack(queue[prevIndex]);
  };

  // Add to Queue
  const addToQueue = (track) => {
    setQueue(prev => {
      if (prev.some(t => t.id === track.id)) return prev;
      return [...prev, track];
    });
  };

  // Volume Changes
  const handleVolumeChange = (newVol) => {
    const v = Math.max(0, Math.min(1, newVol));
    setVolume(v);
    if (v === 0) setIsMuted(true);
    else setIsMuted(false);

    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setValueAtTime(v * 0.15, audioCtxRef.current.currentTime);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime);
      }
    } else {
      setIsMuted(true);
      if (masterGainRef.current && audioCtxRef.current) {
        masterGainRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      }
    }
  };

  // Playback timer & frequency data loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            if (isLooping) return 0;
            nextTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);

      // Frequency data animation loop
      const updateFrequencyData = () => {
        if (analyserRef.current) {
          const freqArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(freqArray);
          const sampled = [];
          const step = Math.floor(freqArray.length / 24) || 1;
          for (let i = 0; i < 24; i++) {
            const val = freqArray[i * step] || 0;
            sampled.push(Math.max(12, Math.min(95, Math.floor(val * 0.7))));
          }
          setAudioData(sampled);
        } else {
          // Synthetic procedural bouncing wave if Web Audio is muted
          const mockData = Array.from({ length: 24 }, (_, i) => {
            const time = Date.now() / 300;
            const wave = Math.sin(time + i * 0.4) * 35 + 45;
            const variance = Math.cos(time * 0.7 + i) * 15;
            return Math.max(15, Math.min(90, Math.floor(wave + variance)));
          });
          setAudioData(mockData);
        }
        animFrameRef.current = requestAnimationFrame(updateFrequencyData);
      };

      animFrameRef.current = requestAnimationFrame(updateFrequencyData);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      // Flat resting waveform
      setAudioData(new Array(24).fill(12));
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, duration, playbackSpeed, isLooping]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSynthSound();
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch (e) {}
      }
    };
  }, []);

  // Format MM:SS helper
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const value = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isFullPlayerOpen,
    playbackSpeed,
    isLooping,
    isShuffling,
    queue,
    audioData,
    formatTime,
    togglePlay,
    play,
    pause,
    playTrack,
    seekTo,
    nextTrack,
    prevTrack,
    addToQueue,
    setVolume: handleVolumeChange,
    toggleMute,
    setIsFullPlayerOpen,
    setPlaybackSpeed,
    setIsLooping: () => setIsLooping(p => !p),
    setIsShuffling: () => setIsShuffling(p => !p)
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

