import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createAppTheme } from './theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import type { SectionId } from './types';

const sections: Record<SectionId, React.FC<{ onNav: (id: SectionId) => void }>> = {
  hero: Hero as React.FC<{ onNav: (id: SectionId) => void }>,
  about: About as React.FC<{ onNav: (id: SectionId) => void }>,
  xp: Experience as React.FC<{ onNav: (id: SectionId) => void }>,
  skills: Skills as React.FC<{ onNav: (id: SectionId) => void }>,
  contact: Contact as React.FC<{ onNav: (id: SectionId) => void }>,
};

const App: React.FC = () => {
  const [active, setActive] = useState<SectionId>('hero');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(
    (localStorage.getItem('portfolio-theme') as 'dark' | 'light') ?? 'dark'
  );

  const handleToggleTheme = () => {
    const next = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(next);
    localStorage.setItem('portfolio-theme', next);
  };

  const ActiveSection = sections[active];

  return (
    <ThemeProvider theme={createAppTheme(themeMode)}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(14px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Navbar active={active} onNav={setActive} onToggleTheme={handleToggleTheme} />
        <Box
          key={active}
          sx={{ animation: 'fadeIn 0.45s ease' }}
        >
          <ActiveSection onNav={setActive} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
