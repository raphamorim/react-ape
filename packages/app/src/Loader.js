import React, {Component} from 'react';
import {
  Text,
  View,
  registerComponent,
  StyleSheet,
  Dimensions,
} from '../../react-ape/entry';

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
    backgroundColor: '#202020',
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
          style={{top: 550, left: 740, color: 'orange'}}
        />
      </View>
    );
  }
}

export default Loader;
