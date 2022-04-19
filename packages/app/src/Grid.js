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
    top: 300,
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
    top: 400,
  },
  image: {
    height: 100,
    width: 100,
  },
});

const gameList = [
  {
    title: 'Pokemon Red',
    imageSrc: 'pokemon-red.jpg',
  },
  {
    title: 'Pokemon Blue',
    imageSrc: 'pokemon-blue.jpg',
  },
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
          {/* TODO: Replace for a LISTVIEW */}
          {gameList.map(game => {
            const {title, imageSrc} = game;
            return <Image key={title} src={imageSrc} height={340} width={340} />;
          })}
        </View>
      </View>
    );
  }
}

export default Grid;
