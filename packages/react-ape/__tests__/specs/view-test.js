import React from 'react';
import {render, View, Text, StyleSheet} from '../entry';

import testCanvasSnapshot from '../../../tests/testCanvasSnapshot';
import ViewElement from '../renderer/elements/View';
import createTextElement from '../renderer/elements/Text';

describe('View Spec', () => {
  it('Relative should be respected in Views of the same root level', () => {
    const canvas = document.createElement('canvas');
    const app = [
      <View
        style={{width: 50, height: 50, backgroundColor: 'powderblue'}}
      />,
      <View
        style={{width: 100, height: 100, backgroundColor: 'skyblue'}}
      />,
      <View
        style={{width: 150, height: 150, backgroundColor: 'steelblue'}}
      />
    ];

    render(app, canvas, () => {
        const dataUrl = canvas.toDataURL();
        testCanvasSnapshot(expect, canvas);
      }
    );
  });
});
