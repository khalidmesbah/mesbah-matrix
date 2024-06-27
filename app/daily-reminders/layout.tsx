"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { v4 as uuidV4 } from "uuid";
import useDailyRemindersStore from "@/lib/stores/daily-reminders-store";
import { useQuery } from "@tanstack/react-query";
import {
  _getDailyReminders,
  _setDailyReminders,
} from "@/lib/server-actions/daily-reminders-actions";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/dist/client/components/navigation";
import { H2 } from "@/components/typography";

const FormSchema = z.object({
  text: z.string().min(2, {
    message: "The task must be at least 2 characters.",
  }),
});

export default function DailyRemindersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setDailyReminders, addDailyReminder } = useDailyRemindersStore(
    (state) => state,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["daily-reminders"],
    queryFn: () => _getDailyReminders(),
  });
  const pathname = usePathname();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  useEffect(() => {
    if (data) {
      setDailyReminders(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (isLoading) return <p>loading</p>;

  return (
    <section>
      <div className="p-1 border-b border-b-foreground flex gap-1 justify-between items-center">
        <H2 text="Daily Reminder" className="mr-auto" />

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Reminder</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Daily Reminder</DialogTitle>
              <DialogDescription>Add a daily reminder.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 bg-card"
              >
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  onClick={() => {
                    addDailyReminder(form.getValues().text);
                    form.reset();
                  }}
                >
                  Add
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {pathname === "/daily-reminders/browse" ? (
          <Link
            href="/daily-reminders"
            className={`${buttonVariants({ variant: "default" })}`}
          >
            Practise Reminders
          </Link>
        ) : (
          <Link
            href="/daily-reminders/browse"
            className={`${buttonVariants({ variant: "default" })}`}
          >
            Browse Reminders
          </Link>
        )}
      </div>

      {children}
    </section>
  );
}
