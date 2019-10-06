class Spinner {
  reset(prevProps, parentStyle, canvas) {
    const {ctx} = canvas;
    // parentStyle.backgroundColor // white
    if (ctx) {
      ctx.clearRect(0, 0, 18, 18);
    }
  }

  render(props, canvas) {
    const {ctx} = canvas;
    const {style = {}, degrees} = props;
    const {color = 'black'} = style;

    const offset = 8;
    ctx.save();
    ctx.translate(offset, offset);
    ctx.rotate(degrees);

    // Draw half open circle
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(8 - offset, 8 - offset, 6, 0, 1.75 * Math.PI);
    ctx.strokeStyle = color;
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
}

const spinner = new Spinner();
export default spinner;
