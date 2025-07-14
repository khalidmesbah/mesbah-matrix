'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { type Layout, Responsive, WidthProvider } from 'react-grid-layout';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Toggle } from '@/components/ui/toggle';
import usePortalioStore from '@/lib/stores/portalio';
import type { FolderStateT, WebsiteStateT } from '@/lib/types/portalio';
import 'react-grid-layout/css/styles.css';
import { useForm } from 'react-hook-form';
import 'react-resizable/css/styles.css';
import 'swiper/css';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import * as z from 'zod';
import { Folder } from './_components/folder';
import NoSlides from './_components/no-slides';
import { Website } from './_components/website';

// Zod schema for folder form
const slideFormSchema = z.object({
  name: z.string().min(1, 'slide name is required'),
});

// Zod schema for folder form
const folderFormSchema = z.object({
  name: z.string().min(1, 'Folder name is required'),
  iconUrl: z.string().url('Must be a valid URL').or(z.string().length(0)),
});

// Zod schema for website form
const websiteFormSchema = z.object({
  name: z.string().min(1, 'Website name is required'),
  iconUrl: z.string().url('Must be a valid URL').or(z.string().length(0)),
  url: z.string().url('Must be a valid URL').min(1, 'Website URL is required'),
});

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export default function PortalioPage() {
  const {
    slides,
    currentSlideId,
    setCurrentSlideId,
    addSlide,
    updateSlideName,
    deleteSlide,
    slidesStates,
    addFolder,
    addWebsite,
    reOrder,
    setReOrder,
  } = usePortalioStore();

  // Slide form with Zod validation
  const addSlideForm = useForm<z.infer<typeof slideFormSchema>>({
    resolver: zodResolver(slideFormSchema),
    defaultValues: {
      name: '',
    },
  });
  const editSlideForm = useForm<z.infer<typeof slideFormSchema>>({
    resolver: zodResolver(slideFormSchema),
    defaultValues: {
      name: '',
    },
  });

  // Folder form with Zod validation
  const addFolderForm = useForm<z.infer<typeof folderFormSchema>>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: {
      name: '',
      iconUrl: '',
    },
  });
  const editFolderForm = useForm<z.infer<typeof folderFormSchema>>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: {
      name: '',
      iconUrl: '',
    },
  });

  // Website form with Zod validation
  const addWebsiteForm = useForm<z.infer<typeof websiteFormSchema>>({
    resolver: zodResolver(websiteFormSchema),
    defaultValues: {
      name: '',
      iconUrl: '',
      url: '',
    },
  });

  // Form submit handlers
  const onAddSlideSubmit = (data: z.infer<typeof slideFormSchema>) => {
    setAddSlideDialogOpen(false);
    addSlide(data.name);
    addSlideForm.reset();
  };

  const onEditSlideSubmit = (data: z.infer<typeof slideFormSchema>) => {
    setEditSlideDialogOpen(false);
    updateSlideName(currentSlideId as string, data.name);
    editSlideForm.reset();
  };

  const onAddFolderSubmit = (data: z.infer<typeof folderFormSchema>) => {
    setAddFolderDialogOpen(false);
    addFolder({ ...data, websites: [] });
    addFolderForm.reset();
  };

  const onAddWebsiteSubmit = (data: z.infer<typeof websiteFormSchema>) => {
    setAddWebsiteDialogOpen(false);
    addWebsite(data);
    addWebsiteForm.reset();
  };

  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');
  const [addSlideDialogOpen, setAddSlideDialogOpen] = useState(false);
  const [editSlideDialogOpen, setEditSlideDialogOpen] = useState(false);
  const [deleteSlideDialogOpen, setDeleteSlideDialogOpen] = useState(false);
  const [addFolderDialogOpen, setAddFolderDialogOpen] = useState(false);
  const [addWebsiteDialogOpen, setAddWebsiteDialogOpen] = useState(false);

  useEffect(() => {
    // console.clear();
    // console.log(Object.keys(slides).map((e) => slides[e].name));
    // console.log(slides);
    // if (currentSlideId) console.log(slides[currentSlideId as string].name);
    // console.log(reOrder);
  });
  const swiper = useSwiper();

  useEffect(() => {
    if (!swiper) return;
    // console.log(slides);
    swiper.update();
  }, [slides]);

  return (
    <div className="h-full">
      {Object.keys(slides).length === 0 ? (
        <NoSlides />
      ) : (
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          className="relative flex size-full rounded-md"
          noSwipingClass="no-swiping"
          preventClicks={true}
          preventClicksPropagation={true}
          onSlideChange={(e) => {
            const newCurrentSlideId = Object.keys(slides)[e.activeIndex];
            setCurrentSlideId(newCurrentSlideId);
          }}
          onSlidesUpdated={(e) => {
            const currentSlideIdIndex = Object.keys(slides).indexOf(currentSlideId as string);
            e.slideTo(currentSlideIdIndex);
          }}
        >
          {Object.keys(slides).map((slideId) => (
            <SwiperSlide key={slideId} className="h-full" id={slideId}>
              <div className="bg-secondary absolute top-1 left-[50%] z-10 flex -translate-x-[50%] gap-2 rounded-full p-1">
                <Badge variant={'outline'}>{slides[slideId].name}</Badge>
                <div className="fc gap-1">
                  <Button
                    variant={'default'}
                    className="aspect-square size-6 cursor-pointer rounded-full p-2"
                    onClick={() => {
                      setEditSlideDialogOpen(true);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant={'destructive'}
                    className="aspect-square size-6 cursor-pointer rounded-full p-2"
                    onClick={() => {
                      setDeleteSlideDialogOpen(true);
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>

              <ScrollArea className="h-full rounded-md">
                <ResponsiveReactGridLayout
                  rowHeight={1}
                  maxRows={Number.POSITIVE_INFINITY}
                  width={5000}
                  autoSize={true}
                  cols={{
                    lg: 555,
                    md: 529,
                    sm: 502,
                    xs: 476,
                    xxs: 449,
                  }}
                  containerPadding={[8, 8]}
                  margin={[8, 8]}
                  breakpoint={currentBreakpoint}
                  layouts={slides[slideId].layouts}
                  measureBeforeMount={false}
                  useCSSTransforms={true}
                  allowOverlap={false}
                  transformScale={1}
                  isBounded={false}
                  isDroppable={false}
                  isDraggable={true}
                  isResizable={false}
                  className={`bg-primary/75 h-full min-h-[calc(100vh-16px)] w-[5000px] rounded-md`}
                  verticalCompact={false}
                  draggableCancel="no-dragging"
                  preventCollision={false}
                  onLayoutChange={(e) => {
                    e.map((i) => (i.h = i.w = 10));
                  }}
                >
                  {slides[slideId].layouts[currentBreakpoint].map((item: Layout) => {
                    const type = item.i.split('|')[0];
                    if (type === 'folder') {
                      const state = slidesStates[item.i] as FolderStateT;
                      return (
                        <div className={`${reOrder && 'no-swiping no-dragging'}`} key={item.i}>
                          <Folder id={item.i} name={state.name} iconUrl={state.iconUrl} />
                        </div>
                      );
                    }
                    const state = slidesStates[item.i] as WebsiteStateT;
                    return (
                      <div
                        className={`${reOrder && 'no-swiping no-dragging'} size-20`}
                        key={item.i}
                        onClick={(e) => {
                          if (!reOrder) return;
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      >
                        <Website
                          id={item.i}
                          url={state.url}
                          name={state.name}
                          iconUrl={state.iconUrl}
                        />
                      </div>
                    );
                  })}
                </ResponsiveReactGridLayout>

                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* <Folder */}
      {/*   name={item.i.split('|')[1]} */}
      {/*   icon={item.i.split('|')[2]} */}
      {/*   websites={item.i.split('|')[3]} */}
      {/*   className="bg-red-500" */}
      {/*   iconClassName="bg-red-500" */}
      {/* /> */}

      {/* add Slide Dialog */}
      <Dialog open={addSlideDialogOpen} onOpenChange={setAddSlideDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Slide</DialogTitle>
            <DialogDescription>Enter the name of the slide you want to add.</DialogDescription>
          </DialogHeader>

          <Form {...addSlideForm}>
            <form onSubmit={addSlideForm.handleSubmit(onAddSlideSubmit)} className="space-y-4">
              <FormField
                control={addSlideForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slide Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Slide" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Add Slide</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* edit Slide Dialog */}
      <Dialog open={editSlideDialogOpen} onOpenChange={setEditSlideDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Slide</DialogTitle>
            <DialogDescription>Enter a new name for the slide.</DialogDescription>
          </DialogHeader>

          <Form {...editSlideForm}>
            <form onSubmit={editSlideForm.handleSubmit(onEditSlideSubmit)} className="space-y-4">
              <FormField
                control={editSlideForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slide Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Slide" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Edit Slide</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* delete Slide Dialog */}

      <AlertDialog open={deleteSlideDialogOpen} onOpenChange={setDeleteSlideDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your slide.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteSlide(currentSlideId as string);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Folder Dialog */}
      <Dialog open={addFolderDialogOpen} onOpenChange={setAddFolderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>Enter a name and icon URL for the new folder.</DialogDescription>
          </DialogHeader>

          <Form {...addFolderForm}>
            <form onSubmit={addFolderForm.handleSubmit(onAddFolderSubmit)} className="space-y-4">
              <FormField
                control={addFolderForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Folder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Folder" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addFolderForm.control}
                name="iconUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/icon.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Create Folder</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Website Dialog */}
      <Dialog open={addWebsiteDialogOpen} onOpenChange={setAddWebsiteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Website</DialogTitle>
            <DialogDescription>Enter details for the website you want to add.</DialogDescription>
          </DialogHeader>

          <Form {...addWebsiteForm}>
            <form onSubmit={addWebsiteForm.handleSubmit(onAddWebsiteSubmit)} className="space-y-4">
              <FormField
                control={addWebsiteForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Website" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addWebsiteForm.control}
                name="iconUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/favicon.ico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={addWebsiteForm.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Add Website</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* The Dropdown Menu */}
      <div className="fc absolute right-4 bottom-4 z-10 gap-2">
        <Toggle
          aria-label="Toggle reorder"
          pressed={reOrder}
          onPressedChange={(e) => {
            setReOrder(e);
          }}
        >
          reorder
        </Toggle>

        <Button>Save</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon">Add</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                setAddSlideDialogOpen(true);
              }}
            >
              Slide
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={currentSlideId === null}
              onClick={() => {
                setAddFolderDialogOpen(true);
              }}
            >
              Folder
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={currentSlideId === null}
              onClick={() => {
                setAddWebsiteDialogOpen(true);
              }}
            >
              Website
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
