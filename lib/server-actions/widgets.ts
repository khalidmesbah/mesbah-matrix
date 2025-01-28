'use server';

import { db } from '@/firebase/init';
import { DefaultWidgetsStateT, WidgetsT, WidgetT } from '@/types/widgets';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const defaultWidgetsState: DefaultWidgetsStateT = {
  ayah: {
    text: 'بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ',
    font: '__className_af25f8',
  },
};

const getWidgets = async (): Promise<WidgetsT | undefined> => {
  console.log('the widgets are');
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const resWidgets = await getDoc(doc(db, 'users', user.id, 'data', 'widgets'));
    let widgets = resWidgets.data() as WidgetsT;
    console.log(widgets);

    if (!widgets) {
      widgets = {
        layouts: { lg: [], md: [], sm: [], xs: [], xxs: [] },
        states: {},
      };
      await setDoc(doc(db, 'users', user.id, 'data', 'widgets'), widgets);
    }

    return widgets;
  } catch (error) {
    console.error(error);
  }
};

const setWidgets = async (newWidgets: WidgetsT): Promise<void> => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) throw 'there is no user';

    const res = await setDoc(doc(db, 'users', user.id, 'data', 'widgets'), newWidgets);

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

export { getWidgetData, getWidgets, setWidgetData, setWidgets };
