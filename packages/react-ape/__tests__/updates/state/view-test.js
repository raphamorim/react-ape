import React from 'react';
import {render, View, Text, StyleSheet} from '../../../entry';

import testCanvasSnapshot from '../../../../../tests/testCanvasSnapshot';

describe('[Updates] State - View', () => {
  describe('View', () => {
    test('Render relative view with children updates by state', done => {
      const canvas = document.createElement('canvas');
      class ViewComponent extends React.Component {
        constructor() {
          super();
          this.state = {
            text: 'loading...',
            color: 'blue',
          };
        }

        componentDidMount() {
          this.setState(
            {
              color: 'orange',
              text: 'loaded',
            },
            () => {
              testCanvasSnapshot(expect, canvas);
              done();
            }
          );
        }

        render() {
          const {text, color} = this.state;
          return (
            <View>
              <View style={{backgroundColor: 'white'}}>
                <Text>SSSSS</Text>
                <Text>
                  {text}
                </Text>
              </View>
              <View style={{backgroundColor: 'red'}}>
                <Text style={{color: 'white'}}>
                  {text}
                </Text>
                <Text style={{color: 'white'}}>ABC</Text>
              </View>
              <Text
                style={{
                  color: color,
                  position: 'absolute',
                  top: 100,
                  left: 100,
                }}>
                122121 {text}
              </Text>
              <Text style={{position: 'absolute', top: 140, left: 100}}>
                {text}
              </Text>
            </View>
          );
        }
      }
      render(<ViewComponent />, canvas, () => {
        const dataUrl = canvas.toDataURL();
        testCanvasSnapshot(expect, canvas);
      });
    });
  });
});
