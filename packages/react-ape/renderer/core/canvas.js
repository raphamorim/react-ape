export function scaleDPI(canvas, context, customWidth, customHeight) {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const backingStorePixelRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  const ratio = devicePixelRatio / backingStorePixelRatio;

  const width =
    customWidth || canvas.offsetWidth || canvas.width || canvas.clientWidth;
  const height =
    customHeight || canvas.offsetHeight || canvas.height || canvas.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);

  if (devicePixelRatio !== backingStorePixelRatio) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(ratio, ratio);
  }

  return ratio;
}

export function clearCanvas(context, preserveTransform, clearRect = {}) {
  if (preserveTransform) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  // console.log(clearRect)
  context.clearRect(
    clearRect.x || 0,
    clearRect.y || 0,
    clearRect.width || context.canvas.width,
    clearRect.height || context.canvas.height
  );

  if (preserveTransform) {
    context.restore();
  }
}
