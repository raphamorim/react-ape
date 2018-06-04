import reconciler from 'react-reconciler';
import reactGibbonComponent from './reactGibbonComponent';

const ReactGibbonFiber = reconciler({
  appendInitialChild(parentInstance, child) {
    // noop for now
  },

  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    let gibbonContext = null;
    if (rootContainerInstance.getContext) {
      gibbonContext = rootContainerInstance.getContext('2d');
    }
    return reactGibbonComponent.createElement(type, props, rootContainerInstance, gibbonContext, internalInstanceHandle);
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    return text;
  },

  finalizeInitialChildren(wordElement, type, props) {
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit() {
    // noop
  },

  prepareUpdate(wordElement, type, oldProps, newProps) {
    return true;
  },

  resetAfterCommit() {
    // noop
  },

  resetTextContent(wordElement) {
    // noop
  },

  getRootHostContext(rootInstance) {
    // You can use this 'rootInstance' to pass data from the roots.
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

  now: () => {},

  mutation: {
    appendChild(parentInstance, child) {
      // if (parentInstance.appendChild) {
      //   parentInstance.appendChild(child);
      // } else {
      //   parentInstance.document = child;
      // }
    },

    appendChildToContainer(parentInstance, child) {
      console.log(child);
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

    // ReactGibbonFiber.injectIntoDevTools({
    //   bundleType: 1,
    //   rendererPackageName: 'ReactGibbon',
    //   findHostInstanceByFiber: ReactGibbonFiber.findHostInstance,
    // });

    return ReactGibbonFiber.getPublicRootInstance(root);
  },
}

export default ReactGibbonRenderer;
