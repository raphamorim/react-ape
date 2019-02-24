import React from 'react';
import {render, View, Text, StyleSheet} from '../reactApeEntry';

import testCanvasSnapshot from '../../../tests/testCanvasSnapshot';
import ViewElement from '../renderer/elements/View';
import createTextElement from '../renderer/elements/Text';

describe('render', () => {
  describe('<Text/>', () => {
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
          `data:image/png;base64,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LABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZhAsAGYQLABmECwAZvwP3cRz1olhT7QAAAAASUVORK5CYII=`
        );
      } else {
        expect(dataUrl).toEqual(
          `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAABmJLR0QA/wD/AP+gvaeTAAAHnUlEQVR4nO3df0zU9x3H8RfH6UnOcKAppUiB7OqMh9YzrtOFwNKm6yKWtsEfzZyxmsU2+2vdkq5NzRb6R5O1+2PZD83WLNVkNq7TNdZqJ1GxqzlXJU5DHMownoBXq4gcWEDuONgfhBunUDjuSPuuz8dfx4e77+d9f/AMd9/vQUaNaoYEYEw1qsn4smfA/zm+7AEAYLIIFgAzCBYAMwgWADMIFgAzCBYAMwgWADMIFgAzCBYAMwgWADOcyT6g7OWyhK/7u/p148INtXzcoqHBr+anfO6ceSKBNwLTNMmwkXmmex/g6ybpYD3+q8fHXA+dCumdle+o72ZfykOl23gzj2e6QzIyD8ECkpN0sEaM/LBlzcnS4vWLNe/b8/TY64/p4I8Ppm24dBkrDPyWA9gz5WAdeeVI/Hbj3kZtqN2gBVULEoI1XhTGWh+9ll2YrQVPLdAM9wyd+PWJ+H0yMjNUXFGsfH++Mmdm6vOrn6v5H83qbe+d9Kx37jfW90abzJ7+zX6589zqvNSpxj2NCY/3rfUp9xu56rneo7M7zia8PB19m3ACE5tysEZrDbRKktx57oT18V76jLU+snb93HWt27NOziynhgaH4sEqeKRA1buqNfebcxOOFe2NqvantTr91ul0PJUEk92z72afnn77acX6YwqdDKmrtUuS5CnyqPov1XLMdGh31e6E53nnbYIFTCwtwSoqK5Ik9VzvSflYz+x8RtcarqntRJtikZgkac5Dc7Tx8Ea5PC61/6ddwbqgBvoHlLcoT97ve7Xqj6vUGezUpcOXUt5/RDJ7Nr3fpLM7zsq/2a/yreU68MIBSVL51nJlujJVv71ezQebJQ2HiZejwNRMOVhlL5fJkelQTkmOFv1gkSSp6YOmlAdqer9J+7fsl0adcCzfWi6Xx6VPfvOJan9Wm3D/Zc8v05N/elJlL5WlNVjJ7nnoxUMqebRESzcvjYdo6ealunH+hg6/dDj+2COvHJn0y1EAiaYcrDvPvIVOhnT01aMpDxR4M5AQK0nyfs8rSYpFY3ddouCcNfwUCh4pSHnvVPbs7+7Xvk379Fzdc6r4RYUkaWhoSO9teE/R3mhaZwPuVSmdJRyMDaq7rVvt59vVerw1LddhdQY771obeW+s7OfjX0/l8rhS3jvVPVv+2aLPznymhzc8LElqPd6qq/++mta5gHtZWs4Sjmfg9oCcs5xyZjk10DcgSXLf7/7CxwxGB+9a6+3o1ez82arfXq/IrcjUBk7SVPZc/MPFemDZA2rY1aDswmyVPFqihasX6vzfz0/vsMA9Ii1vuo/nVuiWcr25KlxRqMvHLkuS/Jv8SR/n4qGL8m/yKxaJ6eirR+/6Tc4xw6H5lfPTMfKU95ydP1srf7tSsUhMx355TFm5WdpSv0Wrtq9Sy8ctCZdB3A7f1qycWXJ5XOrv6k/r3MDX2bQGK1gXVK43V2v+ukbndp9TdmG2isqLkj7ORzUfaX7lfK14cYV8q30KHguq51qPMmdmylPs0YPfeVDu+916LeO1tM2e7J6V2yqVNTdLJ393UuFgWOFgWA27GrRk4xJV/qFSe5/dGz92+HJY+f58rf3bWl351xVF+6KcMQQmYVqDFXgzIN8an9x5bi3/yXLFIjG9W/2u1h9Yn9Rxulq6tKNih6reqlJxRbGWbFyS8P1YJKYL+y6kc/Sk9ix9tlQLqxcqciui468fj9+nbmudfGt8Kl1XqsY9jWrcO3xR6anfn1LVn6vkfcIr7xPDb+4TLGBiSQcrmR+smxdvalvpNvlW++RwOtT8YbM6/tsx5jEmOm5HU4d2fnen7vPdp3nL58md51a0J6pwS1htgbakP8M4mecx2T2zC7MVeCOgT09/mnAtWveVbu3/0X7l+/PlKfbE18+8fUah+pAKvlWgnOKc+FlHAF8sg3+kCoyPf6T61cLfwwJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgxv8Annpg9O/A5akAAAAASUVORK5CYII=`
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
      render(App, canvas);

      testCanvasSnapshot(expect, canvas);
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
      render(App, canvas);
      expect(canvas.toDataURL()).toMatchSnapshot();
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
      render(App, canvas);

      testCanvasSnapshot(expect, canvas);
    });

    it('should render nothing with empty children', () => {
      const styles = StyleSheet.create({
        view: {
          backgroundColor: 'black',
        },
      });

      const App = (
        <View style={styles.view}>
          <Text />
        </View>
      );

      const canvas = document.createElement('canvas');
      render(App, canvas);

      testCanvasSnapshot(expect, canvas);
    });
  });
});
