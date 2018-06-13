import Image from './components/Image';
import ListView from './components/ListView';
import Text from './components/Text';
import View from './components/View';

const ReactApeComponent = {
 createElement(type, props, rootContainerElement, internalInstanceHandle) {

    const COMPONENTS = {
      IMAGE: () => Image.bind(this, props),
      TEXT: () => Text.bind(this, props),

      LISTVIEW: () => new ListView(props),
      VIEW: () => new View(props),
    };

    return (
      COMPONENTS[type] ?
      COMPONENTS[type]() :
      console.warn('ReactApe could not identify ' + type + ' as ReactApeComponent')
    )
  },
}

export default ReactApeComponent;
