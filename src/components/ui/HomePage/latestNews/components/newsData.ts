import { Variants } from "framer-motion"

export const newsData = {
  supportersClub: [
    {
      title: "SUPER EAGLES QUALIFIER NEWS",
      category: "ANFASSC CURRENT NEWS",
      date: "15 August 25",
      image: "https://www.sports247.ng/wp-content/uploads/2024/10/Super-Eagles.jpeg",
      body: "The ANFASSC National President has called on all club members to join the trip to Uyo on August 30, 2025, to cheer on the Super Eagles in their crucial qualifier match. This is a fantastic opportunity to show your support!",
    },
    {
      title: "AFCON 2025 News",
      category: "ANFASSC CURRENT NEWS",
      date: "16 August 25",
      image: "https://northafricapost.com/wp-content/uploads/2024/06/Maroc-CAN-2025-.jpeg", 
      body: "Join fellow ANFASSC members in Morocco for AFCON 2025 to support the Super Eagles. Subsidized rates cover travel, accommodation, and meals. Contact +234 803 387 1545 to register. Exclusive to club members.",
    },
    {
      title: "Final World Cup Qualifiers",
      category: "ANFASSC CURRENT NEWS",
      date: "19 August 25",
      image: "https://thewhistler.ng/wp-content/uploads/2019/07/Nigeria-vs-South-Africa-Super-Eagles-Bafana-Bafana-1.jpg",
      body: "ANFASSC is considering a trip to South Africa for the final World Cup qualifier match. Stay tuned for updates as plans are finalized.",
    },
    {
      title: "ANFASSC AWARD NIGHT",
      category: "ANFASSC CURRENT NEWS",
      date: "22 August 25",
      image: "https://www.sports247.ng/wp-content/uploads/2023/03/Screen-Shot-2023-03-23-at-4.18.13-PM.png", 
      body: "Get ready for the ANFASSC Award Night, where members will gather to discuss plans for the new year and celebrate achievements in various categories. Date and time details coming soon!",
    },
    {
      title: "ANFASSC INSTRUMENTALIST",
      category: "ANFASSC CURRENT NEWS",
      date: "10 August 25",
      image: "/homepage/home2.jpeg", 
      body: "Orientation classes for ANFASSC instrumentalists have started. Attendance is mandatory to remain active in club activities. Don’t miss out!",
    },
    {
      title: "ANFASSC LEVY",
      category: "ANFASSC CURRENT NEWS",
      date: "1st August 25",
      image: "/newOfficialLogo.png", 
      body: "The ANFASSC President emphasizes the importance of timely payment of annual dues to support effective planning and execution of club activities. All member categories must comply.",
    },
  ],
  sport: [
  {
    title: "Super Eagles faces Rwanda in World Cup Qualifier",
    category: "SPORT",
    date: "27 Aug 25",
    image: "https://www.sports247.ng/wp-content/uploads/2024/10/Super-Eagles.jpeg",
    body: "The Super Eagles will hope to secure victory over Rwanda in their 2026 World Cup qualifier on September 1, 2025. The win will boost Nigeria’s qualification hopes.",
  },
  {
    title: "Ademola Lookman transfer saga with Inter Milan",
    category: "SPORT",
    date: "26 Aug 25",
    image: "https://www.camfoot.com/wp-content/uploads/2024/12/Lookman.webp",
    body: "Super Eagles star Ademola Lookman hope Atlanta to complete a €40m move to Inter Milan before transfer deadline, marking a significant transfer for the Nigerian winger.",
  },
  {
    title: "D’Tigeress Triumph at AfroBasket 2025",
    category: "SPORT",
    date: "25 Aug 25",
    image: "https://bsnsports.com.ng/public/images/news/2025/Aug/03/688fbeb2080b2.png",
    body: "Nigeria’s D’Tigers defeated Madagascar 78-65 in the AfroBasket 2025 opener on August 25, 2025, showcasing their dominance in men’s basketball.",
  },
  {
    title: "Super Falcons Win 10th WAFCON Title",
    category: "SPORT",
    date: "24 Aug 25",
    image: "https://cdn.punchng.com/wp-content/uploads/2025/07/26234508/WAFCON-champions.jpeg",
    body: "The Super Falcons clinched their 10th WAFCON title on August 24, 2025, defeating South Africa 2-1 in a thrilling final, solidifying their legacy.",
  },
  {
    title: "Ola Aina Shines for Nottingham Forest",
    category: "SPORT",
    date: "23 Aug 25",
    image: "https://www.sports247.ng/wp-content/uploads/2025/03/Ola-Aina-1.jpg",
    body: "Super Eagles defender Ola Aina scored a crucial goal for Nottingham Forest on August 23, 2025, helping his side secure a 2-1 win in the Premier League.",
  },
  {
    title: "Victor Osimhen Stars at Galatasaray",
    category: "SPORT",
    date: "22 Aug 25",
    image: "https://cdn.punchng.com/wp-content/uploads/2024/09/15003136/Osimhen-Galatasaray-1-e1726348286744.jpg",
    body: "Victor Osimhen netted a brace for Galatasaray on August 22, 2025, leading his team to a 3-0 victory in the Turkish Super Lig.",
  },
],
};



export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut", 
    },
  },
}

export const imageVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

export const buttonVariants: Variants = {
  hover: {
    scale: 1.1,
    backgroundColor: "#1b5e20",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
}
