import AnonDailyRemindersPage from '@/components/daily-reminders/anon/page';
import UserDailyRemindersPage from '@/components/daily-reminders/user/page';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Daily Reminders',
  description: 'Manage your daily reminders and stay organized.',
};

export default async function KanbanPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserDailyRemindersPage /> : <AnonDailyRemindersPage />;
}
