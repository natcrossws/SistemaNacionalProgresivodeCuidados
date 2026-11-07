/** Paleta neutra por defecto — Sistema Nacional Progresivo de Cuidados */

export const SNPC_PRIMARY = '#475569';
export const SNPC_SECONDARY = '#64748B';
export const SNPC_BACKGROUND = '#F8FAFC';
export const SNPC_TEXT = '#0F172A';
export const SNPC_LOGIN_BG = '#0F172A';

export const DEFAULT_THEME = {
  primaryColor: SNPC_PRIMARY,
  secondaryColor: SNPC_SECONDARY,
  tertiaryColor: SNPC_SECONDARY,
  backgroundColor: SNPC_BACKGROUND,
  textColor: SNPC_TEXT,
  mode: 'light' as const,
  loginTemplate: 'default',
  loginPrimaryColor: SNPC_PRIMARY,
  loginSecondaryColor: SNPC_SECONDARY,
  loginBackgroundColor: SNPC_LOGIN_BG,
};

export const BRAND_SCALE = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: SNPC_PRIMARY,
  600: '#334155',
  700: '#1E293B',
  800: '#0F172A',
  900: '#020617',
};

export const SECONDARY_SCALE = {
  50: '#F8FAFC',
  100: '#F1F5F9',
  200: '#E2E8F0',
  300: '#CBD5E1',
  400: '#94A3B8',
  500: SNPC_SECONDARY,
  600: '#475569',
  700: '#334155',
};
