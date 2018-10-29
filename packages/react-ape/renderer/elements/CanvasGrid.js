/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

import type {CanvasComponentContext} from '../types';
import {_SectionBlockSize} from '../constants';

type Props = {|
  debug?: boolean,
|};

function renderCanvasGrid(props: Props, apeContext: CanvasComponentContext) {
  const {ctx} = apeContext;
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  // const {debug} = props;

  const lastFillStyle = ctx.fillStyle;
  const lastStrokeStyle = ctx.strokeStyle;
  const lastFont = ctx.font;

  ctx.beginPath();
  ctx.fillStyle = 'purple';
  ctx.strokeStyle = 'gray';
  ctx.font = '13px Helvetica';

  let sectionHorizontal = 0;
  for (var x = 0; x <= width; x += _SectionBlockSize) {
    ctx.moveTo(x, 0);
    ctx.fillText(`0/${++sectionHorizontal}`, x + 90, 20);
    ctx.lineTo(x, height);
  }

  let sectionVertical = 0;
  for (var y = 0; y <= height; y += _SectionBlockSize) {
    ctx.moveTo(0, y);
    ctx.fillText(`${sectionVertical++}/0`, 10, y + 20);
    ctx.lineTo(width, y);
  }

  ctx.stroke();
  ctx.closePath();

  ctx.font = lastFont;
  ctx.fillStyle = lastFillStyle;
  ctx.strokeStyle = lastStrokeStyle;
}

export default function CreateCanvasGrid(props: Props) {
  const CanvasGridInstance = {
    type: 'CanvasGrid',
    render: renderCanvasGrid.bind(this, props),
    clear: () => {},
  };

  return CanvasGridInstance;
}
