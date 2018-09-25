# 🦍 React Ape

[![CircleCI](https://circleci.com/gh/raphamorim/react-ape/tree/master.svg?style=svg)](https://circleci.com/gh/raphamorim/react-ape/tree/master)

> React Renderer to build UI interfaces using canvas/WebGL.

<p align="center"><img alt="React Ape Logo" src="assets/logo.png"/></p>

React Renderer to build UI interfaces using canvas/WebGL. React Ape was built to be an optional [React-TV](https://github.com/raphamorim/react-tv) renderer. It's mainly a renderer focused on creating things for TV, PS4, Nintendo Switch, PS Vita, PS3 and low memory devices. The name is a "joke" based on [Netflix's React Gibbon](https://medium.com/netflix-techblog/crafting-a-high-performance-tv-user-interface-using-react-3350e5a6ad3b). I choose to use Ape then.

<img alt="Demo PS Vita" src="assets/demo-ps-vita.jpg" height="330px" />

## Under Development

1 - React Ape IS NOT Ready Yet.

2 - Should follow React Native Elements and Primitives. So will be easy to convert React Components (without bridges) to Canvas/WebGL.

3 - Accept Style as JavaScript Object.

4 - Allow to create React Components based on Canvas. 

5 - Allow to inspect React Elements using React DevTools.

6 - I confess there's a lot of ideas and sketches in my head and I'll update the Readme when things become more clear.

## Gallery

| Project/Experiment | Preview | 
| :---: | :---: |
| [Movie List](https://github.com/raphamorim/react-ape-movie-list-demo) | ![Movie List Demo](https://github.com/raphamorim/react-ape-movie-list-demo/blob/master/example.png?raw=true) |
| [Weather App](https://github.com/raphamorim/react-ape-weather-demo) | WIP |

## Usage

![Example App](assets/example.png)

```jsx
import React from 'react'
import { render, Text, ListView, View, Image, StyleSheet } from 'react-ape'

const styles = StyleSheet.create({
  heading: {
    top: 62,
    left: 250,
    color: 'white',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 29,
  },
  date: {
    top: 62,
    left: 1150,
    color: 'red',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 19,
  },
  logo: {
    top: 10,
    left: 30,
  },
  infoAboutRenderer: {
    top: 520,
    left: 45,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 29,
  }
})

class App extends React.Component {
  constructor() {
    super()
    this.posters = [
      { name: 'Narcos', src: 'posters/narcos.jpg' },
      { name: 'Daredevil', src: 'posters/daredevil.jpg' },
      { name: 'Stranger Things', src: 'posters/stranger-things.jpg' },
    ]
    this.state = {
      date: new Date().toISOString()
    }
  }

  componentDidMount() {
    setInterval(() => this.setState({ date: new Date().toISOString() }), 1000)
  }

  renderPostersList() {
    const renderRow = (data, idx) => (
      <View key={idx} onClick={() => { console.log(data) }}>
        <Image src={data.src} width={200} height={300}/>
        <Text content={data.name}/>
      </View>
    )

    return (
      <ListView
        dataSource={this.posters}
        renderRow={renderRow}
      />
    )
  }

  render() {
    return (
      <View>
        <Image
          src={'posters/netflix.png'}
          style={styles.logo}
          width={210}
          height={100}
        />
        <Text style={styles.heading}>
          • Netflix Originals
        </Text>
        <Text style={styles.date}>
          {this.state.date}
        </Text>
        <Text style={styles.infoAboutRenderer}>
          Rendering with Canvas2DContext using React Ape
        </Text>
        { this.renderPostersList() }
      </View>
    )
  }
}

render(<App/>, document.getElementById('canvas-id'))
```

## React Ape Components

React Ape provides a set of standard React components that abstract the underlying rendering implementation.

### `<View>`

### `<ListView>`

```jsx
import { ListView, Text, View } from 'react-ape';

const padding = 30;
const renderRow = (data, idx) => (
  <View
    height={200}
    width={200}
    key={'poster-list-' + idx}>
    <Text style={{top: 220 * (idx + padding), left: 460, color: '#FFF'}}>
      {data.name}
    </Text>
  </View>
);

const myListView = (
  <ListView
    dataSource={this.posters}
    renderRow={renderRow}
    style={styles.list}
  />
);
```

### `<Text>`

Text is a flexible component that supports multi-line truncation, something which has historically been difficult and very expensive to do in DOM.

### `<Image>`

Image is exactly what you think it is. However, it adds the ability to hide an image until it is fully loaded and optionally fade it in on load.

### `StyleSheet` (WIP)

#### TODO:

- `flatten` (https://facebook.github.io/react-native/docs/stylesheet.html#flatten)
- `top, left, right, bottom`
- flexbox (display, justify-content, align-items)

### `dimensions` (WIP)

https://facebook.github.io/react-native/docs/dimensions.html

### `Platform` (WIP)

https://facebook.github.io/react-native/docs/platform-specific-code.html

## Roadmap

#### Stage 1

Initial proof-of-concept.

- [ ] `<View/>`
  - [ ] overflow support
- [ ] `<ListView/>`
  - [ ] support to Focus/Navigation bindings
  - [ ] calculate automatically space between items
- [ ] Focus and Navigation system 
- [ ] Resize (???)
- [ ] Support custom React Components which have access to ApeContext (`Canvas2DContext`)
- [ ] Allow to inspect React Ape Components on React DevTools
- [ ] "Smart clearRect" based on `DiffProperties`
- [ ] Start support to Events/Interaction
  - [ ] touchStart
  - [ ] touchEnd
  - [ ] handleClick
  - [ ] handleDoubleClick
  - [ ] handleTouchStart
  - [ ] handleTouchMove
  - [ ] handleTouchEnd

#### Stage 2

Implement essential functionality needed for daily use by early adopters.

- [ ] Start the Documentation
  - [ ] Create document explaing React-Ape lifecycle
- [ ] Flexbox Support
- [ ] Render to WebGL (`ReactApe.renderToWebGL()`)
- [ ] Work around Drag and Drop feature

----------------------------------------------------

## References

- https://github.com/raphamorim/react-tv
- https://medium.com/netflix-techblog/crafting-a-high-performance-tv-user-interface-using-react-3350e5a6ad3b
- https://github.com/Flipboard/react-canvas
- https://github.com/nitin42/Making-a-custom-React-renderer
