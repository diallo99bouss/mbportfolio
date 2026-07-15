import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FR, GB } from 'country-flag-icons/react/3x2';
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
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const LangFlag = i18n.language === 'fr' ? GB : FR;

  const handleNav = (id: SectionId) => {
    onNav(id);
    setMobileOpen(false);
  };

  const themeButtonSx = {
    color: 'text.secondary',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 0,
    p: 0.6,
    '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'transparent' },
  } as const;

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

        {/* Desktop nav */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, alignItems: 'center' }}>
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

          <IconButton onClick={toggleLang} size="small" sx={themeButtonSx} aria-label="toggle language">
            <LangFlag style={{ width: 18, height: 12 }} />
          </IconButton>

          <IconButton onClick={onToggleTheme} size="small" sx={themeButtonSx}>
            {isDark
              ? <LightModeOutlinedIcon sx={{ fontSize: 16 }} />
              : <DarkModeOutlinedIcon sx={{ fontSize: 16 }} />
            }
          </IconButton>
        </Box>

        {/* Mobile controls */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 0.75, alignItems: 'center' }}>
          <IconButton onClick={onToggleTheme} size="small" sx={themeButtonSx}>
            {isDark
              ? <LightModeOutlinedIcon sx={{ fontSize: 16 }} />
              : <DarkModeOutlinedIcon sx={{ fontSize: 16 }} />
            }
          </IconButton>

          <IconButton
            onClick={() => setMobileOpen(true)}
            size="small"
            aria-label="menu"
            sx={{ color: 'text.primary', p: 0.6 }}
          >
            <MenuIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: '75%',
            maxWidth: 300,
            bgcolor: 'background.default',
            backgroundImage: 'none',
            borderLeft: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
          <IconButton onClick={() => setMobileOpen(false)} aria-label="close menu">
            <CloseIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {links.map((l) => (
            <ListItemButton
              key={l.id}
              selected={active === l.id}
              onClick={() => handleNav(l.id)}
              sx={{
                borderRadius: 0,
                py: 1.25,
                '&.Mui-selected': {
                  bgcolor: 'rgba(124,109,250,0.08)',
                  borderLeft: '2px solid',
                  borderColor: 'primary.main',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: active === l.id ? 'text.primary' : 'text.secondary',
                }}
              >
                {l.label}
              </Typography>
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
          <IconButton onClick={toggleLang} aria-label="toggle language" sx={{ p: 0.75 }}>
            <LangFlag style={{ width: 26, height: 18 }} />
          </IconButton>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
