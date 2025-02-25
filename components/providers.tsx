'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { ReactNode, useState } from 'react';

const themes = [
  'red-dark',
  'rose-dark',
  'orange-dark',
  'green-dark',
  'blue-dark',
  'yellow-dark',
  'violet-dark',
  'zinc-dark',
  'slate-dark',
  'stone-dark',
  'gray-dark',
  'neutral-dark',
  'red-light',
  'rose-light',
  'orange-light',
  'green-light',
  'blue-light',
  'yellow-light',
  'violet-light',
  'zinc-light',
  'slate-light',
  'stone-light',
  'gray-light',
  'neutral-light',
];

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="green-dark"
      themes={themes}
      enableColorScheme
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
