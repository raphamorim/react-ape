---
id: components-button
title: Button
sidebar_label: Button
---


A component for creating a Button.

The following example shows how to render a Button.
```JS
import React from "react";
import { Button, View, render } from "react-ape";

class ImageExample extends React.Component {
  render() {
    return (
      <View>
        <Button
         title="Click Me"
         color="#2196F3'"
         onClick ={()=>{}}
        />
      </View>
    );
  }
}
```
<iframe src="https://codesandbox.io/embed/24zmzm07my?hidenavigation=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>