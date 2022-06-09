/**
 * @flow
 */

import * as React from 'react';
import { getComponentDisplayName } from '../utils';
import { FocusPathContext } from './FocusPathContext';

type RequiredProps = {
  focusKey: string
};

// See why we do `| void`
// https://flow.org/en/docs/react/hoc/#toc-injecting-props-with-a-higher-order-component
type InjectedProps = {
  focused: boolean | void
};

/**
 * Allows the WrappedComponent to be focusable and provides the `focused`
 * property to it.
 * The resulting component should provide a `focusKey` property.
 */
function withFocus<Props: RequiredProps>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentType<$Diff<Props, InjectedProps>> {
  return class extends React.Component<Props> {
    static WrappedComponent = WrappedComponent;
    static displayName = `withFocus(${getComponentDisplayName(
      WrappedComponent
    )})`;

    renderWithFocusPath = focusPath => {
      // TODO: I need to listen to a global and observable focusPath that will
      // define if this component should be focused or not (the value of focused)
      const { focusKey } = this.props;
      return (
        <FocusPathContext.Provider value={`${focusPath}/${focusKey}`}>
          <WrappedComponent
            {...this.props}
            focused={true}
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