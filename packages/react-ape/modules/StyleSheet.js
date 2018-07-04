/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function create(styles) {
  if (!styles) {
    return {};
  }

  let processedStyles = {};

  Object.keys(styles).forEach((styleKey) => {
    let style = styles[styleKey];
    if (typeof style !== 'object') {
      return {};
    }

    let borderSize = (style.borderSize || null),
      borderColor = (style.borderColor || null),
      borderStyle = (style.borderStyle || []);

    if (style.border) {
      let border = [],
        borderString = style.border;

      // 0 - Size: [0-9]px
      border = border.concat(style.border.match(/[0-9]*\.?[0-9]px?/i));
      borderString = borderString.replace(/[0-9]*\.?[0-9]px?/i, '');

      // 1 - Style
      border = border.concat(borderString.match(/solid|dashed|dotted/i));
      borderString = borderString.replace(/solid|dashed|dotted/i, '');

      // 2 - Color
      border = border.concat(borderString.match(/[^\s]+/i));

      if (!borderSize) {
        borderSize = border[0];
      }
      if (!borderColor) {
        borderColor = border[2];
      }

      borderStyle = border[1];
      delete style.border;
    }

    if (borderColor) {
      style['borderColor'] = borderColor;
    }

    if (borderSize) {
      style['borderSize'] = borderSize.replace(/[^0-9]/g, '');;
    }

    if (typeof(borderStyle) === 'string') {
      if (borderStyle === 'dashed') {
        borderStyle = [12];
      } else if (borderStyle === 'dotted') {
        borderStyle = [3];
      } else {
        borderStyle = [];
      }

      style['borderStyle'] = borderStyle;
    }

    if (style.left || style.left == 0) {
      style['x'] = style.left;
      delete style.left;
    }

    if (style.top || style.top == 0) {
      style['y'] = style.top;
      delete style.top;
    }

    processedStyles[styleKey] = style;
    style = null;
  })

  styles = null;
  return processedStyles;
}

export default {
  create: create,
}
