'use client';

import { AlarmClockPlus, Clock1, Clock2, Component, Hourglass, Image, Video } from 'lucide-react';
import { useState } from 'react';
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
          className="size-10! rounded-full [&>svg]:size-5!"
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
            <div className="flex flex-wrap gap-2">
              <div
                draggable={true}
                className="no-swiping bg-card size-20 rounded-full transition-shadow hover:shadow-md"
                onDragStart={() => {
                  const uuid = uuidv4();
                  setDroppingItem({
                    i: `ayah|${uuid}`,
                    w: 10,
                    h: 20,
                    minW: 6,
                    minH: 12,
                  });
                  setIsWidgetsModalOpen(false);
                }}
                onClick={() => {
                  const uuid = uuidv4();
                  addWidget(`ayah|${uuid}`);
                  setIsWidgetsModalOpen(false);
                }}
              >
                <ArcticonsAyah className="size-full stroke-2" />
              </div>
              <div
                draggable={true}
                className="no-swiping bg-card size-20 rounded-full transition-shadow hover:shadow-md"
                onDragStart={() => {
                  const uuid = uuidv4();
                  setDroppingItem({
                    i: `analog-clock|${uuid}`,
                    w: 10,
                    h: 20,
                    minW: 6,
                    minH: 12,
                  });
                  setIsWidgetsModalOpen(false);
                }}
                onClick={() => {
                  const uuid = uuidv4();
                  addWidget(`analog-clock|${uuid}`);
                  setIsWidgetsModalOpen(false);
                }}
              >
                <Clock1 className="size-full stroke-2" />
              </div>
              <div
                draggable={true}
                className="no-swiping bg-card size-20 rounded-full transition-shadow hover:shadow-md"
                onDragStart={() => {
                  const uuid = uuidv4();
                  setDroppingItem({
                    i: `digital-clock|${uuid}`,
                    w: 10,
                    h: 20,
                    minW: 6,
                    minH: 12,
                  });
                  setIsWidgetsModalOpen(false);
                }}
                onClick={() => {
                  const uuid = uuidv4();
                  addWidget(`digital-clock|${uuid}`);
                  setIsWidgetsModalOpen(false);
                }}
              >
                <Clock2 className="size-full stroke-2" />
              </div>

              <div
                draggable={true}
                className="no-swiping bg-card size-20 rounded-full transition-shadow hover:shadow-md"
                onDragStart={() => {
                  const uuid = uuidv4();
                  setDroppingItem({
                    i: `pomodoro|${uuid}`,
                    w: 10,
                    h: 20,
                    minW: 6,
                    minH: 12,
                  });
                  setIsWidgetsModalOpen(false);
                }}
                onClick={() => {
                  const uuid = uuidv4();
                  addWidget(`pomodoro|${uuid}`);
                  setIsWidgetsModalOpen(false);
                }}
              >
                <AlarmClockPlus className="size-full stroke-2" />
              </div>

              <div
                draggable={true}
                className="no-swiping bg-card size-20 rounded-full transition-shadow hover:shadow-md"
                onDragStart={() => {
                  const uuid = uuidv4();
                  setDroppingItem({
                    i: `time-passed|${uuid}`,
                    w: 10,
                    h: 20,
                    minW: 6,
                    minH: 12,
                  });
                  setIsWidgetsModalOpen(false);
                }}
                onClick={() => {
                  const uuid = uuidv4();
                  addWidget(`time-passed|${uuid}`);
                  setIsWidgetsModalOpen(false);
                }}
              >
                <Hourglass className="size-full stroke-2" />
              </div>

              <div
                draggable={true}
                className="no-swiping bg-card size-20 rounded-full transition-shadow hover:shadow-md"
                onDragStart={() => {
                  const uuid = uuidv4();
                  setDroppingItem({
                    i: `image|${uuid}`,
                    w: 10,
                    h: 20,
                    minW: 6,
                    minH: 12,
                  });
                  setIsWidgetsModalOpen(false);
                }}
                onClick={() => {
                  const uuid = uuidv4();
                  addWidget(`image|${uuid}`);
                  setIsWidgetsModalOpen(false);
                }}
              >
                <Image className="size-full stroke-2" />
              </div>

              <div
                draggable={true}
                className="no-swiping bg-card size-20 rounded-full transition-shadow hover:shadow-md"
                onDragStart={() => {
                  const uuid = uuidv4();
                  setDroppingItem({
                    i: `video|${uuid}`,
                    w: 10,
                    h: 20,
                    minW: 6,
                    minH: 12,
                  });
                  setIsWidgetsModalOpen(false);
                }}
                onClick={() => {
                  const uuid = uuidv4();
                  addWidget(`video|${uuid}`);
                  setIsWidgetsModalOpen(false);
                }}
              >
                <Video className="size-full stroke-2" />
              </div>
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
