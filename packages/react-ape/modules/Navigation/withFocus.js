/**
 * @flow
 */

import * as React from 'react';
import {getComponentDisplayName} from '../utils';
import {FocusPathContext} from './FocusPathContext';

type RequiredProps = {
  focusKey: string,
};

// See why we do `| void`
// https://flow.org/en/docs/react/hoc/#toc-injecting-props-with-a-higher-order-component
type InjectedProps = {
  focused: boolean | void,
};

/**
 * Allows the WrappedComponent to be focusable and provides the `focused`
 * property to it.
 * The resulting component should provide a `focusKey` property.
 */
import FocusSpatialMap from './FocusSpatialMap';

function withFocus<Props: RequiredProps>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentType<$Diff<Props, InjectedProps>> {
  return class extends React.Component<Props> {
    static WrappedComponent = WrappedComponent;
    static displayName = `withFocus(${getComponentDisplayName(
      WrappedComponent
    )})`;

    constructor() {
      super(...arguments);
    }

    renderWithFocusPath = focusContext => {
      // TODO: I need to listen to a global and observable focusPath that will
      // define if this component should be focused or not (the value of focused)
      const {setFocus, currentFocusPath} = focusContext;
      const {focusKey} = this.props;
      // const focusPath = `${rootFocusPath}/${focusKey}`;

      FocusSpatialMap.push(focusKey);

      // console.log('renderWithFocusPath', setFocus, currentFocusPath, focusPath);
      return (
        <FocusPathContext.Provider value={focusKey}>
          <WrappedComponent
            {...this.props}
            focused={currentFocusPath === focusKey}
            setFocus={setFocus.bind(this, focusKey)}
          />
        </FocusPathContext.Provider>
      );
    };

    render() {
      return (
        <FocusPathContext.Consumer>
          {this.renderWithFocusPath}
        </FocusPathContext.Consumer>
      );
    }
  };
}

export default withFocus;
