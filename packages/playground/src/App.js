import React from 'react';
import {
  render,
  Text,
  ListView,
  View,
  Image,
  Tools,
  StyleSheet,
  Dimensions,
} from '../../react-ape/reactApeEntry';

/*
  ^ The `import` above is only for local development,
  you can switch to 'react-ape' if you want to.
*/

// const styles = StyleSheet.create({
//   surface: {
//     backgroundColor: '#202020',
//     width: dimensions.getWidth(),
//     height: dimensions.getHeight(),
//   },
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
//     this.state = {
//       time: new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1'),
//       backgroundColor: 'blue',
//     };
//   }

//   componentDidMount() {
//     setInterval(() => {
//       const time = new Date()
//         .toTimeString()
//         .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
//       this.setState({
//         time,
//         backgroundColor: this.state.backgroundColor === 'blue' ? 'purple' : 'blue'
//       });
//     }, 100);
//   }

//   render() {
//     return (
//       <View>
//         <Tools.Grid />
//         <View
//           style={{
//             backgroundColor: this.state.backgroundColor,
//             height: 80,
//             width: 280,
//             x: 500,
//             y: 220,
//           }}>
//           <Text style={{x: 520, y: 260, color: 'white', fontSize: 60}}>
//             {this.state.time}
//           </Text>
//         </View>
//         <Text style={{x: 500, y: 190, color: 'black'}}>{this.state.time}</Text>
//         <Text style={{x: 500, y: 360}}>
//           This TextNode should not render again!!!
//         </Text>
//       </View>
//     );
//   }
// }

class App2 extends React.Component {
  render() {
    return (
      <View>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 100, height: 100, backgroundColor: 'skyblue'}}>
          <Text>Relative!</Text>
        </View>
        <View style={{width: 150, height: 150, backgroundColor: 'steelblue'}}>
          <Text>Relative!</Text>
        </View>
        <View style={{width: 60, left: 200, top: 0, height: 60, position: 'absolute', backgroundColor: 'black'}}>
          <Text style={{ color: 'gray' }}>Absolute!</Text>
        </View>
        <View style={{width: 200, height: 30, backgroundColor: 'orange'}} />
      </View>
    );
  }
}

class App extends React.Component {
        constructor() {
          super();
          this.state = {
            color: 'blue',
            fontFamily: 'helvetica',
            fontSize: 25,
          };
        }

        componentDidMount() {
          setTimeout(() => {
            this.setState({
              color: 'orange',
              fontFamily: 'arial',
              fontSize: 13,
            });
          });
        }

        render() {
          return (
            <View>
              <Text style={this.state}>Should change!</Text>
            </View>
          );
        }
      }


render(<App />, document.getElementById('root'));
