'use client';

import { Component, Home, Lock, LockOpen, Plus, Settings2, X } from 'lucide-react'; // Importing Lucide icons
import { useEffect, useState } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import FloatingDock from './floating-dock';
import GenerateWidget from './generate-widget';

type GridLayoutProps = {
  domElements?: any[];
};

// TODO:
//  - hangle on right click menu (on the grid and the cells)
//  - add some default components if users first open time to the website
const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function GridLayout({ domElements = [], ...props }: GridLayoutProps) {
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState<{ [index: string]: any[] }>({
    lg: Array.from({ length: 10 }, (_, index) => {
      const y = Math.ceil(Math.random() * 4) + 1;
      return {
        i: `digital-clock-${index + 1}`,
        x: (Math.floor(Math.random() * 6) * 2) % 12,
        y: Math.floor(index / 6) * y,
        w: 4,
        h: y,
        static: Math.random() < 0.0005,
      };
    }),
  });
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg');
  const [compactType, setCompactType] = useState<'vertical' | 'horizontal' | null>(null);
  const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
    lg: [],
  });
  const [draggingItem, setDraggingItem] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // console.clear();
    // console.log(layouts);
  });

  if (!mounted) {
    return null;
  }

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
            const newIndex = layouts.lg.length + 1;
            setLayouts((layouts) => {
              const newLayouts = structuredClone(layouts);
              Object.keys(newLayouts).map((key) => {
                newLayouts[key].push({
                  x: 0,
                  y: 0,
                  w: 2,
                  h: 2,
                  i: `analog-clock-${newIndex}`,
                  static: false,
                });
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

  const onBreakpointChange = (breakpoint: any) => {
    setCurrentBreakpoint(breakpoint);
    setToolbox({
      ...toolbox,
      [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || [],
    });
  };

  const onCompactTypeChange = () => {
    let oldCompactType = '';

    const compactType =
      oldCompactType === 'horizontal'
        ? 'vertical'
        : oldCompactType === 'vertical'
          ? null
          : 'horizontal';
    setCompactType(compactType);
  };

  const onLayoutChange = (layout: Layout[], layouts: Layouts) => {
    setLayouts({ ...layouts });
  };

  const onDrop = (layout: Layout[], item: Layout, e: Event) => {
    if (draggingItem.trim() === '') {
      return;
    }

    const newIndex = layouts[currentBreakpoint].length + 1;
    setLayouts((layouts) => {
      const newLayouts = structuredClone(layouts);
      Object.keys(newLayouts).map((key) => {
        newLayouts[key].push({
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          i: `${draggingItem}-${newIndex}`,
          static: false,
        });
      });
      return newLayouts;
    });
  };

  return (
    <>
      <ResponsiveReactGridLayout
        rowHeight={30}
        autoSize={true}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        containerPadding={[8, 8]}
        layouts={layouts}
        measureBeforeMount={false}
        useCSSTransforms={true}
        compactType={compactType}
        draggableCancel="#remove"
        preventCollision={!compactType}
        onLayoutChange={onLayoutChange}
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
        verticalCompact={false}
        {...props}
      >
        {layouts[currentBreakpoint].map((item) => {
          const name = item.i.replace(/\d+/g, '').slice(0, -1);
          return (
            <div key={item.i} data-grid={item} className="relative size-10 bg-card">
              <X
                id="remove"
                onClick={() => handleDeleteWidget(item.i)}
                className="absolute right-1 top-1 z-[10] size-5 cursor-pointer rounded-full bg-destructive p-1 text-xl text-white hover:bg-destructive/90"
              />
              <GenerateWidget name={name} />
            </div>
          );
        })}
      </ResponsiveReactGridLayout>

      <FloatingDock items={links} />
    </>
  );
}
