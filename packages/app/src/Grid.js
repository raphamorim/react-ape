import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from '../../react-ape/reactApeEntry';

const styles = StyleSheet.create({
  grid: {
    position: 'absolute',
    left: 400,
    top: 100,
    width: 280,
  },
  title: {
    color: 'white',
    fontSize: 50,
  },
  image: {
    height: 100,
    width: 100
  },
});

class Grid extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const { height } = this.props;
    return (
      <View style={{ ...styles.grid, height }}>
        <Text style={styles.title}>GameBoy</Text>
        <Image src={'pokemon-red.jpg'} height={200} width={200} />
      </View>
    );
  }
}

export default Grid;