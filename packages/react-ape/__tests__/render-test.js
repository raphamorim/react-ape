import React from 'react';
import { render, View, Text, StyleSheet } from '../reactApeEntry';

describe('render', () => {
  it('renders <Text/> correctly', () => {
    const styles = StyleSheet.create({
      view: {
        backgroundColor: 'green',
      },
      text: {
        color: '#F8F8F8',
        fontFamily: 'Arial'
      }
    })

    const App = (
      <View style={styles.view}>
        <Text style={styles.text}>
          My amazing text
        </Text>
      </View>
    );

    const canvas = document.createElement('canvas');
    render(App, canvas);
    const dataUrl = canvas.toDataURL();

    expect({dataUrl}).toMatchSnapshot();
  });

  it('renders <View/> correctly', () => {
    const styles = StyleSheet.create({
      view: {
        backgroundColor: 'red',
        width: 100,
        height: 300
      },
    })

    const canvas = document.createElement('canvas');
    render(<View style={styles.view}/>, canvas);
    const dataUrl = canvas.toDataURL();

    expect({dataUrl}).toMatchSnapshot();
  });
});
