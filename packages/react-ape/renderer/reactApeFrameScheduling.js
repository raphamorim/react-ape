// @flow
// https://github.com/facebook/react/blob/master/packages/react-native-renderer/src/ReactNativeFrameScheduling.js
// TODO: make this hardware relevant/aware

const hasNativePerformanceNow =
  typeof performance === 'object' && typeof performance.now === 'function';

export const now = hasNativePerformanceNow
  ? () => performance.now()
  : () => Date.now();

let scheduledCallback: (() => mixed) | null = null;
let frameDeadline: number = 0;

function setTimeoutCallback() {
  // TODO (bvaughn) Hard-coded 5ms unblocks initial async testing.
  // React API probably changing to boolean rather than time remaining.
  // Longer-term plan is to rewrite this using shared memory,
  // And just return the value of the bit as the boolean.
  frameDeadline = now() + 5;

  const callback = scheduledCallback;
  scheduledCallback = null;
  if (callback !== null) {
    callback();
  }
}

// RN has a poor polyfill for requestIdleCallback so we aren't using it.
// This implementation is only intended for short-term use anyway.
// We also don't implement cancel functionality b'c Fiber doesn't currently need it.
export function scheduleDeferredCallback(
  callback: () => mixed,
  options?: {timeout: number},
): number {
  // We assume only one callback is scheduled at a time b'c that's how Fiber works.
  scheduledCallback = callback;
  const timeoutId = setTimeout(setTimeoutCallback, 1);
  return (timeoutId: any); // Timeouts are always numbers on RN
}

export function cancelDeferredCallback(callbackID: number) {
  scheduledCallback = null;
  clearTimeout((callbackID: any)); // Timeouts are always numbers on RN
}

export function shouldYield() {
  return frameDeadline <= now();
}
