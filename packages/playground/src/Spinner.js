function Spinner(props, apeContext) {
  const {ctx, next} = apeContext;
  const {style = {}, degrees} = props;
  console.log('spinner', degrees, apeContext)

  const offset = 8;
  ctx.save();
  ctx.translate(offset, offset);
  ctx.rotate(degrees);

  // Draw half open circle
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.arc(8 - offset, 8 - offset, 6, 0, 1.75 * Math.PI);
  ctx.strokeFill = props.style.color;
  ctx.stroke();

  // Draw arrowhead
  ctx.lineWidth = 2;
  ctx.moveTo(13 - offset, 1 - offset);
  ctx.lineTo(9 - offset, 5 - offset);
  ctx.lineTo(13 - offset, 5 - offset);
  ctx.lineTo(13 - offset, 1 - offset);
  ctx.stroke();
  ctx.restore();
}

export default Spinner;
