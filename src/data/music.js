import { localImages } from '../assets/Images';

// NMAMIT Campus Student Music & Indie Bands
export const mockMusic = [
  {
    id: "mus-1",
    title: "Karkala Monsoon Breeze",
    artist: "The Nitte Collective",
    album: "Western Ghats EP",
    cover: localImages.karkalaBeats,
    duration: "03:42",
    durationSeconds: 222,
    genre: "Lo-Fi Indie",
    votes: 412,
    badge: "Trending Campus Track",
    releaseYear: "2026",
    composer: "Varun Shenoy (ECE '26)",
    description: "Recorded in Kaveri Hostel during a heavy monsoon downpour, blending rain sounds with warm acoustic guitar chords and synth pads."
  },
  {
    id: "mus-2",
    title: "Midnight at Netravati",
    artist: "Hostel Room 304",
    album: "All-Nighter Sessions",
    cover: localImages.hostel,
    duration: "04:15",
    durationSeconds: 255,
    genre: "Synthwave / Chillhop",
    votes: 388,
    badge: "Hostel Hit",
    releaseYear: "2026",
    composer: "Aditya & Samarth (ISE '25)",
    description: "Catchy synthwave baseline created using an old MIDI keyboard, capturing the vibe of late-night coding and assignment deadlines."
  },
  {
    id: "mus-3",
    title: "Chai Kadai Melodies",
    artist: "Coastal Acoustics",
    album: "Highway 169",
    cover: localImages.sports,
    duration: "03:20",
    durationSeconds: 200,
    genre: "Acoustic Pop",
    votes: 295,
    badge: "Student Favorite",
    releaseYear: "2026",
    composer: "Rhea Fernandes (BT '25)",
    description: "An ode to the famous tea stalls right outside the NMAMIT campus gate where ideas and friendships brew."
  },
  {
    id: "mus-4",
    title: "Incridea Anthem (Remix)",
    artist: "DJ Shutter & NMAMIT EDM Club",
    album: "Fest Ignition",
    cover: localImages.incridea,
    duration: "03:55",
    durationSeconds: 235,
    genre: "Campus EDM",
    votes: 520,
    badge: "Festival Anthem",
    releaseYear: "2026",
    composer: "DJ Shutter (Mech '25)",
    description: "High-octane festival anthem with booming bass drops and traditional coastal drums (Chande) fusion."
  },
  {
    id: "mus-5",
    title: "Ghats in the Rearview",
    artist: "Pranitha Rao",
    album: "Single",
    cover: localImages.alumniRadar,
    duration: "04:30",
    durationSeconds: 270,
    genre: "Dream Pop",
    votes: 240,
    badge: "Fresh Release",
    releaseYear: "2026",
    composer: "Pranitha Rao (AIDS '27)",
    description: "Dreamy vocals echoing the scenic bus ride across the Agumbe and Karkala Western Ghat roads."
  },
  {
    id: "mus-6",
    title: "Final Year Goodbye",
    artist: "The Backbenchers",
    album: "Convocation 2026",
    cover: localImages.examStress,
    duration: "04:02",
    durationSeconds: 242,
    genre: "Indie Rock",
    votes: 310,
    badge: "Nostalgic",
    releaseYear: "2026",
    composer: "Siddharth Kamath & Crew (Civil '26)",
    description: "A nostalgic college farewell ballad recorded live in the NMAMIT student activity hall."
  }
];

export const mockLiveShow = {
  id: "live-main",
  title: "The Twilight Frequency with RJ Ananya",
  showName: "Campus Sunset Jam",
  rj: "RJ Ananya Hegde",
  rjLabel: "Resident RJ • 4th Year CSE",
  rjAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
  status: "LIVE ON AIR",
  listenersCount: 342,
  badge: "Studio 1 • Sambhram Center",
  frequency: "90.4 MHz Digital",
  cover: localImages.liveStudio,
  description: "Spinning student music submissions, taking live shoutouts from Netravati and Shambhavi hostels, and discussing the upcoming cultural week.",
  schedule: [
    { time: "07:30 PM", title: "Sunset Chill & Indie Submissions", rj: "RJ Ananya", active: true },
    { time: "08:30 PM", title: "Hostel Acoustic Jam Sessions", rj: "RJ Vicky & Band", active: false },
    { time: "10:00 PM", title: "Late Night Study Lo-Fi & Ambient", rj: "DJ Shutter", active: false },
    { time: "11:30 PM", title: "Midnight Ghost Stories & Campus Legends", rj: "RJ Nikhil", active: false }
  ]
};

