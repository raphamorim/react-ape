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
  time: {
    top: 62,
    left: 1150,
    color: 'red',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 25,
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
  },
  list: {
    top: 100,
    left: 0,
    backgroundColor: '#303030',
    width: 2000,
    height: 300
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
      time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1"),
    }
  }

  componentDidMount() {
    setInterval(() => {
      const time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
      this.setState({ time });
    }, 100)
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
        style={styles.list}
      />
    );
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
        <Text style={styles.time}>
          {this.state.time}
        </Text>
        <Text style={styles.infoAboutRenderer}>
          Rendering with Canvas2DContext using React Ape
        </Text>
        { this.renderPostersList() }
      </View>
    )
  }
}

render(<App/>, document.getElementById('root'))
