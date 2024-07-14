import AnonKanbanPage from '@/components/kanban/anon/page';
import UserKanbanPage from '@/components/kanban/user/page';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export default async function KanbanPage() {
  const { isAuthenticated: getIsAuthenticated } = getKindeServerSession();
  const isAuthenticated = await getIsAuthenticated();

  return isAuthenticated ? <UserKanbanPage /> : <AnonKanbanPage />;
}
