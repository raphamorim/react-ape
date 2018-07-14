/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

import type {CanvasComponentContext} from '../types';

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

type Props = {|
  style: {
    width?: number,
    height?: number,
    x: number,
    y: number,
  },
  src: string,
  width: number,
  height: number,
|};

function drawImage(
  ctx: CanvasComponentContext,
  imageElement: Image,
  x: number,
  y: number,
  width: number,
  height: number
) {
  ctx.drawImage(imageElement, x, y, width, height);
}

function ImageComponent(props: Props, apeContext: CanvasComponentContext) {
  const {ctx} = apeContext;
  const {style = {x: 0, y: 0}, src, width, height} = props;

  if (!src) {
    return null;
  }

  const cachedImage = cacheImageControl[src];
  if (cachedImage) {
    drawImage(
      ctx,
      cachedImage.element,
      style.x,
      style.y,
      width || style.width || cachedImage.width,
      height || style.height || cachedImage.height
    );
    return;
  }

  if (src && src.src) {
    drawImage(
      ctx,
      src,
      style.x,
      style.y,
      width || style.width || src.naturalWidth,
      height || style.height || src.naturalHeight
    );
    return;
  }

  let imageElement = new Image();
  imageElement.src = src;

  function loadImage() {
    if (!imageElement) {
      return;
    }
    const imageWidth = Number(
      width || style.width || imageElement.naturalWidth
    );
    const imageHeight = Number(
      height || style.height || imageElement.naturalHeight
    );
    ctx.drawImage(imageElement, style.x, style.y, imageWidth, imageHeight);
    saveOnCache(src, imageElement, imageWidth, imageHeight);
    imageElement = null;
  }

  if (imageElement.complete) {
    loadImage();
  } else {
    imageElement.addEventListener('load', loadImage);
    imageElement.addEventListener('error', () => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('failed to load image:', src);
      }
    });
  }
}

export default ImageComponent;
