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
    const { ctx } = apeContext;
    const { style = {} } = this.props;

    // ctx.beginPath();
    // ctx.setLineDash(style.borderStyle);
    // ctx.fillStyle = (style.background) ? style.background : def.background;
    // ctx.fillRect(args.x, args.y, args.width, (args.height || args.width));

    // ctx.lineWidth = (style.borderSize) ? style.borderSize : def.lineWidth;
    // ctx.strokeStyle = (style.borderColor) ? style.borderColor : def.strokeStyle;
    // ctx.strokeRect(args.x, args.y, args.width, (args.height || args.width));
    // ctx.setLineDash([]);
    // ctx.closePath();

    const callRenderFunctions = (renderFunction) => {
      (renderFunction.render) ?
        renderFunction.render(apeContext) :
        renderFunction(apeContext);
    }

    this._renderList.forEach(callRenderFunctions);
  }
}

export default View;
