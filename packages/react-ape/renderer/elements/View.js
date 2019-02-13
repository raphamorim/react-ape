/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {defaultViewSize} from '../constants';

class View {
  constructor(props) {
    this.props = props;
    this.type = 'View';
    this._renderList = [];
  }

  appendChild(fn) {
    this._renderList.push(fn);
  }

  // getStyle is used to clear operations
  getStyle() {
    const { style } = this.props;
    if (style) {
      return style;
    }

    return {
      backgroundColor: 'white',
      borderColor: 'white',
    };
  }

  children() {
    return this._renderList;
  }

  clear() {
    // noop
  }

  render(apeContext) {
    const {ctx, getSurfaceHeight, setSurfaceHeight} = apeContext;
    const {style = {}} = this.props;

    const previousStroke = ctx.strokeStyle;
    let x = style.x || style.left || 0; // legacy support
    let y = style.y || style.top || 0; // legacy support
    const width = style.width || defaultViewSize;
    const height = style.height || defaultViewSize;

    if (!style.position || style.position === 'relative') {
      const surfaceHeight = getSurfaceHeight();
      y = surfaceHeight;
      setSurfaceHeight(surfaceHeight + height);
    }

    ctx.globalCompositeOperation = 'destination-over';
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = style.borderColor || 'transparent';
    ctx.fillStyle = style.backgroundColor || 'transparent';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Reset Context
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = previousStroke;

    const callRenderFunctions = renderFunction => {
      renderFunction.render ? renderFunction.render({
        ...apeContext,
        // specific data for elements rendered inside the View
        viewLayoutData: { x, y }
      }) : null;
    };

    this._renderList.forEach(callRenderFunctions);
  }
}

export default View;
