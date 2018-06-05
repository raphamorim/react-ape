function ImageComponent(root, props, apeContext) {
  console.log(props);
  const { ctx } = apeContext;
  const { style = {}, src, width, height } = props;
  let imageElement;

  if (!src) {
    return null;
  }

  const x = style.left || 20;
  const y = style.top || 20;

  imageElement = new Image();
  imageElement.src = src;

  imageElement.addEventListener('load', function() {
    const imageWidth = width || this.naturalWidth;
    const imageHeight = height || this.naturalHeight;
    ctx.drawImage(imageElement, x, y, imageWidth, imageHeight);
  })

  imageElement.addEventListener('error', function() {
    // if (window.__DEV__) {
      console.warn('failed to load image:', src);
    // }
  })

  return {
    type: 'Image',
    props: props,
  }
}

export default ImageComponent;
