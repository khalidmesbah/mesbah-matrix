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
  isAuthenticated: boolean;
};

export default function Widget({ id, isAuthenticated }: WidgetT) {
  const name = id.split('|')[0] as keyof WidgetsT;
  const widgets: WidgetsT = {
    'analog-clock': <AnalogClock />,
    'digital-clock': <DigitalClock id={id} />,
    'time-passed': <TimeSinceBirth />,
    ayah: <Ayah id={id} isAuthenticated={isAuthenticated} />,
    pomodoro: <Pomodoro />,
  };

  return (
    <div className="fc absolute size-full">
      {name in widgets ? widgets[name] : 'widget not found'}
    </div>
  );
}
