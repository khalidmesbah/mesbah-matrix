'use client';

import { AnalogClockTool, AnalogClockUtil } from '@/components/workspace/analog-clock-tool';
import { StickerTool } from '@/components/workspace/sticker-tool-util';
import { getWorkspaces, setWorkspaces } from '@/lib/server-actions/workspace-actions';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import { toast } from 'sonner';
import {
  DefaultActionsMenu,
  DefaultActionsMenuContent,
  DefaultContextMenu,
  DefaultContextMenuContent,
  DefaultDebugMenu,
  DefaultDebugMenuContent,
  DefaultHelpMenu,
  DefaultHelpMenuContent,
  DefaultKeyboardShortcutsDialog,
  DefaultKeyboardShortcutsDialogContent,
  DefaultMainMenu,
  DefaultMainMenuContent,
  DefaultPageMenu,
  DefaultQuickActions,
  DefaultQuickActionsContent,
  DefaultStylePanel,
  DefaultStylePanelContent,
  DefaultToolbar,
  DefaultToolbarContent,
  DefaultZoomMenu,
  DefaultZoomMenuContent,
  getSnapshot,
  loadSnapshot,
  TLComponents,
  Tldraw,
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
  TLUiAssetUrlOverrides,
  TLUiContextMenuProps,
  TLUiKeyboardShortcutsDialogProps,
  TLUiOverrides,
  TLUiStylePanelProps,
  useEditor,
  useIsToolSelected,
  useRelevantStyles,
  useTools,
} from 'tldraw';
import './index.css';

//------------------

//[1]

function CustomActionsMenu() {
  return (
    <DefaultActionsMenu>
      <DefaultActionsMenuContent />
    </DefaultActionsMenu>
  );
}
//[2]
function CustomContextMenu(props: TLUiContextMenuProps) {
  const editor = useEditor();
  return (
    <DefaultContextMenu {...props}>
      <TldrawUiMenuGroup id="example">
        <div>
          <TldrawUiMenuGroup id="example">
            <TldrawUiMenuItem
              id="clear"
              label="Clear Canvas 🧨"
              icon="bomb"
              onSelect={() => {
                editor.selectAll().deleteShapes(editor.getSelectedShapeIds());
              }}
            />
          </TldrawUiMenuGroup>
        </div>
      </TldrawUiMenuGroup>
      <DefaultContextMenuContent />
    </DefaultContextMenu>
  );
}
//[3]
function CustomDebugMenu() {
  return (
    <DefaultDebugMenu>
      <DefaultDebugMenuContent />
    </DefaultDebugMenu>
  );
}
//[4]
function CustomHelpMenu() {
  return (
    <DefaultHelpMenu>
      <DefaultHelpMenuContent />
    </DefaultHelpMenu>
  );
}
//[5]
function CustomKeyboardShortcutsDialog(props: TLUiKeyboardShortcutsDialogProps) {
  const tools = useTools();
  return (
    <DefaultKeyboardShortcutsDialog {...props}>
      <TldrawUiMenuGroup id="Components" label="Components">
        <TldrawUiMenuItem {...tools['analog-clock']} />
        <TldrawUiMenuItem {...tools['sticker']} />
      </TldrawUiMenuGroup>
      <DefaultKeyboardShortcutsDialogContent />
    </DefaultKeyboardShortcutsDialog>
  );
}
//[6]
function CustomMainMenu() {
  const editor = useEditor();
  return (
    <DefaultMainMenu>
      <div>
        <TldrawUiMenuGroup id="example">
          <TldrawUiMenuItem
            id="clear"
            label="Clear Canvas 🧨"
            onSelect={() => {
              editor.selectAll().deleteShapes(editor.getSelectedShapeIds());
            }}
          />
          <TldrawUiMenuItem
            id="save"
            label="Save"
            onSelect={async () => {
              const { document, session } = getSnapshot(editor.store);
              const res = await setWorkspaces({
                document,
                session,
              });
              if (res) {
                toast.success('Workspace saved successfully!');
              } else {
                toast.error('Failed to save the workspace. Please try again.');
              }
            }}
          />
          <TldrawUiMenuItem
            id="restore"
            label="Restore"
            icon="archive-restore"
            onSelect={async () => {
              const res = await getWorkspaces();
              if (!res) return;
              const { document, session } = res;
              editor.setCurrentTool('select');
              loadSnapshot(editor.store, { document, session });
              if (res) {
                toast.success('Workspace restored successfully!');
              } else {
                toast.error('Failed to restore the workspace. Please try again.');
              }
            }}
          />
        </TldrawUiMenuGroup>
      </div>
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
}
//[7]
function CustomNavigationPanel() {
  return null;
}
//[8]
function CustomPageMenu() {
  return (
    <div>
      <DefaultPageMenu />
    </div>
  );
}
//[9]
function CustomQuickActions() {
  return (
    <DefaultQuickActions>
      <DefaultQuickActionsContent />
    </DefaultQuickActions>
  );
}
//[10]
function CustomStylePanel(props: TLUiStylePanelProps) {
  const styles = useRelevantStyles();

  return (
    <DefaultStylePanel {...props}>
      <DefaultStylePanelContent styles={styles} />
    </DefaultStylePanel>
  );
}
//[11]
function CustomToolbar() {
  const tools = useTools();
  const isStickerSelected = useIsToolSelected(tools['sticker']);
  const isAnalogClockSelected = useIsToolSelected(tools['analog-clock']);
  const isScreenshotSelected = useIsToolSelected(tools['rhombus-2']);
  return (
    <DefaultToolbar>
      <DefaultToolbarContent />
      <TldrawUiMenuItem {...tools['rhombus-2']} isSelected={isScreenshotSelected} />
      <TldrawUiMenuItem {...tools['analog-clock']} isSelected={isAnalogClockSelected} />
      <TldrawUiMenuItem {...tools['sticker']} isSelected={isStickerSelected} />
    </DefaultToolbar>
  );
}
//[12]
function CustomZoomMenu() {
  return (
    <DefaultZoomMenu>
      <div style={{ backgroundColor: 'thistle' }}>
        <TldrawUiMenuGroup id="example">
          <TldrawUiMenuItem
            id="like"
            label="Like my posts"
            icon="external-link"
            readonlyOk
            onSelect={() => {
              window.open('https://x.com/tldraw', '_blank');
            }}
          />
        </TldrawUiMenuGroup>
      </div>
      <DefaultZoomMenuContent />
    </DefaultZoomMenu>
  );
}
//------------------

// [1]
const customTools = [StickerTool, AnalogClockTool];
const customShapeUtils = [AnalogClockUtil];

// [2]
const customUiOverrides: TLUiOverrides = {
  tools(editor, tools) {
    return {
      ...tools,
      sticker: {
        id: 'sticker',
        icon: 'heart',
        label: 'Sticker',
        kbd: 's',
        onSelect: () => {
          editor.setCurrentTool('sticker');
        },
      },
      'analog-clock': {
        id: 'analog-clock',
        icon: 'analog-clock',
        label: 'Analog Clock',
        kbd: 'c',
        onSelect: () => {
          editor.setCurrentTool('analog-clock');
        },
      },
    };
  },
};

// [4]
const customAssetUrls: TLUiAssetUrlOverrides = {
  icons: {
    heart: '/svgs/heart.svg',
    bomb: '/svgs/bomb.svg',
    'analog-clock': '/svgs/analog-clock.svg',
    'archive-restore': '/svgs/archive-restore.svg',
  },
};

const customComponents: TLComponents = {
  ActionsMenu: CustomActionsMenu,
  ContextMenu: CustomContextMenu,
  DebugMenu: CustomDebugMenu,
  HelpMenu: CustomHelpMenu,
  KeyboardShortcutsDialog: CustomKeyboardShortcutsDialog,
  MainMenu: CustomMainMenu,
  NavigationPanel: CustomNavigationPanel,
  PageMenu: CustomPageMenu,
  QuickActions: CustomQuickActions,
  StylePanel: CustomStylePanel,
  Toolbar: CustomToolbar,
  ZoomMenu: CustomZoomMenu,
};

function LoadButton() {
  const editor = useEditor();

  useEffect(() => {
    const loadWorkSpaces = async () => {
      const res = await getWorkspaces();
      if (!res) return;
      const { document, session } = res;
      editor.setCurrentTool('select');
      loadSnapshot(editor.store, { document, session });
    };
    loadWorkSpaces();
  }, []);

  return null;
}

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
      <LoadButton />
    </Tldraw>
  );
}
