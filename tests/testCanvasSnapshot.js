function testCanvasSnapshot(expect, canvas) {
  // node-canvas have rasterize fonts in different ways based on OS
  // TODO: Support tests for linux (CI)
  // if (process.platform !== 'darwin') {
    expect(canvas.toDataURL()).toMatchSnapshot();
  // } else {

    // expect(true).toEqual(true);
  // }
}

export default testCanvasSnapshot;
