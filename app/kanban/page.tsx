import AnonKanbanPage from '@/app/kanban/_components/anon/page';
import UserKanbanPage from '@/app/kanban/_components/user/page';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'A kanban board for managing tasks.',
};

export default async function KanbanPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserKanbanPage /> : <AnonKanbanPage />;
}
