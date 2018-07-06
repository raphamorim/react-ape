/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function ImageComponent(props, apeContext) {
  console.log(props, apeContext);
  const { ctx } = apeContext;
  const { style = {}, src, width, height } = props;
  let imageElement;

  if (!src) {
    return null;
  }

  imageElement = new Image();
  imageElement.src = src;

  if (imageElement.complete) {
    console.log(1);
    const imageWidth = width || style.width || this.naturalWidth;
    const imageHeight = height || style.height || this.naturalHeight;
    ctx.drawImage(imageElement, style.x, style.y, imageWidth, imageHeight);
  } else {
    function loadImage() {
      const imageWidth = width || style.width || this.naturalWidth;
      const imageHeight = height || style.height || this.naturalHeight;
      ctx.drawImage(imageElement, style.x, style.y, imageWidth, imageHeight);
      imageElement.removeEventListener
    }

    imageElement.addEventListener('load', loadImage);

    imageElement.addEventListener('error', function() {
      // if (window.__DEV__) {
        console.warn('failed to load image:', src);
      // }
    })
  }
}

export default ImageComponent;
