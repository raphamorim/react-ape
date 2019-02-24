/*
  app: @playground
  App to create and test features, try to reproduce/eliminate
  bugs and easily check the local React Ape build.
*/

import React, {Component} from 'react';
import {render, Text, View} from '../../react-ape/reactApeEntry';

import SmartRender from './SmartRender';

class App extends Component {
  render() {
    return (
      <View>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}>
          <Text>Relative</Text>
        </View>
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}>
          <Text>Relative</Text>
        </View>
        <View
          style={{
            width: 60,
            left: 200,
            top: 0,
            height: 60,
            position: 'absolute',
            backgroundColor: 'black',
          }}>
          <Text style={{color: 'gray'}}>Absolute!</Text>
        </View>
        <View style={{width: 200, height: 30, backgroundColor: 'orange'}} />
      </View>
    );
  }
}

render(<SmartRender />, document.getElementById('root'));
