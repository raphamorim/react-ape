---
id: components-image
title: Image
sidebar_label: Image
---

## Image

A component to display different types of images on canvas.

This example shows how to display an image at canvas.
```JS
import React from 'react';
import {
  Image,
  View,
} from 'react-ape';

class ImageExample extends React.Component {
     constructor(props) {
       super(props)
     }

     render() {
       return (
         <View>
          <Image src="http://raphamorim.io/react-ape/img/logo.svg">
          </Image>
        </View>
       )
     }
   }

export default ImageExample
```
<iframe src="https://embed.plnkr.co/plunk/DBCtQZdmFaEtww4n?show=preview" frameborder="0" width="100%" height="480px"></iframe>