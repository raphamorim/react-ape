import { withFocusable } from '../index';

describe.skip('withFocusable', () => {
  describe('Dimensions.get()', () => {
    test('empty arguments should return null', () => {
      expect(typeof Dimensions).toEqual('object');
      expect(typeof Dimensions.get).toEqual('function');
      expect(Dimensions.get()).toEqual(null);
    });
  });
});
