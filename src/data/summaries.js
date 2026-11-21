import { localImages } from '../assets/Images';

// AI-Powered Broadcast Summaries
export const mockSummaries = [
  {
    id: "sum-1",
    title: "AI Synthesis: Autonomous Systems & Robotics Lab Tour",
    podcastId: "pod-1",
    showName: "Nitte Tech Chronicles",
    host: "Prateek Shenoy & Divya Rao",
    date: "May 18, 2026",
    readTime: "3 min read",
    category: "Tech & Coding",
    badge: "Featured AI Summary",
    cover: localImages.nitteTech,
    overview: "In this broadcast, the leads of the NMAMIT Robotics Club demonstrated the architecture of their national competition rover. They explained LiDAR calibration under bright sunlight and shared concrete strategies for sophomore and junior engineering students seeking core hardware/software internships.",
    keyTakeaways: [
      "Hardware optimization: Replaced heavy aluminum baseplates with lightweight carbon-infused 3D prints produced in the MakerSpace.",
      "ROS2 multi-threading: Resolved sensor dropouts by implementing asynchronous executor nodes on the Jetson Orin Nano.",
      "Portfolio advice: Interviewers prioritize reproducible GitHub codebases with clean READMEs over boilerplate classroom projects.",
      "Lab access: The Autonomous Systems Lab is open for project work till 9 PM on weekdays with faculty mentor permission."
    ],
    highlightQuote: "“Don't wait for your 7th semester placement drive to start building. Make things that break in the lab so you know how to fix them in the real world.” — Prateek Shenoy",
    topics: ["Robotics", "ROS2", "Jetson Orin", "Student Internships", "MakerSpace"],
    originalEpisodeDuration: "24:18"
  },
  {
    id: "sum-2",
    title: "AI Synthesis: Surviving Hostel Life & The Mess Food Chronicles",
    podcastId: "pod-2",
    showName: "Hostel Night Owl",
    host: "Kavya Bhat & Nihal Shetty",
    date: "May 16, 2026",
    readTime: "2 min read",
    category: "Hostel Stories",
    badge: "Trending Read",
    cover: localImages.hostel,
    overview: "A campus-wide cultural breakdown of hostel life across Netravati and Shambhavi blocks. Highlights practical hacks for monsoon weather, navigating the midnight laundry rush, and negotiating mess committee special dinners.",
    keyTakeaways: [
      "Monsoon preparations: Keep waterproof backpack raincovers and silica gel packets for electronics in humid hostel rooms.",
      "Hostel facilities: Shambhavi Block C now offers a silent air-conditioned study wing with dedicated charging pods.",
      "Mess feedback: The student mess committee meets every 2nd Saturday to adjust spice levels and introduce new regional breakfast items.",
      "Curfew and entry: Biometric gates operate till 9:30 PM with digital warden passes available via the campus mobile app."
    ],
    highlightQuote: "“Hostel life teaches you two things: how to cook five different meals using just an electric kettle, and friendships that survive every exam sprint.” — Kavya Bhat",
    topics: ["Hostel Hacks", "Netravati Block", "Mess Committee", "Student Life"],
    originalEpisodeDuration: "18:45"
  },
  {
    id: "sum-3",
    title: "AI Synthesis: Incridea 2026 Theme Reveal & Stage Logistics",
    podcastId: "pod-5",
    showName: "Campus Pulse",
    host: "RJ Vicky & Tanvi S.",
    date: "May 12, 2026",
    readTime: "4 min read",
    category: "Campus News",
    badge: "Cultural Scoop",
    cover: localImages.incridea,
    overview: "Behind-the-scenes breakdown of NMAMIT's premier cultural fest. The committee explains the acoustic enhancements at Sambhram Open Air Theatre, esports setups for gaming events, and the upcoming student volunteer drive.",
    keyTakeaways: [
      "Acoustic improvements: Line array sound towers installed to prevent audio echo against the Mech block courtyard.",
      "Esports tournament: 64-team Valorant LAN tournament with live spectator screens in the SAC arena.",
      "Volunteer privileges: Early access to celebrity pro-nights and verified certificates of service.",
      "Safety protocols: Enhanced campus security patrols and shuttle buses to Karkala bus stand on fest evenings."
    ],
    highlightQuote: "“Incridea is not just a college fest; it is the heartbeat of our campus where every branch comes together to create magic.” — Tanvi S.",
    topics: ["Incridea", "Fest Organization", "Esports", "Volunteer Drive"],
    originalEpisodeDuration: "21:30"
  },
  {
    id: "sum-4",
    title: "AI Synthesis: Career Blueprint — Transitioning to Tech Startups",
    podcastId: "pod-4",
    showName: "Alumni Radar",
    host: "Prof. Arvind Kamath & Ananya M.",
    date: "May 09, 2026",
    readTime: "3 min read",
    category: "Career & Alumni",
    badge: "Career Guide",
    cover: localImages.alumniRadar,
    overview: "Alumnus Rohit K. discusses how engineering students from NMAMIT can bridge the gap between academic curriculum and high-growth technology startups in Bengaluru and abroad.",
    keyTakeaways: [
      "Core fundamentals: Master system design principles and database concurrency early in your 3rd year.",
      "Real-world open source: Contribute documentation or bug fixes to active repositories like Apache or CNCF.",
      "Cold outreach done right: Instead of asking for referrals, send a 2-minute Loom teardown or bug fix PR to the startup founder.",
      "Campus recruiting: 4 summer engineering stipends announced for NMAMIT students with strong demo portfolios."
    ],
    highlightQuote: "“A polished product with 5 active users speaks louder in an interview than five certificates of completion.” — Rohit K.",
    topics: ["Alumni Advice", "Startup Hiring", "System Design", "Internships"],
    originalEpisodeDuration: "32:05"
  }
];

