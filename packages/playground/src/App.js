/*
  app: @playground
  App to create and test features, try to reproduce/eliminate
  bugs and easily check the local React Ape build.
*/

import React, {Component} from 'react';
import {render, Text, SectionList, View} from '../../react-ape/reactApeEntry';

import SmartRender from './SmartRender';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
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
    const data = [
      {
        title: 'Main dishes',
        data: ['Pizza', 'Burger', 'Risotto'],
      },
      {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
      }
    ];

    if (this.state.errorInfo) {
      return errorInfo;
    }

    return (
      <SectionList
        sections={data}
        renderItem={({ item }) => (
          <Text>{item}</Text>
        )}
        renderSectionHeader={(sectionId, rowId) => (<View key={rowId}/>)}
      />
    );
  }
}

render(<App />, document.getElementById('root'));
