import { StateNode, type TLCancelEventInfo } from 'tldraw';

// Check out the custom tool example for a more detailed explanation of the tool class.

const OFFSET = 12;
export class StickerTool extends StateNode {
  static override id = 'sticker' as const;

  override onCancel(_info: TLCancelEventInfo): void {
    this.editor.setCurrentTool('select');
  }

  override onEnter = () => {
    this.editor.setCursor({ type: 'cross', rotation: 0 });
  };

  override onPointerDown = () => {
    const { currentPagePoint } = this.editor.inputs;
    this.editor.createShape({
      type: 'text',
      x: currentPagePoint.x - OFFSET,
      y: currentPagePoint.y - OFFSET,
      props: { text: '❤️' },
    });
  };
}
