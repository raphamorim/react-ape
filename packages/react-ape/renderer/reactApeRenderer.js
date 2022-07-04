/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {CanvasComponentContext} from './types';

import reconciler from 'react-reconciler';
import reactApeComponent from './reactApeComponent';
import {scaleDPI, clearCanvas} from './core/canvas';
import {renderElement, renderQueue} from './core/render';
import {precacheFiberNode, updateFiberProps} from './reactApeComponentTree';
import devToolsConfig from './config/devtools';
import {
  now as FrameSchedulingNow,
  cancelDeferredCallback as FrameSchedulingCancelDeferredCallback,
  scheduleDeferredCallback as FrameSchedulingScheduleDeferredCallback,
  shouldYield as FrameSchedulingShouldYield,
} from './reactApeFrameScheduling';

// TODO: Use Context.
let apeContextGlobal = null;
let surfaceHeight = 0;

const ReactApeFiber = reconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild && child.type !== 'View') {
      let layout = {};
      if (child.instructions && child.instructions.relative) {
        layout = {
          ...layout,
          ...parentInstance.getAndUpdateCurrentLayout(),
        };
      }
      parentInstance.appendChild({...child, layout});

      // TODO: Change it later
      child.getParentLayout = parentInstance.getLayoutDefinitions;
    }
  },

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    if (!apeContextGlobal && rootContainerInstance.getContext) {
      const rootContainerInstanceContext = rootContainerInstance.getContext(
        '2d'
      );

      scaleDPI(rootContainerInstance, rootContainerInstanceContext);
      apeContextGlobal = {
        type: 'canvas',
        getSurfaceHeight: () => surfaceHeight,
        setSurfaceHeight: height => {
          surfaceHeight = height;
        },
        ctx: rootContainerInstanceContext,
        // EXPERIMENTAL:
        // clear: function clear() {
        //   const width = rootContainerInstance.width;
        //   const height = rootContainerInstance.height;
        //   this.ctx.clearRect(0, 0, width, height);
        // },
        renderQueue: [],
      };
    }

    const apeElement = reactApeComponent.createElement(
      type,
      props,
      rootContainerInstance,
      apeContextGlobal,
      internalInstanceHandle
    );

    precacheFiberNode(internalInstanceHandle, apeElement);
    updateFiberProps(apeElement, props);
    return apeElement;
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    // let textNode = reactApeComponent.createTextNode(text, rootContainerInstance);
    // precacheFiberNode(internalInstanceHandle, textNode);
    return text;
  },

  finalizeInitialChildren(parentInstance, type, props) {
    if (type === 'View') {
      parentInstance.render(apeContextGlobal);
    }
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit(rootContainerInstance) {},

  prepareUpdate(element, type, oldProps, newProps, rootContainerInstance) {
    if (newProps) {
      const diff = reactApeComponent.diffProperties(
        element,
        type,
        oldProps,
        newProps,
        rootContainerInstance
      );

      if (diff) {
        const parentLayout = element.parentLayout || element.getParentLayout();
        if (type === 'Text' ) {
          parentLayout.resetLayout(); // View needs to be reset on text updates
        }

        element.clear(oldProps, parentLayout, apeContextGlobal);

        const apeElement = reactApeComponent.createElement(
          type,
          newProps,
          rootContainerInstance,
          apeContextGlobal
        );

        apeElement.parentLayout = parentLayout;

        // If isn't a children update, should render with new props
        if (diff.length && diff.indexOf('children') === -1) {
          renderElement(apeContextGlobal, apeElement, parentLayout);
          return null;
        }

        // EXPERIMENTAL: apeContextGlobal.clear();
        apeContextGlobal.renderQueue.push(apeElement);
        return null;
      }

      if (type === 'Text' && newProps.children && newProps.children.join) {
        const parentLayout = element.parentLayout || element.getParentLayout();
        element.clear(oldProps, parentLayout, apeContextGlobal);

        const apeElement = reactApeComponent.createElement(
          type,
          {...newProps, children: newProps.children.join('')},
          rootContainerInstance,
          apeContextGlobal
        );

        renderElement(apeContextGlobal, apeElement, parentLayout);
      }
    }
  },

  clearContainer() {},

  resetAfterCommit(rootContainerInstance) {
    // resetAfterCommit happens only for children changes
    renderQueue(apeContextGlobal, () => {
      apeContextGlobal.setSurfaceHeight(0);
    });
  },

  resetTextContent(element) {
    // noop
  },

  getRootHostContext(rootInstance) {
    return {};
  },

  getChildHostContext() {
    return {};
  },

  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  scheduleDeferredCallback: FrameSchedulingScheduleDeferredCallback,
  cancelDeferredCallback: FrameSchedulingCancelDeferredCallback,
  schedulePassiveEffects: FrameSchedulingScheduleDeferredCallback,
  cancelPassiveEffects: FrameSchedulingCancelDeferredCallback,
  noTimeout: -1,
  useSyncScheduling: false,
  now: FrameSchedulingNow,
  isPrimaryRenderer: true,
  supportsMutation: true,

  shouldDeprioritizeSubtree(type, props) {
    return false;
  },

  appendChildToContainer(parentInstance, child) {
    // apeContextGlobal.setSurfaceHeight(0);
    // if (child.render) {
    //   child.render(apeContextGlobal);
    // }
  },

  appendChild(parentInstance, child) {
    // console.log(parentInstance, child);
    // if (parentInstance.appendChild) {
    //   parentInstance.appendChild(child);
    // }
  },

  removeChild(parentInstance, child) {
    // parentInstance.removeChild(child);
    if (child.type && child.type === 'View') {
      child.clear(apeContextGlobal, parentInstance.getLayoutDefinitions());
    }
  },

  removeChildFromContainer(parentInstance, child) {
    // parentInstance.removeChild(child);
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    // noop
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    // noop
  },

  commitMount(instance, updatePayload, type, oldProps, newProps) {
    // noop
  },

  commitTextUpdate(textInstance, oldText, newText) {
    // textInstance.children = newText;
    // console.log(111, textInstance, oldText, newText);
  },

  shouldSetTextContent(props) {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    );
  },
});

ReactApeFiber.injectIntoDevTools({
  ...devToolsConfig,
  findHostInstanceByFiber: ReactApeFiber.findHostInstance,
});

const defaultContainer = {};
// Using WeakMap avoids memory leak in case the container is garbage colected.
const roots = typeof WeakMap === 'function' ? new WeakMap() : new Map();

const ReactApeRenderer = {
  render(reactApeElement, canvasDOMElement, callback) {
    const containerKey =
      canvasDOMElement == null ? defaultContainer : canvasDOMElement;
    let root = roots.get(containerKey);
    if (!root) {
      root = ReactApeFiber.createContainer(containerKey);
      roots.set(canvasDOMElement, root);
      apeContextGlobal = null;
    }

    ReactApeFiber.updateContainer(reactApeElement, root, null, callback);

    return ReactApeFiber.getPublicRootInstance(root);
  },
};

export default ReactApeRenderer;
