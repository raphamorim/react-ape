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
      parentInstance.appendChild(child);
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
      let rootContainerInstanceContext = rootContainerInstance.getContext('2d');

      // TODO: Change it.
      scaleDPI(rootContainerInstance, rootContainerInstanceContext);
      apeContextGlobal = {
        type: 'canvas',
        getSurfaceHeight: () => surfaceHeight,
        setSurfaceHeight: height => {
          surfaceHeight = height;
        },
        renderQueue: [],
        ctx: rootContainerInstanceContext,
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
    // return false;
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
      // console.log(element, type, oldProps, newProps, rootContainerInstance);
      const diff = reactApeComponent.diffProperties(
        element,
        type,
        oldProps,
        newProps,
        rootContainerInstance
      );

      if (diff) {
        const parentLayout = element.parentLayout || element.getParentLayout();
        element.clear(oldProps, parentLayout, apeContextGlobal);
        const {style = {}} = oldProps;

        const apeElement = reactApeComponent.createElement(
          type,
          newProps,
          rootContainerInstance,
          apeContextGlobal
        );

        apeElement.parentLayout = parentLayout;
        apeContextGlobal.renderQueue.push(apeElement);
      }
    }
  },

  resetAfterCommit(rootContainerInstance) {
    if (apeContextGlobal && apeContextGlobal.renderQueue.length) {
      // TODO: Move to request animation frame
      apeContextGlobal.renderQueue.forEach(element => {
        element.render(apeContextGlobal, element.parentLayout);
      });

      // Resets
      apeContextGlobal.setSurfaceHeight(0);
      apeContextGlobal.renderQueue = [];
    }
  },

  resetTextContent(element) {
    // noop
  },

  getRootHostContext(rootInstance) {
    // let type;
    // let namespace;
    // const nodeType = rootContainerInstance.nodeType;
    // switch (nodeType) {
    //   case DOCUMENT_NODE:
    //   case DOCUMENT_FRAGMENT_NODE: {
    //     type = nodeType === DOCUMENT_NODE ? '#document' : '#fragment';
    //     let root = (rootContainerInstance: any).documentElement;
    //     namespace = root ? root.namespaceURI : getChildNamespace(null, '');
    //     break;
    //   }
    //   default: {
    //     const container: any =
    //       nodeType === COMMENT_NODE
    //         ? rootContainerInstance.parentNode
    //         : rootContainerInstance;
    //     const ownNamespace = container.namespaceURI || null;
    //     type = container.tagName;
    //     namespace = getChildNamespace(ownNamespace, type);
    //     break;
    //   }
    // }
    // return namespace;
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

  // supportsPersistence: false,

  isPrimaryRenderer: true,

  supportsMutation: true,

  shouldDeprioritizeSubtree(type, props) {
    return false;
  },

  appendChildToContainer(parentInstance, child) {
    if (child.render) {
      child.render(apeContextGlobal);
    }
  },

  mutation: {
    appendChild(parentInstance, child) {
      // console.log(parentInstance, child);
      // if (parentInstance.appendChild) {
      //   parentInstance.appendChild(child);
      // }
    },

    removeChild(parentInstance, child) {
      // parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      // parentInstance.removeChild(child);
    },

    insertInContainerBefore(parentInstance, child, beforeChild) {},

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {},

    commitMount(instance, updatePayload, type, oldProps, newProps) {},

    commitTextUpdate(textInstance, oldText, newText) {
      // textInstance.children = newText;
    },
  },

  shouldSetTextContent(props) {
    // return (
    //   typeof props.children === 'string' || typeof props.children === 'number'
    // );

    return false;
  },
});

ReactApeFiber.injectIntoDevTools({
  ...devToolsConfig,
  findHostInstanceByFiber: ReactApeFiber.findHostInstance
});

const defaultContainer = {};
// Using WeakMap avoids memory leak in case the container is garbage colected.
const roots = typeof WeakMap === 'function' ? new WeakMap() : new Map();

const ReactApeRenderer = {
  render(reactApeElement, canvasDOMElement, callback) {
    const containerKey = canvasDOMElement == null ? defaultContainer : canvasDOMElement;
    let root = roots.get(containerKey);
    if (!root) {
      root = ReactApeFiber.createContainer(containerKey);
      roots.set(canvasDOMElement, root);
      apeContextGlobal = null;
    }

    console.log(reactApeElement);

    ReactApeFiber.updateContainer(reactApeElement, root, null, callback);

    return ReactApeFiber.getPublicRootInstance(root);
  },
};

export default ReactApeRenderer;
