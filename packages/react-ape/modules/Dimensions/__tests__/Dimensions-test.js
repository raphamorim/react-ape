import Dimensions from '../index';

describe('Dimensions', () => {
  describe('Dimensions.get()', () => {
    test('empty arguments should return null', () => {
      expect(typeof Dimensions).toEqual('object');
      expect(typeof Dimensions.get).toEqual('function');
      expect(Dimensions.get()).toEqual(null);
    });

    test('invalid string as argument should return null', () => {
      expect(Dimensions.get('abc')).toEqual(null);
      expect(Dimensions.get('onepiece')).toEqual(null);
      expect(Dimensions.get(' ')).toEqual(null);
    });

    test('"screen" as argument should return screen', () => {
      const screen = Dimensions.get('screen');
      expect(typeof screen).toEqual('object');
      expect(typeof screen.width).toEqual('number');
      expect(typeof screen.height).toEqual('number');
    });

    test('"window" as argument should return screen', () => {
      expect(Dimensions.get('window')).toEqual({height: 768, width: 1024});
    });
  });
});
