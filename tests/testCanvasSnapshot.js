function testCanvasSnapshot(expect, canvas) {
  expect(canvas.toDataURL()).toMatchSnapshot();
}

export default testCanvasSnapshot;
