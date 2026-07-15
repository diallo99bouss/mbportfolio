import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { portfolioData as d } from '../data/portfolio';
import type { SectionId } from '../types';

interface HeroProps {
  onNav: (id: SectionId) => void;
}

const Hero: React.FC<HeroProps> = ({ onNav }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const gridColor = isDark ? 'rgba(255,255,255,0.022)' : 'rgba(0,0,0,0.04)';

  const statLabels = [
    t('hero.stats.experience'),
    t('hero.stats.users'),
    t('hero.stats.features'),
  ];

  return (
    <Box
      component="section"
      className="section"
      sx={{ position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
    >
      {/* Background radial glows */}
      <Box sx={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          radial-gradient(ellipse 55% 50% at 10% 40%, rgba(124,109,250,0.13) 0%, transparent 70%),
          radial-gradient(ellipse 40% 40% at 85% 55%, rgba(250,109,109,0.07) 0%, transparent 70%)
        `,
      }} />
      {/* Grid */}
      <Box sx={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Content */}
      <Box className="container" sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <Box sx={{ maxWidth: 820, mx: 'auto', textAlign: 'center' }}>
          {/* Eyebrow */}
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1.5} sx={{ mb: 3 }}>
            <Box sx={{ width: '2rem', height: '1px', bgcolor: 'primary.main' }} />
            <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.68rem' }}>
              {t('hero.availability')}
            </Typography>
            <Box sx={{ width: '2rem', height: '1px', bgcolor: 'primary.main' }} />
          </Stack>

          {/* Name */}
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: '2.2rem', sm: '2.8rem', md: '5rem' }, lineHeight: 1.05, mb: 3 }}
          >
            {d.name.split(' ').slice(0, 2).join(' ')}<br />
            <Box component="span" sx={{ color: 'primary.main' }}>
              {d.name.split(' ').slice(2).join(' ')}
            </Box>
          </Typography>

          {/* Tagline */}
          <Typography
            sx={{
              fontSize: '0.88rem',
              lineHeight: 1.85,
              color: 'text.secondary',
              maxWidth: 540,
              mx: 'auto',
              mb: 4,
            }}
          >
            {t('hero.tagline')}
          </Typography>

          {/* CTAs */}
          <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" sx={{ mb: 2 }}>
            <Button variant="contained" onClick={() => onNav('xp')}>
              {t('hero.cta_journey')}
            </Button>
            <Button variant="outlined" onClick={() => onNav('contact')}>
              {t('hero.cta_contact')}
            </Button>
          </Stack>

          {/* Contact bar */}
          <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent="center" sx={{ mb: 5 }}>
            {[`📍 ${d.location}`, `📞 ${d.phone}`, `✉ ${d.email}`].map((item) => (
              <Typography key={item} sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
                {item}
              </Typography>
            ))}
          </Stack>

          <Divider sx={{ mb: 3 }} />

          {/* Stats */}
          <Stack
            direction="row"
            spacing={{ xs: 2.5, sm: 6 }}
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
          >
            {d.stats.map((s, i) => (
              <Box key={i} sx={{ textAlign: 'center' }}>
                <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', sm: '1.9rem' }, lineHeight: 1.2 }}>
                  {s.num}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: { xs: '0.58rem', sm: '0.65rem' } }}>
                  {statLabels[i]}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
