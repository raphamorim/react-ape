import React from 'react';
import renderer from 'react-test-renderer';

import View from '../View';

describe('View', () => {
  it('should render properly', () => {
    const style = {x: 10, y: 100, backgroundColor: 'green'};
    const props = {style, children: 'My Amazing Text'};
    const myView = new View(props);

    expect(typeof myView.render).toBe('function');
    expect(myView.children()).toEqual([]);

    const child = {render: jest.fn()};
    myView.appendChild(child);
    expect(myView.children()).toEqual([child]);

    let withDestinationOver = null;
    const apeContext = {
      ctx: {
        beginPath: jest.fn(),
        fill: function() {
          if (this && this.globalCompositeOperation === 'destination-over') {
            withDestinationOver = true;
          }
        },
        stroke: jest.fn(),
        rect: jest.fn(),
        closePath: jest.fn(),
      },
    };

    myView.render(apeContext);

    const {
      beginPath,
      closePath,
      fillStyle,
      globalCompositeOperation,
    } = apeContext.ctx;

    expect(beginPath.mock.calls.length).toBe(1);
    expect(closePath.mock.calls.length).toBe(1);
    expect(beginPath).toBeCalledWith();
    expect(closePath).toBeCalledWith();

    expect(withDestinationOver).toEqual(true);
    expect(globalCompositeOperation).toEqual('source-over');
    expect(fillStyle).toEqual('green');

    expect(child.render.mock.calls.length).toBe(1);
    expect(child.render).toBeCalledWith(apeContext);
  });
});
