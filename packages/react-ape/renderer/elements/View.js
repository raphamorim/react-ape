/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {ViewDefaults} from '../constants';
import {getNodeById} from '../apeTree/apeTree';

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
      const {x, y, width, height, cornerRadius} = this.previousRect;
      ctx.moveTo(x, y);
      ctx.lineTo(x + width - cornerRadius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
      ctx.lineTo(x + width, y + height - cornerRadius);
      ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - cornerRadius,
        y + height
      );
      ctx.lineTo(x + cornerRadius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
      ctx.lineTo(x, y + cornerRadius);
      ctx.quadraticCurveTo(x, y, x + cornerRadius, y);
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
    let y = style.y || style.top || getSurfaceHeight() || 0;
    const width = style.width || ViewDefaults.size;
    const height = style.height || ViewDefaults.size;
    const cornerRadius = style.borderRadius || 0;

    /*
      Surface height controls wherever a view is in the page height
      
      It should be only used by Views at same level as:
      
      <View>
        ... should not use surface height
      </View>
      <View>
        ... should not use surface height
      </View>

      Surface height should be ignored for absolute Views and also children View
    */

    const node = getNodeById(this.id);
    console.log(node.parent);
    if (!style.position || style.position === 'relative') {
      const surfaceHeight = getSurfaceHeight();
      y = surfaceHeight;
      setSurfaceHeight(surfaceHeight + height);
    }

    ctx.globalCompositeOperation = 'destination-over';
    ctx.beginPath();

    ctx.moveTo(x, y);
    // Top Right Radius
    ctx.lineTo(x + width - cornerRadius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + cornerRadius);
    // Bottom right Radius
    ctx.lineTo(x + width, y + height - cornerRadius);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - cornerRadius,
      y + height
    );
    // Bottom Left Radius
    ctx.lineTo(x + cornerRadius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - cornerRadius);
    // Top left Radius
    ctx.lineTo(x, y + cornerRadius);
    ctx.quadraticCurveTo(x, y, x + cornerRadius, y);

    this.previousRect = {x, y, width, height, cornerRadius};
    ctx.strokeStyle = style.borderColor || 'transparent';
    ctx.fillStyle = style.backgroundColor || 'gray';
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
        : undefined;
    };

    if (callRenderFunctions.length >= 1) {
      this.renderQueue.forEach(callRenderFunctions);
    }
  }
}

export default View;
