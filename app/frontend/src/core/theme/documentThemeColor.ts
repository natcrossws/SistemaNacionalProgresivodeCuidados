/** Colores sólidos alineados con Chakra (topbar / fondos) para <meta name="theme-color"> */

/** Shell app: fondo neutro (`brand.50` / slate-50) */
export const THEME_COLOR_APP_SHELL = '#F8FAFC';

/** Shell plano por rol = marca primaria (`brand.500`) */
export const THEME_COLOR_ROLE_SHELL_FLAT = '#475569';

/** Barra del sistema (theme-color): mismo tono que `LoginPageNavbar`. */
export const THEME_COLOR_LOGIN_NAVBAR = THEME_COLOR_ROLE_SHELL_FLAT;

/** Pantallas auth/marketing con fondo oscuro neutro */
export const THEME_COLOR_AUTH_SURFACE = '#0F172A';

/** Rutas oscuras: si cambias esta lista, sincroniza `index.html` (script theme-color inline). */
const DARK_ROUTE_PREFIXES = [
  '/change-password',
  '/planes',
  '/registro-institucion',
  '/succes-subscription',
  '/aceptacion-documentos',
  '/aviso-privacidad',
  '/test-passkeys',
  '/test-audio',
];

/** Rutas con layout de app (topbar + sidebar planos). */
const ROLE_SHELL_PREFIXES = ['/admin', '/profesor', '/padre', '/alumno'];

function pathMatchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** Shell plano marca en áreas por rol (topbar + sidebar + theme-color). */
export function isRoleShellFlatPath(pathname: string): boolean {
  const path = pathname || '';
  return ROLE_SHELL_PREFIXES.some((p) => pathMatchesPrefix(path, p));
}

export function getThemeColorForPath(pathname: string): string {
  const path = pathname || '/';
  if (pathMatchesPrefix(path, '/login')) {
    return THEME_COLOR_LOGIN_NAVBAR;
  }
  if (DARK_ROUTE_PREFIXES.some((p) => pathMatchesPrefix(path, p))) {
    return THEME_COLOR_AUTH_SURFACE;
  }
  if (isRoleShellFlatPath(path)) {
    return THEME_COLOR_ROLE_SHELL_FLAT;
  }
  return THEME_COLOR_APP_SHELL;
}
