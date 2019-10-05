/**
 * Copyright (c) 2019-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

import type {CanvasComponentContext} from '../types';

const execRender = window.requestAnimationFrame || function exec(fn) { fn() };

function renderApeElement(
  apeContextGlobal: CanvasComponentContext,
  element: any,
  parentLayout: mixed
) {
  execRender(() => { element.render(apeContextGlobal, parentLayout) });
}

function renderApeQueue(apeContextGlobal: CanvasComponentContext, onFinish: function) {
  if (apeContextGlobal && apeContextGlobal.renderQueue.length) {
    // TODO: Move to request animation frame
    apeContextGlobal.renderQueue.forEach(element => {
      renderApeElement(apeContextGlobal, element, element.parentLayout);
    });

    onFinish();
  }
}

export const renderQueue = renderApeQueue;
export const renderElement = renderApeElement;
