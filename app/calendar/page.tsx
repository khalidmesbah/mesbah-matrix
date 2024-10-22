import AnonCalendarPage from '@/app/calendar/_components/anon/page';
import UserCalendarPage from '@/app/calendar/_components/user/page';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Calendar',
  description: 'View and manage your calendar events.',
};

export default async function CalendarPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserCalendarPage /> : <AnonCalendarPage />;
}
