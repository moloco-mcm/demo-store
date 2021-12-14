import React from 'react';

import Progress from '@rmp-demo-store/ui/progress';

const INITIAL_PROGRESS_VALUE = 0;
const MAX_PROGRESS_VALUE = 100;
const TRICKLE_SPEED = 200;

type Props = {};

export type PageLoaderRef = {
  reset: () => void;
  start: () => void;
  done: () => void;
};

function useForceRerender() {
  const [, setValue] = React.useState<number>(0);
  return () => setValue((value) => value + 1);
}

const getTrickleAmount = (currentValue: number) => {
  if (currentValue >= 0 && currentValue < 20) {
    return 10;
  } else if (currentValue >= 20 && currentValue < 50) {
    return 4;
  } else if (currentValue >= 50 && currentValue < 80) {
    return 2;
  } else if (currentValue >= 80 && currentValue < 99) {
    return 0.5;
  } else {
    return 0;
  }
};

export const PageLoader = React.forwardRef<PageLoaderRef, Props>(
  (_props, ref) => {
    const value = React.useRef<number>(INITIAL_PROGRESS_VALUE);
    const trickleInterval = React.useRef<number | null>(null);
    const isMounted = React.useRef<boolean>(false);

    const [showProgress, setShowProgress] = React.useState(false);

    const forceRerender = useForceRerender();

    const clearTrickleInterval = () => {
      if (trickleInterval.current !== null) {
        window.clearInterval(trickleInterval.current);
      }
      trickleInterval.current = null;
    };

    const updateProgressValue = (newValue: number) => {
      value.current = newValue;
      forceRerender();
    };

    React.useImperativeHandle(ref, () => ({
      reset: () => {
        if (!isMounted.current) return;
        setShowProgress(false);
        clearTrickleInterval();
        updateProgressValue(INITIAL_PROGRESS_VALUE);
      },
      start: () => {
        if (!isMounted.current) return;
        if (trickleInterval.current != null) {
          return;
        }
        setShowProgress(true);
        trickleInterval.current = window.setInterval(() => {
          if (value.current > MAX_PROGRESS_VALUE) return;

          const newValue = Math.min(
            value.current + getTrickleAmount(value.current),
            MAX_PROGRESS_VALUE
          );
          updateProgressValue(newValue);
        }, TRICKLE_SPEED);
      },
      done: () => {
        if (!isMounted.current) return;
        clearTrickleInterval();
        updateProgressValue(MAX_PROGRESS_VALUE);

        // unmount progress bar once 'done' animation ends
        window.setTimeout(() => {
          if (value.current >= MAX_PROGRESS_VALUE) {
            setShowProgress(false);
          }
        }, TRICKLE_SPEED);
      },
    }));

    React.useEffect(() => {
      isMounted.current = true;
      return () => {
        isMounted.current = false;
        clearTrickleInterval();
      };
    }, []);

    return (
      <div>
        {showProgress && (
          <Progress size="xs" colorScheme="purple" value={value.current} />
        )}
      </div>
    );
  }
);

PageLoader.displayName = 'PageLoader';
