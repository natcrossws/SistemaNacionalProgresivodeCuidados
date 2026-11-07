import { extendTheme } from '@chakra-ui/react';
import { SNPC_TEXT } from './defaultPalette';

/** Paleta neutra SNPC. Apariencia puede sobreescribir --chakra-colors-brand-* en runtime. */
const theme = extendTheme({
  colors: {
    brand: {
      50: 'var(--chakra-colors-brand-50, #F8FAFC)',
      100: 'var(--chakra-colors-brand-100, #F1F5F9)',
      200: 'var(--chakra-colors-brand-200, #E2E8F0)',
      300: 'var(--chakra-colors-brand-300, #CBD5E1)',
      400: 'var(--chakra-colors-brand-400, #94A3B8)',
      500: 'var(--chakra-colors-brand-500, #475569)',
      600: 'var(--chakra-colors-brand-600, #334155)',
      700: 'var(--chakra-colors-brand-700, #1E293B)',
      800: 'var(--chakra-colors-brand-800, #0F172A)',
      900: 'var(--chakra-colors-brand-900, #020617)',
    },
    secondary: {
      50: 'var(--chakra-colors-secondary-50, #F8FAFC)',
      100: 'var(--chakra-colors-secondary-100, #F1F5F9)',
      200: 'var(--chakra-colors-secondary-200, #E2E8F0)',
      300: 'var(--chakra-colors-secondary-300, #CBD5E1)',
      400: 'var(--chakra-colors-secondary-400, #94A3B8)',
      500: 'var(--chakra-colors-secondary-500, #64748B)',
      600: 'var(--chakra-colors-secondary-600, #475569)',
      700: 'var(--chakra-colors-secondary-700, #334155)',
    },
    accent: {
      warm: '#E2E8F0',
      sage: '#94A3B8',
      olive: '#64748B',
      forest: '#334155',
      orange: '#94A3B8',
      orangeMuted: '#CBD5E1',
      yellow: '#F8FAFC',
      blue: '#EFF6FF',
      green: '#F0FDF4',
      pink: '#FDF2F8',
      purple: '#F5F3FF',
      indigo: '#EEF2FF',
    },
    gray: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    sidebar: {
      bg: 'rgba(255, 255, 255, 0.88)',
      active: 'var(--chakra-colors-brand-500, #475569)',
      text: '#0F172A',
      textInactive: '#64748B',
      border: 'rgba(226, 232, 240, 0.9)',
      hover: 'rgba(var(--brand-rgb, 71, 85, 105), 0.08)',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: '8px',
        transition: 'all 0.2s ease-in-out',
        _hover: {
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      variants: {
        solid: {
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.08)',
          _hover: {
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)',
          },
        },
        primary: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
            boxShadow: 'md',
          },
        },
      },
      defaultProps: {
        colorScheme: 'brand',
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'gray.200',
          bg: 'white',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.06)',
          transition: 'all 0.2s ease-in-out',
          _hover: {
            boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: '8px',
          borderColor: 'gray.300',
          transition: 'all 0.2s ease-in-out',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 3px rgba(var(--brand-rgb, 71, 85, 105), 0.16)',
          },
          _hover: {
            borderColor: 'gray.400',
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          borderRadius: '8px',
          borderColor: 'gray.300',
          transition: 'all 0.2s ease-in-out',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 3px rgba(var(--brand-rgb, 71, 85, 105), 0.16)',
          },
          _hover: {
            borderColor: 'gray.400',
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        borderRadius: '8px',
        borderColor: 'gray.300',
        transition: 'all 0.2s ease-in-out',
        _focus: {
          borderColor: 'brand.500',
          boxShadow: '0 0 0 3px rgba(var(--brand-rgb, 71, 85, 105), 0.16)',
        },
        _hover: {
          borderColor: 'gray.400',
        },
      },
    },
    Modal: {
      baseStyle: {
        overlay: {
          bg: 'blackAlpha.600',
          backdropFilter: 'blur(4px)',
        },
        dialog: {
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)',
          border: '1px solid',
          borderColor: 'gray.200',
          maxW: '5xl',
        },
        header: {
          borderBottom: '1px solid',
          borderColor: 'gray.200',
          pb: 3,
          fontWeight: '700',
          fontSize: '18px',
        },
        footer: {
          borderTop: '1px solid',
          borderColor: 'gray.200',
          pt: 4,
        },
      },
    },
    Table: {
      baseStyle: {
        th: {
          fontWeight: '600',
          textTransform: 'uppercase',
          fontSize: '11px',
          letterSpacing: '0.5px',
          color: 'gray.500',
          borderColor: 'gray.200',
          bg: 'gray.50',
        },
        td: {
          borderColor: 'gray.200',
          fontSize: '14px',
        },
        tr: {
          transition: 'all 0.2s ease-in-out',
          _hover: {
            bg: 'gray.50',
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: '6px',
        px: 2,
        py: 1,
        fontWeight: '500',
        fontSize: '12px',
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'var(--chakra-colors-chakra-body-bg, #F8FAFC)',
        color: `var(--chakra-colors-chakra-body-text, ${SNPC_TEXT})`,
        fontFamily: 'Inter, sans-serif',
      },
      '*::placeholder': {
        color: 'gray.400',
      },
    },
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

export default theme;
