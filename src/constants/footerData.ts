
import { YouTube, Facebook, Instagram, Twitter } from "@mui/icons-material"

export type FooterLink = {
    name: string
    href: string
}

export type SocialMediaLink = {
    name: string
    icon: typeof YouTube 
    url: string
}

export const footerLinks: {
  menu: FooterLink[]
  support: FooterLink[]
  aboutUs: FooterLink[]
  media: FooterLink[]
  club: FooterLink[]
} = {
  menu: [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Membership", href: "/member" },
    { name: "Media", href: "/photo" },
    { name: "News", href: "/news" },
    { name: "Club", href: "/authentic" },
  ],
  support: [
    { name: "FAQs", href: "/faqs" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Report", href: "/report" },
  ],
  aboutUs: [
    { name: "About us", href: "/about" },
    { name: "Club", href: "/club" },
    { name: "team", href: "/team" },
  ],
  media: [
    { name: "Club Photos", href: "/photos" },
    { name: "Club Videos", href: "/videos" },
    { name: "Press", href: "/press" },
  ],
  club: [
    { name: "Authentic club", href: "/authentic" },
    { name: "Contact us", href: "/contact" },
    { name: "Event", href: "/event" },
  ],
}


export const socialMedia: SocialMediaLink[] = [
    {
        name: "YouTube",
        icon: YouTube,
        url: "https://www.youtube.com/@authenticnfassc",
    },
    {
        name: "X (Twitter)",
        icon: Twitter,
        url: "https://x.com/authenticnfassc",
    },
    {
        name: "Facebook",
        icon: Facebook,
        url: "https://web.facebook.com/AuthenticNFASSC",
    },
    {
        name: "Instagram",
        icon: Instagram,
        url: "https://www.instagram.com/authenticnfassc",
    },
]
