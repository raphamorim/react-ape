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

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#202020',
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  container: {
    position: 'absolute',
    left: 150,
    top: 100,
    backgroundColor: 'orange',
    height: 80,
    width: 280,
  },
  time: {
    position: 'absolute',
    left: 520,
    top: 260,
    color: 'white',
    fontSize: 60,
  },
  text: {
    position: 'absolute',
    left: 150,
    top: 260,
  },
});

class SmartRender extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
    };
  }

  componentDidMount() {
    setInterval(() => {
      const time = new Date()
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      this.setState({
        time,
      });
    }, 100);
  }

  render() {
    return (
      <View style={styles.surface}>
        <Tools.Grid />
        <View style={styles.container}>
          <Text style={styles.time}>
            {this.state.time}
          </Text>
        </View>
        <View style={styles.text}>
          <Text style={{color: 'white'}}>
            This TextNode should not render again!!!
          </Text>
        </View>
      </View>
    );
  }
}

export default SmartRender;
