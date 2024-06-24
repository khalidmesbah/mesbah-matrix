"use server";

import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants";
import { MatrixType, TaskType } from "@/lib/stores/the-matrix-store";
import { ActionResponse } from "@/types";

const _setMatrix = async (newMatrix: MatrixType): Promise<ActionResponse> => {
  try {
    const userUID = cookies().get(SESSION_COOKIE_NAME)?.value || null;
    if (userUID === null) throw "there is no user";
    await setDoc(doc(db, `user_${userUID}`, "the-matrix"), newMatrix);
    return {
      success: true,
      message: "the matrix has been added successfully",
    };
  } catch (error) {
    return { success: false, message: error as string };
  }
};

const _getMatrix = async (): Promise<MatrixType> => {
  const userUID = cookies().get(SESSION_COOKIE_NAME)?.value || null;
  if (userUID === null) throw "there is no user";
  const res = await getDoc(doc(db, `user_${userUID}`, "the-matrix"));
  const tasks = res.data() as MatrixType;
  return tasks;
};

export { _setMatrix, _getMatrix };
