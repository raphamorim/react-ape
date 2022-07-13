import React, {Component, useState, useEffect} from 'react';
import {
  render,
  Text,
  View,
  Dimensions,
  StyleSheet,
  registerComponent,
  withNavigation,
} from '../../react-ape/entry';

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

const s = StyleSheet.create({
  container: {
    backgroundColor: 'aliceblue',
    height: 300,
    width: 200,
  },
  child: {
    height: 100,
    width: 100,
  }
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
    // return (
    //   <View
    //     style={{width: 80, height: 80, backgroundColor: 'grey', color: 'navy'}}>
    //     {/*<View>*/}
    //       <View style={{width: 40, height: 40, backgroundColor: 'powderblue'}}>
    //         {/*<View
    //           style={{
    //             width: 30,
    //             height: 30,
    //           }}>
    //           <Text>should be in navy</Text>
    //         </View>*/}
    //       </View>
    //       <View style={{width: 40, height: 40, backgroundColor: 'yellow'}}>

    //       </View>

    //     {/*</View>*/}
    //   </View>
    // );

    // Second problem: Views should be relative to the parent and not the page
    return (
      <View style={s.container}>
        {['bisque', 'cadetblue', 'darkseagreen'].map((c, i) => (
          <View style={{...s.child, backgroundColor: c}}>
            <Text content={`Child ${i+1}`} />
          </View>
        ))}
      </View>
    );

    // Third problem: View backgroundColor should propagate to children

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
