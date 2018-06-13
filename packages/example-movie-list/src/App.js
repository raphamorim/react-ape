import React from 'react'
import { render, Text, ListView, View, Image, StyleSheet } from '../../react-ape/reactApeEntry'

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
    ];
    this.state = {
      date: new Date().toISOString()
    }
  }

  componentDidMount() {
    // setInterval(() => {
    //   const date = new Date().toISOString();
    //   console.log(date);
    //   this.setState({ date });
    // }, 1000)
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

      // </View>

// { this.renderPostersList() }

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
        { true || this.renderPostersList() }
      </View>
    )
  }
}

render(<App/>, document.getElementById('root'))
