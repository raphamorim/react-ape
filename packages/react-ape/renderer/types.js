/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

export type CustomCanvasRenderingContext2D = CanvasRenderingContext2D & {|
  webkitBackingStorePixelRatio?: number,
  mozBackingStorePixelRatio?: number,
  msBackingStorePixelRatio?: number,
  oBackingStorePixelRatio?: number,
  backingStorePixelRatio?: number,
|};

export type CanvasRect = {|
  x: number,
  y: number,
  width?: number,
  height?: number,
|};

export type SpatialGeometry = {|
  x: number,
  y: number,
|};

export type ApeElement = {|
  render: (CanvasComponentContext, ?Layout) => mixed,
  clear?: () => mixed,
  parentLayout?: Layout,
|};

export type Layout = {
  style?: {
    backgroundColor: string,
    borderColor: string,
  },
  spatialGeometry: SpatialGeometry,
};

export type CanvasComponentContext = {
  // render queue for update operations
  renderQueue: Array<ApeElement>,
  type: 'canvas',
  ctx: CustomCanvasRenderingContext2D,
};
