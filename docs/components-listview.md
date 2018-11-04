---
id: components-listview
title: ListView
sidebar_label: ListView
---

## ListView

List View is a special type of view that can display items one by one based in a list.

```JS
import React from 'react';
import {
  Text,
  ListView,
} from 'react-ape';

class ListViewExample extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          names: [
            'Raphael',
            'Jefferson',
            'Marcus'
          ]
        }
      }

      renderName(name, index) {
       return (
         <Text style={{x: index * 100, y: 0}}> {name} </Text>
       )
      }

      render() {
        return (
          <ListView
            dataSource = {this.state.names}
            renderRow = {this.renderName}>
          </ListView>
        )
      }
   }

export default ListViewExample
```

<iframe src="https://embed.plnkr.co/plunk/3FfWANyyzjv7H01M?show=preview" frameborder="0" width="100%" height="480px"></iframe>