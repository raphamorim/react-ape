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
import Sidebar from './Sidebar';
import Grid from './Grid';

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
        <Sidebar height={height} />
        <Grid height={height} />
      </View>
    );
  }
}

render(<App />, document.getElementById('root'));
