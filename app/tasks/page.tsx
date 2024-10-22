import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';
import AnonTasksPage from './_components/anon/page';
import UserTasksPage from './_components/user/page';

export const metadata: Metadata = {
  title: 'Tasks',
  description: 'Browse and search for tasks',
};

export default async function TasksPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserTasksPage /> : <AnonTasksPage />;
}
