import React, {Component, useState, useEffect} from 'react';
import {Text, View, Image, Dimensions, StyleSheet} from '../../react-ape/entry';

import Loader from './Loader';

const {height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  grid: {
    position: 'absolute',
    left: 400,
    top: 440,
    width: 280,
    height: height,
  },
  title: {
    color: 'white',
    fontSize: 30,
  },
  list: {
    position: 'absolute',
    left: 400,
    top: 520,
  },
  image: {
    height: 228,
    width: 148,
  },
});

// These images are under creative commons CC0
const list = [
  'pexels-michelle-guimarães-3648269.jpg',
  'pexels-raphael-amaral-2869354.jpg',
  'pexels-karyme-frança-1458036.jpg',
];

class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    const {loading} = this.state;
    if (loading) {
      return <Loader />;
    }

    return (
      <View style={styles.grid}>
        <Text style={styles.title}>Rio de Janeiro</Text>
        <View style={styles.list}>
          {/* TODO: Develop relative render for Image */}
          {list.map((imageSrc, idx) => {
            const left = styles.image.width * idx + 400;

            const style = {...styles.image, left};

            return (
              <Image key={`grid-image-${idx}`} src={imageSrc} style={style} />
            );
          })}
        </View>
      </View>
    );
  }
}

export default Grid;
