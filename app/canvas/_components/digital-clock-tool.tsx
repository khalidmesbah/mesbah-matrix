import DigitalClock from '@/app/_components/widgets/digital-clock';
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
  getDefaultColorTheme,
  resizeBox,
} from 'tldraw';

export class DigitalClockShapeTool extends BaseBoxShapeTool {
  static override id = 'digital-clock';
  static override initial = 'idle';
  override shapeType = 'card';

  override onDoubleClick: TLClickEvent = (_info) => {};
}

type IDigitalClockShape = TLBaseShape<
  'card',
  {
    w: number;
    h: number;
    color: TLDefaultColorStyle;
  }
>;

const DigitalClockShapeProps: RecordProps<IDigitalClockShape> = {
  w: T.number,
  h: T.number,
  color: DefaultColorStyle,
};

// To generate your own custom styles, check out the custom styles example.

const versions = createShapePropsMigrationIds(
  // this must match the shape type in the shape definition
  'card',
  {
    AddSomeProperty: 1,
  },
);

const DigitalClockShapeMigrations = createShapePropsMigrationSequence({
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

export class DigitalClockShapeUtil extends ShapeUtil<IDigitalClockShape> {
  static override type = 'digital-clock' as const;
  // [1]
  static override props = DigitalClockShapeProps;
  // [2]
  static override migrations = DigitalClockShapeMigrations;

  // [3]
  override isAspectRatioLocked = (_shape: IDigitalClockShape) => false;
  override canResize = (_shape: IDigitalClockShape) => true;

  // [4]
  getDefaultProps(): IDigitalClockShape['props'] {
    return {
      w: 300,
      h: 300,
      color: 'black',
    };
  }

  // [5]
  getGeometry(shape: IDigitalClockShape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  // [6]
  component(shape: IDigitalClockShape) {
    const theme = getDefaultColorTheme({ isDarkMode: this.editor.user.getIsDarkMode() });

    return (
      <HTMLContainer
        id={shape.id}
        style={{
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'all',
          backgroundColor: theme[shape.props.color].semi,
          color: theme[shape.props.color].solid,
        }}
      >
        <DigitalClock />
      </HTMLContainer>
    );
  }

  indicator(shape: IDigitalClockShape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }

  override onResize = (
    shape: IDigitalClockShape,
    info: TLResizeInfo<IDigitalClockShape>,
  ): IDigitalClockShape => {
    return resizeBox(shape, info);
  };
}
