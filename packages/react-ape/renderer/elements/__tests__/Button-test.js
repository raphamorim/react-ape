import React from 'react';
import renderer from 'react-test-renderer';
import {ButtonDefaults} from '../../constants';
import CreateButtonInstance from '../Button';

describe('Button', () => {
  describe('Call the button with Props', () => {
    it('Should render properly', () => {
      const title = 'Press Me';
      const color = '#f8a978';
      const x = 40;
      const y = 300;
      const width = x + y;
      const height = ButtonDefaults.containerStyle.height;
      const props = {title, color};
      const apeContext = {
        ctx: {
          beginPath: jest.fn(),
          fillStyle: jest.fn(),
          moveTo: jest.fn(),
          fillText: jest.fn(),
          fill: jest.fn(),
          stroke: jest.fn(),
          closePath: jest.fn(),
          lineTo: jest.fn(),
          quadraticCurveTo: jest.fn(),
          font: 'Helvetica',
          measureText: jest.fn(() => {
            return {
              width: 100,
            };
          }),
          canvas: {
            addEventListener: jest.fn(),
          },
        },
      };

      const Button = CreateButtonInstance(props);
      Button.render(apeContext, {spatialGeometry: {x, y}});
      const {
        beginPath,
        fillStyle,
        moveTo,
        fillText,
        fill,
        stroke,
        closePath,
        lineTo,
        quadraticCurveTo,
        font,
      } = apeContext.ctx;
      expect(beginPath.mock.calls.length).toBe(1);
      expect(beginPath).toBeCalledWith();
      expect(closePath).toBeCalledWith();
      expect(stroke).toBeCalledWith();
      expect(moveTo).toBeCalledWith(x, y);
      expect(lineTo.mock.calls.length).toEqual(4);
      expect(fill.mock.calls.length).toBe(1);
      expect(fillText.mock.calls.length).toBe(1);
      expect(fillText.mock.calls.length).toBe(1);
      expect(font).toEqual(`${ButtonDefaults.textStyle.fontSize}px Helvetica`);
      expect(quadraticCurveTo.mock.calls.length).toEqual(4);
      expect(fillStyle).toEqual('white');
      expect(Button).toMatchSnapshot();
    });
  });
});
