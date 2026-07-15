import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { portfolioData as d } from '../data/portfolio';
import type { TranslatedExperienceItem } from '../types';

interface MergedExperience {
  company: string;
  location: string;
  active: boolean;
  tags: string[];
  role: string;
  period: string;
  bullets: string[];
}

const ExperienceItem: React.FC<{ xp: MergedExperience }> = ({ xp }) => {
  const [hovered, setHovered] = useState(false);
  const theme = useTheme();
  const filledChipBg = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

  return (
    <>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '180px 1fr' },
          gap: { xs: 1, md: 3 },
          py: 3.5,
          pl: hovered ? 2 : 0,
          transition: 'all 0.25s ease',
          bgcolor: hovered ? 'rgba(124,109,250,0.03)' : 'transparent',
        }}
      >
        {/* Left — date */}
        <Box>
          <Box
            sx={{
              width: 8, height: 8, borderRadius: '50%',
              bgcolor: xp.active ? 'primary.main' : 'text.secondary',
              mb: 1,
              boxShadow: xp.active ? '0 0 8px rgba(124,109,250,0.5)' : 'none',
            }}
          />
          <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', lineHeight: 1.6, letterSpacing: '0.05em' }}>
            {xp.period}
          </Typography>
          <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', opacity: 0.6, mt: 0.5 }}>
            {xp.location}
          </Typography>
        </Box>

        {/* Right — content */}
        <Box>
          <Typography variant="h4" sx={{ fontSize: '1.05rem', mb: 0.5 }}>
            {xp.company}
          </Typography>
          <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.7rem', display: 'block', mb: 1.5 }}>
            {xp.role}
          </Typography>

          <Stack spacing={0.75} sx={{ mb: 2 }}>
            {xp.bullets.map((b, j) => (
              <Stack key={j} direction="row" spacing={1.5} alignItems="flex-start">
                <Box component="span" sx={{ color: 'primary.main', fontSize: '0.7rem', mt: '3px', flexShrink: 0 }}>→</Box>
                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', lineHeight: 1.7 }}>{b}</Typography>
              </Stack>
            ))}
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={0.5}>
            {xp.tags.map((tag, j) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant={j < 3 ? 'outlined' : 'filled'}
                sx={{
                  borderColor: j < 3 ? 'rgba(124,109,250,0.35)' : 'transparent',
                  color: j < 3 ? 'primary.main' : 'text.secondary',
                  bgcolor: j < 3 ? 'transparent' : filledChipBg,
                  fontSize: '0.62rem',
                  height: 22,
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

const Experience: React.FC = () => {
  const { t } = useTranslation();
  const translatedItems = t('experience.items', { returnObjects: true });
  const items = Array.isArray(translatedItems) ? (translatedItems as TranslatedExperienceItem[]) : [];

  const merged: MergedExperience[] = d.experiences.map((xp, i) => ({
    ...xp,
    role: items[i]?.role ?? '',
    period: items[i]?.period ?? '',
    bullets: items[i]?.bullets ?? [],
  }));

  return (
    <Box component="section" className="section">
      <Box className="container">
        {/* Header */}
        <Box className="section-header">
          <Box className="eyebrow">
            <Box className="eyebrow-line" />
            <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.68rem' }}>
              {t('experience.section_label')}
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' }, lineHeight: 1.1 }}>
            {t('experience.title_line1')}<br />{t('experience.title_line2')}
          </Typography>
        </Box>

        <Divider />
        {merged.map((xp, i) => (
          <ExperienceItem key={i} xp={xp} />
        ))}
      </Box>
    </Box>
  );
};

export default Experience;
