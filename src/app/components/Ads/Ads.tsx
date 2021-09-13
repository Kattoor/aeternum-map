import type { OwAd } from '@overwolf/types/owads';
import { useEffect, useRef, useState } from 'react';
import { getCurrentWindow } from '../../utils/windows';
import classes from './Ads.module.css';

type AdsProps = {
  active: boolean;
};

function Ads({ active }: AdsProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [owAd, setOwAd] = useState<OwAd>();

  useEffect(() => {
    if (!active || owAd) {
      return;
    }

    function onOwAdReady() {
      if (typeof window.OwAd === 'undefined' || containerRef.current === null) {
        return;
      }
      const ad = new window.OwAd(containerRef.current, {
        size: { width: 400, height: 300 },
      });
      ad.addEventListener('ow_internal_rendered', () => {
        setOwAd(ad);
      });
    }

    const script = document.createElement('script');
    script.src = 'https://content.overwolf.com/libs/ads/latest/owads.min.js';
    script.async = true;
    document.body.appendChild(script);
    script.onload = onOwAdReady;
    return () => {
      document.body.removeChild(script);
    };
  }, [active, owAd]);

  useEffect(() => {
    if (!owAd || !active) {
      return;
    }
    async function onWindowStateChanged(
      state: overwolf.windows.WindowStateChangedEvent
    ) {
      const currentWindow = await getCurrentWindow();
      if (currentWindow.id !== state.window_id) {
        return;
      }
      if (state.window_state_ex === 'minimized') {
        owAd?.removeAd();
      } else if (
        state.window_previous_state_ex === 'minimized' &&
        state.window_state_ex === 'normal'
      ) {
        owAd?.refreshAd({});
      }
    }
    owAd?.refreshAd({});
    overwolf.windows.onStateChanged.addListener(onWindowStateChanged);
    return () => {
      owAd?.removeAd();
      overwolf.windows.onStateChanged.removeListener(onWindowStateChanged);
    };
  }, [owAd, active]);

  return (
    <div className={classes.container} ref={containerRef}>
      <span className={classes.text}>
        Ads support the development of this app
      </span>
    </div>
  );
}

export default Ads;
