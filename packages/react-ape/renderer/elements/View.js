/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {ViewDefaults} from '../constants';

class View {
  constructor(props) {
    this.props = props;
    this.type = 'View';
    // {x,y}
    this.spatialGeometry = {};
    // Render Accumulator to help different layout config, should be reset on clear
    this.layout = {
      relativeIndex: 1,
    };
    this.renderQueue = [];
    this.previousRect = null;
  }

  appendChild(fn) {
    this.renderQueue.push(fn);
  }

  getAndUpdateCurrentLayout = () => {
    const {style} = this.getLayoutDefinitions();
    const currentRelativeIndex = this.layout.relativeIndex;
    this.layout = {
      relativeIndex: this.layout.relativeIndex + 1,
    };
    return {
      relativeIndex: currentRelativeIndex,
    };
  };

  resetLayout = () => {
    this.layout = {
      relativeIndex: 0,
    };
  };

  getLayoutDefinitions = () => {
    const resetLayout = this.resetLayout;
    return {
      style: {
        backgroundColor: 'white',
        borderColor: 'white',
        lineHeight: ViewDefaults.lineHeight,
        ...(this.props.style || {}),
      },
      spatialGeometry: this.spatialGeometry,
      resetLayout,
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
    const width = style.width || ViewDefaults.size;
    const height = style.height || ViewDefaults.size;

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
        ? renderFunction.render(apeContext, {
            ...this.getLayoutDefinitions(),
            ...renderFunction.layout,
          })
        : null;
    };

    this.renderQueue.forEach(callRenderFunctions);
  }
}

export default View;
