/**
 * Copyright (c) 2019-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

import type {CanvasComponentContext, Layout, ApeElement} from '../types';

function renderApeElement(
  apeContextGlobal: CanvasComponentContext,
  element: ApeElement
) {
  element.render(apeContextGlobal, element.parentLayout);
}

function renderApeQueue(
  apeContextGlobal: CanvasComponentContext,
  onFinish: () => mixed
) {
  if (apeContextGlobal && apeContextGlobal.renderQueue.length) {
    // const renderFrame = () => {
    //   requestAnimationFrame(renderFrame);
    //   apeContextGlobal.renderQueue.forEach(element => {
    //     // element.render(apeContextGlobal, element.parentLayout)
    //     renderApeElement(apeContextGlobal, element);
    //   });
    //   cancelAnimationFrame(renderFrame);
    // }
    // renderFrame();

    apeContextGlobal.renderQueue.forEach(element => {
      renderApeElement(apeContextGlobal, element);
    });
    onFinish();
  }
}

export const renderQueue = renderApeQueue;
export const renderElement = renderApeElement;
