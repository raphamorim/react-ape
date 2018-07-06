/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const cacheImageControl = {};

function saveOnCache(src, element, width, height) {
  cacheImageControl[src] = {
    element,
    width,
    height,
  };
}

function ImageComponent(props, apeContext) {
  const {ctx} = apeContext;
  const {style = {}, src, width, height} = props;

  if (!src) {
    return null;
  }

  if (cacheImageControl[src]) {
    const cachedImage = cacheImageControl[src];
    ctx.drawImage(
      cachedImage.element,
      style.x,
      style.y,
      width || style.width || cachedImage.width,
      height || style.height || cachedImage.height
    );
    return;
  }

  let imageElement;
  imageElement = new Image();
  imageElement.src = src;

  if (imageElement.complete) {
    const imageWidth = width || style.width || this.naturalWidth;
    const imageHeight = height || style.height || this.naturalHeight;
    ctx.drawImage(imageElement, style.x, style.y, imageWidth, imageHeight);

    saveOnCache(src, imageElement, imageWidth, imageHeight);
    imageElement = null;
  } else {
    function loadImage() {
      const imageWidth = width || style.width || this.naturalWidth;
      const imageHeight = height || style.height || this.naturalHeight;
      ctx.drawImage(imageElement, style.x, style.y, imageWidth, imageHeight);

      saveOnCache(src, imageElement, imageWidth, imageHeight);
      imageElement = null;
    }

    imageElement.addEventListener('load', loadImage);

    imageElement.addEventListener('error', function() {
      // if (window.__DEV__) {
      console.warn('failed to load image:', src);
      // }
    });
  }
}

export default ImageComponent;
