/**
 * Copyright (c) 2019-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const CustomComponents = {};

function registerComponent(componentName, Component) {
  CustomComponents[componentName] = props => {
    const clearRender = (prevProps, parentLayout, apeContext) => {
      const clearProps = {
        ...prevProps,
        style: {
          ...prevProps.style,
          color: parentLayout.style.backgroundColor,
        },
        isResetPhase: true,
      };

      Component.render(clearProps, apeContext, parentLayout);
    };

    return {
      type: componentName,
      render: Component.render.bind(this, props),
      clear: Component.reset || clearRender,
    };
  };

  return componentName;
}

export default registerComponent;
