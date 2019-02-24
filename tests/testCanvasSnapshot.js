function testCanvasSnapshot(expect, canvas) {
  // node-canvas have rasterize fonts in different ways based on OS
  if (process.platform === 'darwin') {
    expect(canvas.toDataURL()).toMatchSnapshot();
  } else {
    // TODO: Support tests for linux (CI)
    expect(true).toEqual(true);
  }
}

export default testCanvasSnapshot;
