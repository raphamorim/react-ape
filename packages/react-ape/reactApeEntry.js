/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import ReactApeRenderer from './renderer/reactApeRenderer';
import StyleSheetModule from './modules/StyleSheet';
import DimensionsModule from './modules/dimensions';

import ListViewComponent from './renderer/components/ListView';
export const ListView = ListViewComponent;

export const render = ReactApeRenderer.render;
// export const unmountComponentAtNode = ReactTVRenderer.unmountComponentAtNode;

export const Image = 'Image';
export const View = 'View';
export const Text = 'Text';
export const Tools = {
  Grid: 'CanvasGrid'
};

export const StyleSheet = StyleSheetModule;
export const dimensions = DimensionsModule;

export default ReactApeRenderer;
