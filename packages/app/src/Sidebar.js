import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
  withFocus,
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
    borderRadius: 10,
    lineHeight: 40,
  },
});

class Item extends React.Component {
  render() {
    const { focused, text, setFocus } = this.props;
    console.log('focusableitem', setFocus, focused);
    return (
      <Text style={{
        color: focused ? '#331A00' : 'white',
        fontSize: 24
      }}>
        {text}
      </Text>
    );
  }
}

const FocusableItem = withFocus(Item);

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.sidebar}>
        <View style={styles.container}>
          <FocusableItem
            focusKey="sidebar-item-1"
            text="Rio de Janeiro"
          />
          <FocusableItem
            focusKey="sidebar-item-2"
            text="Kyoto"
          />
          <FocusableItem
            focusKey="sidebar-item-3"
            text="Stockholm"
          />
        </View>
      </View>
    );
  }
}

export default Sidebar;
