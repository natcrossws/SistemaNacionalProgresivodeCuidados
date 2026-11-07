import React from 'react';
import { keyframes } from '@emotion/react';
import { Box, Icon } from '@chakra-ui/react';
import {
  BiHome,
  BiUser,
  BiGroup,
  BiShield,
  BiHeart,
  BiFile,
  BiBuildings,
  BiCheckCircle,
} from 'react-icons/bi';

const meshShift = keyframes`
  0%   { opacity: 1; transform: scale(1) translate(0, 0); }
  50%  { opacity: 0.92; transform: scale(1.03) translate(1.5%, -1%); }
  100% { opacity: 1; transform: scale(1) translate(0, 0); }
`;
const orbDriftA = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  40%       { transform: translate(5vw, -3vh) scale(1.06); }
  70%       { transform: translate(-3vw, 2vh) scale(0.97); }
`;
const orbDriftB = keyframes`
  0%, 100% { transform: translate(0, 0) scale(1); }
  45%       { transform: translate(-4vw, 4vh) scale(1.05); }
  75%       { transform: translate(3vw, -2vh) scale(0.95); }
`;
const iconDrift = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(-4deg); opacity: 0.18; }
  33%       { transform: translate3d(8px, -10px, 0) rotate(4deg); opacity: 0.32; }
  66%       { transform: translate3d(-6px, 8px, 0) rotate(-2deg); opacity: 0.24; }
`;
const waveSlide = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const FLOATING = [
  { Cmp: BiHome,        top: '10%', left: '8%',  size: 6, dur: '18s', delay: '0s' },
  { Cmp: BiUser,        top: '22%', left: '82%', size: 6, dur: '20s', delay: '0.6s' },
  { Cmp: BiGroup,       top: '40%', left: '6%',  size: 7, dur: '19s', delay: '1.2s' },
  { Cmp: BiShield,      top: '48%', left: '88%', size: 6, dur: '21s', delay: '0.4s' },
  { Cmp: BiHeart,       top: '68%', left: '14%', size: 6, dur: '17s', delay: '1.8s' },
  { Cmp: BiFile,        top: '72%', left: '78%', size: 6, dur: '22s', delay: '0.9s' },
  { Cmp: BiBuildings,   top: '16%', left: '48%', size: 6, dur: '23s', delay: '1.4s' },
  { Cmp: BiCheckCircle, top: '58%', left: '46%', size: 7, dur: '20s', delay: '2s' },
];

const WAVE =
  'M0,100 C200,52 600,148 800,100 C1000,52 1400,148 1600,100 C1800,52 2200,148 2400,100 L2400,220 L0,220 Z';

function LoginWaves() {
  const rid = React.useId().replace(/:/g, '');
  const gDeep = `wDeep_${rid}`;
  const gMid = `wMid_${rid}`;

  return (
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      h={{ base: '120px', md: '160px' }}
      overflow="hidden"
      pointerEvents="none"
      zIndex={1}
      lineHeight={0}
    >
      <Box
        position="absolute"
        bottom="-2px"
        left={0}
        w="200%"
        h="100%"
        opacity={0.55}
        sx={{ animation: `${waveSlide} 30s linear infinite` }}
      >
        <Box as="svg" viewBox="0 0 4800 220" width="100%" height="200px" display="block" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gDeep} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path fill={`url(#${gDeep})`} d={WAVE} />
          <path fill={`url(#${gDeep})`} d={WAVE} transform="translate(2400,0)" />
        </Box>
      </Box>

      <Box
        position="absolute"
        bottom="-2px"
        left={0}
        w="200%"
        h="88%"
        opacity={0.28}
        sx={{ animation: `${waveSlide} 22s linear infinite reverse` }}
      >
        <Box as="svg" viewBox="0 0 4800 220" width="100%" height="200px" display="block" preserveAspectRatio="none">
          <defs>
            <linearGradient id={gMid} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#64748B" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path fill={`url(#${gMid})`} d={WAVE} />
          <path fill={`url(#${gMid})`} d={WAVE} transform="translate(2400,0)" />
        </Box>
      </Box>
    </Box>
  );
}

/** Fondo animado de login con paleta slate neutra. */
const LoginAnimatedBackground = () => (
  <Box
    position="absolute"
    inset={0}
    zIndex={0}
    overflow="hidden"
    bg="#0F172A"
    sx={{
      '@media (prefers-reduced-motion: reduce)': {
        '& *': { animation: 'none !important' },
      },
    }}
  >
    <Box
      position="absolute"
      inset={0}
      bgGradient="linear(to-br, #020617 0%, #0F172A 28%, #1E293B 55%, #334155 78%, #0F172A 100%)"
    />
    <Box
      position="absolute"
      inset={0}
      bgGradient="linear(to-tr, rgba(71,85,105,0.22) 0%, transparent 40%, transparent 70%, rgba(148,163,184,0.12) 100%)"
      animation={`${meshShift} 20s ease-in-out infinite`}
    />

    <LoginWaves />

    <Box
      position="absolute"
      top="-12%"
      left="-8%"
      w="50vw"
      h="50vw"
      maxW="480px"
      maxH="480px"
      borderRadius="full"
      bg="radial-gradient(circle, rgba(100,116,139,0.28) 0%, rgba(51,65,85,0.16) 45%, transparent 70%)"
      filter="blur(48px)"
      animation={`${orbDriftA} 24s ease-in-out infinite`}
    />
    <Box
      position="absolute"
      bottom="-16%"
      right="-10%"
      w="55vw"
      h="45vw"
      maxW="520px"
      maxH="440px"
      borderRadius="full"
      bg="radial-gradient(circle, rgba(148,163,184,0.18) 0%, rgba(71,85,105,0.12) 42%, transparent 68%)"
      filter="blur(52px)"
      animation={`${orbDriftB} 28s ease-in-out infinite`}
    />

    <Box
      position="absolute"
      inset={0}
      bgGradient="radial(circle at 50% 45%, transparent 0%, rgba(2,6,23,0.45) 100%)"
      pointerEvents="none"
    />

    {FLOATING.map(({ Cmp, top, left, size, dur, delay }, i) => (
      <Box
        key={`${i}-${top}-${left}`}
        position="absolute"
        top={top}
        left={left}
        lineHeight={0}
        pointerEvents="none"
        animation={`${iconDrift} ${dur} ease-in-out infinite`}
        style={{ animationDelay: delay }}
      >
        <Icon as={Cmp} boxSize={`${size * 4}px`} color="rgba(226,232,240,0.28)" />
      </Box>
    ))}
  </Box>
);

export default LoginAnimatedBackground;
