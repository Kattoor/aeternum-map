import { SHOW_HIDE_APP } from './utils/hotkeys';
import { waitForOverwolf } from './utils/overwolf';
import {
  getPreferedWindowName,
  restoreWindow,
  toggleWindow,
} from './utils/windows';

console.log('Starting background process');
waitForOverwolf().then(() => {
  const preferedWindowName = getPreferedWindowName();
  restoreWindow(preferedWindowName);
});

async function handleHotkeyPressed(
  event: overwolf.settings.hotkeys.OnPressedEvent
) {
  if (event.name === SHOW_HIDE_APP) {
    const preferedWindowName = getPreferedWindowName();
    toggleWindow(preferedWindowName);
  }
}
overwolf.settings.hotkeys.onPressed.addListener(handleHotkeyPressed);
