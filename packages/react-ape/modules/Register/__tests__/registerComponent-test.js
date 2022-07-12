import React, {useState, useEffect} from 'react';

import registerComponent, {CustomComponents} from '../index';
import Spinner from '../test-helpers/Spinner';

import {render, View, Text, StyleSheet} from '../../../entry';

function testCanvasSnapshot(expect, canvas) {
  expect(canvas.toDataURL()).toMatchSnapshot();
}

describe('registerComponent', () => {
  describe('registerComponent("ComponentName", Callable)', () => {
    test('should register component and return "ComponentName"', () => {
      const canvas = document.createElement('canvas');
      expect(Object.keys(CustomComponents).length).toEqual(0);
      expect(typeof registerComponent).toEqual('function');
      registerComponent('Spinner', Spinner);
      expect(Object.keys(CustomComponents).length).toEqual(1);

      const custom = {Spinner: 'Spinner'};
      function App() {
        return (
          <View style={{backgroundColor: 'white'}}>
            <custom.Spinner degrees={0.1} style={{color: 'blue'}} />
          </View>
        );
      }

      render(<App />, canvas, () => testCanvasSnapshot(expect, canvas));
    });

    test.skip('should update when props change', (done) => {
      const canvas = document.createElement('canvas');
      expect(typeof registerComponent).toEqual('function');
      registerComponent('Spinner', Spinner);

      const custom = {Spinner: 'Spinner'};
      class AppWithUpdate extends React.Component {
        constructor(props) {
          super(props);
          this.state = {degrees: 0.0};
        }

        componentDidMount() {
          setTimeout(() => {
            const {degrees} = this.state;
            this.setState({degrees: 0.1}, () => {
              testCanvasSnapshot(expect, canvas);
              done();
            });
          });
        }

        render() {
          const {degrees} = this.state;
          return (
            <View>
              <custom.Spinner degrees={degrees} style={{color: 'green'}} />
            </View>
          );
        }
      }

      render(<AppWithUpdate />, canvas, () =>
        testCanvasSnapshot(expect, canvas)
      );
    });
  });
});
