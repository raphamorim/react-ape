/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

export type SpatialGeometry = {|
  x: number,
  y: number,
|};

export type ApeElement = {|
  render: (CanvasComponentContext, ?Layout) => mixed,
  clear?: () => mixed,
  parentLayout?: Layout
|};

export type Layout = {
  style?: {
    backgroundColor: string,
    borderColor: string,
  },
  spatialGeometry: SpatialGeometry
};

export type CanvasComponentContext = {
  // render queue for update operations
  renderQueue: Array<ApeElement>,
  type: 'canvas',
  ctx: CanvasRenderingContext2D,
};
