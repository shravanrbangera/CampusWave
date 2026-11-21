import { localImages } from '../assets/Images';

// NMAMIT Campus Podcasts Data
export const mockPodcasts = [
  {
    id: "pod-1",
    title: "Nitte Tech Chronicles: Inside the Robotics & AI Lab",
    showName: "Nitte Tech Chronicles",
    host: "Prateek Shenoy & Divya Rao",
    hostRole: "Robotics Club Leads, 4th Year CSE",
    cover: localImages.nitteTech,
    duration: "24:18",
    durationSeconds: 1458,
    category: "Tech & Coding",
    badge: "Popular",
    publishedAt: "Yesterday",
    plays: "1.4k",
    description: "A deep dive into NMAMIT's student-built autonomous rover, preparing for the national university robotics challenge, and tips on cracking summer tech internships.",
    aiSummary: {
      overview: "Episode 14 highlights the latest achievements of NMAMIT's Autonomous Systems Lab. The hosts dissect how they built a vision-based obstacle avoidance system on a student budget and share actionable advice for 2nd and 3rd year engineering students looking for hardware & software internships.",
      highlights: [
        "How NMAMIT's team engineered custom LiDAR mounting brackets in the MakerSpace",
        "Overcoming real-time latency issues with ROS2 on embedded Jetson Orin Nano",
        "Internship interview prep: why lab project repos matter more than generic resumes"
      ],
      keyTakeaways: [
        "Start open-source contributions before your 5th semester",
        "MakerSpace facilities are open till 9 PM with prior faculty advisor sign-off",
        "Next lab open house will take place in the New Mech Block on Wednesday"
      ],
      timestamps: [
        { time: "01:15", label: "Introduction to Rover v3.2 specs" },
        { time: "07:40", label: "Debugging ROS2 nodes under outdoor sun" },
        { time: "14:20", label: "Student Q&A: Cracking embedded roles" },
        { time: "21:05", label: "Upcoming club hackathon announcement" }
      ]
    }
  },
  {
    id: "pod-2",
    title: "Hostel Night Owl: Netravati vs Shambhavi Mess Chronicles",
    showName: "Hostel Night Owl",
    host: "Kavya Bhat & Nihal Shetty",
    hostRole: "Student Council & Hostel Reps",
    cover: localImages.hostel,
    duration: "18:45",
    durationSeconds: 1125,
    category: "Hostel Stories",
    badge: "Trending",
    publishedAt: "2 days ago",
    plays: "2.8k",
    description: "Late night Maggi recipes, surviving 8:30 AM lectures after an all-nighter, and the eternal debate over Wednesday night hostel chicken curry.",
    aiSummary: {
      overview: "A lighthearted, culturally resonant episode tackling everyday life in NMAMIT's Netravati, Shambhavi, and Kaveri hostels. Featuring anonymous voice notes from hostel wardens and student tips for surviving exam weeks.",
      highlights: [
        "Rankings of the best tea stalls outside NMAMIT gate at midnight",
        "How students manage laundry queues during monsoon laundry chaos",
        "Hostel Wi-Fi peak-hour hacks and study room etiquette"
      ],
      keyTakeaways: [
        "Hostel committee elections open this Friday",
        "New silent study lounge in Shambhavi Block C is now open 24/7",
        "Keep your room keys registered with the digital portal to avoid lockouts"
      ],
      timestamps: [
        { time: "00:45", label: "The 8:30 AM sprint from Kaveri Block" },
        { time: "06:10", label: "Hostel mess menu review: The Wednesday curry" },
        { time: "12:30", label: "Monsoon survival kit: Umbrellas and shoe hacks" },
        { time: "16:15", label: "Late night study groups & canteen secrets" }
      ]
    }
  },
  {
    id: "pod-3",
    title: "Karkala Beats: Exploring Coastal Karnataka's Indie Wave",
    showName: "Karkala Beats",
    host: "RJ Shreya",
    hostRole: "Resident Campus DJ & 3rd Year ECE",
    cover: localImages.karkalaBeats,
    duration: "29:10",
    durationSeconds: 1750,
    category: "Indie Music",
    badge: "Staff Pick",
    publishedAt: "3 days ago",
    plays: "950",
    description: "Spotlighting student singer-songwriters from Nitte, Udupi and Mangalore. Acoustic sessions, bedroom producers, and upcoming campus band battle preparations.",
    aiSummary: {
      overview: "RJ Shreya interviews three student musicians who recorded original tracks in their hostel rooms. They discuss creating bilingual Kannada-English indie tracks and preview the lineup for the Incridea Battle of the Bands.",
      highlights: [
        "Exclusive acoustic snippet of 'Karkala Rain' by final-year band The Monsoon Shift",
        "How to set up a bedroom vocal booth using hostel mattresses",
        "Registration deadlines for Incridea Band Wars"
      ],
      keyTakeaways: [
        "Campus audio recording booth is accessible to all students via Student Affairs",
        "Next open mic night will be held at Sambhram Courtyard this Saturday at 6:30 PM",
        "Submit your original tracks to CampusWave for on-air rotation"
      ],
      timestamps: [
        { time: "02:00", label: "Acoustic live set: 'Karkala Rain'" },
        { time: "09:15", label: "Producing beats with free DAWs on student laptops" },
        { time: "18:40", label: "Interview with The Monsoon Shift frontman" },
        { time: "25:30", label: "How to register for Incridea Battle of the Bands" }
      ]
    }
  },
  {
    id: "pod-4",
    title: "Alumni Radar: From Nitte to Silicon Valley & Bangalore Startups",
    showName: "Alumni Radar",
    host: "Prof. Arvind Kamath & Ananya M.",
    hostRole: "Industry Relations Coordinator & CSE Senior",
    cover: localImages.alumniRadar,
    duration: "32:05",
    durationSeconds: 1925,
    category: "Career & Alumni",
    badge: "Editor's Choice",
    publishedAt: "May 14",
    plays: "3.2k",
    description: "NMAMIT alumni 2018 batch Rohit K. shares his journey from building campus hackathon projects to founding an AI logistics platform in Bengaluru.",
    aiSummary: {
      overview: "An inspiring career narrative featuring 2018 NMAMIT alumnus Rohit K. The discussion breaks down the transition from engineering campus fundamentals to early startup employee, seed funding, and hiring junior NMAMIT engineers.",
      highlights: [
        "Why strong fundamental data structures matter even in the age of generative AI",
        "How winning the NMAMIT HackNight opened doors to early investor meetings",
        "Crucial tips for non-metro college students to stand out on GitHub and LinkedIn"
      ],
      keyTakeaways: [
        "Build 1 polished, production-deployed project instead of 10 half-baked tutorials",
        "Network proactively with NMAMIT alumni base through the Nitte Alumni Portal",
        "Rohit's firm is offering 4 paid summer internships exclusively for NMAMIT students"
      ],
      timestamps: [
        { time: "01:30", label: "Hostel life to startup ideation in 2017" },
        { time: "11:00", label: "The pivotal HackNight project pitch" },
        { time: "20:15", label: "Navigating tech hiring downturns as a fresher" },
        { time: "28:50", label: "Exclusive internship announcement for NMAMITians" }
      ]
    }
  },
  {
    id: "pod-5",
    title: "Campus Pulse: Unpacking the Incridea 2026 Theme & Reveal",
    showName: "Campus Pulse",
    host: "RJ Vicky & Tanvi S.",
    hostRole: "Cultural Committee Spokespersons",
    cover: localImages.incridea,
    duration: "21:30",
    durationSeconds: 1290,
    category: "Campus News",
    badge: "Must Listen",
    publishedAt: "May 10",
    plays: "4.1k",
    description: "The official backstage scoop on NMAMIT's premier national cultural fest 'Incridea'. Celebrity artists, flagship gaming arenas, and student volunteer registrations.",
    aiSummary: {
      overview: "The Cultural Committee breaks down the upcoming Incridea festival schedule, mega-stage sound architecture, pro-show clues, and how 1st-year students can volunteer for backstage coordination.",
      highlights: [
        "Stage lighting and audio upgrades for Sambhram Open Air Theatre",
        "Esports arena details: Valorant & BGMI campus championships",
        "Merchandise drop: Limited edition Incridea varsity jackets"
      ],
      keyTakeaways: [
        "Volunteer forms close Sunday midnight on the student intranet",
        "Early bird festival passes will be distributed via hostel desks",
        "Campus radio will broadcast live backstage interviews throughout the fest"
      ],
      timestamps: [
        { time: "01:10", label: "Incridea 2026 Theme Decoded" },
        { time: "08:45", label: "Pro-Night Artist Clues & Hints" },
        { time: "14:20", label: "Technical & Gaming event highlights" },
        { time: "18:50", label: "How to register as a student volunteer" }
      ]
    }
  },
  {
    id: "pod-6",
    title: "Mind Over Matter: Managing Exam Stress & Semester Burnout",
    showName: "Mind Over Matter",
    host: "Dr. Prema Nayak & Student Wellness Club",
    hostRole: "Campus Counselor & Peer Mentors",
    cover: localImages.examStress,
    duration: "16:20",
    durationSeconds: 980,
    category: "Mental Health",
    badge: "Wellness",
    publishedAt: "May 8",
    plays: "1.1k",
    description: "Practical breathing techniques, dealing with back-to-back internal assessments, sleep hygiene in noisy hostels, and campus counseling resources.",
    aiSummary: {
      overview: "A compassionate, practical conversation between Dr. Prema Nayak and student peer mentors on avoiding burnout during internal assessment weeks, maintaining sleep schedules in dorms, and accessing confidential campus counseling.",
      highlights: [
        "The 20-20-20 screen rule during marathon coding and circuit simulation sessions",
        "Combatting impostor syndrome when surrounding peers seem ahead",
        "Free confidential peer-counseling desk timings at Student Center"
      ],
      keyTakeaways: [
        "Sleeping under 5 hours drops problem-solving efficiency by 40%",
        "Peer counselors are available Monday to Saturday at Block 2 counseling suite",
        "Remember: GPA is important, but mental wellbeing is non-negotiable"
      ],
      timestamps: [
        { time: "00:50", label: "Why internal exams trigger sudden anxiety" },
        { time: "05:20", label: "Hostel sleep hygiene: White noise & routine" },
        { time: "10:15", label: "Grounding exercise you can do right before an exam" },
        { time: "14:00", label: "Campus wellness resources & helpline" }
      ]
    }
  }
];

// Categories for filtering
export const podcastCategories = [
  "All",
  "Tech & Coding",
  "Hostel Stories",
  "Indie Music",
  "Campus News",
  "Career & Alumni",
  "Mental Health"
];

