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
    top: height - 200,
    backgroundColor: 'orange',
    height: 80,
    width: 100,
  },
  time: {
    color: 'white',
    fontSize: 30,
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
      </View>
    );
  }
}

export default Clock;
