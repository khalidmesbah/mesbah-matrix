import Icon from '@/components/icon';
import { Repeat } from 'lucide-react';

export default function Page() {
  return (
    <div>
      <h1>Page</h1>
      <Icon description="Repeat once mode" icon={<Repeat />} className="opacity-50" />
    </div>
  );
}
