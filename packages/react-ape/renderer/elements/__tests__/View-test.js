import React from 'react';
import renderer from 'react-test-renderer';

import View from '../View';

describe('View', () => {
  it('absolute view should render properly', () => {
    const style = {top: 10, left: 100, position: 'absolute', backgroundColor: 'green'};
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
      getSurfaceHeight: () => 0,
      setSurfaceHeight: () => {},
      viewLayoutData: {x: 100, y: 10}
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


  it('relative view should render properly', () => {
    const style = {backgroundColor: 'blue'};
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
      getSurfaceHeight: () => 0,
      setSurfaceHeight: () => {},
      viewLayoutData: {x: 0, y: 0}
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
    expect(fillStyle).toEqual('blue');

    expect(child.render.mock.calls.length).toBe(1);
    expect(child.render).toBeCalledWith(apeContext);
  });
});
