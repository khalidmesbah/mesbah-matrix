"use client";

import { Button } from "@/components/ui/button";
import { Check, RotateCcw, SkipForward } from "lucide-react";
import { useState } from "react";
import { ZekrType } from "@/types";
import { motion } from "framer-motion";

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
      className="flex gap-1 p-1 bg-card border border-border rounded-md cursor-pointer select-none"
    >
      <p
        dir="rtl"
        className={`${count === zekr.count && "line-through"} flex-1`}
        onMouseDown={increaseCount}
      >
        {zekr.zekr}
      </p>
      <div className="flex flex-col gap-1 justify-between">
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
