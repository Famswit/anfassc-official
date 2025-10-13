"use client";

import { Box, Typography, IconButton } from "@mui/material";
import {
  Phone,
  Email,
  LocationOn,
  Language,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import { motion, Variants, easeOut } from "framer-motion";

const ContactDetails = () => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const contactInfo = [
    {
      icon: <Phone sx={{ color: "#4caf50" }} />,
      title: "Call Us",
      info: "+234 813 308 8845, +234 803 387 1545",
    },
    {
      icon: <Email sx={{ color: "#4caf50" }} />,
      title: "Email Us",
      info: "authenticnfsc44@gmail.com",
    },
    {
      icon: <Language sx={{ color: "#4caf50" }} />,
      title: "Website",
      info: "www.authenticnfassc.org.ng",
    },
    {
      icon: <LocationOn sx={{ color: "#4caf50" }} />,
      title: "Address",
      info: "96, Ogunlana Drive, Surulere, Lagos, Nigeria",
    },
  ];

  const socialMedia = [
    {
      icon: <Facebook />,
      color: "#1877f2",
      link: "https://facebook.com/Authenticnfassc",
    },
    {
      icon: <Twitter />,
      color: "#1da1f2",
      link: "https://twitter.com/Authenticnfassc",
    },
    {
      icon: <Instagram />,
      color: "#e4405f",
      link: "https://instagram.com/Authenticnfassc",
    },
    {
      icon: <LinkedIn />,
      color: "#0077b5",
      link: "https://linkedin.com/company/Authenticnfassc",
    },
  ];

  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible">
      <Box sx={{ bgcolor: "white", p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            mb: 2,
            fontWeight: 600,
            color: "primary.main",
            fontSize: "1.5rem",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="h4"
          component="h3"
          sx={{
            mb: 3,
            fontWeight: 700,
            color: "#333",
            fontSize: "2rem",
          }}
        >
          Get In Touch
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "#666", lineHeight: 1.6 }}
        >
          Ready to take your football skills to the next level? Get in touch
          with ANFASSC Academy today. We&apos;re here to help you achieve your
          football dreams and provide the best training experience.
        </Typography>

        {/* Contact Details */}
        <Box sx={{ mb: 4 }}>
          {contactInfo.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                p: 2,
                borderRadius: 1,
                "&:hover": {
                  bgcolor: "#f9f9f9",
                },
                transition: "all 0.3s ease",
              }}
            >
              <Box
                sx={{
                  mr: 3,
                  p: 1.5,
                  borderRadius: "50%",
                  bgcolor: "#e8f5e8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 48,
                  height: 48,
                }}
              >
                {item.icon}
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "#333", mb: 0.5 }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#666" }}>
                  {item.info}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Social Media */}
        <Box>
          <Typography
            variant="h6"
            sx={{ mb: 2, fontWeight: 600, color: "#333" }}
          >
            Follow Us On
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {socialMedia.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: social.color,
                  width: 40,
                  height: 40,
                  "&:hover": {
                    bgcolor: "white",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ContactDetails;
