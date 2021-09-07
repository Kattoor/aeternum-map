export const WINDOWS = {
  DESKTOP: 'desktop',
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

export async function closeMainWindow(): Promise<void> {
  return closeWindow(WINDOWS.BACKGROUND);
}

export async function restoreWindow(windowName: string): Promise<string> {
  const declaredWindow = await obtainDeclaredWindow(windowName);
  return new Promise((resolve, reject) =>
    overwolf.windows.restore(declaredWindow.id, (result) => {
      if (result.success) {
        resolve(result.window_id!); // window_id is always a string if success
      } else {
        reject(result.error);
      }
    })
  );
}

export function toggleWindow(windowName: string): void {
  overwolf.windows.obtainDeclaredWindow(windowName, (result) => {
    if (['normal', 'maximized'].includes(result.window.stateEx)) {
      overwolf.windows.hide(result.window.id);
    } else {
      restoreWindow(result.window.id);
    }
  });
}
