---
id: components-text
title: Text
sidebar_label: Text
---

## Text

A component for displaying text.

This example shows the text being displayed at position `0,0` of the canvas.
```JS
import React from "react";
import { Text, View, render } from "react-ape";

class TextOnScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ x: 0, y: 0 }}>Hello World Text!</Text>
      </View>
    );
  }
}
```
<iframe src="https://codesandbox.io/embed/m497o66jvx?hidenavigation=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>