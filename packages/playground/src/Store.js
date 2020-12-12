import React, {Component} from 'react';
import {
  Text,
  View,
  registerComponent,
  StyleSheet,
  Dimensions,
} from '../../react-ape/reactApeEntry';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 200,
    top: 0,
    height,
    width,
    backgroundColor: 'white',
    color: 'black'
  }
});

class Store extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={ styles.container }>
        <Text>Store...</Text>
      </View>
    );
  }
}

export default Store;
