/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

class View {
  constructor(props) {
    this.props = props;

    this._renderList = [];
  }

  appendChild(fn) {
    this._renderList.push(fn);
  }

  children() {
    return this._renderList;
  }

  render(apeContext) {
    const {ctx} = apeContext;
    const {style = {}} = this.props;

    ctx.globalCompositeOperation = 'destination-over';
    ctx.beginPath();
    ctx.rect(style.x, style.y, style.width || 200, style.height || 200);
    ctx.fillStyle = style.backgroundColor || 'white';
    ctx.fill();
    ctx.closePath();
    ctx.globalCompositeOperation = 'source-over';

    const callRenderFunctions = renderFunction => {
      renderFunction.render
        ? renderFunction.render(apeContext)
        : renderFunction(apeContext);
    };

    this._renderList.forEach(callRenderFunctions);
  }
}

export default View;
