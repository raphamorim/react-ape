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

```JS
import React from 'react';
import { render, registerComponent } from 'react-ape';

function Spinner(props, canvas) {
  const { ctx } = canvas;
  const { style = {}, degrees } = props;

  const OFFSET = 8;
  ctx.save();
  ctx.translate(OFFSET, OFFSET);
  ctx.rotate(degrees);

  // Draw half open circle
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.arc(8 - OFFSET, 8 - OFFSET, 6, 0, 1.75 * Math.PI);
  ctx.strokeFill = props.style.color;
  ctx.stroke();

  // Draw arrowhead
  ctx.lineWidth = 2;
  ctx.moveTo(13 - OFFSET, 1 - OFFSET);
  ctx.lineTo(9 - OFFSET, 5 - OFFSET);
  ctx.lineTo(13 - OFFSET, 5 - OFFSET);
  ctx.lineTo(13 - OFFSET, 1 - OFFSET);
  ctx.stroke();
  ctx.restore();
}

const customComponents = {
  Spinner: registerComponent('Spinner', Spinner)
}

const App = () => {
  return <customComponents.Spinner degrees={4.3} style={{ color: 'lightblue' }} />
}

render(<App/>, document.querySelector('#canvas-id'));
```
