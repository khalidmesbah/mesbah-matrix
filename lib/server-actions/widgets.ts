'use server';

import { db } from '@/firebase/init';
import { DefaultWidgetsStateT, WidgetT } from '@/types/widgets';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Layouts } from 'react-grid-layout';

const defaultWidgetsState: DefaultWidgetsStateT = {
  ayah: {
    text: 'بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ',
    font: '__className_af25f8',
  },
};

const getLayouts = async (): Promise<Layouts | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resLayouts = await getDoc(doc(db, 'users', user.id, 'data', 'aura', 'layouts', 'test'));
    let layouts = resLayouts.data() as Layouts;

    if (!layouts) {
      layouts = { lg: [], md: [], sm: [], xs: [], xxs: [] };
      await setDoc(doc(db, 'users', user.id, 'data', 'aura', 'layouts', 'test'), layouts);
    }

    return layouts;
  } catch (error) {
    console.error(error);
  }
};

const setLayouts = async (newLayouts: Layouts): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const res = await setDoc(
      doc(db, 'users', user.id, 'data', 'aura', 'layouts', 'test'),
      newLayouts,
    );

    return res;
  } catch (error) {
    console.error(error);
  }
};

const getWidgetData = async (widgetId: string): Promise<WidgetT | undefined> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resWidget = await getDoc(doc(db, 'users', user.id, 'data', 'aura', 'widgets', widgetId));
    let widget = resWidget.data() as WidgetT;

    if (!widget) {
      const widgetType = widgetId.split('|')[0] as keyof DefaultWidgetsStateT;
      widget = defaultWidgetsState[widgetType];
      await setDoc(doc(db, 'users', user.id, 'data', 'aura', 'widgets', widgetId), widget);
    }

    return widget;
  } catch (error) {
    console.error(error);
  }
};

const setWidgetData = async (widgetId: string, newWidgetState: WidgetT): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const res = await setDoc(
      doc(db, 'users', user.id, 'data', 'aura', 'widgets', widgetId),
      newWidgetState,
      {
        merge: true,
      },
    );

    return res;
  } catch (error) {
    console.error(error);
  }
};

export { getLayouts, getWidgetData, setLayouts, setWidgetData };
