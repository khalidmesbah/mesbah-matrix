import TimeSinceBirth from '@/components/widgets/time-passed';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Focus',
  description: 'A simple analog clock to help you focus on the present moment.',
};

export default function FocusPage() {
  return <TimeSinceBirth />;
}

// add the do quadrant here
