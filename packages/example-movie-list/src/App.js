import React from 'react';
import {
  render,
  Text,
  ListView,
  View,
  Image,
  StyleSheet,
  withFocus,
  withNavigation
} from 'react-ape';

const styles = StyleSheet.create({
  heading: {
    top: 62,
    left: 250,
    color: 'white',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 29
  },
  time: {
    top: 62,
    left: 1150,
    color: 'red',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 25
  },
  logo: {
    top: 10,
    left: 30
  },
  infoAboutRenderer: {
    top: 590,
    left: 30,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: 'lightblue',
    fontSize: 23
  },
  list: {
    top: 100,
    left: 0,
    backgroundColor: '#303030',
    width: 2000,
    height: 400
  }
});

class Item extends React.Component {
  render() {
    const { idx, data } = this.props;
    return (
      <View
        height={200}
        width={200}
        key={'poster-list-' + idx}
        onClick={() => {
          console.log(data);
        }}
      >
        <Image
          style={{ x: 220 * idx + 30, y: 140, width: 200, height: 300 }}
          src={data.src}
        />
        <Text style={{ x: 220 * idx + 30, y: 460, color: '#FFF' }}>
          {data.name}
        </Text>
      </View>
    );
  }
}

const FocusableItem = withFocus(Item);

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.posters = [
      { name: 'Narcos', src: 'posters/narcos.jpg' },
      { name: 'Daredevil', src: 'posters/daredevil.jpg' },
      { name: 'Stranger Things', src: 'posters/stranger-things.jpg' },
      { name: 'Narcos', src: 'posters/narcos.jpg' },
      { name: 'Daredevil', src: 'posters/daredevil.jpg' },
      { name: 'Stranger Things', src: 'posters/stranger-things.jpg' },
      { name: 'Narcos', src: 'posters/narcos.jpg' },
      { name: 'Daredevil', src: 'posters/daredevil.jpg' },
      { name: 'Stranger Things', src: 'posters/stranger-things.jpg' }
    ];
    this.state = {
      time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')
    };
  }

  componentDidMount() {
    setInterval(() => {
      const time = new Date()
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      this.setState({ time });
    }, 100);
  }

  renderPostersList() {
    const renderRow = (data, idx) => (
      <FocusableItem
        focusKey={`movie-card-${idx}`}
        key={`poster-list-${idx}`}
        idx={idx}
        data={data}
      />
    );
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
        <Text style={styles.heading}>• Netflix Originals</Text>
        <Text style={styles.time}>{this.state.time}</Text>
        <Text style={styles.infoAboutRenderer}>Made with React Ape</Text>
        {this.renderPostersList()}
      </View>
    );
  }
}

const NavigationApp = withNavigation(App);

render(<NavigationApp />, document.getElementById('root'));
