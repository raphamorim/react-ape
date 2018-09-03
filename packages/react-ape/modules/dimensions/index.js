function getWidth() {
  if (window || document) {
    return (window || {}).innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
  }
}

function getHeight() {
  if (window || document) {
    return (window || {}).innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;
  }
}

export default {
  getWidth,
  getHeight,
};
