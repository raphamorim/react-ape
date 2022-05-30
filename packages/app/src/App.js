import React, {Component, useState, useEffect} from 'react';
import {
  render,
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
  Navigation,
} from '../../react-ape/reactApeEntry';

import Spinner from './Spinner';
import Sidebar from './Sidebar';
import Grid from './Grid';
import Clock from './Clock';
import Slideshow from './Slideshow';

const {width, height} = Dimensions.get('window');

const {withNavigation} = Navigation;

// Register Custom Components
const custom = {
  /* 
    <custom.Spinner 
      degrees={degrees}
      style={{ top: height / 4 + 8, left: width / 2 - 60, color: 'white' }}
    />
  */
  Spinner: registerComponent('Spinner', Spinner),
};

const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#202020',
    width: width,
    height: height,
    position: 'absolute',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };

    Dimensions.addEventListener((dimensionsValue, target) => {
      console.log(dimensionsValue, target);
    })
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
    const {hasError} = this.state;
    const {currentFocusPath} = this.props;

    console.log(currentFocusPath);

    if (hasError) {
      return null;
    }

    return (
      <View style={styles.surface}>
        <Clock />
        <Sidebar />
        <Slideshow />
        <Grid />
      </View>
    );
  }
}

const NavigableApp = withNavigation(App);

render(<NavigableApp />, document.getElementById('root'));
