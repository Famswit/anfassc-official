'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeaderSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <Box
      sx={{
        position: 'relative',
        height: '80vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        bgcolor: '#000',
        color: 'white',
      }}
    >
      <Image
        src="/homepage/home2.webp" 
        alt="Stadium Background"
        fill
        priority
        style={{
          objectFit: 'cover',
          zIndex: 0,
          opacity: 0.5,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 5px rgba(0,0,0,0.4)',
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
          }}
        >
          About Us
        </Typography>
      </motion.div>
    </Box>
  );
};

export default HeaderSection;
