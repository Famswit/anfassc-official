"use client"

import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material"
import { motion } from "framer-motion"
import { useTheme } from "@mui/material/styles"
import CircleIcon from "@mui/icons-material/Circle"

const membershipPlans = [
  {
    type: "💎 Diamond",
    benefits: [
      "All Platinum, Gold, and Green benefits plus:",
      "National recognition of your brand/company at ANFASSC official events & media",
      "Exclusive VIP access to international sporting events & matches (local & abroad)",
      "Meet & Greet opportunities with Nigerian national team stars & legends",
      "Priority VIP seating at ANFASSC partner stadiums & events",
      "Customized promotional campaigns via ANFASSC digital & physical platforms",
      "Annual appreciation award / plaque presentation on stage",
      "VIP networking opportunities",
    ],
  },
  {
    type: "🏆 Platinum",
    benefits: [
      "All Gold and Green benefits plus:",
      "Priority support for requests and tickets",
      "VIP networking opportunities with sports icons, business leaders & politicians",
      "Recognition on ANFASSC website & digital platforms as a Platinum partner",
      "Invitation to closed-door stakeholder forums",
    ],
  },
  {
    type: "🥇 Gold",
    benefits: [
      "All Green benefits plus:",
      "Brand/company logo visibility in select ANFASSC campaigns & programs",
      "Discounted access to tickets, merch, and ANFASSC partner events",
      "Feature spotlight in ANFASSC magazine/newsletter once a year",
      "Quarterly networking events with athletes, media, and business community",
    ],
  },
  {
    type: "🌿 Green",
    benefits: [
      "Welcome kit (ANFASSC branded merch: Jersey, cap, Track suit, etc.)",
      "Access to ANFASSC community groups & forums (WhatsApp/Telegram/Online)",
      "Discounts on general ANFASSC merchandise",
      "Invitation to local ANFASSC watch parties & fan events",
      "Opportunity to volunteer & participate in ANFASSC activities nationwide",
    ],
  },
]

const MembershipForm = () => {
  const theme = useTheme()

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ bgcolor: theme.palette.background.paper, p: 3, borderRadius: 2, boxShadow: 2 }}>
        <Typography
          variant="body1"
          sx={{ color: "red", fontWeight: "bold", mb: 3, textAlign: "center" }}
        >
          Kindly call ANFASSC on +234 813 308 8845, +234 803 387 1545 for more enquiry, payment and
          getting the membership form
        </Typography>

        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, textAlign: "center" }}>
          Membership Types
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: 3,
          }}
        >
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card sx={{ borderRadius: "0 16px 0 16px", boxShadow: 3 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    {plan.type} Member
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 2, textDecoration: "underline", fontWeight: "bold" }}
                  >
                    Benefits
                  </Typography>
                  <List dense sx={{ mb: 2, textAlign: "left", pl: 1 }}>
                    {plan.benefits.map((benefit, i) => (
                      <ListItem key={i} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CircleIcon sx={{ fontSize: 8, color: theme.palette.text.primary }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={benefit}
                          sx={{ "& .MuiListItemText-primary": { fontSize: "0.9rem" } }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default MembershipForm
