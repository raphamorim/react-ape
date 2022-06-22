import React, {Component, useState, useEffect} from 'react';
import {
  render,
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
  withNavigation,
} from '../../react-ape/reactApeEntry';

import Sidebar from './Sidebar';
import Grid from './Grid';
import Clock from './Clock';
import Slideshow from './Slideshow';

const {width, height} = Dimensions.get('window');

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

    // In case you want to update the App with new dimensions value:
    // Dimensions.addEventListener((dimensionsValue, target) => {
    //   console.log(dimensionsValue, target);
    // });
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

    if (hasError) {
      return null;
    }

    // First problem: Text style hierarchy doesn't work (it should render in orange)
    // Second problem: View positions aren't correctly geometrically
    // Third problem: View backgroundColor isn't correct, 2nd View should have same bgc as 1st
    //   and also 4th should have same as 3rd
    return (
      <View style={{width: 80, height: 80, backgroundColor: 'grey', color: 'orange'}}>
        <View>
          <View style={{width: 80, height: 80, backgroundColor: 'powderblue'}}>
            <View
              style={{
                width: 30,
                height: 30
              }}
            >
              <Text>should be in orange</Text>
            </View>
          </View>
        </View>
      </View>
    );

    // return (
      // <View style={styles.surface}>
      //   <Clock />
      //   <Sidebar />
      //   <Slideshow />
      //   <Grid />
      // </View>
    // );
  }
}

const NavigationApp = withNavigation(App);

render(<NavigationApp />, document.getElementById('root'));
