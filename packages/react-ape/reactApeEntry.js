/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import ReactApeRenderer from './renderer/reactApeRenderer';
import StyleSheetModule from './modules/StyleSheet';
import DimensionsModule from './modules/Dimensions';

import ListViewComponent from './renderer/components/ListView';
import RegisterComponentFn from './modules/Register';

import withFocusFn from './modules/Navigation/withFocus';
import withNavigationFn from './modules/Navigation/withNavigation';

export const ListView = ListViewComponent;
export const registerComponent = RegisterComponentFn;

export const render = ReactApeRenderer.render;
// export const unmountComponentAtNode = ReactApeRender.unmountComponentAtNode;

export const Image = 'Image';
export const View = 'View';
export const Text = 'Text';
export const Button = 'Button';

export const StyleSheet = StyleSheetModule;
export const Dimensions = DimensionsModule;
export const withFocus = withFocusFn;
export const withNavigation = withNavigationFn;

export default ReactApeRenderer;
