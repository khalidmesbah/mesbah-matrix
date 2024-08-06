'use client';

import { BoxTool } from '@/components/workspace/box-tool';
import { CardShapeTool, CardShapeUtil } from '@/components/workspace/card-shape-tool';
import { ScreenshotDragging } from '@/components/workspace/child-states/dragging';
import { ScreenshotTool } from '@/components/workspace/screenshot-tool';
import { StickerTool } from '@/components/workspace/sticker-tool-util';
import { getWorkspaces, setWorkspaces } from '@/lib/server-actions/workspace-actions';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import {
  Box,
  DefaultKeyboardShortcutsDialog,
  DefaultKeyboardShortcutsDialogContent,
  DefaultToolbar,
  DefaultToolbarContent,
  getSnapshot,
  loadSnapshot,
  TLComponents,
  Tldraw,
  TldrawUiMenuItem,
  TLUiAssetUrlOverrides,
  TLUiOverrides,
  useEditor,
  useIsToolSelected,
  useTools,
  useValue,
} from 'tldraw';
import './index.css';

// [1]
const customTools = [StickerTool, ScreenshotTool, BoxTool, CardShapeTool];
const customShapeUtils = [CardShapeUtil];

// [2]
const customUiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    // Create a tool item in the ui's context.

    return {
      ...tools,
      sticker: {
        id: 'sticker',
        icon: 'heart-icon',
        label: 'Sticker',
        kbd: 's',
        onSelect: () => {
          editor.setCurrentTool('sticker');
        },
      },
      screenshot: {
        id: 'screenshot',
        label: 'Screenshot',
        icon: 'tool-screenshot',
        kbd: 'j',
        onSelect() {
          editor.setCurrentTool('screenshot');
        },
      },
      box: {
        id: 'box',
        label: 'box',
        icon: 'tool-box',
        kbd: 'p',
        onSelect() {
          editor.setCurrentTool('box');
        },
      },
      card: {
        id: 'card',
        icon: 'color',
        label: 'Card',
        kbd: 'c',
        onSelect: () => {
          editor.setCurrentTool('card');
        },
      },
    };
  },
};

// [3]
function ScreenshotBox() {
  const editor = useEditor();

  const screenshotBrush = useValue(
    'screenshot brush',
    () => {
      // Check whether the screenshot tool (and its dragging state) is active
      if (editor.getPath() !== 'screenshot.dragging') return null;

      // Get screenshot.dragging state node
      const draggingState = editor.getStateDescendant<ScreenshotDragging>('screenshot.dragging')!;

      // Get the box from the screenshot.dragging state node
      const box = draggingState.screenshotBox.get();

      // The box is in "page space", i.e. panned and zoomed with the canvas, but we
      // want to show it in front of the canvas, so we'll need to convert it to
      // "page space", i.e. uneffected by scale, and relative to the tldraw
      // page's top left corner.
      const zoomLevel = editor.getZoomLevel();
      const { x, y } = editor.pageToViewport({ x: box.x, y: box.y });
      return new Box(x, y, box.w * zoomLevel, box.h * zoomLevel);
    },
    [editor],
  );

  if (!screenshotBrush) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: `translate(${screenshotBrush.x}px, ${screenshotBrush.y}px)`,
        width: screenshotBrush.w,
        height: screenshotBrush.h,
        border: '1px solid var(--color-text-0)',
        zIndex: 999,
      }}
    />
  );
}

function CustomToolbar() {
  const tools = useTools();
  const isScreenshotSelected = useIsToolSelected(tools['screenshot']);
  const isStickerSelected = useIsToolSelected(tools['sticker']);
  const isBoxSelected = useIsToolSelected(tools['box']);
  const isCardSelected = useIsToolSelected(tools['card']);
  return (
    <DefaultToolbar>
      <DefaultToolbarContent />
      <TldrawUiMenuItem {...tools['card']} isSelected={isCardSelected} />
      <TldrawUiMenuItem {...tools['screenshot']} isSelected={isScreenshotSelected} />
      <TldrawUiMenuItem {...tools['sticker']} isSelected={isStickerSelected} />
      <TldrawUiMenuItem {...tools['box']} isSelected={isBoxSelected} />
    </DefaultToolbar>
  );
}

// [4]
const customAssetUrls: TLUiAssetUrlOverrides = {
  icons: {
    'heart-icon': '/svgs/heart-icon.svg',
    'tool-screenshot': '/svgs/tool-screenshot.svg',
    'tool-box': '/svgs/tool-box.svg',
    icon: '/svgs/tool-box.svg',
  },
};

const customComponents: TLComponents = {
  InFrontOfTheCanvas: ScreenshotBox,
  Toolbar: CustomToolbar,
  KeyboardShortcutsDialog: (props) => {
    const tools = useTools();
    return (
      <DefaultKeyboardShortcutsDialog {...props}>
        <TldrawUiMenuItem {...tools['card']} />
        <TldrawUiMenuItem {...tools['sticker']} />
        {/* Ideally, we'd interleave this into the tools group */}
        <DefaultKeyboardShortcutsDialogContent />
      </DefaultKeyboardShortcutsDialog>
    );
  },
};

export default function Home() {
  const { resolvedTheme } = useTheme();

  return (
    <Tldraw
      inferDarkMode={resolvedTheme === 'dark'}
      persistenceKey="persist"
      tools={customTools}
      overrides={customUiOverrides}
      shapeUtils={customShapeUtils}
      assetUrls={customAssetUrls}
      components={customComponents}
    >
      <SaveButton />
      <LoadButton />
    </Tldraw>
  );
}

function LoadButton() {
  const editor = useEditor();
  const loadWorkSpaces = async () => {
    const res = await getWorkspaces();
    if (!res) return;
    const { document, session } = res;
    editor.setCurrentTool('select'); // need to reset tool state separately
    loadSnapshot(editor.store, { document, session });
  };
  useEffect(() => {
    loadWorkSpaces();
  }, []);
  return (
    <button onClick={loadWorkSpaces} className="absolute top-0 left-[500px] bg-red-500">
      Load
    </button>
  );
}
function SaveButton({ documentId, userId }: any) {
  const editor = useEditor();
  return (
    <button
      onClick={async () => {
        const { document, session } = getSnapshot(editor.store);
        await setWorkspaces({
          document,
          session,
        });
      }}
      className="absolute top-0 left-[400px] bg-red-500"
    >
      Save
    </button>
  );
}
