'use client';

import { getWorkspaces, setWorkspaces } from '@/actions/workspace';
import '@/app/index.css';
import { useTheme } from 'next-themes';
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
  DefaultNavigationPanel,
  DefaultPageMenu,
  DefaultQuickActions,
  DefaultQuickActionsContent,
  DefaultSharePanel,
  DefaultStylePanel,
  DefaultStylePanelContent,
  DefaultToolbar,
  DefaultToolbarContent,
  DefaultTopPanel,
  DefaultZoomMenu,
  DefaultZoomMenuContent,
  TLComponents,
  TLUiAssetUrlOverrides,
  TLUiContextMenuProps,
  TLUiKeyboardShortcutsDialogProps,
  TLUiOverrides,
  TLUiStylePanelProps,
  Tldraw,
  TldrawUiMenuGroup,
  TldrawUiMenuItem,
  TldrawUiMenuSubmenu,
  computed,
  getSnapshot,
  hardReset,
  loadSnapshot,
  refreshPage,
  useEditor,
  useIsToolSelected,
  useRelevantStyles,
  useTools,
} from 'tldraw';
import { AnalogClockTool, AnalogClockUtil } from './_components/analog-clock-tool';
import { SlideShapeTool } from './_components/slide-show/SlideShapeTool';
import { SlideShapeUtil } from './_components/slide-show/SlideShapeUtil';
import { SlidesPanel } from './_components/slide-show/SlidesPanel';
import './_components/slide-show/slides.css';
import { $currentSlide, getSlides, moveToSlide } from './_components/slide-show/useSlides';
import { StickerTool } from './_components/sticker-tool-util';

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
              label="Clear Canvas"
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
        <TldrawUiMenuItem {...tools['slide']} />
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
      <TldrawUiMenuSubmenu
        id="file"
        label="File"
        children={
          <>
            <TldrawUiMenuItem
              id="new-file"
              label="New file"
              onSelect={async () => {
                refreshPage();
                await hardReset();
              }}
            />
            <TldrawUiMenuItem
              id="open-file"
              label="Open file"
              onSelect={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.tldr';

                input.onchange = async (event: Event) => {
                  const target = event.target as HTMLInputElement;
                  const file = target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onload = (e) => {
                    const data = JSON.parse(e.target?.result as string);
                    loadSnapshot(editor.store, data);
                    toast.success('Workspace loaded successfully!');
                  };
                  reader.readAsText(file);
                };

                input.click();
              }}
            />
            <TldrawUiMenuItem
              id="save-a-copy"
              label="Save a copy"
              onSelect={() => {
                const { document: TldrawDocument, session } = getSnapshot(editor.store);
                const blob = new Blob([JSON.stringify({ document: TldrawDocument, session })], {
                  type: 'application/json',
                });
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                link.href = url;
                link.download = 'Untitled.tldr';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                toast.success('Workspace saved as .tldr file!');
              }}
            />
          </>
        }
      />
      <TldrawUiMenuGroup id="custom">
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
          label="Restore last saved"
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
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  );
}
//[7]
function CustomNavigationPanel() {
  return <DefaultNavigationPanel />;
}
//[8]
function CustomPageMenu() {
  return <DefaultPageMenu />;
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
  const isSlideSelected = useIsToolSelected(tools['slide']);

  return (
    <DefaultToolbar>
      <DefaultToolbarContent />
      <TldrawUiMenuItem {...tools['slide']} isSelected={isSlideSelected} />
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
      <DefaultZoomMenuContent />
    </DefaultZoomMenu>
  );
}
//------------------

// [1]
const customTools = [StickerTool, AnalogClockTool, SlideShapeTool];
const customShapeUtils = [AnalogClockUtil, SlideShapeUtil];

// [2]

const customUiOverrides: TLUiOverrides = {
  actions(editor, actions) {
    const $slides = computed('slides', () => getSlides(editor));
    return {
      ...actions,
      'next-slide': {
        id: 'next-slide',
        label: 'Next slide',
        kbd: 'right',
        onSelect() {
          const slides = $slides.get();
          const currentSlide = $currentSlide.get();
          const index = slides.findIndex((s) => s.id === currentSlide?.id);
          const nextSlide = slides[index + 1] ?? currentSlide ?? slides[0];
          if (nextSlide) {
            editor.stopCameraAnimation();
            moveToSlide(editor, nextSlide);
          }
        },
      },
      'previous-slide': {
        id: 'previous-slide',
        label: 'Previous slide',
        kbd: 'left',
        onSelect() {
          const slides = $slides.get();
          const currentSlide = $currentSlide.get();
          const index = slides.findIndex((s) => s.id === currentSlide?.id);
          const previousSlide = slides[index - 1] ?? currentSlide ?? slides[slides.length - 1];
          if (previousSlide) {
            editor.stopCameraAnimation();
            moveToSlide(editor, previousSlide);
          }
        },
      },
    };
  },

  tools(editor, tools) {
    tools.slide = {
      id: 'slide',
      icon: 'group',
      label: 'Slide',
      kbd: 's',
      onSelect: () => editor.setCurrentTool('slide'),
    };

    (tools.sticker = {
      id: 'sticker',
      icon: 'heart',
      label: 'Sticker',
      kbd: 's',
      onSelect: () => {
        editor.setCurrentTool('sticker');
      },
    }),
      (tools['analog-clock'] = {
        id: 'analog-clock',
        icon: 'analog-clock',
        label: 'Analog Clock',
        kbd: 'c',
        onSelect: () => {
          editor.setCurrentTool('analog-clock');
        },
      });
    return tools;
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
  SharePanel: DefaultSharePanel,
  TopPanel: DefaultTopPanel,
  HelperButtons: SlidesPanel,
  Minimap: null,
};

export default function Home() {
  const { resolvedTheme } = useTheme();

  return (
    <Tldraw
      inferDarkMode={resolvedTheme?.includes('dark')}
      persistenceKey="persist"
      tools={customTools}
      overrides={customUiOverrides}
      shapeUtils={customShapeUtils}
      assetUrls={customAssetUrls}
      components={customComponents}
    />
  );
}
