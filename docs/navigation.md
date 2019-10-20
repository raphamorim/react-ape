---
id: navigation
title: Navigation with React Ape
sidebar_label: Navigation
---

React-Ape exports two functions: `withFocusable` and `withNavigation`. A declarative navigation system based on [HOC's](https://reactjs.org/docs/higher-order-components.html) for focus and navigation control.

```JS
import React from 'react';
import { withFocusable, withNavigation, Text, View, render } from 'react-ape';

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

