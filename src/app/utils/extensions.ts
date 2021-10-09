// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function loadSimpleIOPlugin(): Promise<any> {
  return new Promise((resolve, reject) => {
    overwolf.extensions.current.getExtraObject('simple-io-plugin', (result) => {
      if (result.success) {
        resolve(result.object);
      } else {
        reject(result.error);
      }
    });
  });
}

let handleFileListenerChanged:
  | ((id: string, status: string, line: string) => void)
  | undefined = undefined;

type AddGameLogListenerProps = {
  onPlayerNameChange: (playerName: string) => void;
};
export async function addGameLogListener({
  onPlayerNameChange,
}: AddGameLogListenerProps): Promise<void> {
  const plugin = await loadSimpleIOPlugin();

  const filename = `${plugin.LOCALAPPDATA}/AGS/New World/Game.log`;

  const skipToEndOfFile = true;
  const fileIdentifier = 'Game.log';
  let playerName: string | null = null;

  function matchParts(data: string): void {
    const playerNamesMatch = data.match(/Player Name: (.*)/g);
    if (playerNamesMatch) {
      const playerNameMatch =
        playerNamesMatch[playerNamesMatch.length - 1].match(
          /Player Name: (.*)/
        );
      if (playerNameMatch) {
        if (playerNameMatch[1] !== playerName) {
          playerName = playerNameMatch[1];
          onPlayerNameChange(playerNameMatch[1]);
        }
      }
    }
  }

  function listenToGameLogFile() {
    plugin.getTextFile(
      filename,
      false, // not a UCS-2 file
      function (_status: unknown, data: string) {
        if (data) {
          matchParts(data);
        }
      }
    );

    plugin.listenOnFile(
      fileIdentifier,
      filename,
      skipToEndOfFile,
      function (fileId: string, status: string) {
        if (fileId == fileIdentifier) {
          if (status) {
            console.log('[' + fileId + '] now streaming...');
          } else {
            console.error('something bad happened with: ' + fileId);
          }
        }
      }
    );
  }

  handleFileListenerChanged = function (
    id: string,
    status: string,
    line: string
  ) {
    if (!status) {
      console.error('received an error on file: ' + id + ': ' + line);
      plugin.onFileListenerChanged.removeListener(handleFileListenerChanged);
      plugin.onFileListenerChanged.addListener(handleFileListenerChanged);
      listenToGameLogFile();
      return;
    }

    if (id == fileIdentifier) {
      matchParts(line);
    }
  };
  plugin.onFileListenerChanged.addListener(handleFileListenerChanged);

  listenToGameLogFile();
}

export async function removeGameLogListener(): Promise<void> {
  const plugin = await loadSimpleIOPlugin();
  if (handleFileListenerChanged) {
    plugin.onFileListenerChanged.removeListener(handleFileListenerChanged);
    handleFileListenerChanged = undefined;
  }
}
