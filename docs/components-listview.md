---
id: components-listview
title: ListView
sidebar_label: ListView
---

## ListView

List View is a special type of view that can display items one by one based in a list.

```JS
import React from "react";
import { Text, ListView, render } from "react-ape";

class ListViewExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      names: ["Raphael", "Jefferson", "Marcus"]
    };
  }

  renderName(name, index) {
    return <Text style={{ x: index * 100, y: 0 }}> {name} </Text>;
  }

  render() {
    return (
      <ListView dataSource={this.state.names} renderRow={this.renderName} />
    );
  }
}
```

<iframe src="https://codesandbox.io/embed/0xo024091v?hidenavigation=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>