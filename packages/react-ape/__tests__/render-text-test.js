import React from 'react';
import {render, View, Text, StyleSheet} from '../reactApeEntry';

import testCanvasSnapshot from '../../../tests/testCanvasSnapshot';
import ViewElement from '../renderer/elements/View';
import createTextElement from '../renderer/elements/Text';

describe('render', () => {
  describe('<Text/>', () => {
    // this test should not change
    it('renders only <Text/> correctly', () => {
      const canvas = document.createElement('canvas');
      render(
        <View style={{backgroundColor: 'purple'}}>
          <Text style={{color: 'white'}}>Pure Text</Text>
        </View>,
        canvas, 
        () => {
          const dataUrl = canvas.toDataURL();
          testCanvasSnapshot(expect, canvas);
        }
      );
    });

    it('renders <Text/> with defaults correctly', () => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'purple',
        },
      });

      const App = (
        <View style={styles.view}>
          <Text style={styles.text}>Text with Defaults</Text>
        </View>
      );

      const canvas = document.createElement('canvas');
      render(App, canvas);

      testCanvasSnapshot(expect, canvas);
    });

    it('renders <Text/> correctly', () => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'green',
        },
        text: {
          color: '#F8F8F8',
          fontFamily: 'Arial',
        },
      });

      const App = (
        <View style={styles.view}>
          <Text style={styles.text}>My amazing text</Text>
        </View>
      );

      const canvas = document.createElement('canvas');
      render(App, canvas);
      expect(canvas.toDataURL()).toMatchSnapshot();
    });

    it('renders <Text/> with coordinates correctly', () => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'red',
        },
        text: {
          color: 'white',
          fontFamily: 'Helvetica',
          position: 'absolute',
          top: 30,
          left: 50,
        },
      });

      const App = (
        <View style={styles.view}>
          <Text style={styles.text}>Other Text</Text>
        </View>
      );

      const canvas = document.createElement('canvas');
      render(App, canvas, () => testCanvasSnapshot(expect, canvas));
    });

    it('should render nothing with empty children', () => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'black',
        },
      });

      const App = (
        <View style={styles.view}>
          <Text />
        </View>
      );

      const canvas = document.createElement('canvas');
      render(App, canvas);

      testCanvasSnapshot(expect, canvas);
    });
  });
});
