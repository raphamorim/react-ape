/**
 * @flow
 */

import * as React from 'react';
import {getComponentDisplayName} from '../utils';
import {unsafeCreateUniqueId} from '../../renderer/utils';
import {FocusPathContext} from './FocusPathContext';
import FocusSpatialMap from './FocusSpatialMap';

type RequiredProps = {};

// See why we do `| void`
// https://flow.org/en/docs/react/hoc/#toc-injecting-props-with-a-higher-order-component
type InjectedProps = {
  focusPath: string | void,
};

type State = {
  currentFocusPath: ?string,
};

/**
 * Adds `focusPath` to the context so we can create the `focusPath`
 * from the focusable elements inside the WrappedComponent.
 * Should be used to wrap the root component of the application.
 */
function withNavigation<Props: RequiredProps>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentType<$Diff<Props, InjectedProps>> {
  return class extends React.Component<Props, State> {
    static WrappedComponent = WrappedComponent;
    static displayName = `withNavigation(${getComponentDisplayName(
      WrappedComponent
    )})`;

    rootFocusPath: string;
    focusPathList: mixed;

    constructor() {
      super(...arguments);
      // this.rootFocusPath = `root-${unsafeCreateUniqueId()}`;
      this.rootFocusPath = 'root';

      this.focusPathList = [];
      this.state = {
        currentFocusPath: null,
      };
      window.addEventListener('keydown', e => this.handleKeyDown(e));
    }

    setFocus = currentFocusPath => {
      this.setState({currentFocusPath});
    };

    setFocusNext() {}

    handleKeyDown = e => {
      const {currentFocusPath} = this.state;
      // arrow up/down button should select next/previous list element
      if (e.keyCode === 38) {
        // console.log(FocusSpatialMap.indexOf(currentFocusPath))
        // this.setState( prevState => ({
        // }))
      } else if (e.keyCode === 40) {
        // console.log(FocusSpatialMap.indexOf(currentFocusPath))
        const idx = FocusSpatialMap.indexOf(currentFocusPath) + 1;
        const next = idx + 1;
        const nextFocusPath = FocusSpatialMap[next];
        this.setState({
          currentFocusPath: nextFocusPath,
        });
        // this.setState( prevState => ({
        //   cursor: prevState.cursor + 1
        // }))
      }
    };

    render() {
      const {currentFocusPath} = this.state;
      return (
        <FocusPathContext.Provider
          value={{
            // rootFocusPath: this.rootFocusPath,
            currentFocusPath: currentFocusPath,
            setFocus: this.setFocus,
          }}>
          <WrappedComponent {...this.props} />
        </FocusPathContext.Provider>
      );
    }
  };
}

export default withNavigation;
