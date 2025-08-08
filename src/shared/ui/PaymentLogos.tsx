import React from 'react';

export const CreditCardLogo: React.FC<{ width?: number; height?: number }> = ({ width, height = 24 }) => (
  <svg style={{ width: width ? `${width}px` : '100%', height }} viewBox="0 0 64 24" role="img" aria-label="Cards" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <rect x="0" y="0" width="30" height="24" rx="4" fill="#1a1f71" />
    <text x="6" y="16" fontFamily="Arial, Helvetica, sans-serif" fontSize="10" fill="#fff">VISA</text>
    <rect x="34" y="0" width="30" height="24" rx="4" fill="#eb001b" />
    <circle cx="49" cy="12" r="9" fill="#f79e1b" opacity="0.85" />
    <circle cx="44" cy="12" r="9" fill="#ff5f5f" opacity="0.85" />
  </svg>
);

export const PayPalLogo: React.FC<{ width?: number; height?: number }> = ({ width, height = 24 }) => (
  <svg style={{ width: width ? `${width}px` : '100%', height }} viewBox="0 0 72 24" role="img" aria-label="PayPal" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <defs>
      <linearGradient id="ppg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#253B80" />
        <stop offset="100%" stopColor="#179BD7" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="72" height="24" rx="4" fill="url(#ppg)" />
    <text x="10" y="16" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold" fontSize="10" fill="#fff">PayPal</text>
  </svg>
);


