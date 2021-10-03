import { getJSONItem, setJSONItem } from './storage';

export const WINDOWS = {
  DESKTOP: 'desktop',
  OVERLAY: 'overlay',
  BACKGROUND: 'background',
};

export function getCurrentWindow(): Promise<overwolf.windows.WindowInfo> {
  return new Promise((resolve, reject) => {
    overwolf.windows.getCurrentWindow((result) => {
      if (result.success) {
        resolve(result.window);
      } else {
        reject(result.error);
      }
    });
  });
}

export function obtainDeclaredWindow(
  windowName: string
): Promise<overwolf.windows.WindowInfo> {
  return new Promise((resolve, reject) => {
    overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
      if (result.success) {
        resolve(result.window);
      } else {
        reject(result.error);
      }
    });
  });
}

export async function dragMoveWindow(): Promise<void> {
  const currentWindow = await getCurrentWindow();
  overwolf.windows.dragMove(currentWindow.id);
}

export async function minimizeCurrentWindow(): Promise<void> {
  const currentWindow = await getCurrentWindow();
  overwolf.windows.minimize(currentWindow.id);
}

export async function maximizeCurrentWindow(): Promise<void> {
  const currentWindow = await getCurrentWindow();
  overwolf.windows.maximize(currentWindow.id);
}

export async function restoreCurrentWindow(): Promise<void> {
  const currentWindow = await getCurrentWindow();
  overwolf.windows.restore(currentWindow.id);
}

export async function closeWindow(windowName: string): Promise<void> {
  const backgroundWindow = await obtainDeclaredWindow(windowName);
  overwolf.windows.close(backgroundWindow.id);
}

export async function closeCurrentWindow(): Promise<void> {
  const currentWindow = await getCurrentWindow();
  return closeWindow(currentWindow.id);
}

export async function closeMainWindow(): Promise<void> {
  return closeWindow(WINDOWS.BACKGROUND);
}

export async function getPreferedWindowName(): Promise<string> {
  const preferedWindowName = getJSONItem<string>('preferedWindowName');
  if (preferedWindowName) {
    return preferedWindowName;
  }
  const secondScreen = await getMonitor(false);
  return secondScreen ? WINDOWS.DESKTOP : WINDOWS.OVERLAY;
}

export async function restoreWindow(windowName: string): Promise<string> {
  const declaredWindow = await obtainDeclaredWindow(windowName);

  return new Promise((resolve, reject) => {
    if (declaredWindow.isVisible) {
      overwolf.windows.bringToFront(windowName, () => undefined);
      resolve(declaredWindow.id);
      return;
    }
    overwolf.windows.restore(windowName, async (result) => {
      if (result.success) {
        const alreadyCentered = getJSONItem<boolean>(`centered-${windowName}`);
        if (!alreadyCentered) {
          const primaryDisplay = declaredWindow.name === WINDOWS.OVERLAY;
          await centerWindow(declaredWindow, primaryDisplay);
          setJSONItem(`centered-${declaredWindow.name}`, true);
        }
        overwolf.windows.bringToFront(windowName, () => undefined);
        resolve(result.window_id!); // window_id is always a string if success
      } else {
        reject(result.error);
      }
    });
  });
}

export function toggleWindow(windowName: string): void {
  overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
    if (['normal', 'maximized'].includes(result.window.stateEx)) {
      overwolf.windows.hide(result.window.id);
    } else {
      restoreWindow(result.window.name);
    }
  });
}

export async function togglePreferedWindow(): Promise<void> {
  const preferedWindowName =
    getJSONItem<string>('preferedWindowName') || WINDOWS.DESKTOP;
  setJSONItem(
    'preferedWindowName',
    preferedWindowName === WINDOWS.DESKTOP ? WINDOWS.OVERLAY : WINDOWS.DESKTOP
  );
  await restoreWindow(
    preferedWindowName === WINDOWS.DESKTOP ? WINDOWS.OVERLAY : WINDOWS.DESKTOP
  );
  await closeWindow(preferedWindowName);
}

export async function getMonitor(
  primaryDisplay: boolean
): Promise<overwolf.utils.Display | undefined> {
  const monitors = await getDisplays();

  const monitor = monitors.find(
    (display) => display.is_primary === primaryDisplay
  );
  return monitor;
}

export function getDisplays(): Promise<overwolf.utils.Display[]> {
  return new Promise<overwolf.utils.Display[]>((resolve) => {
    overwolf.utils.getMonitorsList((result) => {
      resolve(result.displays);
    });
  });
}

export async function centerWindow(
  window: overwolf.windows.WindowInfo,
  primaryDisplay = true
): Promise<void> {
  const monitor = await getMonitor(primaryDisplay);
  if (!monitor) {
    return;
  }
  return new Promise((resolve) => {
    overwolf.windows.changePosition(
      window.name,
      monitor.x + Math.round((monitor.width - window.width) / 2),
      monitor.y + Math.round((monitor.height - window.height) / 2),
      () => resolve()
    );
  });
}
