---
id: customcomponents-registercomponent
title: Custom Components
sidebar_label: Creating and Registering
---


## Creating Custom Components

Custom Components allow developers to not limit themselves only to React Ape primitive components (as `Text`, `Image` and etcetera). You can create UI using custom components, however you must leave render pipeline (such as animation updates) to React Ape render process. We strongly recommend to use React state to animate your custom component.

## `registerComponent`

Registers an app's root component.

| NAME | TYPE | REQUIRED | DESCRIPTION |
| ------- | ------------ | ----------------- | ------ |
| appKey | `string` | `Yes` | Application key. |
| renderFunction | `function` | `Yes` | A function that renders using Canvas2dContext. |

<!--DOCUSAURUS_CODE_TABS-->

<!--Spinner.jsx-->
```js
class Spinner {
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  reset(prevProps, parentStyle, canvas) {
    const { ctx } = canvas;
    /* 
     If you want to do a smart reset, you can call render method
     using prevProps with parent styles instead of use clearRect.

     parentStyle will return <View/> style properties:
     parentStyle.backgroundColor === white
    */
    ctx.clearRect(0, 0, 18, 18);
  }

  render(props, canvas) {
    const { ctx } = canvas;
    const { style = {}, degrees } = props;
    const { color = 'black' } = style;

    const offset = 8;
    ctx.save();
    ctx.translate(offset, offset);
    ctx.rotate(degrees);

    // Draw half open circle
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.arc(8 - offset, 8 - offset, 6, 0, 1.75 * Math.PI);
    ctx.stroke();

    // Draw arrowhead
    ctx.lineWidth = 2;
    ctx.moveTo(13 - offset, 1 - offset);
    ctx.lineTo(9 - offset, 5 - offset);
    ctx.lineTo(13 - offset, 5 - offset);
    ctx.lineTo(13 - offset, 1 - offset);
    ctx.stroke();
    ctx.restore();
  }
}

const spinner = new Spinner();
export default spinner;
```

<!--App.jsx-->
```js
import React from 'react';
import {render, View, registerComponent} from 'react-ape';

import Spinner from './Spinner';

// Create Custom Components
const custom = {
  Spinner: registerComponent('Spinner', Spinner)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { degrees: 0.0 };
  }

  componentDidMount() {
    setInterval(() => {
      const { degrees } = this.state;
      this.setState({ degrees: degrees + 0.10 });
    }, 10);
  }

  render() {
    const { degrees } = this.state;
    return (
      <View style={{ backgroundColor: 'white' }}>
        <custom.Spinner degrees={ degrees } style={{ color: 'blue' }} />
      </View>
    );
  }
}

render(<App />, document.getElementById('root'));
```
<!--END_DOCUSAURUS_CODE_TABS-->
