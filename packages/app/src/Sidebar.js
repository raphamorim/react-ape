import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
  withFocus,
} from '../../react-ape/entry';

const {height} = Dimensions.get('window');

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
    // top: 100,
    borderRadius: 10,
    lineHeight: 40,
    backgroundColor: 'orange',
  },
});

class Item extends React.Component {
  render() {
    const {focused, idx, text, setFocus} = this.props;
    console.log('focusableitem', setFocus, focused);
    return (
      <View style={{...styles.container, top: idx}}>
        <Text
          style={{
            color: focused ? '#331A00' : 'white',
            fontSize: 24,
          }}>
          {text}
        </Text>
      </View>
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
        {/*<View style={styles.container}>*/}
        <FocusableItem
          focusKey="sidebar-item-1"
          text="Rio de Janeiro"
          idx={120}
        />
        <FocusableItem focusKey="sidebar-item-2" text="京都" idx={160} />
        <FocusableItem focusKey="sidebar-item-3" text="Stockholm" idx={200} />
        <FocusableItem focusKey="sidebar-item-4" text="Phoenix" idx={240} />
        <FocusableItem focusKey="sidebar-item-5" text="नई दिल्ली" idx={280} />
        <FocusableItem focusKey="sidebar-item-6" text="Cusco" idx={320} />
        {/*</View>*/}
      </View>
    );
  }
}

export default Sidebar;
