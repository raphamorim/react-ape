import React from 'react';
import {render, View, Text, StyleSheet} from '../reactApeEntry';

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
          `data:image/png;base64,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wQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgBsECYAbBAmAGwQJgxn8AO6Nz2CVsSUUAAAAASUVORK5CYII=`
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
      const expectedCanvas = document.createElement('canvas');

      const view = new ViewElement({style: styles.view});
      view.appendChild(createTextElement({children: 'Text with Defaults'}));
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
  });
});
