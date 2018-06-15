import reconciler from 'react-reconciler';
import reactApeComponent from './reactApeComponent';
import {precacheFiberNode, diffProperties, updateFiberProps} from './reactApeComponentTree';

function scaleDPI(canvas, context, customWidth, customHeight) {
  const width = customWidth ||
              canvas.offsetWidth ||
              canvas.width ||
              canvas.clientWidth;
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

CanvasRenderingContext2D.prototype.clear =
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }
};

// TODO: Use Context.
let apeContextGlobal = false;

const ReactApeFiber = reconciler({
  appendInitialChild(parentInstance, child) {
    // console.log('appendInitialChild', parentInstance, child);
    if (parentInstance.appendChild) {
      parentInstance.appendChild(child);
      parentInstance.render(apeContextGlobal);
    }
  },

  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    // console.log('createInstance');
    let apeContext = null;
    if (!apeContextGlobal && rootContainerInstance.getContext) {
      let rootContainerInstanceContext = rootContainerInstance.getContext('2d');

      // TODO: Change it.
      scaleDPI(rootContainerInstance, rootContainerInstanceContext);
      apeContextGlobal = {
        type: 'canvas',
        _internalRenderQueue: [],
        ctx: rootContainerInstanceContext = rootContainerInstance.getContext('2d'),
      };
    }

    const apeElement = reactApeComponent.createElement(
      type,
      props,
      rootContainerInstance,
      apeContextGlobal,
      internalInstanceHandle,
    );

    // console.log(apeElement, internalInstanceHandle)

    precacheFiberNode(internalInstanceHandle, apeElement);
    updateFiberProps(apeElement, props);
    return apeElement;
  },

  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    // console.log('createTextInstance');
    // let textNode = reactApeComponent.createTextNode(text, rootContainerInstance);
    // precacheFiberNode(internalInstanceHandle, textNode);
    return text;
  },

  finalizeInitialChildren(element, type, props) {
    // console.log('finalizeInitialChildren', element);
    return false;
  },

  getPublicInstance(inst) {
    return inst;
  },

  prepareForCommit(rootContainerInstance) {
    // console.log('prepareForCommit');
  },

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
        apeContextGlobal,
      );

      apeContextGlobal._internalRenderQueue.push(apeElement);
    }
  },

  resetAfterCommit(rootContainerInstance) {
    if (apeContextGlobal._internalRenderQueue.length) {
      apeContextGlobal.ctx.clear();
      apeContextGlobal._internalRenderQueue.forEach((fn) => {
        if (fn.render) {
          fn.render(apeContextGlobal);
        } else {
          fn(apeContextGlobal);
        }
      })
      apeContextGlobal._internalRenderQueue = [];
    }
  },

  resetTextContent(element) {
    console.log('resetTextContent');
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
      // console.log('appendChild', parentInstance, child);
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
      console.log('appendChildToContainer', parentInstance, child)
      if (child.render) {
        child.render(apeContextGlobal);
      } else {
        child(apeContextGlobal);
      }
    },

    removeChild(parentInstance, child) {
      console.log('removeChild');
      // parentInstance.removeChild(child);
    },

    removeChildFromContainer(parentInstance, child) {
      console.log('removeChildFromContainer');
      // parentInstance.removeChild(child);
    },

    insertBefore(parentInstance, child, beforeChild) {
      console.log('insertBefore');
    },

    commitUpdate(instance, updatePayload, type, oldProps, newProps) {
      console.log('>> commitUpdate');
    },

    commitMount(instance, updatePayload, type, oldProps, newProps) {},

    commitTextUpdate(textInstance, oldText, newText) {
      console.log('>>>', textInstance)
      // textInstance.children = newText;
    },
  },

  shouldSetTextContent(props) {
    return (
      typeof props.children === 'string' || typeof props.children === 'number'
    );
  },
})

const defaultContainer = {};
const roots = new Map();

const ReactApeRenderer = {
  render(canvasElement, container, callback) {
    const containerKey =
      typeof container === 'undefined' ? defaultContainer : container;
    let root = roots.get(containerKey);
    if (!root) {
      root = ReactApeFiber.createContainer(containerKey);
      roots.set(container, root);
    }

    ReactApeFiber.updateContainer(canvasElement, root, null, callback);

    ReactApeFiber.injectIntoDevTools({
      bundleType: 1,
      rendererPackageName: 'ReactApe',
      findHostInstanceByFiber: ReactApeFiber.findHostInstance,
    });

    return ReactApeFiber.getPublicRootInstance(root);
  },
}

export default ReactApeRenderer;
