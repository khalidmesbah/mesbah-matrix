"use server";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { DailyTaskType } from "../stores/daily-tasks-store";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants";

interface ActionResponse {
  success: boolean;
  message: string;
}

const _addDailyTask = async (
  dailyTask: DailyTaskType,
): Promise<ActionResponse> => {
  try {
    const userUID = cookies().get(SESSION_COOKIE_NAME)?.value || null;
    console.log(`userUID from the daily-tasks: `, userUID);
    if (userUID === null) throw "there is no user";
    const path = `user_${userUID}/daily-tasks/items`;
    const collectionRef = collection(db, path);
    addDoc(collectionRef, dailyTask);
    return { success: true, message: "the task has been added successfully" };
  } catch (error) {
    return { success: false, message: error as string };
  }
};

const _getDailyTasks = async (): Promise<ActionResponse> => {
  try {
    const userUID = cookies().get(SESSION_COOKIE_NAME)?.value || null;
    console.log(userUID);
    if (userUID === null) throw "there is no user";
    const path = `user_${userUID}/daily-tasks/items`;
    const collectionRef = collection(db, path);

    // const citiesRef = db.collection("cities");
    // const snapshot = await citiesRef.get();
    // snapshot.forEach((doc) => {
    //   console.log(doc.id, "=>", doc.data());
    // });
    return {
      success: true,
      message: "the tasks has been fetched successfully",
    };
  } catch (error) {
    return { success: false, message: error as string };
  }
};

export { _addDailyTask };
