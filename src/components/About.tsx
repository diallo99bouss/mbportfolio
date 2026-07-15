import React, { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { portfolioData as d } from '../data/portfolio';
import type { TranslatedTerminalBlock } from '../types';

interface TerminalLine {
  type: 'cmd' | 'out';
  text: string;
  success?: boolean;
}

interface TerminalProps {
  blocks: { cmd: string; out: string[]; success?: boolean }[];
}

const Terminal: React.FC<TerminalProps> = ({ blocks }) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [done, setDone] = useState(false);
  const theme = useTheme();
  const cmdTextColor = theme.palette.mode === 'dark' ? '#c0b8ff' : theme.palette.primary.dark;

  // blocks is stable (memoized in parent) — re-runs only when language changes
  useEffect(() => {
    setLines([]);
    setDone(false);
    if (!blocks.length) return;

    const steps: TerminalLine[] = [];
    blocks.forEach((block) => {
      steps.push({ type: 'cmd', text: block.cmd });
      block.out.forEach((o: string) =>
        steps.push({ type: 'out', text: o, success: block.success })
      );
    });

    let i = 0;
    let cancelled = false;
    const interval = setInterval(() => {
      if (cancelled) return;
      if (i < steps.length) {
        setLines((prev) => [...prev, steps[i++]]);
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 180);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [blocks]);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        fontFamily: "'Space Mono', monospace",
        fontSize: '0.78rem',
        lineHeight: 1.9,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Stack
        direction="row"
        spacing={0.75}
        alignItems="center"
        sx={{ mb: 1.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        {['#fa6d6d', '#f5c518', '#6dfa8c'].map((c) => (
          <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: c }} />
        ))}
        <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', ml: 'auto !important' }}>
          ~/mb-diallo
        </Typography>
      </Stack>

      {lines.map((l, i) => (
        <Box key={i} sx={{ mb: l.type === 'cmd' && i > 0 ? 0.25 : 0 }}>
          {l.type === 'cmd' ? (
            <Box>
              <Box component="span" sx={{ color: 'primary.main' }}>❯ </Box>
              <Box component="span" sx={{ color: cmdTextColor }}>{l.text}</Box>
            </Box>
          ) : (
            <Box sx={{ color: l.success ? 'success.main' : 'text.secondary' }}>{l.text}</Box>
          )}
        </Box>
      ))}

      {done && (
        <Box>
          <Box component="span" sx={{ color: 'primary.main' }}>❯ </Box>
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: 7,
              height: 13,
              bgcolor: 'primary.main',
              verticalAlign: 'middle',
              animation: 'mb-blink 1.1s step-end infinite',
            }}
          />
        </Box>
      )}
    </Paper>
  );
};

const About: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const strongColor = theme.palette.mode === 'dark' ? '#f0eeff' : theme.palette.text.primary;

  // Guard: returnObjects may return a string if key is missing
  const paragraphsRaw = t('about.paragraphs', { returnObjects: true });
  const paragraphs = Array.isArray(paragraphsRaw) ? (paragraphsRaw as string[]) : [];

  // Stable reference — only recomputes when language changes
  const mergedTerminal = useMemo(() => {
    const raw = t('about.terminal.blocks', { returnObjects: true });
    const tBlocks = Array.isArray(raw) ? (raw as TranslatedTerminalBlock[]) : [];
    return d.terminal.map((block, idx) => ({
      ...block,
      out: tBlocks[idx]?.out ?? [],
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const meta = [
    { key: t('about.meta.location'), val: d.location },
    { key: t('about.meta.stack'),    val: t('about.meta.stack_val') },
    { key: t('about.meta.education'),val: t('about.meta.education_val') },
    { key: t('about.meta.languages'),val: t('about.meta.languages_val') },
  ];

  return (
    <Box component="section" className="section">
      <Box className="container">
        {/* Header */}
        <Box className="section-header">
          <Box className="eyebrow">
            <Box className="eyebrow-line" />
            <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.68rem' }}>
              {t('about.section_label')}
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' }, lineHeight: 1.1 }}>
            {t('about.title_line1')}<br />{t('about.title_line2')}
          </Typography>
        </Box>

        <Grid container spacing={5} alignItems="flex-start">
          {/* Left — paragraphs + meta */}
          <Grid item xs={12} md={6}>
            {paragraphs.map((p, i) => (
              <Typography
                key={i}
                sx={{ fontSize: '0.85rem', lineHeight: 1.9, color: 'text.secondary', mb: 1.5 }}
                dangerouslySetInnerHTML={{
                  __html: p.replace(
                    /<strong>/g,
                    `<strong style="color:${strongColor};font-weight:700">`
                  ),
                }}
              />
            ))}
            <Stack spacing={1} sx={{ mt: 2.5 }}>
              {meta.map((m) => (
                <Paper
                  key={m.key}
                  variant="outlined"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: '0.7rem 1rem',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: 'primary.main', minWidth: 80, fontSize: '0.65rem' }}
                  >
                    {m.key}
                  </Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: 'text.primary' }}>
                    {m.val}
                  </Typography>
                </Paper>
              ))}
            </Stack>
          </Grid>

          {/* Right — Terminal */}
          <Grid item xs={12} md={6}>
            <Terminal blocks={mergedTerminal} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default About;
