import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import { useTranslation } from 'react-i18next';
import { portfolioData as d } from '../data/portfolio';
import type { Skill } from '../types';

interface SkillBarProps {
  skill: Skill;
  delay: number;
  renderKey: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, delay, renderKey }) => {
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setValue(0);
    setVisible(false);
    const t1 = setTimeout(() => setVisible(true), delay);
    const t2 = setTimeout(() => setValue(skill.pct), delay + 50);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [skill.pct, delay, renderKey]);

  return (
    <Box
      sx={{
        mb: 2.5,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(10px)',
        transition: `opacity 0.3s ${delay}ms, transform 0.3s ${delay}ms`,
      }}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
        <Typography sx={{ fontSize: '0.78rem', color: 'text.primary' }}>{skill.name}</Typography>
        <Typography sx={{ fontSize: '0.68rem', color: 'primary.main' }}>{skill.pct}%</Typography>
      </Stack>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          '& .MuiLinearProgress-bar': {
            transition: `transform ${0.6 + delay * 0.001}s cubic-bezier(0.4,0,0.2,1)`,
          },
        }}
      />
    </Box>
  );
};

const Skills: React.FC = () => {
  const { t } = useTranslation();
  const [activeKey, setActiveKey] = useState('frontend');
  const [renderKey, setRenderKey] = useState(0);

  const handleCat = (key: string) => {
    setActiveKey(key);
    setRenderKey((k) => k + 1);
  };

  const skills = d.skills[activeKey] ?? [];

  return (
    <Box component="section" className="section">
      <Box className="container">
        {/* Header */}
        <Box className="section-header">
          <Box className="eyebrow">
            <Box className="eyebrow-line" />
            <Typography variant="caption" sx={{ color: 'primary.main', fontSize: '0.68rem' }}>
              {t('skills.section_label')}
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' }, lineHeight: 1.1 }}>
            {t('skills.title_line1')}<br />{t('skills.title_line2')}
          </Typography>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '160px 1fr' }, gap: 4, alignItems: 'start' }}>
          {/* Category buttons */}
          <Stack spacing={0.75}>
            {d.skillCategoryKeys.map((key) => (
              <Button
                key={key}
                onClick={() => handleCat(key)}
                variant={activeKey === key ? 'contained' : 'outlined'}
                size="small"
                sx={{
                  justifyContent: 'flex-start',
                  clipPath: 'none',
                  fontSize: '0.65rem',
                  py: 1,
                  px: 1.5,
                  ...(activeKey !== key && {
                    borderColor: 'divider',
                    color: 'text.secondary',
                    '&:hover': { borderColor: 'primary.main', color: 'text.primary', bgcolor: 'transparent' },
                  }),
                }}
              >
                {t(`skills.categories.${key}`)}
              </Button>
            ))}
          </Stack>

          {/* Skill bars */}
          <Box>
            {skills.map((s, i) => (
              <SkillBar key={`${activeKey}-${s.name}`} skill={s} delay={i * 70} renderKey={renderKey} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Skills;
