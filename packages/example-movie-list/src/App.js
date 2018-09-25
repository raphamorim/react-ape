import React from 'react';
import {
  render,
  Text,
  ListView,
  View,
  Image,
  Tools,
  StyleSheet,
  dimensions,
} from '../../react-ape/reactApeEntry';
/*
  ^ The `import` above is only for local development,
  you can switch to 'react-ape' if you want to.
*/

// const styles = StyleSheet.create({
//   heading: {
//     top: 62,
//     left: 250,
//     color: 'white',
//     fontFamily: 'Arial',
//     fontWeight: 'bold',
//     fontSize: 29,
//   },
//   time: {
//     top: 62,
//     left: dimensions.getWidth() - 120,
//     color: 'red',
//     fontFamily: 'Arial',
//     fontWeight: 'bold',
//     fontSize: 25,
//   },
//   logo: {
//     top: 10,
//     left: 30,
//   },
//   infoAboutRenderer: {
//     top: 590,
//     left: 30,
//     fontFamily: 'Arial',
//     fontWeight: 'bold',
//     color: 'lightblue',
//     fontSize: 23,
//   },
//   list: {
//     top: 100,
//     left: 0,
//     backgroundColor: '#303030',
//     width: dimensions.getWidth(),
//     height: 400,
//   },
// });

// class App extends React.Component {
//   constructor() {
//     super();
//     this.posters = [
//       {name: 'Narcos', src: 'posters/narcos.jpg'},
//       {name: 'Daredevil', src: 'posters/daredevil.jpg'},
//       {name: 'Stranger Things', src: 'posters/stranger-things.jpg'},
//       {name: 'Narcos', src: 'posters/narcos.jpg'},
//       {name: 'Daredevil', src: 'posters/daredevil.jpg'},
//       {name: 'Stranger Things', src: 'posters/stranger-things.jpg'},
//       {name: 'Narcos', src: 'posters/narcos.jpg'},
//       {name: 'Daredevil', src: 'posters/daredevil.jpg'},
//       {name: 'Stranger Things', src: 'posters/stranger-things.jpg'},
//     ];
//     this.state = {
//       time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
//     };
//   }

  // componentDidMount() {
  //   setInterval(() => {
  //     const time = new Date()
  //       .toTimeString()
  //       .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
  //     this.setState({time});
  //   }, 100);
  // }

//   renderPostersList() {
//     const renderRow = (data, idx) => (
//       <View
//         height={200}
//         width={200}
//         key={'poster-list-' + idx}
//         onClick={() => {
//           console.log(data);
//         }}>
//         <Image
//           style={{x: 220 * idx + 30, y: 140, width: 200, height: 300}}
//           src={data.src}
//         />
//         <Text style={{x: 220 * idx + 30, y: 460, color: '#FFF'}}>
//           {data.name}
//         </Text>
//       </View>
//     );

//     return (
//       <ListView
//         dataSource={this.posters}
//         renderRow={renderRow}
//         style={styles.list}
//       />
//     );
//   }

//   render() {
//     return (
//       <View>
//         <Image
//           src={'posters/netflix.png'}
//           style={styles.logo}
//           width={210}
//           height={100}
//         />
//         <Text style={styles.heading}>• React Ape Originals</Text>
//         <Text style={styles.time}>{this.state.time}</Text>
//         <Text style={styles.infoAboutRenderer}>Link to GitHub</Text>
//         {this.renderPostersList()}
//       </View>
//     );
//   }
// }


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
    };
  }

  componentDidMount() {
    setInterval(() => {
      const time = new Date()
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      this.setState({time});
    }, 100);
  }

  render() {
    return (
      <View>
        <Tools.Grid/>
        <View style={{backgroundColor: 'purple', height: 80, width: 280, x: 500, y: 220}}>
          <Text style={{x: 520, y: 260, color: 'white', fontSize: 60}}>{this.state.time}</Text>
        </View>
        <Text style={{x: 500, y: 360}}>This TextNode should not render again</Text>
      </View>
    );
  }
}

render(<App />, document.getElementById('root'));
