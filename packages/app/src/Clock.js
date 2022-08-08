import React, {Component, useState, useEffect} from 'react';
import {
  render,
  Text,
  View,
  Tools,
  Dimensions,
  StyleSheet,
  registerComponent,
} from '../../react-ape/reactApeEntry';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 70,
    top: 20,
    backgroundColor: '#331A00',
    height: 70,
    borderRadius: 30,
    width: 110,
  },
  time: {
    color: 'white',
    fontSize: 28,
  },
});

class Clock extends React.Component {
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

      this.setState({time});
    }, 300);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.time}>
          {this.state.time}
        </Text>
        {/*<Text style={styles.time}>
          {this.state.time}
        </Text>
        <Text style={styles.time}>
          {this.state.time}
        </Text>*/}
      </View>
    );
  }
}

export default Clock;
