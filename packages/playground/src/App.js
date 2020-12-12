/*
  app: @playground
  App to create and test features, try to reproduce/eliminate
  bugs and easily check the local React Ape build.
*/

import React, {Component} from 'react';
import {
  render,
  Text,
  View,
  Dimensions,
} from '../../react-ape/reactApeEntry';

import data from './data';
import loadImage from './utils/loadImage';
import Loader from './Loader';
import Store from './Store';

const { width, height } = Dimensions.get('screen');

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      loaded: false
    };
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  componentDidMount() {
    const images = [];
    data.forEach(({ imageSrc }) => {
      images.push(loadImage(`assets/${imageSrc}`));
    });

    Promise.all(images).then(() => {
      console.log('images loaded');
      this.setState({ loaded: true })
    });

    //setTimeout(() => {
      //this.setState({ loaded: true })
    //}, 100)
  }

  render() {
    const { hasError, loaded } = this.state;
    if (hasError) {
      return (
        <View>
          <Text style={{ color: 'black'}}>
            Something went wrong.
          </Text>
        </View>
      );
    }

   return (
      <View style={{ backgroundColor: 'orange', width, height }}>
        { !loaded ? <Loader/> : <Store/> }
      </View>
    )
  }
}

/*
 * TODO: Fix update type Render
 * TODO: Fix heritage issue
 */

render(<App />, document.getElementById('root'));
