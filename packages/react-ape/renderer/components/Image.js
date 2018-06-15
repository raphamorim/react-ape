function ImageComponent(props, apeContext) {
  const { ctx } = apeContext;
  const { style = {}, src, width, height } = props;
  let imageElement;

  if (!src) {
    return null;
  }

  imageElement = new Image();
  imageElement.src = src;

  if (imageElement.complete) {
    const imageWidth = width || this.naturalWidth;
    const imageHeight = height || this.naturalHeight;
    ctx.drawImage(imageElement, style.x, style.y, imageWidth, imageHeight);
  } else {
    function loadImage() {
      const imageWidth = width || this.naturalWidth;
      const imageHeight = height || this.naturalHeight;
      ctx.drawImage(imageElement, style.x, style.y, imageWidth, imageHeight);
      imageElement.removeEventListener
    }

    imageElement.addEventListener('load', loadImage);
    // imageElement.removeEventListener('load', loadImage);

    imageElement.addEventListener('error', function() {
      // if (window.__DEV__) {
        console.warn('failed to load image:', src);
      // }
    })
  }
}

export default ImageComponent;
