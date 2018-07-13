/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

export type CanvasComponentContext = {
  _renderQueueForUpdate: Array<mixed>,
  type: 'canvas',
  ctx: CanvasRenderingContext2D,
};
