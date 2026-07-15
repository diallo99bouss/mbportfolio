import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { portfolioData as d } from '../data/portfolio';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [form, setForm]       = useState<FormState>({ name: '', email: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(false);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;

    setLoading(true);
    setError(false);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          to_email:   d.email,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    { label: t('contact.info.phone'),    val: d.phone,          href: `tel:${d.phone.replace(/\s/g, '')}`, icon: <PhoneIcon sx={{ fontSize: 16 }} /> },
    { label: t('contact.info.email'),    val: d.email,          href: `mailto:${d.email}`,                  icon: <EmailIcon sx={{ fontSize: 16 }} /> },
    { label: t('contact.info.linkedin'), val: d.linkedinHandle, href: d.linkedin,                           icon: <LinkedInIcon sx={{ fontSize: 16 }} /> },
    { label: t('contact.info.location'), val: d.location,       href: undefined,                            icon: <LocationOnIcon sx={{ fontSize: 16 }} /> },
  ];

  return (
    <Box
      component="section"
      className="section"
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <Box className="container">
        <Box sx={{ maxWidth: 640, mx: 'auto' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '3.2rem' }, lineHeight: 1.1, mb: 1.5 }}>
            {t('contact.title_line1')}<br />
            <Box component="span" sx={{ color: 'primary.main' }}>{t('contact.title_line2')}</Box>
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: 'text.secondary', lineHeight: 1.85, mb: 4 }}>
            {t('contact.subtitle')}
          </Typography>

          {sent ? (
            <Paper
              variant="outlined"
              sx={{ p: 4, textAlign: 'center', borderColor: 'primary.main', bgcolor: 'rgba(124,109,250,0.06)' }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography sx={{ fontSize: '0.9rem', color: 'text.primary' }}>
                {t('contact.sent')}
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={2.5}>
              <TextField
                name="name"
                label={t('contact.form.name_label')}
                placeholder={t('contact.form.name_placeholder')}
                value={form.name}
                onChange={handleChange}
                fullWidth
                size="small"
                disabled={loading}
              />
              <TextField
                name="email"
                label={t('contact.form.email_label')}
                placeholder={t('contact.form.email_placeholder')}
                value={form.email}
                onChange={handleChange}
                fullWidth
                size="small"
                disabled={loading}
              />
              <TextField
                name="message"
                label={t('contact.form.message_label')}
                placeholder={t('contact.form.message_placeholder')}
                value={form.message}
                onChange={handleChange}
                fullWidth
                multiline
                rows={5}
                disabled={loading}
              />

              {error && (
                <Alert
                  severity="error"
                  sx={{ borderRadius: 0, fontFamily: "'Space Mono', monospace", fontSize: '0.75rem' }}
                >
                  {t('contact.error')}
                </Alert>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading || !form.name || !form.email || !form.message}
                  startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}
                >
                  {loading ? t('contact.sending') : t('contact.form.submit')}
                </Button>
              </Box>
            </Stack>
          )}

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={1.5}>
            {infoItems.map((info) => (
              <Grid item xs={12} sm={6} key={info.label}>
                <Paper
                  variant="outlined"
                  sx={{ p: '0.9rem 1rem', borderColor: 'divider', bgcolor: 'background.paper' }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                    <Box sx={{ color: 'primary.main' }}>{info.icon}</Box>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.6rem' }}>
                      {info.label}
                    </Typography>
                  </Stack>
                  {info.href ? (
                    <Typography
                      component="a"
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      sx={{ fontSize: '0.78rem', color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                      {info.val}
                    </Typography>
                  ) : (
                    <Typography sx={{ fontSize: '0.78rem', color: 'text.primary' }}>{info.val}</Typography>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
