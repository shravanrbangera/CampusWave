import { localImages } from '../assets/Images';

// Community Music Voting and Polls Data
export const mockVotingData = {
  dailySongPoll: {
    question: "Which track should headline tonight's 9:00 PM Hostel Prime Hour?",
    deadline: "Voting closes in 2h 45m",
    totalVotes: 874,
    songs: [
      {
        id: "poll-song-1",
        title: "Karkala Monsoon Breeze",
        artist: "The Nitte Collective",
        genre: "Lo-Fi Indie",
        votes: 382,
        cover: localImages.karkalaBeats
      },
      {
        id: "poll-song-2",
        title: "Midnight at Netravati",
        artist: "Hostel Room 304",
        genre: "Synthwave",
        votes: 298,
        cover: localImages.hostel
      },
      {
        id: "poll-song-3",
        title: "Incridea Anthem (Remix)",
        artist: "DJ Shutter & NMAMIT EDM Club",
        genre: "EDM Fusion",
        votes: 194,
        cover: localImages.incridea
      }
    ]
  },
  campusPoll: {
    question: "Where is the best quiet spot on campus to study for internals?",
    totalVotes: 642,
    options: [
      { id: "opt-1", text: "Central Library 3rd Floor Reference Hall", votes: 310 },
      { id: "opt-2", text: "New Shambhavi Block C Silent Pods", votes: 195 },
      { id: "opt-3", text: "Sambhram Courtyard Benches (Evening)", votes: 92 },
      { id: "opt-4", text: "Mess Dining Hall post 11 PM", votes: 45 }
    ]
  },
  recentSongRequests: [
    {
      id: "req-1",
      songTitle: "Dil Chahta Hai (Acoustic Cover)",
      artist: "Shankar Mahadevan",
      requestedBy: "Rohan D.",
      hostelBlock: "Netravati Block B - Room 214",
      dedication: "To all the final year roommates who survived 4 years together!",
      timeAgo: "12m ago",
      upvotes: 42
    },
    {
      id: "req-2",
      songTitle: "Sunflower",
      artist: "Post Malone & Swae Lee",
      requestedBy: "Tanvi K.",
      hostelBlock: "Shambhavi Block A",
      dedication: "Play this for the coding squad grinding the HackNight project!",
      timeAgo: "28m ago",
      upvotes: 29
    },
    {
      id: "req-3",
      songTitle: "Ilahi",
      artist: "Arijit Singh",
      requestedBy: "Praveen Shenoy",
      hostelBlock: "Day Scholar - Karkala Route",
      dedication: "For everyone taking the campus evening bus home.",
      timeAgo: "45m ago",
      upvotes: 38
    }
  ]
};

