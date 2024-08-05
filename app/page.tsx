'use client';

import { Tldraw } from 'tldraw';

import { useTheme } from 'next-themes';
import './index.css';

export default function Home() {
  const { resolvedTheme } = useTheme();
  return <Tldraw className="" inferDarkMode={resolvedTheme === 'dark'} />;
}
