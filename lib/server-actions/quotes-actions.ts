"use server";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { MatrixType } from "@/lib/stores/the-matrix-store";
import { db } from "../firebase/init";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  ActionResponse,
  SharedType,
  QuoteType,
  GlobalsType,
  QuotesType,
} from "@/types";
import { QueryKey } from "@tanstack/react-query";

const initialFavouriteQuotes = [
  {
    _id: "quo0uRjP__",
    author: "Abraham Lincoln",
    content:
      "Sir, my concern is not whether God is on our side; my greatest concern is to be on God's side, for God is always right.",
    tags: ["Spirituality", "History"],
    authorSlug: "abraham-lincoln",
    length: 119,
    dateAdded: "2022-03-12",
    dateModified: "2023-04-14",
  },
  {
    _id: "2r5oVsxF_c",
    content: "A friend may well be reckoned the masterpiece of nature.",
    author: "Ralph Waldo Emerson",
    tags: ["Friendship", "Famous Quotes"],
    authorSlug: "ralph-waldo-emerson",
    length: 56,
    dateAdded: "2020-04-14",
    dateModified: "2023-04-14",
  },
  {
    _id: "qx0gYyFteZUo",
    content:
      "If you are going to achieve excellence in big things, you develop the habit in little matters. Excellence is not an exception; it is a prevailing attitude.",
    author: "Colin Powell",
    tags: ["Famous Quotes"],
    authorSlug: "colin-powell",
    length: 155,
    dateAdded: "2019-04-05",
    dateModified: "2023-04-14",
  },
];

const getRandomQuotes = async (): Promise<QuoteType[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_QUOTES_API}/quotes/random?limit=3`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch quotes");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getQuotes = async (): Promise<QuotesType | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) throw new Error("there's no user");

    const randomQuotes = await getRandomQuotes();
    if (randomQuotes === undefined)
      throw new Error("error fetching random quotes");
    const [newQotd] = randomQuotes;

    const resQuotes = await getDoc(doc(db, "users", user.id, "data", "quotes"));
    let quotes = resQuotes.data() as QuotesType;
    const today = new Date().getDay();

    if (!quotes) {
      quotes = { favourite: [], qotd: newQotd };
      await setDoc(doc(db, "users", user.id, "data", "quotes"), quotes);
      await setDoc(
        doc(db, "users", user.id, "data", "shared"),
        { today },
        { merge: true },
      );
      return quotes;
    }

    const resShared = await getDoc(doc(db, "users", user.id, "data", "shared"));
    const shared = resShared.data() as SharedType;

    if (today !== shared.today) {
      await setDoc(
        doc(db, "users", user.id, "data", "quotes"),
        {
          qotd: newQotd,
        },
        { merge: true },
      );
      await setDoc(
        doc(db, "users", user.id, "data", "shared"),
        { today },
        { merge: true },
      );
      quotes.qotd = newQotd;
    }

    return quotes;
  } catch (error) {
    console.error(error);
  }
};

// } else {
//   const today = new Date().getDay();
//
//   const resGlobal = await getDoc(doc(db, "globals", "data"));
//   const globals = resGlobal.data() as GlobalsType;
//
//   if (!globals || today !== globals.today) {
//     await setDoc(
//       doc(db, "globals", "data"),
//       {
//         qotd: newQotd,
//         today,
//       },
//       { merge: true },
//     );
//     return { favourite: initialFavouriteQuotes, qotd: newQotd };
//   }
//   return { favourite: initialFavouriteQuotes, qotd: globals.qotd };
// }
const toggleFavouriteState = async (quote: QuoteType, isFavourite: boolean) => {
  console.log("-----------------------");
  console.log(quote, isFavourite);
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) return;

    const quotesRes = await getDoc(doc(db, "users", user.id, "data", "quotes"));
    let { favourite } = quotesRes.data() as QuotesType;
    if (!favourite) favourite = [];

    console.log(`before`, favourite);

    if (isFavourite) {
      favourite = favourite.filter((q) => q._id !== quote._id);
    } else {
      favourite.push(quote);
    }

    console.log(`after`, favourite);

    await setDoc(
      doc(db, "users", user.id, "data", "quotes"),
      { favourite },
      { merge: true },
    );
  } catch (error) {
    console.error(error);
  }
};

export { getRandomQuotes, getQuotes, toggleFavouriteState };
