function getWidth() {
  if (window && window.innerWidth) {
    return window.innerWidth;
  }
}

function getHeight() {
  if (window && window.innerHeight) {
    return window.innerHeight;
  }
}

export default {
  getWidth,
  getHeight,
}
