# React Gibbon

> Disclamer: Isn't is a Netflix Project. However I decide to use "Gibbon" name to honor their project.

React Renderer to build UI interfaces using canvas/WebGL.

```jsx
import React, { Component } from 'react';
import { Text, View, render } from 'react-gibbon';

class MyComponent extends Component {
  render() {
    return (
      <View>
        <Text>
          It's rendering as WebGL scene.
        </Text>
        <Text>
          You just use components like 'View' and 'Text',
          instead of web components like 'div' and 'span'.
        </Text>
      </View>
    );
  }
}

render(ReactGibbonComponent, document.querySelector('#canvas-id'));
```

## React Gibbon Components

React Gibbon provides a set of standard React components that abstract the underlying rendering implementation.

### `<Canvas>`

Canvas is the top-level component. Set render context to `Context2dCanvas`.

### `<WebGL>`

WebGL is the top-level component. Set render context to `WebGL`.

### `<GL>`

GL is the top-level component. **Not available yet**. Should Bind GL to work with React-Native.

### `<View>`

### `<Text>`

Text is a flexible component that supports multi-line truncation, something which has historically been difficult and very expensive to do in DOM.

### `<Image>`

Image is exactly what you think it is. However, it adds the ability to hide an image until it is fully loaded and optionally fade it in on load.


### ROADMAP

- [ ] `View`
- [ ] `Text`
- [ ] `Image`
- [ ] Work in a way to render DOM as possibilty too.
