function ImageComponent(props, apeContext) {
  // console.log(props);
  const { ctx } = apeContext;
  const { style = {}, src, width, height } = props;
  let imageElement;

  if (!src) {
    return null;
  }

  imageElement = new Image();
  imageElement.src = src;

  imageElement.addEventListener('load', function() {
    const imageWidth = width || this.naturalWidth;
    const imageHeight = height || this.naturalHeight;
    ctx.drawImage(imageElement, style.x, style.y, imageWidth, imageHeight);
  })

  imageElement.addEventListener('error', function() {
    // if (window.__DEV__) {
      console.warn('failed to load image:', src);
    // }
  })
}

export default ImageComponent;
