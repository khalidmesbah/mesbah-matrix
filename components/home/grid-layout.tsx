'use client';

import _ from 'lodash';
import { Component, Home, Lock, LockOpen, Plus, Settings2, X } from 'lucide-react'; // Importing Lucide icons
import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Button } from '../ui/button';
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
    lg: _.map(_.range(0, 10), function (_item, index, list) {
      var y = Math.ceil(Math.random() * 4) + 1;
      return {
        i: `digital-clock-${index + 1}`,
        x: (_.random(0, 5) * 2) % 12,
        y: Math.floor(index / 6) * y,
        w: 4,
        h: y,
        static: Math.random() < 0.5,
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
    console.log(layouts);
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

  // const handleDragStart = (layout, oldItem, newItem, placeholder, e, element) => {
  //   console.log('Started dragging item with id:', oldItem.i);
  // };
  //
  // const handleDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
  //   console.log('Stopped dragging item with id:', oldItem.i);
  //   // Update the layout state or perform other actions
  // };
  //
  // const handleResizeStop = (layout, oldItem, newItem, placeholder, e, element) => {
  //   console.log('Resized item with id:', oldItem.i);
  //   // Update the layout state or perform other actions
  // };

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

  const onLayoutChange = (layout: any, layouts: any) => {
    setLayouts((prevLayouts) => {
      // Only update if layouts have changed
      return JSON.stringify(prevLayouts) !== JSON.stringify(layouts) ? { ...layouts } : prevLayouts;
    });
  };
  const onDrop = (layout, newElement, e) => {
    // console.clear();
    console.log('props are');
    console.log(props);

    if (draggingItem.trim() === '') {
      return;
    }

    const newIndex = layouts.lg.length + 1;
    setLayouts((layouts) => {
      const newLayouts = structuredClone(layouts);
      Object.keys(newLayouts).map((key) => {
        newLayouts[key].push({
          x: newElement.x,
          y: newElement.y,
          w: newElement.w,
          h: newElement.h,
          i: `${draggingItem}-${newIndex}`,
          static: false,
        });
      });
      return newLayouts;
    });
  };

  const onDragOver = (...props: any) => {
    console.log(`-------------`);
    console.log(props);
    console.log(`-------------`);
    return { w: 4, h: 7 };
  };

  const handleDeleteWidget = (i: string) => {
    setLayouts((prevLayouts) => {
      // Create a new layouts object to avoid mutating the previous state directly
      const newLayouts = structuredClone(prevLayouts);

      // Filter out the widget with the matching identifier from each layout
      Object.keys(newLayouts).forEach((key) => {
        newLayouts[key] = newLayouts[key].filter((item) => item.i !== i);
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
        // onDragStart={handleDragStart}
        // onDragStop={handleDragStop}
        // onResizeStop={handleResizeStop}
        compactType={compactType}
        preventCollision={!compactType}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        onDropDragOver={onDragOver}
        allowOverlap={false}
        // onResize={handleResize}
        // onWidthChange={handleWidthChange}
        onDrop={onDrop}
        isBounded={false}
        isDraggable={true}
        isResizable={true}
        isDroppable={true}
        className={`min-h-[calc(100vh-16px)] overflow-auto rounded-md bg-primary`}
        verticalCompact={false}
        {...props}
      >
        {layouts.lg.map((item, index) => {
          const name = item.i.replace(/\d+/g, '').slice(0, -1);
          console.log(item.i, name);
          return (
            <div key={item.i} data-grid={item} className="relative size-10 bg-card">
              <Button onClick={() => handleDeleteWidget(item.i)}>
                <X />
              </Button>
              <GenerateWidget name={name} />
            </div>
          );
        })}
      </ResponsiveReactGridLayout>

      <FloatingDock items={links} />
    </>
  );
}
