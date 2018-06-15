function Text(props, apeContext) {
  const { ctx } = apeContext;
  const { style = {}, children, content } = props;

  ctx.beginPath();
  ctx.setLineDash(style.borderStyle || []);
  ctx.textBaseline = 'middle';
  ctx.lineWidth = style.borderSize;
  ctx.strokeStyle = style.borderColor || 'black';
  ctx.font = `${ style.fontSize || 18 }px ${ style.fontFamily || 'Helvetica'}`;
  ctx.fillStyle = style.color || 'black';
  ctx.textAlign = style.align;
  ctx.fillText(content || children, style.x, style.y);
  // ctx.strokeText(props.children, 20, 20);
  ctx.fill();
  // ctx.stroke();
  // ctx.setLineDash([]);
  ctx.closePath();
}

export default Text;
