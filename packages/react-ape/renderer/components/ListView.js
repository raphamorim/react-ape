/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';

/**
  Usage:

  <ListView
    dataSource={[]}
    renderRow={() => {}}
    style={StyleObject}
  />
*/

class ListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {style, renderRow, dataSource} = this.props;

    return React.createElement(
      'VIEW',
      {style: style},
      dataSource.map(renderRow)
    );
  }
}

export default ListView;
