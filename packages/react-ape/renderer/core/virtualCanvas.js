/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type {CanvasComponentContext} from '../types';
import { _SectionBlockSize } from '../constants';
import { defaultViewSize } from '../constants';

class VirtualCanvas {
  constructor(CanvasContext) {
    this.views = {};
    this.sections = {};

    // TODO: Move to ./debug.js
    window.sections = this.sections;

    this.mountSection(CanvasContext);
  }

  mountSection(canvasContext) {
    const { canvas } = canvasContext;
    const { width, height } = canvas;

    let sectionHorizontal = 0;
    for (var x = 0; x <= width; x += _SectionBlockSize) {
      this.sections[`0/${++sectionHorizontal}`] = {x};
    }

    let sectionVertical = 0;
    for (var y = 0; y <= height; y += _SectionBlockSize) {
      this.sections[`${sectionVertical++}/0`] = {y};
    }
  }

  addInstance(instance) {
    const { type, memoizedProps, _debugID } = instance;
    const { style } = memoizedProps;

    // TODO: Use React Internal Instance property: _debugID
    const view = {
      x: 0,
      y: 0,
      width: style && style.width || defaultViewSize,
      height: style && style.height || defaultViewSize,
      reactInstanceID: _debugID,
    };

    // TODO: Calculate what sections cross the View.
  }

  removeInstance(id) {

  }
}

export default VirtualCanvas;
