function Text(root, props, apeContext) {
  const { ctx } = apeContext;
  const { style = {}, children, content } = props;

  ctx.beginPath();
  ctx.setLineDash(style.borderStyle);
  ctx.textBaseline = 'middle';
  ctx.lineWidth = style.borderSize;
  ctx.strokeStyle = style.borderColor;
  ctx.font = `${ style.fontSize || 18 }px ${ style.fontFamily || 'Helvetica'}`;
  ctx.fillStyle = 'white';
  // ctx.textAlign = (style.align || def.align);
  ctx.fillText(content || children, style.x, style.y);
  // ctx.strokeText(props.children, 20, 20);
  ctx.fill();
  // ctx.stroke();
  // ctx.setLineDash([]);
  // ctx.closePath();
  // ctx.reset();
}

export default Text;
