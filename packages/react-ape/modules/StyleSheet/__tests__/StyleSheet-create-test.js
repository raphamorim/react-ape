import StyleSheet from '../index';

describe('[StyleSheet] • create', () => {
  it('create must be a function', () => {
    expect(typeof StyleSheet).toEqual('object');
    expect(typeof StyleSheet.create).toEqual('function');
  });

  it('should create a valid style object', () => {
    const styles = StyleSheet.create({
      heading: {
        top: 73,
        left: 0,
        color: '#333',
        fontSize: 29,
      },
      heading2: {
        top: 173,
        left: 250,
        fontFamily: 'Helvetica',
        fontWeight: 'normal',
        fontSize: 15,
        border: '2px dotted #333',
      },
      heading3: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        borderStyle: 'solid',
      },
    });

    expect(styles).toEqual({
      heading: {
        y: 73,
        x: 0,
        color: '#333',
        fontSize: 29,
      },
      heading2: {
        x: 250,
        y: 173,
        fontFamily: 'Helvetica',
        fontWeight: 'normal',
        fontSize: 15,
        borderColor: '#333',
        borderSize: '2',
        borderStyle: [3],
      },
      heading3: {
        fontFamily: 'Arial',
        fontWeight: 'bold',
        borderStyle: [],
      },
    });
  });

  describe('using an empty/invalid object', () => {
    it('empty: should return empty object', () => {
      const styles = StyleSheet.create({});
      expect(styles).toEqual({});
    });

    it('invalid: should return empty object', () => {
      const styles = StyleSheet.create({
        top: 73,
        left: 250,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 29,
      });
      expect(styles).toEqual({});
    });
  });
});
