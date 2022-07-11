import React from 'react';
import renderer from 'react-test-renderer';

import ListView from '../ListView';
import {View, Text} from '../../../reactApeEntry';

describe('ListView', () => {
  it("should render empty view when doesn't exist dataSource", () => {
    const ListViewTree = renderer.create(<ListView />).toJSON();
    expect(ListViewTree).toMatchSnapshot(`<View/>`);
  });

  it('should render properly with dataSource and renderRow', () => {
    const dataSource = [
      {dog: 'Pug', age: 5},
      {dog: 'Golden Retriever', age: 8},
    ];
    const renderRow = (data, idx) => (
      <View key={idx}>
        <Text>
          {data.dog}, which age is {data.age}
        </Text>
      </View>
    );

    const ListViewTree = renderer
      .create(<ListView renderRow={renderRow} dataSource={dataSource} />)
      .toJSON();

    expect(ListViewTree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const dataSource = [{name: 'Jack'}, {name: 'Russel'}];
    const renderRow = (data, idx) => (
      <Text key={idx} id={'render-row-' + idx}>
        {data.name}
      </Text>
    );

    const ListViewTree = renderer
      .create(<ListView renderRow={renderRow} dataSource={dataSource} />)
      .toJSON();

    expect(ListViewTree).toMatchSnapshot();
  });
});
