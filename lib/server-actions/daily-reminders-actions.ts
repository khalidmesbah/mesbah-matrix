"use server";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { ActionResponse } from "@/types";
import { DailyRemindersType } from "../stores/daily-reminders-store";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "../firebase/init";

const _setDailyReminders = async (
  dailyReminders: DailyRemindersType,
): Promise<ActionResponse> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) {
      throw "there is no user";
    }
    await setDoc(doc(db, userId, "daily-reminders"), dailyReminders);
    return {
      success: true,
      message: "the reminders has been added successfully",
    };
  } catch (error) {
    return { success: false, message: error as string };
  }
};

const _getDailyReminders = async (): Promise<DailyRemindersType | null> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;

    if (!userId) {
      throw "there is no user";
    }
    const res = await getDoc(doc(db, userId, "daily-reminders"));
    const dailyReminders = res.data() as DailyRemindersType;
    return dailyReminders;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { _setDailyReminders, _getDailyReminders };
