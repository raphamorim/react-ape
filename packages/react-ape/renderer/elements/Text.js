/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

import type {CanvasComponentContext, SpatialGeometry} from '../types';

type Props = {|
  style: Style,
  children: string,
  content?: string,
|};

type Style = {|
  backgroundColor?: string,
  borderStyle?: Array<number>,
  borderSize: number,
  borderColor?: string,
  fontSize?: number,
  fontFamily?: string,
  color?: string,
  align: string,
  x: number,
  y: number,
|};

type ParentLayout = {|
  style: Style,
  spatialGeometry: SpatialGeometry,
|};

function renderText(
  props: Props,
  apeContext: CanvasComponentContext,
  parentLayout: ParentLayout
) {
  const {ctx} = apeContext;
  const {spatialGeometry = {x: 0, y: 0}} = parentLayout || {};
  const {style = {}, children, content} = props;
  const fontSize = style.fontSize || 18;
  const fontFamily = style.fontFamily || 'Helvetica';
  const previousStroke = ctx.strokeStyle;

  const x = style.UNSAFE_x || spatialGeometry.x;
  const y = style.UNSAFE_y || spatialGeometry.y + fontSize / 2;

  ctx.beginPath();
  ctx.setLineDash(style.borderStyle || []);
  ctx.textBaseline = 'middle';
  ctx.lineWidth = style.borderSize || 0.2;
  ctx.lineJoin = 'round';
  ctx.strokeStyle = style.borderColor || 'transparent';
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = style.color || 'black';
  ctx.textAlign = style.align;
  ctx.fillText(content || children, x, y);
  ctx.strokeText(content || children, x, y);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.closePath();
  ctx.strokeStyle = previousStroke;
}

function clearText(
  prevProps: Props,
  parentLayout: ParentLayout,
  apeContext: CanvasComponentContext
) {
  if (prevProps.style) {
    const {color, borderColor} = prevProps.style;
    const clearProps = {
      ...prevProps,
      style: {
        ...prevProps.style,
        color: parentLayout.style.backgroundColor,
        borderColor: parentLayout.style.backgroundColor,
        borderSize: 1.2,
      },
    };

    renderText(clearProps, apeContext, parentLayout);
  }
}

export default function CreateTextInstance(props: Props) {
  return {
    type: 'Text',
    render: renderText.bind(this, props),
    clear: clearText,
  };
}
