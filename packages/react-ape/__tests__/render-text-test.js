import React from 'react';
import {render, View, Text, StyleSheet} from '../reactApeEntry';

import ViewElement from '../renderer/elements/View';
import createTextElement from '../renderer/elements/Text';

describe('render', () => {
  describe('<Text/>', () => {
    // let originalTimeout;

    // beforeEach(function() {
    //   originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    //   jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    // });

    // afterEach(function() {
    //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    // });

    // this test should not change
    it('renders only <Text/> correctly', () => {
      const canvas = document.createElement('canvas');
      render(
        <View style={{backgroundColor: 'purple'}}>
          <Text style={{color: 'white'}}>Pure Text</Text>
        </View>,
        canvas
      );
      const dataUrl = canvas.toDataURL();

      // node-canvas have rasterize fonts in different ways based on OS
      if (process.platform === 'darwin') {
        expect(dataUrl).toEqual(
          `data:image/png;base64,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wQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgxn8AO6Nz2CVsSUUAAAAASUVORK5CYII=`
        );
      } else {
        expect(dataUrl).toEqual(
          `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABmJLR0QA/wD/AP+gvaeTAAAG5klEQVR4nO3df2zU9R3H8de3beqV0kANnUcVzYiJXAum9ZrNTUNqFF0LIVATkM4lQ5cUE6PGLfzjEtqNYEKyxaBuqWNECPtnKaDQEsFg0jIyiAOkBqWiUSqxlWpJSWmBcHz3B7ZQC5br9xp9xefjr8u33/t+3v2jz3zuR++CetWHAnBN9aoPvu8ZcEXW9z0AANwoggXABsECYINgAbBBsADYIFgAbBAsADYIFgAbBAuADYIFwEZOundYFa4avh2mQvV/2a/ej3u1b+0+HW85ntHhMuXqmW9EQ9AwYTNMxLWBH4tIO6wgO1BBcYHumHuHlu1YprsW3pWpuQBglLR3WEMaggYF2YHyi/L18F8e1pzaObpv5X3q2N6Ryfky4lq7GnY8gJ9xB0v65iFhd792/3635tTOUbwsPuLn14vCtY4PHVszeY3mrZ2n0iWluqngJq2Orb58QiDd/eu7VfbbMsXL4gqyAg18PaCPmj9S659ade70uSi/yhU3uM6SLUuUqEmo+71uNd7TKIVX7l93qE7xsriO/vuompY2jXhIevVtYgmkJ1KwhoThN3+tGfggjsUbFyvxaOLydS9dvm6QFajmXzWa/djsEefGCmO697l7NfOhmdpw/wad7zsfae101mmua9aMX85QvCyuRE1CH275UJJU8miJ4mVx9XX2qXlFc6R5AIwUOVh5N+fpkb8+IknqPtwdeaBbf3arNj20SV/874vhACXrkpr92Gz1dfZp59M71fmfTklS4U8LtaBxgYorijX3hbl6e+XbkdZOZ52Brwa0/XfbtWzHMj3Q8ICObTsmSaqsr1SYCrXtN9uGd2MNQQMPQYEMGHewvv3KWxiG2rd2X+SBdj69U5/u+XTEsfLl5ZKkrY9vVefezuHjXae71LS0Sc988oxmLZ4VOVjprnO85bgOvXZIybqkSpeWKggCFZUWqW11m060nYg0C4DRIu+wzp0+p54PerT3xb0ZeVvD0K7makUlRZKk5W3Lr3u/KbdPibz2eNbZ/YfdmjlvpipXVUqB1HWwS60NrZFnATBapFcJxxKGoYIgUJAVDD8flRP77iUHewdHHQuyxn5yLDs3e8xzxjKedXIn5yo2NaYL/RcUmxpTqjClWGFMAz0DkecBMFJGnnS/nsGvBjWpaJLyb8lXf1e/JCleHh/jXqP1fNCj6cnpaixvVPd70Z8ny+Q61a9WK+/mPO16fpcKigv04JoHVf1KtZqWNo0479LFS8rKyVKQHShM8TH6wHhM6L/m9H7cK0mqXFWp3Mm5mpaYpupXqtO+zrt/f1eSVNtSq/InylVQXKAgO1BOXo6KSopUsaJCT/73ycjzprtO6ZJSJWoS6jnao/bN7dr/0n6d+fzM8PGrDQX7zl/deUM7OQCjTegO6+A/Duq2X9ymZF1SybqkJOnYG8c0/Z7paV3n8IbDKq4oVsWKCi3858KJGDXtdSZNm6Sql6skSXte2KMwFeri4EW988d3tGjjIs3/23x91vqZBr++/BD35IGTKplRotrm2uFr8IohkJ4J3WEd2XhEbX9u09kvzyp1PqUjG49o6+Nb079QKLU81aLXK19X++Z29Z3oU5gKdaH/gk69f0oH1h3Q+p+vjz5wGutUratS/k/ydXL/SXW8eeXd/e2b29V1qEv5t+Sral3V8PG3nn1LHW926Oyps9HnBH6kAr6XELg+vpfwh4WPlwFgg2ABsEGwANggWABsECwANggWABsEC4ANggXABsECYINgAbBBsADYIFgAbBAsADYIFgAbBAuADYIFwAbBAmCDYAGwQbAA2CBYAGwQLAA2CBYAGwQLgA2CBcAGwQJgg2ABsEGwANggWABsECwANggWABsEC4ANggXABsECYINgAbBBsADYIFgAbBAsADYIFgAbBAuADYIFwAbBAmCDYAGwQbAA2CBYAGwQLAA2CBYAGwQLgA2CBcAGwQJgg2ABsEGwANggWABsECwANggWABsEC4ANggXABsECYINgAbBBsADYIFgAbBAsADYIFgAbBAuADYIFwAbBAmCDYAGwQbAA2CBYAGwQLAA2CBYAGwQLgA2CBcAGwQJgg2ABsEGwANggWABsECwANggWABsEC4ANggXABsECYINgAbBBsADYIFgAbBAsADYIFgAbBAuADYIFwAbBAmCDYAGwQbAA2CBYAGwQLAA2CBYAGwQLgA2CBcAGwQJgg2ABsEGwANggWABsECwANggWABsEC4ANggXABsECYINgAbBBsADYIFgAbBAsADYIFgAbBAuADYIFwAbBAmCDYAGwQbAA2CBYAGwQLAA2CBYAGwQLgA2CBcAGwQJgg2ABsEGwANggWABsECwANv4PS7TeyMO7Nx4AAAAASUVORK5CYII=`
        );
      }
    });

    it('renders <Text/> with defaults correctly', () => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'purple',
        },
      });

      const App = (
        <View style={styles.view}>
          <Text style={styles.text}>Text with Defaults</Text>
        </View>
      );

      const canvas = document.createElement('canvas');
      const expectedCanvas = document.createElement('canvas');

      const view = new ViewElement({style: styles.view});
      view.appendChild(
        createTextElement({children: 'Text with Defaults'})
      );
      view.render({ctx: expectedCanvas.getContext('2d')});

      render(App, canvas);
      expect(canvas.toDataURL()).toEqual(expectedCanvas.toDataURL());
    });

    it('renders <Text/> correctly', () => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'green',
        },
        text: {
          color: '#F8F8F8',
          fontFamily: 'Arial',
        },
      });

      const App = (
        <View style={styles.view}>
          <Text style={styles.text}>My amazing text</Text>
        </View>
      );

      const canvas = document.createElement('canvas');
      const expectedCanvas = document.createElement('canvas');

      const view = new ViewElement({style: styles.view});
      view.appendChild(
        createTextElement({children: 'My amazing text', style: styles.text})
      );
      view.render({ctx: expectedCanvas.getContext('2d')});

      render(App, canvas);
      expect(canvas.toDataURL()).toEqual(expectedCanvas.toDataURL());
    });

    it('renders <Text/> with coordinates correctly', () => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'red',
        },
        text: {
          color: 'white',
          fontFamily: 'Helvetica',
          position: 'absolute',
          top: 30,
          left: 50,
        },
      });

      const App = (
        <View style={styles.view}>
          <Text style={styles.text}>Other Text</Text>
        </View>
      );

      const canvas = document.createElement('canvas');
      const expectedCanvas = document.createElement('canvas');

      render(App, canvas);

      const view = new ViewElement({style: styles.view});
      view.appendChild(
        createTextElement({
          children: 'Other Text',
          style: styles.text,
        })
      );
      view.render({ctx: expectedCanvas.getContext('2d')});

      expect(canvas.toDataURL()).toEqual(expectedCanvas.toDataURL());
    });

    it('should render nothing with empty children', () => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'black',
        },
      });

      const canvas = document.createElement('canvas');
      const expectedCanvas = document.createElement('canvas');

      const view = new ViewElement({style: styles.view});
      view.appendChild(createTextElement({}));
      view.render({ctx: expectedCanvas.getContext('2d')});

      const App = (
        <View style={styles.view}>
          <Text />
        </View>
      );

      render(App, canvas);
      expect(canvas.toDataURL()).toEqual(expectedCanvas.toDataURL());
    });

    it.skip('renders <Text/> with state', done => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'black',
          height: 500,
          width: 500,
        },
        text: {
          color: 'gray',
        },
      });

      function formatDate(dateParam) {
        return dateParam
          .toTimeString()
          .replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
      }

      const canvas = document.createElement('canvas');
      const expectedCanvas = document.createElement('canvas');
      const date = new Date(2018, 11, 24, 10, 33, 30, 0);

      class App extends React.Component {
        constructor() {
          super();
          this.state = {time: formatDate(date)};
        }

        componentDidMount() {
          setInterval(() => {
            const nextDate = new Date(2018, 11, 24, 50, 53, 50, 0);
            this.setState({time: formatDate(nextDate)});

            const updatedCanvas = document.createElement('canvas');
            const newView = new ViewElement({style: styles.view});
            newView.appendChild(
              createTextElement({
                children: formatDate(nextDate),
                style: styles.text,
              })
            );
            newView.render({ctx: updatedCanvas.getContext('2d')});

            expect(canvas.toDataURL()).toEqual(updatedCanvas.toDataURL());
            done();
          }, 10);
        }

        render() {
          return (
            <View style={styles.view}>
              <Text style={styles.text}>{this.state.time}</Text>
            </View>
          );
        }
      }

      const view = new ViewElement({style: styles.view});
      view.appendChild(
        createTextElement({
          children: formatDate(date),
          style: styles.text,
        })
      );
      view.render({ctx: expectedCanvas.getContext('2d')});

      render(<App />, canvas);

      expect(canvas.toDataURL()).toEqual(expectedCanvas.toDataURL());
    });
  });
});
