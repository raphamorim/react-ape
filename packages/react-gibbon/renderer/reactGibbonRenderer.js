import reconciler from 'react-reconciler';
import reactGibbonComponent from './reactGibbonComponent';
import {precacheFiberNode, updateFiberProps} from './reactGibbonComponentTree';

function scaleDPI(canvas, context, customWidth, customHeight) {
  const width = customWidth ||
              canvas.offsetWidth ||
              canvas.width || // attr, eg: <canvas width='400'>
              canvas.clientWidth; // keep existing width
  const height = customHeight ||
               canvas.offsetHeight ||
               canvas.height ||
               canvas.clientHeight;
  const deviceRatio = window.devicePixelRatio || 1;
  const bsRatio = context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
  const ratio = deviceRatio / bsRatio;

  if (deviceRatio !== bsRatio) {
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    context.scale(ratio, ratio);
  }
  return ratio;
};

// TODO: Use Context.
let gibbonContextGlobal = false;

const ReactGibbonFiber = reconciler({
  appendInitialChild(parentInstance, child) {
  },

  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    let gibbonContext = null;
    if (!gibbonContextGlobal && rootContainerInstance.getContext) {
      let rootContainerInstanceContext = rootContainerInstance.getContext('2d');

      // TODO: Change it.
      scaleDPI(rootContainerInstance, rootContainerInstanceContext);
      gibbonContextGlobal = {
        type: 'canvas',
        ctx: rootContainerInstanceContext = rootContainerInstance.getContext('2d'),
      };
    }

    const gibbonElement = reactGibbonComponent.createElement(
      type,
      props,
      rootContainerInstance,
      gibbonContextGlobal,
      internalInstanceHandle,
    );

    console.log(gibbonElement, internalInstanceHandle)

    precacheFiberNode(internalInstanceHandle, gibbonElement);
    updateFiberProps(gibbonElement, props);
    return gibbonElement;
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(element, type, props) {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  prepareUpdate(element, type, oldProps, newProps) {
    return true;
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(element) {
    // noop
  },

  getRootHostContext(rootInstance) {
    // You can use this 'rootInstance' to pass data from the roots.
    return {};
  },

  getChildHostContext() {
    return {};
  },

  shouldSetTextContent(type, props) {
    return false;
  },

  scheduleAnimationCallback() {},

  scheduleDeferredCallback() {},

  useSyncScheduling: true,

  now: Date.now,

  mutation: {
    appendChild(parentInstance, child) {
      // if (parentInstance.appendChild) {
      //   parentInstance.appendChild(child);
      // } else {
      //   parentInstance.document = child;
      // }
    },

    appendChildToContainer(parentInstance, child) {
      // console.log(1, child);
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

    insertBefore(parentInstance, child, beforeChild) {
      // noob
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {
      // noop
    },

    commitTextUpdate(textInstance, oldText, newText) {
      // textInstance.children = newText;
    },
  }
})

const defaultContainer = {};
const roots = new Map();

const ReactGibbonRenderer = {
  render(canvasElement, container, callback) {
    const containerKey =
      typeof container === 'undefined' ? defaultContainer : container;
    let root = roots.get(containerKey);
    if (!root) {
      root = ReactGibbonFiber.createContainer(containerKey);
      roots.set(container, root);
    }

    ReactGibbonFiber.updateContainer(canvasElement, root, null, callback);

    ReactGibbonFiber.injectIntoDevTools({
      bundleType: 1,
      rendererPackageName: 'ReactGibbon',
      findHostInstanceByFiber: ReactGibbonFiber.findHostInstance,
    });

    return ReactGibbonFiber.getPublicRootInstance(root);
  },
}

export default ReactGibbonRenderer;
