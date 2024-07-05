"use server";

import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { MatrixType } from "@/lib/stores/the-matrix-store";
import { ActionResponse } from "@/types";
import { db } from "../firebase/init";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { initialMatrix } from "../hooks/use-matrix-query";

const _getMatrix = async () => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("from getMatrix", user);

    if (user) {
      const res = await getDoc(doc(db, user.id, "the-matrix"));
      const newMatrix = res.data() as MatrixType;
      console.log(newMatrix, "from getMatrix");
      return newMatrix;
    } else {
      return initialMatrix;
    }
  } catch (error) {
    console.error(error);
    return initialMatrix;
  }
};

const _setMatrix = async (newMatrix: MatrixType): Promise<ActionResponse> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (user) {
      await setDoc(doc(db, user.id, "the-matrix"), newMatrix);
    }

    return {
      success: true,
      message: "the matrix has been added successfully",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: error as string };
  }
};

export { _setMatrix, _getMatrix };
