/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import ReactGibbonRenderer from './renderer/ReactGibbonRenderer';

export const render = ReactGibbonRenderer.render;
// export const unmountComponentAtNode = ReactTVRenderer.unmountComponentAtNode;
// export const renderOnAppLoaded = renderOnAppLoadedModule;

export const Canvas = 'CANVAS';
export const Image = 'IMAGE';
export const View = 'VIEW';
export const Text = 'TEXT';

export default ReactGibbonRenderer;
