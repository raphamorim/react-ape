import React from 'react';
import renderer from 'react-test-renderer';

import CreateTextInstance from '../Text';

describe('Text', () => {
  describe('with text as children', () => {
    it('should call properly', () => {
      const style = {
        x: 40,
        y: 10,
        color: '#333333',
        fontFamily: 'Helvetica Neue',
      };
      const props = {style, children: 'My Amazing Text'};
      const apeContext = {
        ctx: {
          beginPath: jest.fn(),
          setLineDash: jest.fn(),
          strokeText: jest.fn(),
          fillText: jest.fn(),
          fill: jest.fn(),
          stroke: jest.fn(),
          closePath: jest.fn(),
        },
      };

      const text = CreateTextInstance(props);
      text.render(apeContext);

      const {
        beginPath,
        setLineDash,
        fill,
        fillText,
        closePath,
        fillStyle,
        strokeStyle,
        font,
        textBaseline,
        stroke,
        strokeText,
      } = apeContext.ctx;

      expect(beginPath.mock.calls.length).toBe(1);
      expect(beginPath.mock.instances.length).toBe(1);
      expect(beginPath).toBeCalledWith();

      expect(closePath.mock.calls.length).toBe(1);
      expect(closePath.mock.instances.length).toBe(1);
      expect(closePath).toBeCalledWith();

      expect(setLineDash).toBeCalledWith([]);
      expect(fillText).toBeCalledWith(props.children, 40, 10);

      expect(font).toBe('18px Helvetica Neue');
      expect(textBaseline).toBe('middle');
      expect(fillStyle).toBe('#333333');

      expect(strokeStyle).toBe(undefined);
      expect(stroke.mock.calls.length).toBe(1);
      expect(strokeText.mock.calls.length).toBe(1);
    });
  });

  describe('with text as content', () => {
    it('should call properly and override children', () => {
      const style = {
        color: '#333333',
        fontFamily: 'Helvetica Neue',
      };
      const props = {
        style,
        content: 'Look that Dog!',
        children: 'My Amazing Text',
      };
      const apeContext = {
        ctx: {
          beginPath: jest.fn(),
          setLineDash: jest.fn(),
          strokeText: jest.fn(),
          fillText: jest.fn(),
          fill: jest.fn(),
          stroke: jest.fn(),
          closePath: jest.fn(),
        },
      };

      const text = CreateTextInstance(props);
      text.render(apeContext);

      const {
        beginPath,
        setLineDash,
        fill,
        fillText,
        closePath,
        fillStyle,
        strokeStyle,
        font,
        textBaseline,
        stroke,
        strokeText,
      } = apeContext.ctx;

      expect(beginPath.mock.calls.length).toBe(1);
      expect(beginPath.mock.instances.length).toBe(1);
      expect(beginPath).toBeCalledWith();

      expect(closePath.mock.calls.length).toBe(1);
      expect(closePath.mock.instances.length).toBe(1);
      expect(closePath).toBeCalledWith();

      expect(setLineDash).toBeCalledWith([]);
      expect(fillText).toBeCalledWith(props.content, 10, 18);

      expect(font).toBe('18px Helvetica Neue');
      expect(textBaseline).toBe('middle');
      expect(fillStyle).toBe('#333333');

      expect(strokeStyle).toBe(undefined);
      expect(strokeText.mock.calls.length).toBe(1);
      expect(stroke.mock.calls.length).toBe(1);
    });
  });
});
