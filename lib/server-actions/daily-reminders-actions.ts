"use server";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants";
import { ActionResponse } from "@/types";
import { DailyRemindersType } from "../stores/daily-reminders-store";

const _setDailyReminders = async (
  dailyReminders: DailyRemindersType,
): Promise<ActionResponse> => {
  try {
    const userUID = cookies().get(SESSION_COOKIE_NAME)?.value || null;
    if (userUID === null) throw "there is no user";
    await setDoc(doc(db, `user_${userUID}`, "daily-reminders"), dailyReminders);
    return {
      success: true,
      message: "the reminders has been added successfully",
    };
  } catch (error) {
    return { success: false, message: error as string };
  }
};

const _getDailyReminders = async (): Promise<DailyRemindersType> => {
  const userUID = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  if (userUID === null) throw "there is no user";
  const res = await getDoc(doc(db, `user_${userUID}`, "daily-reminders"));
  const dailyReminders = res.data() as DailyRemindersType;
  return dailyReminders;
};

export { _setDailyReminders, _getDailyReminders };
