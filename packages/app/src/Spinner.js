class Spinner {
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  // You can also use your own clear function although isn't recommended
  // unsafeClear(prevProps, parentStyle, ape) {
  //   const {ctx} = ape;
  //   const parentBackgroundColor = parentStyle.style.backgroundColor;
  //   const newProps = {...prevProps, style: { color: parentBackgroundColor } };
  //   this.render(newProps, ape);
  // }

  render(props, ape) {
    const {ctx} = ape;
    const {style = {}, top, left, degrees} = props;
    const {color = 'black'} = style;

    const offset = 8;
    ctx.save();
    ctx.translate(style.left, style.top);
    ctx.rotate(degrees);
    ctx.beginPath();
    ctx.lineWidth = 50;
    ctx.arc(8 - offset, 8 - offset, 6, 0, 1.75 * Math.PI);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore();
  }
}

const spinner = new Spinner();
export default spinner;
