import React from 'react';
import {render, View, Text, StyleSheet} from '../../../reactApeEntry';

import testCanvasSnapshot from '../../../../../tests/testCanvasSnapshot';

describe('[Updates] State - Text', () => {
  describe('Text', () => {
    test('Test "Text" multiples content change', (done) => {
      const canvas = document.createElement('canvas');
      class TextComponent extends React.Component {
        constructor() {
          super();
          this.state = {
            firstContent: 'rain-maker',
            secondContent: 'sete-vezes-mais',
          };
        }

        componentDidMount() {
          this.setState({
            firstContent: 'sun-maker',
            secondContent: 'dez-vezes-mais',
          });

          setTimeout(() => {
            testCanvasSnapshot(expect, canvas);
            this.setState(
              {
                firstContent: 'maker',
                secondContent: 'treze-vezes-mais',
              },
              () => {
                testCanvasSnapshot(expect, canvas);
                done();
              }
            );
          });
        }

        render() {
          return (
            <View>
              <Text style={{color: 'black'}}>{this.state.firstContent}</Text>
              <Text style={{color: 'red'}}>{this.state.secondContent}</Text>
            </View>
          );
        }
      }
      render(<TextComponent />, canvas, () => {
        const dataUrl = canvas.toDataURL();
        testCanvasSnapshot(expect, canvas);
      });
    });

    // test('Test "Text" style state change reflect on props', done => {
    //   const canvas = document.createElement('canvas');
    //   class TextComponent extends React.Component {
    //     constructor() {
    //       super();
    //       this.state = {
    //         color: 'blue',
    //         fontFamily: 'helvetica',
    //         fontSize: 25,
    //       };
    //     }

    //     componentDidMount() {
    //         this.setState(
    //           {
    //             color: 'orange',
    //             fontFamily: 'arial',
    //             fontSize: 13,
    //           },
    //           () => {
    //             testCanvasSnapshot(expect, canvas);
    //             done();
    //           }
    //         );
    //     }

    //     render() {
    //       return (
    //         <View>
    //           <Text style={this.state}>Should change!</Text>
    //         </View>
    //       );
    //     }
    //   }

    //   render(<TextComponent />, canvas, () => {
    //     const dataUrl = canvas.toDataURL();
    //     testCanvasSnapshot(expect, canvas);
    //   });
    // });

    // test('Test "Text" simple text change', done => {
    //   const canvas = document.createElement('canvas');
    //   class TextComponent extends React.Component {
    //     constructor(props) {
    //       super(props);
    //       this.state = {
    //         text: 'Noiiceee',
    //       };
    //     }

    //     componentDidMount() {
    //       this.setState({text: 'Dudeeee!'}, () => {
    //         testCanvasSnapshot(expect, canvas);
    //         done();
    //       });
    //     }

    //     render() {
    //       return (
    //         <View>
    //           <Text style={{color: 'black'}}>
    //             {this.state.text}
    //           </Text>
    //         </View>
    //       );
    //     }
    //   }
    //   render(<TextComponent />, canvas, () => {
    //     const dataUrl = canvas.toDataURL();
    //     testCanvasSnapshot(expect, canvas);
    //   });
    // });
  });
});
