/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function getWidth() {
  if (window || document) {
    return (
      (window || {}).innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }
}

function getHeight() {
  if (window || document) {
    return (
      (window || {}).innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    );
  }
}

const Dimensions = {
  get: function(property) {
    if (property === 'window') {
      return {
        width: getWidth(),
        height: getHeight(),
      };
    }

    if (property === 'screen') {
      return {
        width: window ? window.screen.width : 0,
        height: window ? window.screen.height : 0,
      };
    }

    return null;
  },
};

export default Dimensions;
