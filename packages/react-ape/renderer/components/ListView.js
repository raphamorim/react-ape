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
  style: {[string]: string | number},
  dataSource: Array<mixed>,
  renderRow: mixed => React.Node,
  renderSeparator: mixed => React.Node
|};

class ListView extends React.Component<Props> {
  static defaultProps = {
    renderRow: () => {},
    dataSource: [],
  };

  render() {
    const {style, renderRow, dataSource} = this.props;
    let size = 0;
    return React.createElement('View', style ? {style} : null,
      dataSource.map((data, idx) => {
        const element = React.createElement(
          'View',
          {style: { position: 'absolute', top: size }},
          renderRow(data, idx)
        )
        size += 40;
        return element;
      })
    )
  }
}

export default ListView;
