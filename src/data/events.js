import { localImages } from '../assets/Images';

// NMAMIT Campus Events Data
export const mockEvents = [
  {
    id: "evt-1",
    title: "Incridea 2026: Grand Cultural Inauguration",
    category: "Cultural & Fest",
    date: { day: "24", month: "MAY", year: "2026" },
    time: "05:30 PM - 10:00 PM",
    venue: "Sambhram Open Air Theatre (OAT)",
    organizer: "NMAMIT Cultural Coordination Team",
    image: localImages.incridea,
    attendees: 1850,
    isRSVPed: false,
    description: "The biggest national techno-cultural fest kicks off with traditional coastal folk fusion, laser synchronization shows, and the announcement of pro-night headliners."
  },
  {
    id: "evt-2",
    title: "Nitte HackNight: 24-Hour AI & Web3 Sprint",
    category: "Hackathons",
    date: { day: "28", month: "MAY", year: "2026" },
    time: "09:00 AM Onwards",
    venue: "New Computer Science & IT Block Labs",
    organizer: "Finite Loop Club & IEEE Student Branch",
    image: localImages.nitteTech,
    attendees: 320,
    isRSVPed: true,
    description: "Over ₹1,00,000 in cash prizes, industry mentors from Bengaluru, unlimited energy drinks, and midnight pizza for student developer teams."
  },
  {
    id: "evt-3",
    title: "Battle of the Bands: CampusWave Live Stage",
    category: "Music & Live",
    date: { day: "30", month: "MAY", year: "2026" },
    time: "06:30 PM - 09:30 PM",
    venue: "Student Activity Center (SAC) Quadrangle",
    organizer: "CampusWave Radio & Music Society",
    image: localImages.karkalaBeats,
    attendees: 640,
    isRSVPed: false,
    description: "12 college bands compete for the title of NMAMIT Best Campus Rock Group. Live broadcasted on CampusWave with audience live voting."
  },
  {
    id: "evt-4",
    title: "Alumni In Tech: Careers in Generative Systems",
    category: "Career & Talks",
    date: { day: "03", month: "JUN", year: "2026" },
    time: "03:00 PM - 05:00 PM",
    venue: "B.C. Alva Memorial Auditorium",
    organizer: "Training & Placement Cell NMAMIT",
    image: localImages.alumniRadar,
    attendees: 410,
    isRSVPed: false,
    description: "A masterclass with 5 senior NMAMIT alumni working at Google, Microsoft, and tech startups on mastering software craftsmanship."
  }
];

