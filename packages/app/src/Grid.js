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
    height: 340,
    width: 340,
  },
});

const gameList = [
  {
    title: 'Harvest Moon GBC 2',
    imageSrc: 'harvest-moon-2.jpg',
  },
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
          {/* TODO: Develop relative render for Image */}
          {gameList.map((game, idx) => {
            const {title, imageSrc} = game;
            let left = 0; 
            if (idx > 0) {
              left = (styles.image.width * 2.3) * idx;
            }
            const style = {...styles.image, left };
            console.log(style)

            return (
              <Image 
                key={title} 
                src={imageSrc} 
                style={style} 
              />
            );
          })}
        </View>
      </View>
    );
  }
}

export default Grid;
