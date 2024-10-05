import AnonTasksPage from '@/components/tasks/anon/page';
import UserTasksPage from '@/components/tasks/user/page';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'Browse and search for tasks',
};

export default async function TasksPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserTasksPage /> : <AnonTasksPage />;
}
