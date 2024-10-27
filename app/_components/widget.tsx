import AnalogClock from './widgets/analog-clock';
import Ayah from './widgets/ayah';
import DigitalClock from './widgets/digital-clock';
import Pomodoro from './widgets/pomodoro';
import TimeSinceBirth from './widgets/time-passed';

type WidgetsT = {
  [key: string]: JSX.Element;
};

type WidgetT = {
  id: string;
};

export default function Widget({ id }: WidgetT) {
  const name = id.split('|')[0] as keyof WidgetsT;
  const widgets: WidgetsT = {
    'analog-clock': <AnalogClock />,
    'digital-clock': <DigitalClock id={id} />,
    'time-passed': <TimeSinceBirth />,
    ayah: <Ayah id={id} />,
    pomodoro: <Pomodoro />,
  };

  return <>{name in widgets ? widgets[name] : <div>widget not found</div>}</>;
}
