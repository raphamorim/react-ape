/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Image from './elements/Image';
import Text from './elements/Text';
import View from './elements/View';
import CanvasGrid from './elements/CanvasGrid';

const CHILDREN = 'children';
const STYLE = 'style';

const ReactApeComponent = {
  createElement(
    type,
    props,
    rootContainerElement,
    apeContextGlobal,
    internalInstanceHandle
  ) {
    const COMPONENTS = {
      Image: Image(props),
      Text: Text(props),
      CanvasGrid: CanvasGrid(props),
      View: new View(props),
    };

    if (!COMPONENTS[type]) {
      throw new Error(`React Ape could not identify "${type}" as ReactApeComponent. More details: http://raphamorim.io/react-ape`);
    }

    return COMPONENTS[type];
  },

  createTextNode(text, rootContainerElement) {
    return text;
  },

  diffProperties(
    element,
    tag,
    lastRawProps,
    nextRawProps,
    rootContainerElement
  ) {
    let updatePayload = null;

    const lastProps = lastRawProps;
    const nextProps = nextRawProps;

    let propKey;
    let styleName;
    let styleUpdates = null;
    for (propKey in lastProps) {
      if (
        nextProps.hasOwnProperty(propKey) ||
        !lastProps.hasOwnProperty(propKey) ||
        lastProps[propKey] == null
      ) {
        continue;
      }
      if (propKey === STYLE) {
        const lastStyle = lastProps[propKey];
        for (styleName in lastStyle) {
          if (lastStyle.hasOwnProperty(styleName)) {
            if (!styleUpdates) {
              styleUpdates = {};
            }
            styleUpdates[styleName] = '';
          }
        }
      } else {
        // For all other deleted properties we add it to the queue. We use
        // the whitelist in the commit phase instead.
        (updatePayload = updatePayload || []).push(propKey, null);
      }
    }
    for (propKey in nextProps) {
      const nextProp = nextProps[propKey];
      const lastProp = lastProps != null ? lastProps[propKey] : undefined;
      if (
        !nextProps.hasOwnProperty(propKey) ||
        nextProp === lastProp ||
        (nextProp == null && lastProp == null)
      ) {
        continue;
      }
      if (propKey === STYLE) {
        if (lastProp) {
          // Unset styles on `lastProp` but not on `nextProp`.
          for (styleName in lastProp) {
            if (
              lastProp.hasOwnProperty(styleName) &&
              (!nextProp || !nextProp.hasOwnProperty(styleName))
            ) {
              if (!styleUpdates) {
                styleUpdates = {};
              }
              styleUpdates[styleName] = '';
            }
          }
          // Update styles that changed since `lastProp`.
          for (styleName in nextProp) {
            if (
              nextProp.hasOwnProperty(styleName) &&
              lastProp[styleName] !== nextProp[styleName]
            ) {
              if (!styleUpdates) {
                styleUpdates = {};
              }
              styleUpdates[styleName] = nextProp[styleName];
            }
          }
        } else {
          // Relies on `updateStylesByID` not mutating `styleUpdates`.
          if (!styleUpdates) {
            if (!updatePayload) {
              updatePayload = [];
            }
            updatePayload.push(propKey, styleUpdates);
          }
          styleUpdates = nextProp;
        }
      } else if (propKey === CHILDREN) {
        if (
          lastProp !== nextProp &&
          (typeof nextProp === 'string' || typeof nextProp === 'number')
        ) {
          (updatePayload = updatePayload || []).push(propKey, nextProp);
        }
      } else {
        // For any other property we always add it to the queue and then we
        // filter it out using the whitelist during the commit.
        (updatePayload = updatePayload || []).push(propKey, nextProp);
      }
    }
    if (styleUpdates) {
      (updatePayload = updatePayload || []).push(STYLE, styleUpdates);
    }

    return updatePayload;
  },
};

export default ReactApeComponent;
