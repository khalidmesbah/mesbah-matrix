'use client';

import Icon from '@/components/icon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import useWidgetsStore from '@/lib/stores/widgets';
import { ArcticonsAyah } from '@/public/svgs/arcticons-ayah';
import { Component } from 'lucide-react';
import { useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';

export default function WidgetsSlider() {
  const [isWidgetsModalOpen, setIsWidgetsModalOpen] = useState(false);
  const { addWidget, setDroppingItem } = useWidgetsStore();

  return (
    <Dialog open={isWidgetsModalOpen} onOpenChange={setIsWidgetsModalOpen}>
      <DialogTrigger asChild>
        <Icon
          key={'widgets'}
          icon={<Component />}
          size="icon"
          description={'Widgets'}
          className="!size-10 rounded-full [&>svg]:!size-5"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Widgets</DialogTitle>
          <DialogDescription>
            Drag and drop widgets to your desired location, or click on the widget to add it.
          </DialogDescription>
        </DialogHeader>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          className="min-h-80 w-full"
          noSwipingClass="no-swiping"
        >
          <SwiperSlide className="p-2">
            <div
              draggable={true}
              className="no-swiping size-20 rounded-full bg-card transition-shadow hover:shadow-md hover:shadow-primary"
              onDragStart={(e) => {
                console.log('drag start');
                const uuid = uuidv4();
                setDroppingItem({ i: `ayah|${uuid}`, w: 10, h: 20, minW: 6, minH: 12 });
                setIsWidgetsModalOpen(false);
                e.dataTransfer.setData('text/plain', ''); // for firefox!! (check if it applies on the kanban board)
              }}
              onDragEnd={() => {
                setDroppingItem(undefined);
              }}
              onClick={() => {
                const uuid = uuidv4();
                addWidget(`ayah|${uuid}`);
                setIsWidgetsModalOpen(false);
              }}
            >
              <ArcticonsAyah className="size-full stroke-2" />
            </div>
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
      </DialogContent>
    </Dialog>
  );
}
