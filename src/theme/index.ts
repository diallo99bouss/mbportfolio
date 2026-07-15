import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode: 'dark' | 'light') => {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#7c6dfa',
        light: '#9585ff',
        dark: '#5a4dd4',
        contrastText: isDark ? '#0a0a0f' : '#ffffff',
      },
      secondary: {
        main: '#fa6d6d',
      },
      background: {
        default: isDark ? '#0a0a0f' : '#f6f5ff',
        paper: isDark ? '#13131c' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f0eeff' : '#0d0c1a',
        secondary: isDark ? '#7a788e' : '#5c5a72',
      },
      divider: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
      success: { main: isDark ? '#6dfa8c' : '#1a9e50' },
    },
    typography: {
      fontFamily: "'Space Mono', monospace",
      h1: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        letterSpacing: '-0.04em',
      },
      h2: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        letterSpacing: '-0.03em',
      },
      h3: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
      },
      h4: {
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
      },
      button: {
        fontFamily: "'Space Mono', monospace",
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      },
      caption: {
        fontFamily: "'Space Mono', monospace",
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 0,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.72rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '0.75rem 1.8rem',
          },
          containedPrimary: {
            clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
            '&:hover': { backgroundColor: '#9585ff' },
          },
          outlinedPrimary: {
            borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.15)',
            '&:hover': {
              borderColor: '#7c6dfa',
              color: '#7c6dfa',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.62rem',
            letterSpacing: '0.06em',
            height: 24,
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            height: 2,
            backgroundColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
          },
          bar: {
            background: 'linear-gradient(90deg, #7c6dfa, #fa6d6d)',
            borderRadius: 0,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 0,
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.82rem',
              '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.15)' },
              '&:hover fieldset': { borderColor: 'rgba(124,109,250,0.45)' },
              '&.Mui-focused fieldset': { borderColor: '#7c6dfa', borderWidth: 1 },
            },
            '& .MuiInputLabel-root': {
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.68rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              '&.Mui-focused': { color: '#7c6dfa' },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 0,
            backgroundImage: 'none',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: isDark ? 'rgba(10,10,15,0.88)' : 'rgba(246,245,255,0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: isDark
              ? '1px solid rgba(255,255,255,0.07)'
              : '1px solid rgba(0,0,0,0.09)',
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            fontFamily: "'Space Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            minWidth: 'auto',
            padding: '8px 16px',
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)',
          },
        },
      },
    },
  });
};
