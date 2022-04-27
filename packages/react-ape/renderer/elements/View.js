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
    this.spatialGeometry = {};
    this.renderQueue = [];
    this.previousRect = null;
  }

  appendChild(fn) {
    this.renderQueue.push(fn);
  }

  getLayoutDefinitions = () => {
    return {
      style: {
        backgroundColor: 'white',
        borderColor: 'white',
        lineHeight: '22px',
        ...(this.props.style || {}),
      },
      spatialGeometry: this.spatialGeometry,
    };
  };

  children() {
    return this.renderQueue;
  }

  clear() {
    const {ctx} = apeContext;
    const {style} = parentLayout;
    // Draw entire View using parent style (without children)
    if (this.previousRect) {
      const previousStroke = ctx.strokeStyle;
      ctx.beginPath();
      const {x, y, width, height} = this.previousRect;
      ctx.rect(x, y, width, height);
      console.log(style.backgroundColor);
      ctx.strokeStyle = style.backgroundColor || 'transparent';
      ctx.fillStyle = style.backgroundColor || 'transparent';
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    }
  }

  render(apeContext) {
    const {ctx, getSurfaceHeight, setSurfaceHeight} = apeContext;
    const {style = {}} = this.props;

    const previousStroke = ctx.strokeStyle;
    let x = style.x || style.left || 0;
    let y = style.y || style.top || 0;
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
    this.previousRect = {x, y, width, height};
    ctx.strokeStyle = style.borderColor || 'transparent';
    ctx.fillStyle = style.backgroundColor || 'transparent';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // Reset Context
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = previousStroke;

    this.spatialGeometry = {x, y};

    const callRenderFunctions = renderFunction => {
      renderFunction.render
        ? renderFunction.render(
            apeContext,
            // spatialGeometry: specific data for elements rendered inside the View
            this.getLayoutDefinitions()
          )
        : null;
    };

    this.renderQueue.forEach(callRenderFunctions);
  }
}

export default View;
