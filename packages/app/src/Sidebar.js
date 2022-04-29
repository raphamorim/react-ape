import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
  Navigation,
} from '../../react-ape/reactApeEntry';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'orange',
    width: 280,
    height: height,
  },
  container: {
    position: 'absolute',
    left: 40,
    top: 100,
    lineHeight: 40,
  },
});

console.log(Navigation);

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.sidebar}>
        <View style={styles.container}>
          <Text>GameBoy</Text>
          <Text>GameBoy Advance</Text>
          <Text>PS One</Text>
        </View>
      </View>
    );
  }
}

export default Sidebar;
