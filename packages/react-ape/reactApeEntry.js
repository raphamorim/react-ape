/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import ReactApeRenderer from './renderer/ReactApeRenderer';
import StyleSheetModule from './modules/StyleSheet';

import ListViewComponent from './renderer/components/ListView';
export const ListView = ListViewComponent;

export const render = ReactApeRenderer.render;
// export const unmountComponentAtNode = ReactTVRenderer.unmountComponentAtNode;

export const Image = 'IMAGE';
export const View = 'VIEW';
export const Text = 'TEXT';

export const StyleSheet = StyleSheetModule;

export default ReactApeRenderer;
