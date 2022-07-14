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
import {getNodeById} from '../apeTree/apeTree';

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
  lineHeight?: number,
  x: number,
  y: number,
|};

type RenderAcc = {|
  textLinePos: number,
|};

type ParentLayout = {|
  style: Style,
  spatialGeometry: SpatialGeometry,
  renderAcc: RenderAcc,
  relativeIndex?: number,
|};

function renderText(
  props: Props,
  apeContext: CanvasComponentContext,
  parentLayout: ParentLayout
) {
  const {ctx} = apeContext;

  const {spatialGeometry = {}, relativeIndex} = parentLayout || {};
  const parentStyle = (parentLayout && parentLayout.style) || {};

  console.log(1, getNodeById(this.id));

  const {style = {}, children, content} = props;
  const fontSize = style.fontSize || 18;
  const fontFamily = style.fontFamily || 'Helvetica';
  const previousStroke = ctx.strokeStyle;

  let x = style.left || spatialGeometry.x || 0;
  let y = style.top || spatialGeometry.y + fontSize / 2 || fontSize;

  // If position is absolute should reset geometry
  if (style.position !== 'absolute' || style.position === 'relative') {
    if (parentStyle.lineHeight) {
      y = y + Number(parentStyle.lineHeight) * (relativeIndex || 1);
    }
  }

  // If is relative and x and y haven't be processed, don't render
  if (!spatialGeometry) {
    return null;
  }

  const item = content || children;

  ctx.beginPath();
  ctx.setLineDash(style.borderStyle || []);
  ctx.textBaseline = 'middle';
  ctx.lineWidth = style.borderSize || 0.2;
  ctx.lineJoin = 'round';
  ctx.strokeStyle = style.borderColor || 'transparent';
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = style.color || 'black';
  ctx.textAlign = style.align;
  ctx.fillText(item, x, y);
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
  const {color, borderColor} = (prevProps && prevProps.style) || {};
  const parentStyle = parentLayout.style;
  const clearProps = {
    ...prevProps,
    style: {
      ...prevProps.style,
      color: parentLayout.style.backgroundColor,
      borderColor: parentLayout.style.backgroundColor,
      borderSize: 2.1,
    },
  };

  renderText(clearProps, apeContext, parentLayout);
}

export default function CreateTextInstance(props: Props, id: string): mixed {
  const {style} = props;
  const instanceContext = {id};
  return {
    type: 'Text',
    render: renderText.bind(instanceContext, props),
    clear: clearText,
    instructions: {
      relative: style !== 'absolute',
    },
  };
}
