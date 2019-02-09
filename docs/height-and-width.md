---
id: height-and-width
title: Height and Width
sidebar_label: Height and Width
---


## Height and Width

A component's height and width determine its size on the screen.

## Fixed Dimensions

The simplest way to set the dimensions of a component is by adding a fixed width and height to style. All dimensions in React Ape are unitless, and represent density-independent pixels.

Setting dimensions this way is common for components that should always render at exactly the same size, regardless of screen dimensions.

<div class='preview'>

<div class='preview-code'>

```JS
import React, { Component } from 'react';
import { View, render } from 'react-ape';

class DimensionsBasics extends React.Component {
  render() {
    return (
      <View>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}} />
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
}

render(<DimensionsBasics />, document.getElementById('root'));
```

</div>

<iframe src="https://raphamorim.io/react-ape-preview/?code=class%20DimensionsBasics%20extends%20React.Component%20{%20render()%20{%20return%20(%20%3CView%3E%20%3CView%20style={{width:%2050,%20height:%2050,%20backgroundColor:%20%27powderblue%27}}%20/%3E%20%3CView%20style={{width:%20100,%20height:%20100,%20backgroundColor:%20%27skyblue%27}}%20/%3E%20%3CView%20style={{width:%20150,%20height:%20150,%20backgroundColor:%20%27steelblue%27}}%20/%3E%20%3C/View%3E%20);%20}%20}%20render(%3CDimensionsBasics%20/%3E,%20document.getElementById(%27root%27));" class='preview-app'/>

</div>

