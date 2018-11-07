---
id: components-image
title: Image
sidebar_label: Image
---

## Image

A component to display different types of images on canvas.

This example shows how to display an image at canvas.
```JS
import React from "react";
import { Image, View, render } from "react-ape";

class ImageExample extends React.Component {
  render() {
    return (
      <View>
        <Image src="http://raphamorim.io/react-ape/img/logo.svg" />
      </View>
    );
  }
}
```
<iframe src="https://codesandbox.io/embed/24zmzm07my?hidenavigation=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>