function Text(root, props, gibbonContext) {
  gibbonContext.beginPath();
  // gibbonContext.setLineDash(style.borderStyle);
  gibbonContext.textBaseline = 'middle';
  // gibbonContext.lineWidth = (style.borderSize) ? style.borderSize : def.lineWidth;
  gibbonContext.strokeStyle = 'white';
  gibbonContext.font = 'Helvetica';
  // gibbonContext.fillStyle = 'white';
  // gibbonContext.textAlign = (style.align || def.align);
  // gibbonContext.fillText(props.children, 0, 0);
  gibbonContext.strokeText(props.children, 20, 20);
  gibbonContext.fill();
  gibbonContext.stroke();
  gibbonContext.setLineDash([]);
  gibbonContext.closePath();
}

export default Text;
