---
id: components-view
title: View
sidebar_label: View
---

## View

Most fundamental component, `view` contains the components inside of itself, it can also nest other views.

```JS
import React from "react";
import { Text, View, render } from "react-ape";

class ViewExample extends React.Component {
  render() {
    return <View style={{ backgroundColor: "red" }} />;
  }
}
```
<iframe src="https://codesandbox.io/embed/v2vxwnlxl?hidenavigation=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>