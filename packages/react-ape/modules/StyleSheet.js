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
    }

    if (borderSize) {
      borderSize = borderSize.replace(/[^0-9]/g, '');
    }

    if (typeof(borderStyle) === 'string') {
      if (borderStyle === 'dashed') {
        borderStyle = [12];
      } else if (borderStyle === 'dotted') {
        borderStyle = [3];
      } else {
        borderStyle = [];
      }
    }

    style['x'] = style.left || 20;
    style['y'] = style.top || 20;
    delete style.top;
    delete style.left;

    style['borderSize'] = borderSize;
    style['borderStyle'] = borderStyle;
    style['borderColor'] = borderColor;

    processedStyles[styleKey] = style;
    style = null;
  })

  styles = null;
  return processedStyles;
}

export default {
  create: create,
}
