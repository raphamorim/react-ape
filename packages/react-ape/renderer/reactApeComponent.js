import Image from './components/Image';
import ListView from './components/ListView';
import Text from './components/Text';
import View from './components/View';

const ReactGibbonComponent = {
 createElement(type, props, rootContainerElement, apeContext, internalInstanceHandle) {
    if (!apeContext) {
      return undefined;
    }

    const COMPONENTS = {
      IMAGE: () => Image(root, props, apeContext),
      LISTVIEW: () => ListView(root, props, apeContext),
      TEXT: () => Text(root, props, apeContext),
      VIEW: () => View(root, props, apeContext),
    };

    return (
      (COMPONENTS[type]) ?
      COMPONENTS[type]() :
      console.warn('ReactGibbon could not identify ' + type + ' as ReactGibbonComponent')
    )
  },
}

export default ReactGibbonComponent;
