import React, {Component, useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from '../../react-ape/reactApeEntry';

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
    fontSize: 60,
  },
  gameList: {
    position: 'absolute',
    left: 400,
    top: 550,
  },
  image: {
    height: 340,
    width: 340,
  },
});

const gameList = [
  'harvest-moon-2.jpg',
  'pokemon-red.jpg',
  'metal-gear-solid.png',
  'pokemon-blue.jpg',
];

class Grid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.grid}>
        <Text style={styles.title}>GameBoy</Text>
        <View style={styles.gameList}>
          {/* TODO: Develop relative render for Image */}
          {gameList.map((imageSrc, idx) => {
            const left = styles.image.width * idx + 380;

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
