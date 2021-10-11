import { useEffect, useState } from 'react';

export const NEW_WORLD_CLASS_ID = 21816;

export function isNewWorldRunning(): Promise<boolean> {
  return new Promise((resolve) => {
    overwolf.games.getRunningGameInfo((result) => {
      resolve(result && result.classId === NEW_WORLD_CLASS_ID);
    });
  });
}

export function useRunningGameInfo({
  gameChanged,
  focusChanged,
}: {
  gameChanged: boolean;
  focusChanged: boolean;
}): overwolf.games.RunningGameInfo | undefined {
  const [runningGameInfo, setRunningGameInfo] = useState<
    overwolf.games.RunningGameInfo | undefined
  >(undefined);

  useEffect(() => {
    function handleGameInfoUpdated(
      event: overwolf.games.GameInfoUpdatedEvent
    ): void {
      if (gameChanged && event.gameChanged) {
        setRunningGameInfo(event.gameInfo);
      }
      if (focusChanged && event.focusChanged) {
        setRunningGameInfo(event.gameInfo);
      }
    }

    overwolf.games.onGameInfoUpdated.addListener(handleGameInfoUpdated);

    overwolf.games.getRunningGameInfo((result) => {
      setRunningGameInfo(result);
    });

    return () => {
      overwolf.games.onGameInfoUpdated.removeListener(handleGameInfoUpdated);
    };
  }, []);

  return runningGameInfo;
}

export function useIsNewWorldRunning(): boolean {
  const runningGameInfo = useRunningGameInfo({
    gameChanged: true,
    focusChanged: false,
  });
  return runningGameInfo
    ? runningGameInfo.classId === NEW_WORLD_CLASS_ID
    : false;
}
