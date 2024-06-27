"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  _getDailyReminders,
  _setDailyReminders,
} from "@/lib/server-actions/daily-reminders-actions";
import useDailyRemindersStore from "@/lib/stores/daily-reminders-store";
import { useEffect } from "react";
import { H1, H3, P } from "@/components/typography";
// TODO: add celebration and sound once finished the reminders

export default function DailyRemindersPage() {
  const { dailyReminders, setDailyReminders } = useDailyRemindersStore(
    (state) => state,
  );

  const order = dailyReminders.order.filter(
    (id) => dailyReminders.reminders[id].done === false,
  );
  console.log(`order: `, order);

  return (
    <Carousel className="w-full h-full max-w-lg mx-auto">
      <CarouselContent>
        {order.length === 0 ? (
          <CarouselItem>
            <Card>
              <CardContent className="flex h-[80vh] items-center justify-center overflow-auto">
                <H3
                  text={"No More reminders"}
                  className="text-4xl font-semibold break-all"
                />
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
                      className="text-4xl font-semibold break-all"
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
