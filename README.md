# React Gibbon

> Disclamer: Isn't is a Netflix Project. However I decide to use "Gibbon" name to honor their project.

React Gibbon is a react renderer powered by WebGL (maybe soon GL only).

```jsx
import React, { Component } from 'react';
import { Text, View } from 'react-gibbon';

class WhyReactGibbonIsSoGreat extends Component {
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
```
