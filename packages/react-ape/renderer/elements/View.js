/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { defaultViewSize } from '../constants';

class View {
  constructor(props) {
    this.props = props;
    this._renderList = [];
  }

  appendChild(fn) {
    this._renderList.push(fn);
  }

  getStyle() {
    if (this.props && this.props.style) {
      return this.props.style;
    }

    return {
      backgroundColor: 'white',
      borderColor: 'white'
    };
  }

  children() {
    return this._renderList;
  }

  clear() {
    // noop
  }

  render(apeContext) {
    const {ctx} = apeContext;
    const {style = {}} = this.props;

    const previousStroke = ctx.strokeStyle;
    const x = style.x || 0;
    const y = style.y || 0;
    const width = style.width || defaultViewSize;
    const height = style.height || defaultViewSize;

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
      renderFunction.render
        ? renderFunction.render(apeContext)
        : null;
    };

    this._renderList.forEach(callRenderFunctions);
  }
}

export default View;
