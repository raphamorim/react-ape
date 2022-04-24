---
id: navigation-on-apps
title: Navigation on Apps
sidebar_label: Navigation on Apps
---

## Creating navigation with React Ape

React-Ape exports two functions: `withFocusable` and `withNavigation`. A declarative navigation system based on [HOC's](https://reactjs.org/docs/higher-order-components.html) for focus and navigation control.

Those HOC's can be imported by

```JS
import { Navigation } from 'react-ape'
/* 
  You can also import using: 
  import { withFocusable, withNavigation } from 'react-ape/modules/Navigation'
*/

const { withFocusable, withNavigation } = Navigation;
```

For more information about the API, [click here to see the navigation API documentation](/docs/apis-navigation).

### Usage overview:

```JS
import React from 'react'
import { Text, View, render } from 'react-ape'
import { withFocusable, withNavigation } from 'react-ape/modules/Navigation'

const Item = ({focused, setFocus, focusPath}) => {
  focused = (focused) ? 'focused' : 'unfocused'
  return (
    <View onClick={() => { setFocus() }}>
      <Text>It's {focused} Item</Text>
    </View>
  )
}

const Button = ({setFocus}) => {
  return (
    <View onClick={() => { setFocus('item-1') }}>
      <Text>Back To First Item!</Text>
    </View>
  )
}


const FocusableItem = withFocusable(Item)
const FocusableButton = withFocusable(Button)

function App({currentFocusPath}) {
  return (
    <View>
      <Text>Current FocusPath: '{currentFocusPath}'</Text>,
      <FocusableItem focusPath='item-1'/>
      <FocusableItem focusPath='item-2'/>
      <FocusableButton
        focusPath='button'
        onEnterPress={() => console.log('Pressed enter on Button!')}/>
    </View>
  )
}

const NavigableApp = withNavigation(App)

render(<NavigableApp/>, document.querySelector('#canvas-id'))
```