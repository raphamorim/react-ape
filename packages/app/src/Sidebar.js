import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Button,
  registerComponent,
  withFocus,
} from '../../react-ape/reactApeEntry';

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
  buttonContainer:{
      bottom:0,
      position:"absolute"
    
  }
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
        <FocusableItem focusKey="sidebar-item-2" text="Kyoto" idx={160} />
        <FocusableItem focusKey="sidebar-item-3" text="Stockholm" idx={200} />
        <View style={styles.buttonContainer}>
        <Button
        color="blue'"
         title="Navigate"
         onClick = {()=>{}}
        />
        </View>
      
        {/*</View>*/}
      </View>
    );
  }
}

export default Sidebar;
