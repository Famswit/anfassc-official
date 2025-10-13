
export interface Membership {
  name: string;
  subtitle: string;
  description: string;
  color: string;
  bgGradient: string;
  textColor: string;
  buttonColor: string;
}

export const memberships: Membership[] = [
  {
    name: "💎 Diamond",
    subtitle: "Top Tier Premium Elite Access",
    description: "Exclusive VIP experience with all Platinum, Gold, and Green benefits ",
    color: "#B9F2FF", 
    bgGradient: "black",
    textColor: "primary.main",
    buttonColor: "#B9F2FF",
  },
  {
    name: "🏆 PLATINUM",
    subtitle: "Seasonal Access to Club Level",
    description: "Premium seating and exclusive club facilities with all Gold, and Green benefits",
    color: "#C0C0C0",
    bgGradient: "black",
    textColor: "primary.main",
    buttonColor: "#C0C0C0",
  },
  {
    name: "🥇 GOLD",
    subtitle: "Priority Match Access with Brand/company logo visibility",
    description: "Enhanced matchday experience with priority booking with all Green benefit",
    color: "#FFD700",
    bgGradient: "black",
    textColor: "primary.main",
    buttonColor: "#FFD700",
  },
  {
    name: "🌿 Green",
    subtitle: "Stay Close To The Action (Entry Tier)",
    description: "Welcome kit (ANFASSC branded merch: Jersey, Cap, Track suit etc.)",
    color: "#4CAF50",
    bgGradient: "black",
    textColor: "primary.main",
    buttonColor: "#4CAF50",
  },
];
