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

type Props = {|
  style: {
    borderStyle?: Array<number>,
    borderSize: number,
    borderColor?: string,
    fontSize?: number,
    fontFamily?: string,
    color?: string,
    align: string,
    x: number,
    y: number,
  },
  children: string,
  content?: string,
|};

function Text(props: Props, apeContext: CanvasComponentContext) {
  const {ctx} = apeContext;
  const {style = {}, children, content} = props;

  ctx.beginPath();
  ctx.setLineDash(style.borderStyle || []);
  ctx.textBaseline = 'middle';
  ctx.lineWidth = style.borderSize;
  // ctx.strokeStyle = style.borderColor || 'black';
  ctx.font = `${style.fontSize || 18}px ${style.fontFamily || 'Helvetica'}`;
  ctx.fillStyle = style.color || 'black';
  ctx.textAlign = style.align;
  ctx.fillText(content || children, style.x, style.y);
  // ctx.strokeText(props.children, 20, 20);
  ctx.fill();
  // ctx.stroke();
  // ctx.setLineDash([]);
  ctx.closePath();
}

export default Text;
