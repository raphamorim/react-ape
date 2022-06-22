import React from 'react';
import {render, View} from '../reactApeEntry';
import testCanvasSnapshot from '../../../tests/testCanvasSnapshot';

describe('Style hierarchy test', () => {
  describe('Test style props hierarchy', () => {
    test('backgroundColor and color', () => {
      const canvas = document.createElement('canvas');
      canvas.height = 100;
      canvas.width = 100;
      class Layout extends React.Component {
        render() {
          // Text style should render in orange
          // View backgroundColor: 
          //  - 2nd View should have same bgc as 1st
          //  - 4th should have same bgc as 3rd
          return (
            <View style={{width: 80, height: 80, backgroundColor: 'grey', color: 'orange'}}>
              <View>
                <View style={{width: 80, height: 80, backgroundColor: 'powderblue'}}>
                  <View
                    style={{
                      width: 30,
                      height: 30
                    }}
                  >
                    <Text>should be in orange</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }
      }

      render(<Layout />, canvas, () => testCanvasSnapshot(expect, canvas));
    });
  });
});
