import AnalogClock from '@/components/widgets/analog-clock';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Focus',
  description: 'A simple analog clock to help you focus on the present moment.',
};

export default function FocusPage() {
  return <AnalogClock />;
}

// add the do quadrant here
