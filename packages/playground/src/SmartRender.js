import React from 'react';
import {
  render,
  Text,
  ListView,
  View,
  Image,
  Tools,
  StyleSheet,
  Dimensions,
} from '../../react-ape/reactApeEntry';

const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#202020',
    width: dimensions.getWidth(),
    height: dimensions.getHeight(),
  },
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
    left: dimensions.getWidth() - 120,
    color: 'red',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 25,
  },
  logo: {
    top: 10,
    left: 30,
  },
  list: {
    top: 100,
    left: 0,
    backgroundColor: '#303030',
    width: dimensions.getWidth(),
    height: 400,
  },
});

class SmartRender extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
      backgroundColor: 'blue',
    };
  }

  componentDidMount() {
    setInterval(() => {
      const time = new Date()
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      this.setState({
        time,
        backgroundColor: this.state.backgroundColor === 'blue' ? 'purple' : 'blue'
      });
    }, 100);
  }

  render() {
    return (
      <View>
        <Tools.Grid />
        <View
          style={{
            backgroundColor: this.state.backgroundColor,
            height: 80,
            width: 280,
            x: 500,
            y: 220,
          }}>
          <Text style={{x: 520, y: 260, color: 'white', fontSize: 60}}>
            {this.state.time}
          </Text>
        </View>
        <Text style={{x: 500, y: 190, color: 'black'}}>{this.state.time}</Text>
        <Text style={{x: 500, y: 360}}>
          This TextNode should not render again!!!
        </Text>
      </View>
    );
  }
}

export default SmartRender;
