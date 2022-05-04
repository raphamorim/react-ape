/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

import type {CanvasComponentContext, SpatialGeometry} from '../types';

const cacheImageControl = {};

function saveOnCache(
  src: string,
  element: ?Image,
  width: number,
  height: number
): void {
  cacheImageControl[src] = {
    element,
    width,
    height,
  };
}

type ImageStyle = {|
  width?: number,
  height?: number,
  x: number,
  y: number,
  overflow?: string,
|};

type Props = {|
  style: ImageStyle,
  src: string,
  imageElement: Image,
  width?: number,
  height?: number,
|};

type ParentLayout = {|
  style: ImageStyle,
  spatialGeometry: SpatialGeometry,
|};

function drawImage(
  ctx: CanvasRenderingContext2D,
  imageElement: Image,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.drawImage(imageElement, x, y, width, height);
}

function renderImage(
  props: Props,
  apeContext: CanvasComponentContext,
  parentLayout: ParentLayout
) {
  const {ctx} = apeContext;
  const {spatialGeometry = {x: 0, y: 0}} = parentLayout || {};
  const {style = {}, imageElement, src, width, height} = props;

  if (!src && !imageElement) {
    return null;
  }

  let x = style.left || spatialGeometry.x;
  let y = style.top || spatialGeometry.y;

  // If position is absolute should reset geometry
  if (style.position === 'absolute') {
    x = style.left || 0;
    y = style.top || 0;

    // If is relative and x and y haven't be processed, don't render
  } else if (!spatialGeometry) {
    return null;
  }

  const cachedImage = cacheImageControl[src];

  let w = width || style.width;
  let h = height || style.height;

  // If overflow hidden exists then height and width should be limited
  if (
    parentLayout &&
    parentLayout.style &&
    parentLayout.style.overflow === 'hidden'
  ) {
    h = parentLayout.style.height;
    w = parentLayout.style.width;
  }

  if (cachedImage) {
    drawImage(
      ctx,
      cachedImage.element,
      x,
      y,
      w || cachedImage.width,
      h || cachedImage.height
    );
    return;
  }

  if (imageElement && imageElement.src) {
    drawImage(
      ctx,
      imageElement,
      x,
      y,
      w || imageElement.naturalWidth,
      h || imageElement.naturalHeight
    );
    return;
  }

  let newImageElement = new Image();
  newImageElement.src = src;

  function loadImage() {
    if (!newImageElement) {
      return;
    }
    const imageWidth = Number(w || newImageElement.naturalWidth);
    const imageHeight = Number(h || newImageElement.naturalHeight);
    ctx.drawImage(newImageElement, x, y, imageWidth, imageHeight);
    saveOnCache(src, newImageElement, imageWidth, imageHeight);
  }

  if (newImageElement.complete) {
    loadImage();
  } else {
    newImageElement.addEventListener('load', loadImage);
    newImageElement.addEventListener('error', () => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('failed to load image:', src);
      }
    });
  }
}

export default function CreateImageInstance(props: Props): mixed {
  return {
    type: 'Image',
    render: renderImage.bind(this, props),
    clear: () => {},
  };
}
