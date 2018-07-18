/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import reconciler from 'react-reconciler';
import reactApeComponent from './reactApeComponent';
import {precacheFiberNode, updateFiberProps} from './reactApeComponentTree';

export type CanvasComponentContext = {
  _renderQueueForUpdate: Array<mixed>,
  type: 'canvas',
  ctx: CanvasRenderingContext2D,
};

function scaleDPI(canvas, context, customWidth, customHeight) {
  const devicePixelRatio = window.devicePixelRatio || 1;

  const backingStorePixelRatio =
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  const ratio = devicePixelRatio / backingStorePixelRatio;

  const width =
    customWidth || canvas.offsetWidth || canvas.width || canvas.clientWidth;
  const height =
    customHeight || canvas.offsetHeight || canvas.height || canvas.clientHeight;
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);

  if (devicePixelRatio !== backingStorePixelRatio) {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.scale(ratio, ratio);
  }

  return ratio;
}

function clear(context, preserveTransform) {
  if (preserveTransform) {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
  }

  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  if (preserveTransform) {
    context.restore();
  }
}

// TODO: Use Context.
let apeContextGlobal = null;

const ReactApeFiber = reconciler({
  appendInitialChild(parentInstance, child) {
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
      parentInstance.render(apeContextGlobal);
    }
  },

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    let apeContext = null;
    if (!apeContextGlobal && rootContainerInstance.getContext) {
      let rootContainerInstanceContext = rootContainerInstance.getContext('2d');

      // TODO: Change it.
      scaleDPI(rootContainerInstance, rootContainerInstanceContext);
      apeContextGlobal = {
        type: 'canvas',
        _renderQueueForUpdate: [],
        ctx: (rootContainerInstanceContext = rootContainerInstance.getContext(
          '2d'
        )),
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
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit(rootContainerInstance) {},

  prepareUpdate(element, type, oldProps, newProps, rootContainerInstance) {
    if (newProps) {
      // const diff = reactApeComponent.diffProperties(
      //   element,
      //   type,
      //   oldProps,
      //   newProps,
      //   rootContainerInstance
      // );

      const apeElement = reactApeComponent.createElement(
        type,
        newProps,
        rootContainerInstance,
        apeContextGlobal
      );

      apeContextGlobal._renderQueueForUpdate.push(apeElement);
    }
  },

  resetAfterCommit(rootContainerInstance) {
    if (apeContextGlobal._renderQueueForUpdate.length) {
      clear(apeContextGlobal.ctx);
      apeContextGlobal._renderQueueForUpdate.forEach(fn => {
        if (fn.render) {
          fn.render(apeContextGlobal);
        } else {
          fn(apeContextGlobal);
        }
      });
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
      // if (parentInstance.appendChild) {
      //   parentInstance.appendChild(child);
      // } else {
      //   child(apeContextGlobal);
      // }
      // } else {
      //   parentInstance.document = child;
      // }
    },

    appendChildToContainer(parentInstance, child) {
      if (child.render) {
        child.render(apeContextGlobal);
      } else {
        child(apeContextGlobal);
      }
    },

    removeChild(parentInstance, child) {
      // parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      // parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    },

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
    }

    ReactApeFiber.updateContainer(canvasElement, root, null, callback);

    ReactApeFiber.injectIntoDevTools({
      bundleType: process.env.NODE_ENV === 'production' ? 0 : 1,
      rendererPackageName: 'ReactApe',
      findHostInstanceByFiber: ReactApeFiber.findHostInstance,
    });

    return ReactApeFiber.getPublicRootInstance(root);
  },
};

export default ReactApeRenderer;
