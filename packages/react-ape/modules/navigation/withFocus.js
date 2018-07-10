import React from 'react';
import { getDisplayName } from '../utils';
import { FocusPathContext } from './FocusPathContext';

// focusKey: string
// focused: boolean
function withFocus(WrappedComponent) {
  return class extends React.Component {
    static WrappedComponent = WrappedComponent;
    static displayName = `withFocus(${getDisplayName(WrappedComponent)})`;

    render() {
      const { focusKey } = this.props;
      // TODO: I need to listen to a global and observable focusPath that will define
      // if this component should be focused or not (the value of focused)
      return (
        <FocusPathContext.Consumer>
          {focusPath => (
            <FocusPathContext.Provider value={`${focusPath}/${focusKey}`}>
              <WrappedComponent
                {...this.props}
                focused={true}
                focusPath={`${focusPath}/${focusKey}`}
              />
            </FocusPathContext.Provider>
          )}
        </FocusPathContext.Consumer>
      );
    }
  };
}
