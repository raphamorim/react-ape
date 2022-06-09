/**
 * @flow
 */

import * as React from 'react';
import { getComponentDisplayName } from '../utils';
import { unsafeCreateUniqueId } from '../../renderer/utils';
import { FocusPathContext } from './FocusPathContext';

type RequiredProps = {};

// See why we do `| void`
// https://flow.org/en/docs/react/hoc/#toc-injecting-props-with-a-higher-order-component
type InjectedProps = {
  focusPath: string | void
};

/**
 * Adds `focusPath` to the context so we can create the `focusPath`
 * from the focusable elements inside the WrappedComponent.
 * Should be used to wrap the root component of the application.
 */
function withNavigation<Props: RequiredProps>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentType<$Diff<Props, InjectedProps>> {
  return class extends React.Component<Props> {
    static WrappedComponent = WrappedComponent;
    static displayName = `withNavigation(${getComponentDisplayName(
      WrappedComponent
    )})`;

    rootFocusPath: string;

    constructor() {
      super(...arguments);
      this.rootFocusPath = `root-${unsafeCreateUniqueId()}`;
    }

    render() {
      return (
        <FocusPathContext.Provider value={this.rootFocusPath}>
          <WrappedComponent {...this.props} />
        </FocusPathContext.Provider>
      );
    }
  };
}

export default withNavigation;