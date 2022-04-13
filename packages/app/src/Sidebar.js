import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
} from '../../react-ape/reactApeEntry';

const styles = StyleSheet.create({
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'orange',
    width: 280,
  },
  container: {
    position: 'absolute',
    left: 40,
    top: 100,
  },
});

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {height} = this.props;
    return (
      <View style={{...styles.sidebar, height}}>
        <View style={styles.container}>
          <Text>Sidebar</Text>
        </View>
      </View>
    );
  }
}

export default Sidebar;
