'use client';

import CloudLoader from '@/components/cloud-loader';
import { getLayouts } from '@/lib/server-actions/widgets';
import useWidgetsStore from '@/lib/stores/widgets';
import { BreakpointT } from '@/lib/types/widgets';
import { useQuery } from '@tanstack/react-query';
import { Frame, Lock, LockOpen, Move, X } from 'lucide-react';
import { useEffect } from 'react';
import { Layout, Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import FloatingDock from './floating-dock';
import Widget from './widget';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function GridLayout({ isAuthenticated }: { isAuthenticated: boolean }) {
  const {
    layouts,
    currentBreakpoint,
    compactType,
    isLayoutLocked,
    droppingItem,
    setLayouts,
    setCurrentBreakpoint,
    setIsLayoutLocked,
    setDroppingItem,
  } = useWidgetsStore();

  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['layouts'],
    queryFn: () => getLayouts() as Promise<Layouts>,
    initialData: undefined,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (queryData && isAuthenticated) {
      setLayouts(queryData);
    }
  }, [queryData, isAuthenticated, setLayouts]); // Add setLayouts to dependencies

  if (isAuthenticated && error) return <div>Error: {error.message}</div>;
  if ((isAuthenticated && isLoading) || (isLoading && !queryData)) return <CloudLoader />;

  console.log(`isAuthenticated`, isAuthenticated);
  console.log(`queryData`, queryData);
  console.log(`layouts`, layouts);

  const onLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    console.log(`currentLayout`, currentLayout);
    const newLayouts = structuredClone(allLayouts);
    Object.keys(newLayouts).forEach((key) => {
      newLayouts[key] = newLayouts[key].filter((item) => item.i !== '__dropping-elem__');
    });
    setLayouts(newLayouts);
  };

  const onBreakpointChange = (breakpoint: BreakpointT) => {
    setCurrentBreakpoint(breakpoint);
  };

  const handleDeleteWidget = (i: string) => {
    console.log(`i`, i);
    const newLayouts = structuredClone(layouts);
    Object.keys(newLayouts).forEach((key) => {
      newLayouts[key] = newLayouts[key].filter((existingItem) => existingItem.i !== i);
    });
    setLayouts(newLayouts);
  };

  const onDrop = (layout: Layout[], item: Layout, e: Event) => {
    if (!item || item.i === '__dropping-elem__') return;
    const newLayouts = structuredClone(layouts);
    setIsLayoutLocked(false);

    Object.keys(newLayouts).map((key: string) => {
      const newItem = newLayouts[key].find((prvItem) => prvItem.i === item.i);

      if (newItem) {
        newItem.minW = 6;
        newItem.minH = 12;
        newItem.x = item.x;
        newItem.y = item.y;
        newItem.w = item.w;
        newItem.h = item.h;
      } else {
        let NItem: Layout = {
          minW: 6,
          minH: 12,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
          i: item.i,
        };
        newLayouts[key].push(NItem);
      }
    });
    setLayouts(newLayouts);
  };

  return (
    <div className="h-full w-full overflow-auto rounded-md">
      <ResponsiveReactGridLayout
        rowHeight={1}
        maxRows={Infinity}
        width={5000}
        autoSize={true}
        cols={{ lg: 168, md: 160, sm: 152, xs: 144, xxs: 136 }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        containerPadding={[8, 8]}
        margin={[8, 8]}
        layouts={layouts}
        measureBeforeMount={false}
        useCSSTransforms={true}
        compactType={compactType}
        draggableCancel={'#remove, #lock, #lock-open, #fit-widget'}
        draggableHandle={'#react-grid-item-handle'}
        preventCollision={!compactType}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        allowOverlap={false}
        onDrop={onDrop}
        onDragStart={() => {
          setDroppingItem(undefined);
        }}
        isBounded={false}
        droppingItem={droppingItem}
        isDraggable={!isLayoutLocked}
        isResizable={!isLayoutLocked}
        isDroppable={true}
        className={`h-full min-h-screen w-[5000px] rounded-md bg-primary`}
        verticalCompact={undefined}
        resizeHandle={
          <div className="react-resizable-handle absolute bottom-0 right-0 size-5 cursor-se-resize mix-blend-difference after:!border-foreground" />
        }
      >
        {layouts[currentBreakpoint].map((item: Layout) => {
          const isWidgetLocked = item.static || isLayoutLocked;
          return (
            <div
              key={item.i}
              className={`group relative overflow-hidden rounded-md bg-card shadow`}
            >
              <div
                id="react-grid-item-handle"
                className={`absolute left-0 right-0 z-[10] flex h-0 w-full self-start ${!isWidgetLocked && 'cursor-move'} gap-1 overflow-hidden bg-card p-0 transition-all duration-200 group-hover:h-7 group-hover:border-b-2 group-hover:p-1`}
              >
                <Move className={`${isWidgetLocked && 'hidden'} size-5`} />

                {isWidgetLocked ? (
                  <Lock
                    id="lock"
                    className="absolute left-1/2 size-5 -translate-x-1/2 transform cursor-pointer rounded-full bg-primary p-1 text-xl text-primary-foreground shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary/90"
                    onClick={() => {
                      const newLayouts = structuredClone(layouts);
                      const newItem = newLayouts[currentBreakpoint].find(
                        (prvItem) => prvItem.i === item.i,
                      )!;
                      newItem.static = false;
                      setIsLayoutLocked(false);
                      setLayouts(newLayouts);
                    }}
                  />
                ) : (
                  <LockOpen
                    id="lock-open"
                    className="absolute left-1/2 size-5 -translate-x-1/2 transform cursor-pointer rounded-full bg-secondary p-1 text-xl text-secondary-foreground shadow-md transition-all duration-300 ease-in-out hover:scale-110 hover:bg-secondary/90"
                    onClick={() => {
                      const newLayouts = structuredClone(layouts);
                      const newItem = newLayouts[currentBreakpoint].find(
                        (prvItem) => prvItem.i === item.i,
                      )!;
                      newItem.static = true;
                      setLayouts(newLayouts);
                    }}
                  />
                )}
                <X
                  onClick={() => handleDeleteWidget(item.i)}
                  id="remove"
                  className="ml-auto size-5 cursor-pointer rounded-full bg-destructive p-1 text-xl text-white hover:bg-destructive/90"
                />
                <Frame
                  id="fit-widget"
                  onClick={(e) => {
                    if (isWidgetLocked) return;
                    const itemEl = e.currentTarget.parentElement?.parentElement;
                    if (itemEl) {
                      const child = itemEl.children[1].children[0];

                      const newLayouts = structuredClone(layouts);
                      const newItem = newLayouts[currentBreakpoint].find(
                        (prvItem) => prvItem.i === item.i,
                      )!;
                      const newH =
                        (child.getBoundingClientRect().height * newItem.h) /
                        child.parentElement?.getBoundingClientRect().height!;
                      const newW =
                        (child.getBoundingClientRect().width * newItem.w) /
                        child.parentElement?.getBoundingClientRect().width!;
                      newItem.h = Math.max(newH, 12);
                      newItem.w = Math.max(newW, 6);
                      setLayouts(newLayouts);
                    }
                  }}
                  className="size-5 cursor-pointer rounded-full bg-accent p-1 text-xl text-white hover:bg-accent/90"
                />
              </div>
              <div className="absolute h-full w-full overflow-auto">
                <Widget id={item.i} isAuthenticated={isAuthenticated} />
              </div>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>

      <FloatingDock />
    </div>
  );
}
