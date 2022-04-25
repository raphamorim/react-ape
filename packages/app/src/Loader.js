import React, {Component} from 'react';
import {
  Text,
  View,
  registerComponent,
  StyleSheet,
  Dimensions,
} from '../../react-ape/reactApeEntry';

import Spinner from './Spinner';

const {width, height} = Dimensions.get('screen');

// Create Custom Components
const custom = {
  Spinner: registerComponent('Spinner', Spinner),
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: width / 2 - 40,
    top: height / 4,
    backgroundColor: 'blue',
  },
});

class Loader extends Component {
  _interval = null;

  constructor(props) {
    super(props);
    this.state = {
      degrees: 0.0,
    };
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      const {degrees} = this.state;
      this.setState({degrees: degrees + 0.1});
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    const {degrees} = this.state;
    return (
      <View style={styles.container}>
        <custom.Spinner
          degrees={degrees}
          style={{top: height / 4 + 8, left: width / 2 - 60, color: 'white'}}
        />
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  }
}

export default Loader;
