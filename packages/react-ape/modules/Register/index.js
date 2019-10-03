/**
 * Copyright (c) 2019-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const CustomComponents = {};

function registerComponent(componentName, componentRender, componentClear) {
  CustomComponents[componentName] = (props) => {
    const clearRender = (_, layout, ape) => {  };
    return {
      type: componentName,
      render: componentRender.bind(this, props),
      clear: componentClear && componentClear.bind(this, props) || clearRender
    }
  };

  return componentName;
}

export default registerComponent;
