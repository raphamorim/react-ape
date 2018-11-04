---
id: components-view
title: View
sidebar_label: View
---

## View

Most fundamental component, `view` contains the components inside of itself, it can also nest other views.

```JS
import React from 'react';
import {
  Text,
  View,
} from 'react-ape';

class ViewExample extends React.Component {
     constructor(props) {
       super(props)
     }

     render() {
       return (
         <View style={{ backgroundColor: '#f00' }}>
        </View>
       )
     }
   }

export default ViewExample
```
<iframe src="https://embed.plnkr.co/plunk/u9RQ0qjTyrI21SEM?show=preview" frameborder="0" width="100%" height="480px"></iframe>