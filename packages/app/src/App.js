import React, {Component, useState, useEffect} from 'react';
import {
  render,
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
  withFocus,
  withNavigation
} from '../../react-ape/reactApeEntry';

// import Spinner from './Spinner';
import Sidebar from './Sidebar';
import Grid from './Grid';
import Clock from './Clock';
import Slideshow from './Slideshow';

const {width, height} = Dimensions.get('window');

// Register Custom Components
/* 
  <custom.Spinner 
    degrees={degrees}
    style={{ top: height / 4 + 8, left: width / 2 - 60, color: 'white' }}
  />
*/
// const custom = {
//   Spinner: registerComponent('Spinner', Spinner),
// };

const styles = StyleSheet.create({
  surface: {
    backgroundColor: '#202020',
    width: width,
    height: height,
    position: 'absolute',
  },
});

class Item extends React.Component {
  render() {
    const { focused, setFocus, text } = this.props;
    console.log(focused, setFocus);
    return (
      <View
        height={200}
        width={200}
        onClick={() => {
          console.log(data);
        }}
      >
        <Text style={{ color: '#FFF' }}>
          {text}
        </Text>
      </View>
    );
  }
}

const FocusableItem = withFocus(Item);

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

    console.log(this.context);

    if (hasError) {
      return null;
    }

    return (
      <View style={styles.surface}>
        <Clock />
        <Sidebar />
        <Slideshow />
        <Grid />
        <FocusableItem
          focusKey={`movie-card-1`}
          text="aaa"
        />
        <FocusableItem
          focusKey={`movie-card-2`}
          text="bbb"
        />
      </View>
    );
  }
}

const NavigationApp = withNavigation(App);

render(<NavigationApp />, document.getElementById('root'));
