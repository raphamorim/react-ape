import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from '../../react-ape/reactApeEntry';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    left: 280,
    top: 0,
    backgroundColor: '#080808',
    width: width,
    height: 250,
    overflow: 'hidden',
  },
});

class Banner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.banner}>
        <Image src={'banner/brave-fencer-musashi.png'} />
      </View>
    );
  }
}

export default Banner;
