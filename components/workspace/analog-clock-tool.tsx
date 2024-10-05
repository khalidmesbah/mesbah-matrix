import AnalogClock from '@/components/widgets/analog-clock';
import {
  BaseBoxShapeTool,
  DefaultColorStyle,
  HTMLContainer,
  RecordProps,
  Rectangle2d,
  ShapeUtil,
  T,
  TLBaseShape,
  TLClickEvent,
  TLDefaultColorStyle,
  TLResizeInfo,
  createShapePropsMigrationIds,
  createShapePropsMigrationSequence,
  resizeBox,
} from 'tldraw';

export class AnalogClockTool extends BaseBoxShapeTool {
  static override id = 'analog-clock';
  static override initial = 'idle';
  override shapeType = 'analog-clock';

  override onDoubleClick: TLClickEvent = (_info) => {
    // you can handle events in handlers like this one;
    // check the BaseBoxShapeTool source as an example
  };
}

// A type for our custom card shape
type IAnalogClock = TLBaseShape<
  'analog-clock',
  {
    w: number;
    h: number;
    color: TLDefaultColorStyle;
  }
>;

// Validation for our custom card shape's props, using one of tldraw's default styles
const analogClockProps: RecordProps<IAnalogClock> = {
  w: T.number,
  h: T.number,
  color: DefaultColorStyle,
};

// To generate your own custom styles, check out the custom styles example.

const versions = createShapePropsMigrationIds(
  // this must match the shape type in the shape definition
  'analog-clock',
  {
    AddSomeProperty: 1,
  },
);

// Migrations for the custom card shape (optional but very helpful)
const analogClockMigrations = createShapePropsMigrationSequence({
  sequence: [
    {
      id: versions.AddSomeProperty,
      up(props) {
        // it is safe to mutate the props object here
        props.someProperty = 'some value';
      },
      down(props) {
        delete props.someProperty;
      },
    },
  ],
});
// There's a guide at the bottom of this file!

export class AnalogClockUtil extends ShapeUtil<IAnalogClock> {
  static override type = 'analog-clock' as const;
  // [1]
  static override props = analogClockProps;
  // [2]
  static override migrations = analogClockMigrations;

  // [3]
  override isAspectRatioLocked = (_shape: IAnalogClock) => true;
  override canResize = (_shape: IAnalogClock) => true;

  // [4]
  getDefaultProps(): IAnalogClock['props'] {
    return {
      w: 240,
      h: 240,
      color: 'black',
    };
  }

  // [5]
  getGeometry(shape: IAnalogClock) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // [6]
  component(shape: IAnalogClock) {
    return (
      <HTMLContainer id={shape.id} className="fc border border-solid">
        <AnalogClock />
      </HTMLContainer>
    );
  }

  // [7]
  indicator(shape: IAnalogClock) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }

  // [8]
  override onResize = (shape: IAnalogClock, info: TLResizeInfo<IAnalogClock>): IAnalogClock => {
    return resizeBox(shape, info);
  };
}
