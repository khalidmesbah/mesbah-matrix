'use client';

import { H3, P } from '@/components/typography';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useDailyRemindersStore from '@/lib/stores/daily-reminders-store';
// TODO: add celebration and sound once finished the reminders

export default function DailyRemindersPage() {
  const { dailyReminders, setDailyReminders } = useDailyRemindersStore((state) => state);

  const order = dailyReminders.order.filter((id) => dailyReminders.reminders[id].done === false);

  console.log(`order: `, order);

  return (
    <Carousel className="mx-auto h-full w-full max-w-lg">
      <CarouselContent>
        {order.length === 0 ? (
          <CarouselItem>
            <Card>
              <CardContent className="flex h-[80vh] items-center justify-center overflow-auto">
                <H3 text={'No More reminders'} className="break-all text-4xl font-semibold" />
              </CardContent>
            </Card>
          </CarouselItem>
        ) : (
          order.map((id) => {
            const reminder = dailyReminders.reminders[id];
            // if (reminder.done) return;
            return (
              <CarouselItem key={id}>
                <Card>
                  <CardContent className="flex h-[80vh] items-center justify-center overflow-auto">
                    <P
                      text={reminder.text}
                      className="select-none break-all text-4xl font-semibold"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => {
                        dailyReminders.reminders[id].done = true;
                        setDailyReminders(dailyReminders);
                      }}
                    >
                      Got it
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            );
          })
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
