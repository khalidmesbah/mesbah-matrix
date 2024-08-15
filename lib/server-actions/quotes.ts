'use server';

import { db } from '@/firebase/init';
import { SharedT } from '@/types/globals';
import { QuoteGlobalsT, QuotesT, QuoteT } from '@/types/quote';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const getRandomQuotes = async (): Promise<QuoteT[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_QUOTES_API}/quotes/random?limit=6`);

    if (!res.ok) {
      throw new Error('Failed to fetch quotes');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getQotd = async (): Promise<QuoteT> => {
  const randomQuotes = await getRandomQuotes();
  if (randomQuotes === undefined) throw new Error('error fetching random quotes');
  const [newQotd] = randomQuotes;

  const today = new Date().getDay();

  const resGlobal = await getDoc(doc(db, 'globals', 'data'));
  const globals = resGlobal.data() as QuoteGlobalsT;

  if (!globals || today !== globals.today) {
    await setDoc(
      doc(db, 'globals', 'data'),
      {
        qotd: newQotd,
        today,
      },
      { merge: true },
    );
    return newQotd;
  }
  return globals.qotd;
};

const getQuotes = async (): Promise<QuotesT | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const randomQuotes = await getRandomQuotes();
    if (randomQuotes === undefined) throw new Error('error fetching random quotes');
    const [newQotd] = randomQuotes;

    const today = new Date().getDay();

    if (!user) throw new Error("there's no user");

    const resQuotes = await getDoc(doc(db, 'users', user.id, 'data', 'quotes'));
    let quotes = resQuotes.data() as QuotesT;

    if (!quotes) {
      quotes = { favourite: [], qotd: newQotd };
      await setDoc(doc(db, 'users', user.id, 'data', 'quotes'), quotes);
      await setDoc(doc(db, 'users', user.id, 'data', 'shared'), { today }, { merge: true });
      return quotes;
    }

    const resShared = await getDoc(doc(db, 'users', user.id, 'data', 'shared'));
    const shared = resShared.data() as SharedT;

    if (today !== shared.today) {
      await setDoc(
        doc(db, 'users', user.id, 'data', 'quotes'),
        {
          qotd: newQotd,
        },
        { merge: true },
      );
      await setDoc(doc(db, 'users', user.id, 'data', 'shared'), { today }, { merge: true });
      quotes.qotd = newQotd;
    }

    return quotes;
  } catch (error) {
    console.error(error);
  }
};

const toggleFavouriteState = async (quote: QuoteT) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw new Error("there's no user");

    const quotesRes = await getDoc(doc(db, 'users', user.id, 'data', 'quotes'));
    let { favourite } = quotesRes.data() as QuotesT;
    if (!favourite) favourite = [];

    const isFavourite = favourite.map((q) => q._id).includes(quote._id);

    if (isFavourite) {
      favourite = favourite.filter((q) => q._id !== quote._id);
    } else {
      favourite.push(quote);
    }

    await setDoc(doc(db, 'users', user.id, 'data', 'quotes'), { favourite }, { merge: true });
  } catch (error) {
    console.error(error);
  }
};

export { getQotd, getQuotes, getRandomQuotes, toggleFavouriteState };
