import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import type { SectionId } from '../types';

interface NavbarProps {
  active: SectionId;
  onNav: (id: SectionId) => void;
  onToggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ active, onNav, onToggleTheme }) => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const links: { id: SectionId; label: string }[] = [
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'xp', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const toggleLang = () => {
    const next = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
    localStorage.setItem('portfolio-lang', next);
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ px: { xs: 2, md: 4 }, justifyContent: 'space-between' }}>
        <Typography
          onClick={() => onNav('hero')}
          sx={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.03em',
            cursor: 'pointer',
            color: 'text.primary',
            '&:hover': { color: 'primary.main' },
            transition: 'color 0.2s',
          }}
        >
          MB<Box component="span" sx={{ color: 'primary.main' }}>.</Box>Diallo
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          {links.map((l) => (
            <Button
              key={l.id}
              onClick={() => onNav(l.id)}
              size="small"
              sx={{
                color: active === l.id ? 'text.primary' : 'text.secondary',
                borderBottom: active === l.id ? '1px solid' : '1px solid transparent',
                borderColor: active === l.id ? 'primary.main' : 'transparent',
                borderRadius: 0,
                px: 1.5,
                py: 0.5,
                fontSize: '0.65rem',
                letterSpacing: '0.12em',
                clipPath: 'none',
                '&:hover': { color: 'text.primary', backgroundColor: 'transparent' },
              }}
            >
              {l.label}
            </Button>
          ))}

          <Box sx={{ width: '1px', height: 16, bgcolor: 'divider', mx: 0.5 }} />

          {/* Language toggle */}
          <Button
            onClick={toggleLang}
            size="small"
            sx={{
              color: 'primary.main',
              border: '1px solid',
              borderColor: 'rgba(124,109,250,0.35)',
              borderRadius: 0,
              px: 1.5,
              py: 0.5,
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              clipPath: 'none',
              minWidth: 'unset',
              '&:hover': { borderColor: 'primary.main', backgroundColor: 'rgba(124,109,250,0.06)' },
            }}
          >
            {i18n.language === 'fr' ? 'EN' : 'FR'}
          </Button>

          {/* Theme toggle */}
          <IconButton
            onClick={onToggleTheme}
            size="small"
            sx={{
              color: 'text.secondary',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 0,
              p: 0.6,
              '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'transparent' },
            }}
          >
            {isDark
              ? <LightModeOutlinedIcon sx={{ fontSize: 16 }} />
              : <DarkModeOutlinedIcon sx={{ fontSize: 16 }} />
            }
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
