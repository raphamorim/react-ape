/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reconciler from 'react-reconciler';
import reactApeComponent from './reactApeComponent';
import {scaleDPI, clearCanvas} from './core/canvas';
import {precacheFiberNode, updateFiberProps} from './reactApeComponentTree';

export type CanvasComponentContext = {
  _renderQueueForUpdate: Array<mixed>,
  type: 'canvas',
  ctx: CanvasRenderingContext2D,
};

// TODO: Use Context.
let apeContextGlobal = null;
let surfaceHeight = 0;

const ReactApeFiber = reconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild && child.type !== 'View') {
      parentInstance.appendChild(child);
      // TODO: Change it later
      child.parentStyle = parentInstance.getStyle();
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
        setSurfaceHeight: height => { surfaceHeight = height },
        _renderQueueForUpdate: [],
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

  finalizeInitialChildren(element, type, props) {
    // return false;
    if (type === 'View') {
      element.render(apeContextGlobal);
    }
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
        element.clear(oldProps, element.parentStyle, apeContextGlobal);
        const {style = {}} = oldProps;

        const apeElement = reactApeComponent.createElement(
          type,
          newProps,
          rootContainerInstance,
          apeContextGlobal
        );

        apeContextGlobal._renderQueueForUpdate.push(apeElement);
      }
    }
  },

  resetAfterCommit(rootContainerInstance) {
    if (apeContextGlobal && apeContextGlobal._renderQueueForUpdate.length) {
      // TODO: Move to request animation frame
      apeContextGlobal._renderQueueForUpdate.forEach(element =>
        element.render(apeContextGlobal)
      );

      // Resets
      apeContextGlobal.setSurfaceHeight(0);
      apeContextGlobal._renderQueueForUpdate = [];
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
  },

  getChildHostContext() {
    return {};
  },

  scheduleAnimationCallback() {},

  scheduleDeferredCallback() {},

  useSyncScheduling: false,

  now: Date.now,

  mutation: {
    appendChild(parentInstance, child) {
      // console.log(parentInstance, child);
      // if (parentInstance.appendChild) {
      //   parentInstance.appendChild(child);
      // }
    },

    appendChildToContainer(parentInstance, child) {
      if (child.render) {
        child.render(apeContextGlobal);
      }
    },

    removeChild(parentInstance, child) {
      // parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      // parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {},

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {},

    commitMount(instance, updatePayload, type, oldProps, newProps) {},

    commitTextUpdate(textInstance, oldText, newText) {
      // textInstance.children = newText;
    },
  },

  shouldSetTextContent(props) {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    );
  },
});

const defaultContainer = {};
// Using WeakMap avoids memory leak in case the container is garbage colected.
const roots = typeof WeakMap === 'function' ? new WeakMap() : new Map();

const ReactApeRenderer = {
  render(canvasElement, container, callback) {
    const containerKey = container == null ? defaultContainer : container;
    let root = roots.get(containerKey);
    if (!root) {
      root = ReactApeFiber.createContainer(containerKey);
      roots.set(container, root);
      apeContextGlobal = null;
    }

    ReactApeFiber.updateContainer(canvasElement, root, null, callback);

    ReactApeFiber.injectIntoDevTools({
      bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
      version: '0.1.0',
      rendererPackageName: 'ReactApe',
      findHostInstanceByFiber: ReactApeFiber.findHostInstance,
    });

    return ReactApeFiber.getPublicRootInstance(root);
  },
};

export default ReactApeRenderer;
