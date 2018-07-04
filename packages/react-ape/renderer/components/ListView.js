/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

function renderChildren(children) {

}

function ListView(props, apeContext) {
  const { ctx } = apeContext;
  const { style = {}, dataSource, renderRow } = props;
  let children = [];

  dataSource.forEach((data, idx) => {
    children.push(renderRow(data, idx));
  });

  ctx.beginPath();
  ctx.rect(style.x, style.y, style.width || 200, style.height || 200);
  ctx.fillStyle = style.backgroundColor || 'white';
  ctx.fill();
  ctx.closePath();

  return renderChildren.bind(this, children);
}

export default ListView;
