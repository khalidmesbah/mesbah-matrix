'use client';

import Icon from '@/components/icon';
import { setLayouts } from '@/lib/server-actions/widgets';
import useWidgetsStore from '@/lib/stores/widgets';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Lock, LockOpen, Save, Settings2 } from 'lucide-react'; // Importing Lucide icons
import { Layouts } from 'react-grid-layout';
import WidgetsSlider from './widgets-slider';

export default function FloatingDock() {
  const { layouts, isLayoutLocked, setIsLayoutLocked } = useWidgetsStore();
  const queryClient = useQueryClient();

  const mutatation = useMutation({
    mutationFn: (newLayouts: Layouts) => setLayouts(newLayouts),
    onSuccess: () => {
      console.log('success');
      queryClient.invalidateQueries({ queryKey: ['layouts'] });
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const saveLayouts = () => {
    mutatation.mutate(layouts);
  };

  return (
    <div
      className={
        'fc fixed bottom-4 left-[50%] w-fit translate-x-[-50%] gap-1 rounded-full bg-card p-1'
      }
    >
      <WidgetsSlider />
      {isLayoutLocked ? (
        <Icon
          key={'unlocked'}
          icon={<LockOpen />}
          onClick={() => setIsLayoutLocked(false)}
          size="icon"
          description={'Unlocked'}
          className="!size-10 rounded-full [&>svg]:!size-5"
        />
      ) : (
        <Icon
          key={'locked'}
          icon={<Lock />}
          onClick={() => setIsLayoutLocked(true)}
          size="icon"
          description={'Locked'}
          className="!size-10 rounded-full [&>svg]:!size-5"
        />
      )}
      <Icon
        key={'save'}
        icon={<Save />}
        onClick={saveLayouts}
        size="icon"
        description={'Save'}
        className="!size-10 rounded-full [&>svg]:!size-5"
      />
      <Icon
        key={'settings'}
        icon={<Settings2 />}
        size="icon"
        description={'Settings'}
        className="!size-10 rounded-full [&>svg]:!size-5"
      />
    </div>
  );
}
