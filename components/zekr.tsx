'use client';

import { Button } from '@/components/ui/button';
import { ZekrType } from '@/types';
import { motion } from 'framer-motion';
import { Check, RotateCcw } from 'lucide-react';
import { useState } from 'react';

// TODO: copy button
// TODO: share button

export default function Zekr({ zekr }: { zekr: ZekrType }) {
  const [count, setCount] = useState(0);
  const increaseCount = () => {
    if (count >= zekr.count) return;
    setCount(count + 1);
  };
  const resetCount = () => setCount(0);
  const finish = () => {
    setCount(zekr.count);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.98 }}
      className="flex cursor-pointer select-none gap-1 rounded-md border border-border bg-card p-1"
    >
      <p
        dir="rtl"
        className={`${count === zekr.count && 'line-through'} flex-1`}
        onMouseDown={increaseCount}
      >
        {zekr.zekr}
      </p>
      <div className="flex flex-col justify-between gap-1">
        <Button onMouseDown={increaseCount} className="flex-1">
          {count}/{zekr.count}
        </Button>
        <div className="space-x-1">
          <Button onMouseDown={resetCount}>
            <RotateCcw />
          </Button>
          <Button>
            <Check onMouseDown={finish} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
