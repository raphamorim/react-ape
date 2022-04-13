/*
  app: @playground
  App to create and test features, try to reproduce/eliminate
  bugs and easily check the local React Ape build.
*/

import React, {Component, useState, useEffect} from 'react';
import {
  render,
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
} from '../../react-ape/reactApeEntry';

import Spinner from './Spinner';
// import SmartRender from './SmartRender';

const {width, height} = Dimensions.get('screen');

// Create Custom Components
const custom = {
  Spinner: registerComponent('Spinner', Spinner),
};

const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#202020',
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: 'orange',
    height: height,
    width: 280,
  },
  // time: {
  //   position: 'absolute',
  //   left: 520,
  //   top: 260,
  //   color: 'white',
  //   fontSize: 60,
  // },
  // text: {
  //   position: 'absolute',
  //   left: 150,
  //   top: 260,
  // },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      color: 'blue',
      degrees: 0.0,
      text: 'Loading...',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const {degrees} = this.state;
      this.setState({degrees: degrees + 0.1, color: 'orange', text: 'Loaded'});
    }, 10);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    const {degrees, text, color} = this.state;
    if (this.state.errorInfo) {
      return errorInfo;
    }

    return (
      <View style={styles.surface}>
        <View style={styles.sidebar}>
          <Text>SSSSS</Text>
          <Text>
            {text}
          </Text>
        </View>
        <View style={{backgroundColor: 'red'}}>
          <Text style={{color: 'white'}}>
            {text}
          </Text>
          <Text style={{color: color}}>ABC</Text>
        </View>
        <Text style={{position: 'absolute', top: 100, left: 100}}>
          122121 {text}
        </Text>
        <Text style={{position: 'absolute', top: 140, left: 100}}>
          {text}
        </Text>
      </View>
    );
  }
}



        // <Text>12, { text }</Text>
        //   <View style={{width: 200, height: 30, backgroundColor: 'orange'}} />
        //   <custom.Spinner degrees={degrees} style={{color: 'blue'}} />
        // <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        // <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}>
        //   <Text>Relative { text }</Text>
        // </View>
        // <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}>
        //   <Text>Relative</Text>
        // </View>
        // <View
        //   style={{
        //     width: 60,
        //     left: 200,
        //     top: 0,
        //     height: 60,
        //     position: 'absolute',
        //     backgroundColor: 'black',
        //   }}>
        //   <Text style={{color: 'gray'}}>Absolute!</Text>
        // </View>


render(<App />, document.getElementById('root'));
