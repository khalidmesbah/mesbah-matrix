'use client';
import useWidgetsStore from '@/lib/stores/widgets';
import { v4 as uuidv4 } from 'uuid';
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { setLayouts } from '@/lib/server-actions/widgets';
import { useMutation } from '@tanstack/react-query';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Component, Lock, LockOpen, Plus, Save, Settings2 } from 'lucide-react'; // Importing Lucide icons
import { useRef, useState } from 'react';
import { Layouts } from 'react-grid-layout';

const FloatingDock = () => {
  return (
    <div className="fixed bottom-2 left-[50%] flex w-fit translate-x-[-50%] items-center justify-center">
      <FloatingDockDesktop />
      {/* <FloatingDockMobile /> */}
    </div>
  );
};

// const FloatingDockMobile = () => {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className={cn('relative block md:hidden', className)}>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             layoutId="nav"
//             className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
//           >
//             {items.map((item, idx) => (
//               <motion.div
//                 key={item.title}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   y: 10,
//                   transition: {
//                     delay: idx * 0.05,
//                   },
//                 }}
//                 transition={{ delay: (items.length - 1 - idx) * 0.05 }}
//               >
//                 <Link
//                   href={item.href}
//                   key={item.title}
//                   className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50"
//                 >
//                   <div className="h-4 w-4">{item.icon}</div>
//                 </Link>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50"
//       >
//         <CircleEllipsis className="h-5 w-5 text-neutral-500" />
//       </button>
//     </div>
//   );
// };

const FloatingDockDesktop = () => {
  const {
    layouts,
    addWidget,
    setDraggingItem,
    isLayoutLocked,
    setIsLayoutLocked,
    setDroppingItem,
  } = useWidgetsStore();

  const mutatation = useMutation({
    mutationFn: (newLayouts: Layouts) => setLayouts(newLayouts),
    onSuccess: () => {
      console.log('success');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const saveLayouts = () => {
    mutatation.mutate(layouts);
  };

  const uuid = uuidv4();
  const items = [
    {
      title: 'Add',
      icon: (
        <div
          draggable={true}
          unselectable="on"
          className="h-full w-full"
          onDragStart={(e) => {
            setDroppingItem({ i: `ayah|${uuid}`, w: 10, h: 20 });
            e.dataTransfer.setData('text/plain', ''); // for firefox!! (check if it applies on the kanban board)
          }}
          onDragEnd={() => {
            setDroppingItem(undefined);
          }}
        >
          <Plus className="h-full w-full p-2 text-foreground/60" />
        </div>
      ),
    },
    {
      title: 'Widgets',
      icon: <Component className="h-full w-full p-2 text-foreground/60" />,
      href: '#',
    },
    {
      title: isLayoutLocked ? 'Unlock' : 'Lock',
      icon: isLayoutLocked ? (
        <LockOpen
          onClick={() => setIsLayoutLocked(false)}
          className="h-full w-full p-2 text-foreground/60"
        />
      ) : (
        <Lock
          onClick={() => setIsLayoutLocked(true)}
          className="h-full w-full p-2 text-foreground/60"
        />
      ),
    },
    {
      title: 'Save',
      icon: <Save onClick={saveLayouts} className="h-full w-full p-2 text-foreground/60" />,
    },
    {
      title: 'Settings',
      icon: <Settings2 className="h-full w-full p-2 text-foreground/60" />,
    },
  ];

  let mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={'mx-auto hidden h-14 items-end gap-4 rounded-md bg-card p-2 md:flex'}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 60, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [40, 50, 60]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [40, 50, 60]);

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex aspect-square items-center justify-center rounded-full bg-background"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 2, x: '-50%' }}
            className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md bg-card px-2 py-0.5 text-xs text-foreground"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex h-full items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
}

export default FloatingDock;
