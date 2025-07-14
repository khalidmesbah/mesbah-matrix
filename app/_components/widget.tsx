import type { JSX } from "react";
import AnalogClock from "./widgets/analog-clock";
import Ayah from "./widgets/ayah";
import DigitalClock from "./widgets/digital-clock";
import ImageWidget from "./widgets/image";
import Pomodoro from "./widgets/pomodoro";
import TimeSinceBirth from "./widgets/time-passed";
import Video from "./widgets/video";

type WidgetsT = {
  [key: string]: JSX.Element;
};

type WidgetT = {
  id: string;
  isAuthenticated: boolean;
};

export default function Widget({ id }: WidgetT) {
  const name = id.split("|")[0] as keyof WidgetsT;
  const widgets: WidgetsT = {
    "analog-clock": <AnalogClock />,
    "digital-clock": <DigitalClock id={id} />,
    "time-passed": <TimeSinceBirth id={id} />,
    ayah: <Ayah id={id} />,
    pomodoro: <Pomodoro />,
    image: <ImageWidget id={id} />,
    video: <Video id={id} />,
  };

  return (
    <div className="fc size-full child-parent">
      {name in widgets ? widgets[name] : "widget not found"}
    </div>
  );
}
