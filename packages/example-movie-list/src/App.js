import React from 'react'
import { render, Text, ListView, View, Image, StyleSheet } from '../../react-ape/reactApeEntry'

const styles = StyleSheet.create({
  heading: {
    top: 73,
    left: 250,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 29,
  },
  heading2: {
    top: 173,
    left: 250,
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
    ];
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
        style={{ top: 100, left: 30 }}
      />
    );
  }

  render() {
    // <View>
      //   <Image
      //     src={'posters/netflix.png'}
      //     style={{
      //       top: 10,
      //       left: 30,
      //     }}
      //     width={210}
      //     height={100}
      //   />
      //   <Text
      //     style={{
      //       top: 73,
      //       left: 250,
      //       fontFamily: 'Arial',
      //       fontWeight: 'bold',
      //       fontSize: 29,
      //     }}
      //   >
      //     • Netflix Originals
      //   </Text>
      //   { this.renderPostersList() }
      // <Text
      //     style={{
      //       top: 520,
      //       left: 45,
      //       fontFamily: 'Arial',
      //       fontWeight: 'bold',
      //       fontSize: 29,
      //     }}
      //   >
      //     Rendering with Canvas2DContext using React Ape
      //   </Text>
      // </View>

    return (
      <View>
        <Text style={styles.heading}>
          • Netflix Originals
        </Text>
        <Text style={styles.heading2}>
          • Netflix NotOriginals
        </Text>
        { this.renderPostersList() }
      </View>
    )
  }
}

render(<App/>, document.getElementById('root'))
