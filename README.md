# React Ape

> The name is a "joke" based on [Netflix's React Gibbon](https://medium.com/netflix-techblog/crafting-a-high-performance-tv-user-interface-using-react-3350e5a6ad3b). I choose to use Ape then.

## Under Development

1 - React Ape IS NOT Ready Yet.

2 - Should follow React Native Elements and Primitives. So will be easy to convert React Components (without bridge) to Canvas/WebGL.

3 - Accept Style as JavaScript Object.

4 - Will allow to inspect React Elements using React DevTools.

5 - I confess there's a lot of ideas and sketches in my head and I'll update the Readme when things become more clear.

React Renderer to build UI interfaces using canvas/WebGL.

```jsx
import React, { Component } from 'react';
import { Text, View, render } from 'react-ape';

class MyComponent extends Component {
  render() {
    return (
      <View>
        <Image src={'react-tv-logo.png'}/>
        <Text content={'Rendering as WebGL scene.'}/>
        <Text>
          You just use components like 'View' and 'Text',
          instead of web components like 'div' and 'span'.
        </Text>
      </View>
    );
  }
}

render(MyComponent, document.querySelector('#canvas-id'));
```

## React Ape Components

React Ape provides a set of standard React components that abstract the underlying rendering implementation.

### `<Canvas>`

Canvas is the top-level component. Set render context to `Context2dCanvas`.

### `<WebGL>`

WebGL is the top-level component. Set render context to `WebGL`.

### `<GL>`

GL is the top-level component. **Not available yet**. Should Bind GL to work with React-Native.

### `<View>`

### `<ListView>`

### `<Text>`

Text is a flexible component that supports multi-line truncation, something which has historically been difficult and very expensive to do in DOM.

### `<Image>`

Image is exactly what you think it is. However, it adds the ability to hide an image until it is fully loaded and optionally fade it in on load.

### `StyleSheet`

### ROADMAP

