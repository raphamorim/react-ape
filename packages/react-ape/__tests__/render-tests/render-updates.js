import React from 'react';
import {render, View, Text, StyleSheet} from '../../reactApeEntry';

import testCanvasSnapshot from '../../../../tests/testCanvasSnapshot';

describe('Render Updates', () => {
  describe('Relative View', () => {
    test('Render relative view with props and children updates', done => {
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
          setTimeout(() => {
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
          });
        }

        render() {
          const {text, color} = this.state;
          return (
            <View>
              <View style={{backgroundColor: 'white'}}>
                <Text>SSSSS</Text>
                <Text>{text}</Text>
              </View>
              <View style={{backgroundColor: 'red'}}>
                <Text style={{color: 'white'}}>{text}</Text>
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
      render(<ViewComponent />, canvas);

      testCanvasSnapshot(expect, canvas);
    });
  });

  describe('Text', () => {
    test('Test "Text" style props change', done => {
      const canvas = document.createElement('canvas');
      class TextComponent extends React.Component {
        constructor() {
          super();
          this.state = {
            color: 'blue',
            fontFamily: 'helvetica',
            fontSize: 25,
          };
        }

        componentDidMount() {
          setTimeout(() => {
            this.setState(
              {
                color: 'orange',
                fontFamily: 'arial',
                fontSize: 13,
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
              <Text style={this.state}>Should change!</Text>
            </View>
          );
        }
      }
      render(<TextComponent />, canvas);

      testCanvasSnapshot(expect, canvas);
    });

    test('Test "Text" simple text change', done => {
      const canvas = document.createElement('canvas');
      class TextComponent extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            text: 'Noiiceee',
          };
        }

        componentDidMount() {
          this.setState({text: 'Dudeeee!'}, () => {
            testCanvasSnapshot(expect, canvas);
            done();
          });
        }

        render() {
          return (
            <View>
              <Text style={{color: 'black'}}>{this.state.text}</Text>
            </View>
          );
        }
      }
      render(<TextComponent />, canvas);
      testCanvasSnapshot(expect, canvas);
    });

    test('Test "Text" multiples content change', done => {
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
          setTimeout(() => {
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
      render(<TextComponent />, canvas);
      testCanvasSnapshot(expect, canvas);
    });
  });
});
