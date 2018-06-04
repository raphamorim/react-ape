import Canvas from './components/Canvas';
import Text from './components/Text';

const ReactGibbonComponent = {
 createElement(type, props, rootContainerElement, gibbonContext, internalInstanceHandle) {
  console.log(rootContainerElement);
    const COMPONENTS = {
      CANVAS: () => new Canvas(root, props, gibbonContext),
      TEXT: () => Text(root, props, gibbonContext),
    };

    return COMPONENTS[type]() || undefined;
  },
}

export default ReactGibbonComponent;
