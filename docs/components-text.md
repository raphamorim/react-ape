---
id: components-text
title: Text
sidebar_label: Text
---

## Text

A component for displaying text.

This example shows the text being displayed at position `0,0` of the canvas.
```JS
import React from 'react';
import {
  Text,
  View,
} from 'react-ape';

class TextOnScreen extends React.Component {
     constructor(props) {
       super(props)
     }

     render() {
       return (
         <View>
          <Text style={{x: 0, y: 0}}>
            Hello World Text!
          </Text>
        </View>
       )
     }
   }

export default TextOnScreen
```
<iframe src="https://embed.plnkr.co/plunk/Wmgz5gb244bIQ7RG?show=preview" frameborder="0" width="100%" height="480px"></iframe>