import Text from './components/Text';

const ReactGibbonComponent = {
 createElement(type, props, rootContainerElement, parentNamespace) {
    console.log(type);
    const COMPONENTS = {
      TEXT: () => new Text(root, props),
      default: undefined,
    };

    return COMPONENTS[type]() || COMPONENTS.default;
  },
}

export default ReactGibbonComponent;
