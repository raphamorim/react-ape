import StyleSheet from '../StyleSheet';

describe('[StyleSheet] • create', () => {
  it('create must be a function', () => {
    expect(typeof StyleSheet).toEqual('object');
    expect(typeof StyleSheet.create).toEqual('function');
  })

  it('should create a valid style object', () => {
    const styles = StyleSheet.create({
      heading: {
        top: 73,
        left: 250,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 29,
      },
      heading2: {
        top: 173,
        left: 250,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 29,
      }
    })

    expect(styles).toEqual({
      heading: {
        x: 250,
        y: 73,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 29,
        "borderColor": null,
        "borderSize": null,
        "borderStyle": [],
      },
      heading2: {
        x: 250,
        y: 173,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 29,
        "borderColor": null,
        "borderSize": null,
        "borderStyle": [],
      }
    });
  })

  describe('using an empty/invalid object', () => {
    it('empty: should return empty object', () => {
      const styles = StyleSheet.create({})
      expect(styles).toEqual({});
    });

    it('invalid: should return empty object', () => {
      const styles = StyleSheet.create({
        top: 73,
        left: 250,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: 29,
      })
      expect(styles).toEqual({});
    });
  });
});
