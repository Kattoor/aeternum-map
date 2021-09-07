import { waitForOverwolf } from './utils/overwolf';
import { restoreWindow, togglePreferedWindow, WINDOWS } from './utils/windows';

console.log('Starting background process');
waitForOverwolf().then(() => {
  restoreWindow(WINDOWS.DESKTOP);
});

async function handleHotkeyPressed(
  event: overwolf.settings.hotkeys.OnPressedEvent
) {
  if (event.name === 'toggle_monitor') {
    togglePreferedWindow();
  }
}
overwolf.settings.hotkeys.onPressed.addListener(handleHotkeyPressed);
