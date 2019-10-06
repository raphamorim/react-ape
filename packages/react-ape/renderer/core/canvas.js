/**
 * Copyright (c) 2019-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

import type {CanvasRect, CustomCanvasRenderingContext2D} from '../types';

export function scaleDPI(
  canvas: HTMLCanvasElement,
  context: CustomCanvasRenderingContext2D,
  customWidth?: number,
  customHeight?: number
): number {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const backingStorePixelRatio: number =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  const ratio = devicePixelRatio / backingStorePixelRatio;

  const width =
    customWidth || canvas.offsetWidth || canvas.width || canvas.clientWidth;
  const height =
    customHeight || canvas.offsetHeight || canvas.height || canvas.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);

  if (devicePixelRatio !== backingStorePixelRatio) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(ratio, ratio);
  }

  return ratio;
}

export function clearCanvas(
  context: CustomCanvasRenderingContext2D,
  preserveTransform: boolean,
  clearRect?: CanvasRect = {x: 0, y: 0}
) {
  if (preserveTransform) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  context.clearRect(
    clearRect.x,
    clearRect.y,
    clearRect.width || context.canvas.width,
    clearRect.height || context.canvas.height
  );

  if (preserveTransform) {
    context.restore();
  }
}
