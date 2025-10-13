'use client';

import { Box } from '@mui/material';
import { achievementsData } from './components/achievementData';
import ImageSlider from './components/imageSlider';
import AchievementCards from './components/achievementCard';

const AchievementsSection: React.FC = () => {
  const firstRowAchievements = achievementsData.achievements.slice(0, 11);
  const secondRowAchievements = achievementsData.achievements.slice(11, 22);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        position: 'relative',
        width: '100%',
        minHeight: 500,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1B5E20 60%, transparent 60%)',
      }}
    >
      {/* Left: Achievement Cards */}
      <AchievementCards
        firstRowAchievements={firstRowAchievements}
        secondRowAchievements={secondRowAchievements}
      />

      {/* Right: Image Slider */}
      <ImageSlider />
    </Box>
  );
};

export default AchievementsSection;