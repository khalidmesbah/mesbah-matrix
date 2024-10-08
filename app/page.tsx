import GridLayout from '@/components/home/grid-layout';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dynamic Grid Dashboard',
  description:
    'A customizable and interactive grid-based dashboard where users can drag, drop, lock, resize, and remove widgets. The interface allows for flexible layout management with smooth drag-and-drop functionality.',
};

export default async function TasksPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return <GridLayout />;
}
