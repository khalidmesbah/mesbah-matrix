import AnalogClock from '../widgets/analog-clock';
import DigitalClock from '../widgets/digital-clock';
import TimeSinceBirth from '../widgets/time-passed';

type WidgetsT = {
  [key: string]: JSX.Element;
};

const widgets: WidgetsT = {
  'analog-clock': <AnalogClock />,
  'digital-clock': <DigitalClock />,
  'time-passed': <TimeSinceBirth />,
};

type GenerateWidgetT = {
  name: keyof WidgetsT;
};

export default function GenerateWidget({ name }: GenerateWidgetT) {
  return <>{name in widgets ? widgets[name] : <div>not found</div>}</>;
}
