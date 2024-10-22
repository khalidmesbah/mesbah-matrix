'use client';

import Icon from '@/components/icon';
import useQuranStore from '@/stores/quran';
import { Repeat, Repeat1 } from 'lucide-react';

export default function Mode() {
  const {
    settings: { mode },
    setMode,
  } = useQuranStore((state) => state);
  return (
    <div>
      {mode === 'once' ? (
        <Icon
          description="Repeat once mode"
          onClick={() => setMode('continuous')}
          icon={<Repeat />}
          className="opacity-50"
        />
      ) : mode === 'continuous' ? (
        <Icon description="Continuous mode" onClick={() => setMode('loop')} icon={<Repeat />} />
      ) : (
        <Icon description="Repeat mode" onClick={() => setMode('once')} icon={<Repeat1 />} />
      )}
    </div>
  );
}
