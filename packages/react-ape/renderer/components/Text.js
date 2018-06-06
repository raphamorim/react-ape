function Text(root, props, apeContext) {
  // console.log(props);
  const { ctx } = apeContext;
  const { style = {}, children, content } = props;

  const x = style.left || 20;
  const y = style.top || 20;

  // ctx.beginPath();
  // ctx.setLineDash(style.borderStyle);
  // ctx.textBaseline = 'middle';
  // ctx.lineWidth = (style.borderSize) ? style.borderSize : def.lineWidth;
  // ctx.strokeStyle = 'white';
  ctx.font = `${ style.fontSize || 18 }px ${ style.fontFamily || 'Helvetica'}`;
  ctx.fillStyle = 'white';
  // ctx.textAlign = (style.align || def.align);
  ctx.fillText(content || children, x, y);
  // ctx.strokeText(props.children, 20, 20);
  ctx.fill();
  // ctx.stroke();
  // ctx.setLineDash([]);
  // ctx.closePath();
  // ctx.reset();

  return {
    type: 'TEXT',
    props: props
  }
}

export default Text;
