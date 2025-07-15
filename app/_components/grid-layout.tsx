'use client';

import { useQuery } from '@tanstack/react-query';
import { Frame, Lock, LockOpen, Move, X } from 'lucide-react';
import { useEffect } from 'react';
import { type Layout, type Layouts, Responsive, WidthProvider } from 'react-grid-layout';
import CloudLoader from '@/components/cloud-loader';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getWidgets } from '@/lib/server-actions/widgets';
import useWidgetsStore from '@/lib/stores/widgets';
import type { BreakpointT, WidgetsT } from '@/lib/types/widgets';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Button } from '@/components/ui/button';
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
    widgetStates,
    setLayouts,
    setWidgetStates,
    setCurrentBreakpoint,
    setIsLayoutLocked,
    setDroppingItem,
  } = useWidgetsStore();

  const {
    data: queryData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['widgets'],
    queryFn: () => getWidgets() as Promise<WidgetsT>,
    enabled: isAuthenticated,
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    console.log(`-----------------------------`);
    console.log(layouts, widgetStates);
    console.log(`-----------------------------`);
  });

  useEffect(() => {
    if (queryData && isAuthenticated) {
      setLayouts(queryData.layouts);
      setWidgetStates(queryData.states);
    }
  }, [queryData, isAuthenticated]);

  if (isAuthenticated && error) return <div>Error: {error.message}</div>;
  if ((isAuthenticated && isLoading) || (isLoading && !queryData)) return <CloudLoader />;

  const onLayoutChange = (_currentLayout: Layout[], allLayouts: Layouts) => {
    if (droppingItem) return;
    setLayouts(allLayouts);
  };

  const onBreakpointChange = (breakpoint: BreakpointT) => {
    setCurrentBreakpoint(breakpoint);
  };

  const handleDeleteWidget = (i: string) => {
    const newLayouts = structuredClone(layouts);
    Object.keys(newLayouts).forEach((key) => {
      newLayouts[key] = newLayouts[key].filter((existingItem) => existingItem.i !== i);
    });
    delete widgetStates[i];
    setLayouts(newLayouts);
    setWidgetStates(widgetStates);
  };

  const onDrop = (layout: Layout[]) => {
    if (!droppingItem || droppingItem.i === '__dropping-elem__') return;

    const newLayout = structuredClone(layout);
    newLayout[newLayout.length - 1].isDraggable = undefined;

    setLayouts({ [currentBreakpoint]: newLayout });
    setIsLayoutLocked(false);
    setDroppingItem(undefined);
  };

  const onResizeStop = (layout: Layout[]) => {
    setLayouts({ [currentBreakpoint]: layout });
  };

  return (
    <>
      <ResponsiveReactGridLayout
        rowHeight={1}
        maxRows={Number.POSITIVE_INFINITY}
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
        draggableCancel={'#remove, #lock-toggle, #fit-widget'}
        draggableHandle={'#react-grid-item-handle'}
        preventCollision={!compactType}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        allowOverlap={false}
        onDrop={onDrop}
        transformScale={1}
        onResizeStop={onResizeStop}
        isBounded={false}
        droppingItem={droppingItem}
        isDraggable={!isLayoutLocked}
        isResizable={!isLayoutLocked}
        isDroppable={true}
        className={`bg-primary/75 h-full! w-[5000px] rounded-md overflow-x-hidden`}
        verticalCompact={undefined}
        resizeHandle={
          <div className='react-resizable-handle absolute right-0 bottom-0 size-3! cursor-se-resize bg-none! p-0! after:hidden!'>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='5 5 24 24'>
              <title>Resize Handle</title>
              <g fill='none' stroke='hsl(var(--primary))' strokeWidth={2}>
                <path d='M10 20h10V10'></path>
                <path d='M12 17h5v-5'></path>
              </g>
            </svg>
          </div>
        }
      >
        {layouts[currentBreakpoint].map((item: Layout) => {
          const isWidgetLocked = item.static || isLayoutLocked;
          return (
            <div key={item.i}>
              <ScrollArea
                className={`fc group bg-card relative size-full rounded-md shadow-sm parent`}
              >
                <div
                  id='react-grid-item-handle'
                  className={`absolute top-0 opacity-0 right-0 left-0 z-10 flex
                  h-0 w-full ${!isWidgetLocked && 'cursor-move'} bg-card gap-1
                  overflow-hidden transition-all duration-200 group-hover:h-7
                  border-b-2 p-1 group-hover:opacity-95`}
                >
                  <Move className={`${isWidgetLocked && 'hidden'} size-5`} />

                  <Button
                    className='rounded-full size-5 cursor-pointer absolute
                    left-1/2 -translate-x-1/2 transform'
                    size='icon'
                    title='Lock/Unlock'
                    id='lock-toggle'
                    onClick={() => {
                      const newLayouts = structuredClone(layouts);
                      const newItem = newLayouts[currentBreakpoint].find(
                        (randomItem) => randomItem.i === item.i,
                      );

                      if (!newItem) return;

                      if (isWidgetLocked) {
                        newItem.static = false;
                      } else {
                        newItem.static = true;
                      }

                      setIsLayoutLocked(false);
                      setLayouts(newLayouts);
                    }}
                  >
                    {isWidgetLocked ? <Lock /> : <LockOpen />}
                  </Button>

                  <Button
                    className='rounded-full size-5 cursor-pointer ml-auto'
                    disabled={isWidgetLocked}
                    size={'icon'}
                    title='Remove Widget'
                    variant={'destructive'}
                    onClick={() => handleDeleteWidget(item.i)}
                    id='remove'
                  >
                    <X />
                  </Button>
                  <Button
                    className='rounded-full size-5 cursor-pointer'
                    disabled={isWidgetLocked}
                    size={'icon'}
                    title='Fit Widget'
                    onClick={(e) => {
                      const itemEl = e.currentTarget;
                      if (itemEl) {
                        const parent = itemEl.closest('.parent') as HTMLDivElement;
                        const child = parent.querySelector('.child-parent')
                          ?.children[0] as HTMLDivElement;

                        const newLayouts = structuredClone(layouts);
                        const newItem = newLayouts[currentBreakpoint].find(
                          (prvItem) => prvItem.i === item.i,
                        )!;

                        const newH = ((child.clientHeight + 0) * newItem.h) / parent.clientHeight;
                        const newW = ((child.clientWidth + 0) * newItem.w) / parent.clientWidth;
                        newItem.h = Math.max(Math.ceil(newH), 12);
                        newItem.w = Math.max(Math.ceil(newW), 6);

                        setLayouts(newLayouts);
                      }
                    }}
                    id='fit-widget'
                  >
                    <Frame />
                  </Button>
                </div>
                <Widget id={item.i} isAuthenticated={isAuthenticated} />
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            </div>
          );
        })}
      </ResponsiveReactGridLayout>
      <FloatingDock />
      <ScrollBar orientation='horizontal' />
    </>
  );
}
