import React, {useState} from 'react';
import {render, View, Text, StyleSheet} from '../../reactApeEntry';

import testCanvasSnapshot from '../../../../tests/testCanvasSnapshot';

describe('Render Updates', () => {
  describe('View', () => {
    test.skip('Style prop updates', () => {
      // expect(true).toEqual(true)
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

    test('Test "Text" simple content change', done => {
      const canvas = document.createElement('canvas');
      class TextComponent extends React.Component {
        constructor() {
          super();
          this.state = {
            content: 'Noiiceee',
          };
        }

        componentDidMount() {
          setTimeout(() => {
            this.setState({content: 'Dudeeee!'}, () => {
              testCanvasSnapshot(expect, canvas);
              done();
            });
          });
        }

        render() {
          return (
            <View>
              <Text style={{color: 'black'}}>{this.state.content}</Text>
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
