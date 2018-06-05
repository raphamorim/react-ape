import Image from './components/Image';
import ListView from './components/ListView';
import Text from './components/Text';
import View from './components/View';

const ReactGibbonComponent = {
 createElement(type, props, rootContainerElement, gibbonContext, internalInstanceHandle) {
    if (!gibbonContext) {
      return undefined;
    }

    const COMPONENTS = {
      IMAGE: () => Image(root, props, gibbonContext),
      LISTVIEW: () => ListView(root, props, gibbonContext),
      TEXT: () => Text(root, props, gibbonContext),
      VIEW: () => View(root, props, gibbonContext),
    };

    return (
      (COMPONENTS[type]) ?
      COMPONENTS[type]() :
      console.warn('ReactGibbon could not identify ' + type + ' as ReactGibbonComponent')
    )
  },
}

export default ReactGibbonComponent;
