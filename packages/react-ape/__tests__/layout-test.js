import React from 'react';
import {render, View} from '../reactApeEntry';
import testCanvasSnapshot from '../../../tests/testCanvasSnapshot';

describe('Layout test', () => {
  describe('Test "relative" and "absolute" <Views/>', () => {
    test('Test 5 views with different positions (4 relative and 1 absolute)', () => {
      const canvas = document.createElement('canvas');
      canvas.height = 600;
      canvas.width = 600;
      class Layout extends React.Component {
        render() {
          return (
            <View>
              <View
                style={{width: 50, height: 50, backgroundColor: 'powderblue'}}
              />
              <View
                style={{width: 100, height: 100, backgroundColor: 'skyblue'}}
              />
              <View
                style={{width: 150, height: 150, backgroundColor: 'steelblue'}}
              />
              <View
                style={{
                  width: 60,
                  left: 200,
                  top: 0,
                  height: 60,
                  position: 'absolute',
                  backgroundColor: 'black',
                }}
              />
              <View
                style={{width: 200, height: 30, backgroundColor: 'orange'}}
              />
            </View>
          );
        }
      }

      render(<Layout />, canvas, testCanvasSnapshot(expect, canvas));
    });

    test('Test 2 absolute views with different positions', () => {
      const canvas = document.createElement('canvas');
      canvas.height = 600;
      canvas.width = 600;
      class Layout extends React.Component {
        render() {
          return (
            <View>
              <View
                style={{
                  width: 60,
                  left: 100,
                  top: 0,
                  height: 60,
                  position: 'absolute',
                  backgroundColor: 'black',
                }}
              />
              <View style={{position: 'absolute', backgroundColor: 'blue'}} />
            </View>
          );
        }
      }

      render(<Layout />, canvas, testCanvasSnapshot(expect, canvas));
    });
  });
});
