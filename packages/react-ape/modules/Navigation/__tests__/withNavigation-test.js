import withNavigation from '../withNavigation';

describe('withNavigation', () => {
  test('should not return null', () => {
    expect(typeof withNavigation).toEqual('function');
  });
});
