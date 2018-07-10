/**
 * Copyright (c) 2018-present, Raphael Amorim.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 *
 */

import * as React from 'react';

/**
  Usage:

  <ListView
    dataSource={[]}
    renderRow={() => {}}
    style={StyleObject}
  />
*/

type Props = {|
  style: { [string]: string | number },
  dataSource: Array<mixed>,
  renderRow: mixed => React.Node
|};

class ListView extends React.Component<Props> {
  static defaultProps = {
    renderRow: () => {},
    dataSource: []
  };

  render() {
    const { style, renderRow, dataSource } = this.props;
    return React.createElement(
      'View',
      style ? { style } : null,
      dataSource.length ? dataSource.map(renderRow) : null
    );
  }
}

export default ListView;
