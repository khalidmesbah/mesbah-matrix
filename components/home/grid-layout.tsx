'use client';

import { Component, Home, Lock, LockOpen, Move, Plus, Settings2, X } from 'lucide-react'; // Importing Lucide icons
import { useCallback, useEffect, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import FloatingDock from './floating-dock';
import GenerateWidget from './generate-widget';

// TODO:
//  - hangle on right click menu (on the grid and the cells)
//  - add some default components if users first open time to the website
const ResponsiveReactGridLayout = WidthProvider(Responsive);

function generateLayout() {
  return Array.from({ length: 10 }, (_, index) => {
    const y = Math.ceil(Math.random() * 40) + 10;
    return {
      x: (Math.floor(Math.random() * 60) * 20) % 12,
      y: Math.floor(index / 60) * y,
      w: 20,
      h: y,
      i: `analog-clock-${index + 1}`,
      static: Math.random() < 0.9,
    };
  });
}

type Breakpoint = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
type CompactType = 'vertical' | 'horizontal' | null;

export default function GridLayout({ ...props }) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [layouts, setLayouts] = useState<Layouts>({ lg: generateLayout() });
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('lg');
  const [compactType, setCompactType] = useState<CompactType>(null);
  const [draggingItem, setDraggingItem] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  // useEffect(() => {
  //   console.clear();
  //   console.log(layouts);
  // });

  const generateDOM = useCallback(() => {
    return layouts[currentBreakpoint].map((item: Layout) => {
      const name = item.i.replace(/\d+/g, '').slice(0, -1);
      const isLocked = item.static;
      return (
        <div
          key={item.i}
          className={`group overflow-hidden rounded-md bg-card shadow ${item.static ? 'border-2 border-blue-500' : ''}`}
        >
          <div
            id="react-grid-item-handle"
            className={`absolute z-[10] flex h-0 w-full cursor-move gap-1 overflow-hidden border-b-2 bg-card p-0 transition-all duration-200 group-hover:h-7 group-hover:p-1`}
          >
            <Move className={`${!item.isResizable && 'hidden'} size-5`} />

            {isLocked ? (
              <Lock
                id="lock"
                className="absolute left-1/2 size-5 -translate-x-1/2 transform cursor-pointer rounded-full bg-primary p-1 text-xl text-primary-foreground shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary/90"
                onClick={() => {
                  setLayouts((layouts) => {
                    const newLayouts = structuredClone(layouts);
                    const newItem = newLayouts[currentBreakpoint].find(
                      (prvItem) => prvItem.i === item.i,
                    )!;
                    newItem.static = false;
                    return newLayouts;
                  });
                }}
              />
            ) : (
              <LockOpen
                id="lock-open"
                className="absolute left-1/2 size-5 -translate-x-1/2 transform cursor-pointer rounded-full bg-secondary p-1 text-xl text-secondary-foreground shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-secondary/90"
                onClick={() => {
                  setLayouts((layouts) => {
                    const newLayouts = structuredClone(layouts);
                    const newItem = newLayouts[currentBreakpoint].find(
                      (prvItem) => prvItem.i === item.i,
                    )!;
                    newItem.static = true;
                    return newLayouts;
                  });
                }}
              />
            )}
            <X
              onClick={() => handleDeleteWidget(item.i)}
              id="remove"
              className="ml-auto size-5 cursor-pointer rounded-full bg-destructive p-1 text-xl text-white hover:bg-destructive/90"
            />
          </div>
          <div className="h-full w-full overflow-auto">
            <GenerateWidget name={name} />
          </div>
        </div>
      );
    });
  }, [layouts, currentBreakpoint]);

  const onBreakpointChange = useCallback((breakpoint: Breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  const links = [
    {
      title: 'Home',
      icon: <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
    },
    {
      title: 'Add',
      icon: (
        <div
          draggable
          unselectable="on"
          className="bg-red-500"
          onDragStart={() => {
            setDraggingItem('digital-clock');
          }}
          onDragEnd={() => {
            setDraggingItem('');
          }}
          onClick={() => {
            const newIndex = layouts[currentBreakpoint].length + 1;
            setLayouts((layouts) => {
              const newLayouts = structuredClone(layouts);
              newLayouts[currentBreakpoint].push({
                x: 0,
                y: 0,
                w: 20,
                h: 40,
                i: `time-passed-${newIndex}`,
                static: false,
              });
              return newLayouts;
            });
          }}
        >
          <Plus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        </div>
      ),
      href: '#',
    },
    {
      title: 'Components',
      icon: <Component className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
    },
    {
      title: 'Lock',
      icon: <Lock className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
    },
    {
      title: 'Lock Open',
      icon: <LockOpen className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
    },
    {
      title: 'Settings',
      icon: <Settings2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: '#',
    },
  ];

  const handleDeleteWidget = (i: string) => {
    setLayouts((layouts) => {
      const newLayouts = structuredClone(layouts);
      Object.keys(newLayouts).forEach((key) => {
        newLayouts[key] = newLayouts[key].filter((existingItem) => existingItem.i !== i);
      });
      return newLayouts;
    });
  };

  const onCompactTypeChange = useCallback(() => {
    setCompactType((prevType) =>
      prevType === 'horizontal' ? 'vertical' : prevType === 'vertical' ? null : 'horizontal',
    );
  }, []);

  const handleLayoutChange = useCallback((layout, layouts) => {
    setLayouts(layouts);
  }, []);

  const onDrop = (layout: Layout[], item: Layout, e: Event) => {
    console.log(layout, item, `---`);
    if (draggingItem.trim() === '') {
      return;
    }

    const newIndex = layouts.lg.length + 1;
    setLayouts((layouts) => {
      const newLayouts = structuredClone(layouts);
      newLayouts.lg.push({
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        i: `${draggingItem}-${newIndex}`,
        static: false,
      });
      return newLayouts;
    });
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ResponsiveReactGridLayout
        rowHeight={0.01}
        autoSize={true}
        cols={{ lg: 48, md: 40, sm: 32, xs: 24, xxs: 16 }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        containerPadding={[8, 8]}
        layouts={layouts}
        measureBeforeMount={false}
        useCSSTransforms={true}
        compactType={compactType}
        draggableCancel={'#remove, #lock, #lock-open'}
        draggableHandle={'#react-grid-item-handle'}
        preventCollision={!compactType}
        onLayoutChange={handleLayoutChange}
        onBreakpointChange={onBreakpointChange}
        onDropDragOver={() => {
          return { w: 4, h: 7 };
        }}
        allowOverlap={false}
        onDrop={onDrop}
        isBounded={false}
        isDraggable={true}
        isResizable={true}
        isDroppable={true}
        className={`min-h-[calc(100vh-16px)] overflow-auto rounded-md bg-primary`}
        verticalCompact={undefined}
        resizeHandle={
          <div className="react-resizable-handle absolute bottom-1 right-1 size-5 cursor-se-resize mix-blend-difference after:!border-foreground" />
        }
        {...props}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>

      <FloatingDock items={links} />
    </>
  );
}
